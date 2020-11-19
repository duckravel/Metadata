<template>
    <div>
    <div id='menu'>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled"  href="#">Map Annotation
        </a>
        <span class="text-white mr-2 mb-0">UserID:{{$userid}}</span>
        <div class="btn-group mr-auto" role="group"  > 
            <span class="text-white-50 nav-link">Tools:  </span>  
            <button type="button" class="btn btn-dark rounded-0" @click.prevent="annotype='rect'"   > <font-awesome-icon :icon="['far', 'square']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='circle'" > <font-awesome-icon :icon="['far', 'circle']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='pencil'"  > <font-awesome-icon :icon="['fas', 'pencil-alt']"/></button>
            <button type="button" class="btn btn-dark  rounded-0" @click.prevent="annotype='pin'" > <font-awesome-icon :icon="['fas', 'map-pin']"/> </button>
        </div>            
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <button v-if='currentpage==annotationdata.length-1' class="btn btn-sm btn-outline-warning" @click='submit'>Next</button>
            <!--  -->
            </li>
        </ul>
    </nav>
    </div>
    <div class='row no-gutters contentarea bg-light' >
    <!-- annotate --> 
    <!-- '{ backgroundImage:`url(require(${annotationdata[currentpage]}))`}' -->
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
            <li class="page-item" :class='{disabled:currentpage==annotationdata.length-1}'><a class="page-link" href="#" @click.prevent="ano_pageChange('next')"> <span aria-hidden="true">&raquo;</span></a></li>
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
    data(){return {pat_acc:0,con_acc:0,contenttimelist:[],patterntimelist:[],currentpage:0,annotationdata:source.annotationdata,annotype:'',patternlist:pattern.pattern,templist:'',drawlist:[[],[],[],[],[]],isAdd:true,itemid:-1,showmodal:false,content:'',pattern:''}},
    components:{annoComponent,rowData,rowDisplay},
    mixins:[commonmixin,annoMixin],
    methods:{
        watch_content(action){
            const vm=this;
            if(action=='focus'){vm.contenttimelist.push([new Date()]);}
            else{vm.contenttimelist[vm.contenttimelist.length-1].push(new Date());}
        },
        watch_pattern(action){
            const vm=this;
            if(action=='focus'){vm.patterntimelist.push([new Date()]);}
            else{vm.patterntimelist[vm.patterntimelist.length-1].push(new Date());}
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
                vm.templist.materialLink=vm.annotationdata[vm.currentpage];
                vm.templist.materialLink=source.annotationdata[vm.currentpage];
                vm.drawlist[vm.currentpage].push(vm.templist)
                }
            else{
                vm.drawlist[vm.currentpage][vm.itemid].content=vm.content;
                vm.drawlist[vm.currentpage][vm.itemid].pattern=vm.pattern;
                vm.drawlist[vm.currentpage][vm.itemid].contenttime += contenttime;
                vm.drawlist[vm.currentpage][vm.itemid].patterntime += patterntime;   
            } 
            vm.close();
            vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
        },
        submit(){
            const vm=this;vm.tosurvey();
            this.$info.annotation = vm.drawlist;
            vm.tosurvey();
        },
    },    
}
</script>