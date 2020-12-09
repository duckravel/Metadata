<template>
    <div>
    <div id='menu'>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">Map Annotation</a>
        <div class="btn-group mr-auto" role="group"  > 
            <span class="text-white-50 nav-link">Tools:  </span>  
            <button type="button" class="btn btn-dark rounded-0" @click.prevent="annotype='rect'"   > <font-awesome-icon :icon="['far', 'square']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='circle'" > <font-awesome-icon :icon="['far', 'circle']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='pencil'"  > <font-awesome-icon :icon="['fas', 'pencil-alt']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='pin'" > <font-awesome-icon :icon="['fas', 'map-pin']"/> </button>
        </div>            
        <ul class="navbar m-0">
            <router-link target="_blank" :to="{path:'/help'}"><li class="list-unstyled"><span class="text-white mr-3">
                <font-awesome-icon icon="question-circle"/></span></li></router-link>
            <li class="list-unstyled"><span class="text-white mr-3">UserID:{{$userid}}</span></li>
            <li class="nav-item list-unstyled text-nowrap">
                <button v-if='currentpage==annotationdata.length-1' class="btn btn-sm btn-outline-warning" @click.prevent="surveyModal('next')">Next</button>
            </li>
            
        </ul>
    </nav>
    </div>
    <div class='row no-gutters contentarea bg-light' >
    <!-- annotate --> 
    <div class="col-md-9 custom-imgbg" :style="{backgroundImage:`url(${annotationdata[currentpage]})`}">
    <anno-component  :page='currentpage' :data='annotationdata' :drawingtype='annotype' v-on:openmodal="modal" :tempisempty='templist'
    ></anno-component></div>
    <row-display :data='drawlist' :currentpage='currentpage'>
    </row-display>       
    <div class="side-data col-md-3 bg-white overflow-auto" id='data'>      
        <nav>
        <ul class="pagination mb-2 justify-content-end" >                                 
            <li class="page-item" :class='{disabled:currentpage==0}'><a class="page-link" href="#" @click.prevent="ano_pageChange('pre')"><span aria-hidden="true">&laquo;</span></a></li>
            <li class="page-item" v-for="(page,index) in annotationdata.length" :key='index' :page='page' :class='{active:currentpage===page-1}'>
                <span class="custom-link">{{page}}</span></li>
            <li class="page-item" :class='{disabled:currentpage==annotationdata.length-1}'><a class="page-link" href="#" @click.prevent="surveyModal('next')"> <span aria-hidden="true">&raquo;</span></a></li>
        </ul></nav>  
        <!-- datalist -->
        <row-data :data='drawlist' :currentpage='currentpage'
        v-on:openmodal="modal" v-on:delete='rm' v-on:isselect='selected'>
        </row-data>           
    </div>     
    <!-- pop up -->
    <div v-if='showmodal'>    
        <div class="modal fade show custom_modal" @mousedown.capture.stop='' id="ContentModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLiveLabel" aria-hidden="true" @keyup.esc="close()">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ContentLabel"> Content Input</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click.stop="close()">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="patterntype">Select the pattern</label>
                    <select class="form-control mb-3" v-model="pattern" @focus="watch_pattern('focus')" @blur="watch_pattern('blur')">
                        <option v-for='(item,index) in patternlist' :key='index'>{{item}}</option>
                    </select>
                    <div class="form-group">
                        <label for="content">Description</label>
                        <textarea class="form-control" id="content" rows="3" 
                        @focus="watch_content('focus')" @blur="watch_content('blur')"
                        v-model="content" @keyup.enter="save"
                        ></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.stop="close()">Close</button>
                    <button type="button" class="btn btn-primary" @click.stop="save">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
<!-- Modal -->
    <div class="modal fade " id="surveyModal" tabindex="-1" role="dialog" aria-labelledby="surveyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="surveyModalLabel">Overall, putting annotations on the map was</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row align-items-end my-2">
                <div class="col-3 text-center"><span class="text-danger">*</span> Very Difficult</div>
                <div class="col-7 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='load' :name="`radio${item}`" :id="`radio${item}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-2  text-center">Very Easy</div>
            </div>
        </div>
        <div class="alert alert-danger mb-0 round-0" v-if='isFilled'>
            Please select a value
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="saveModal">Save changes</button>
        </div>
        </div>
    </div>
    </div> 
</div>
        
    </div>
</template>
<script>
import annoComponent from '../annoComponent';
import rowData from '../rowData';
import rowDisplay from '../rowDisplay';
import source from '../../data/source.json'
import pattern from '../../data/variables.json'
import commonmixin from '../../utils/commonmixins.js';
import annoMixin from '../../utils/annoMixins.js';
import $ from 'jquery';
export default {
    name:'TypeAnnotation',
    data(){return {pat_acc:0,con_acc:0,contenttimelist:[],patterntimelist:[],currentpage:0,annotationdata:source.annotationdata,annotype:'',patternlist:pattern.pattern,templist:'',drawlist:[[],[],[],[],[]],isAdd:true,itemid:-1,showmodal:false,content:'',pattern:'',load:0,isFilled:false,dir:''
    ,congnition:{'1':0,'2':0,'3':0,'4':0,'5':0},contentslip:0,patternslip:0,
    }},
    components:{annoComponent,rowData,rowDisplay},
    mixins:[commonmixin,annoMixin],
    methods:{
        watch_content(action){
            const vm=this;
            if(action=='focus'){vm.contenttimelist.push([new Date()]);}
            else{vm.contenttimelist[vm.contenttimelist.length-1].push(new Date());vm.contentslip+=1;}
        },
        watch_pattern(action){
            const vm=this;
            if(action=='focus'){vm.patterntimelist.push([new Date()]);}
            else{vm.patterntimelist[vm.patterntimelist.length-1].push(new Date());vm.patternslip+=1;}
        },
        save(){
            const vm=this;let patterntime=0; let contenttime=0; 
            if (vm.patterntimelist.length>0){patterntime=vm.patterntimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if (vm.contenttimelist.length>0){contenttime=vm.contenttimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if(vm.isAdd)
            {   vm.templist.content=vm.content;vm.templist.con_acc = 0; vm.templist.pattern=vm.pattern;vm.templist.pat_acc = 0;
                vm.templist.contenttime=contenttime;vm.templist.patterntime=patterntime;
                vm.templist.type='Type';
                vm.templist.page_id=parseInt(vm.currentpage)+1;
                vm.templist.patternslip=vm.patternslip;
                vm.templist.contentslip=vm.contentslip;
                vm.templist.materialLink=vm.annotationdata[vm.currentpage];
                vm.drawlist[vm.currentpage].push(vm.templist)
                }
            else{
                vm.templist = vm.drawlist[vm.currentpage][vm.itemid];
                vm.templist.content = vm.content;
                vm.templist.pattern = vm.pattern;
                vm.templist.patternslip +=vm.patternslip;
                vm.templist.contentslip +=vm.contentslip;
                vm.templist.contenttime+=contenttime;
                vm.templist.patterntime += patterntime;
                let len = vm.drawlist[vm.currentpage][vm.itemid].length-1
                vm.$set(vm.drawlist[vm.currentpage][vm.itemid], len, vm.templist);
            }
            vm.close();
            vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
            vm.contentslip=0,vm.patternslip=0;
        },
        submit(){
            const vm=this;vm.tosurvey();
            this.$info.annotation = vm.drawlist;
            vm.saveload(vm.congnition);vm.congnition={};
            vm.tosurvey();
        },
    },    
    created(){
        this.$timelog.push(new Date());
    },
    watch:{
        drawlist:function detect(){console.log('change')}
    }
}
</script>