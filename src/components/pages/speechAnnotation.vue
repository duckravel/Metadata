<template>
    <div>
    <div id='menu'>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">Map Annotation
        </a>
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
            <li class="list-unstyled nav-item text-nowrap">
            <button  v-if='currentpage==annotationdata.length-1' class="btn btn-sm btn-outline-warning"  @click.prevent="surveyModal('next')">Next</button>
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
                    <div class="modal-body">  
                        <div>
                        <p class='h5'>Select the pattern by voice</p>
                        <div class="p-2"> 
                        <div class="d-flex justify-content-center flex-wrap ">
                            <span v-for='(item,key) in patternlist' :key='key' class="badge badge-secondary mx-2 my-1" :class="{'badge-danger':pattern==item}">{{item}}</span></div>
                        <div class="d-flex justify-content-center my-3"><button class="btn btn-primary rounded-circle" :class="{'btn-danger':patternmic}"
                            @click="recordcontrol('pattern')">
                            <font-awesome-icon icon="microphone-alt"/>
                        </button></div></div></div>
                        <div class="">
                            <p class='h5' for="content">Description</p>
                            <div class="card-body bg-light">
                                <p class="card-text" v-if='contentmic'>{{speechcontent}}</p>
                                <p class="card-text" v-else>{{content}}</p>
                                <div class="text-right">
                                <button href="#" class="btn btn-primary rounded-circle"  :class="{'btn-danger':contentmic}"
                                @click="recordcontrol('content')"><font-awesome-icon icon="microphone-alt"/></button></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.stop="cancel()">Cancel</button>
                        <button type="button" class="btn btn-primary" @click.stop="save">Save changes</button>
                    </div>
                </div>
                </div>
            </div>
    </div>
<!-- Modal -->
    <div class="modal fade" id="surveyModal" tabindex="-1" role="dialog" aria-labelledby="surveyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="surveyModalLabel">Overall, putting annotations on the map was:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row align-items-end my-2">
                <div class="col-3  text-center"><span class="text-danger">*</span> Very Difficult</div>
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
import simDis from '../../utils/simDis.js';
import commonmixin from '../../utils/commonmixins.js';
import annoMixin from '../../utils/annoMixins.js';
import $ from 'jquery';
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = SpeechRecognition? new SpeechRecognition() : false
recognition.lang = 'en-US';
recognition.continuous=true;
recognition.interimResults=true;
export default {
    name:'SoundAnnotation',
    mixins:[simDis,commonmixin,annoMixin],
    data(){return {contenttimelist:[],patterntimelist:[],currentpage:0,annotationdata:source.annotationdata,annotype:'',patternlist:pattern.pattern,templist:'',drawlist:[[],[],[],[],[]],isAdd:true,itemid:-1,showmodal:false,content:'',pattern:'',
    pat_acc:0,con_acc:0,confidence:0,recorditem:'',totext:'',speechcontent:'',speechresult:[],isRecord:false,patternmic:false,contentmic:false,load:0,isFilled:false,patternslip:0,contentslip:0,meta:{content:[],pattern:[],date:[]},
    congnition:{'1':0,'2':0,'3':0,'4':0,'5':0,type:'',userID:'',order:0}}},
    components:{annoComponent,rowData,rowDisplay},
    methods:{
        save(){
            const vm=this;let patterntime=0; let contenttime=0;
            if (vm.isRecord){alert('Please stop your recording before you save changes'); return};
            if (vm.patterntimelist.length>0){patterntime=vm.patterntimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if (vm.contenttimelist.length>0){contenttime=vm.contenttimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            // new 
            if(vm.isAdd)
            {vm.templist.content=vm.content;vm.templist.con_acc=vm.con_acc;vm.templist.pattern=vm.pattern;vm.templist.pat_acc=vm.pat_acc;
            vm.templist.type='Speech';
            vm.templist.page_id=parseInt(vm.currentpage)+1;
            vm.templist.materialLink=vm.annotationdata[vm.currentpage];
            vm.templist.contenttime=contenttime;
            vm.templist.patterntime=patterntime;
            vm.templist.patternslip=vm.patternslip;
            vm.templist.contentslip=vm.contentslip;
            vm.drawlist[vm.currentpage].push(vm.templist);
            vm.meta.pattern.push(vm.templist.pattern);
            vm.meta.content.push(vm.templist.content);
            vm.meta.date.push(vm.templist.id);
            }
            // edit 
            else{
                vm.templist = vm.drawlist[vm.currentpage][vm.itemid];
                vm.templist.content = vm.content;
                vm.templist.pattern = vm.pattern;
                vm.templist.patternslip +=vm.patternslip;
                vm.templist.contentslip +=vm.contentslip;
                vm.templist.contenttime+= contenttime;
                vm.templist.patterntime += patterntime;
                vm.$set(vm.drawlist[vm.currentpage], vm.itemid, vm.templist);
                vm.meta.pattern[vm.itemid]=vm.pattern;
                vm.meta.content[vm.itemid]=vm.content;
            } 
            vm.close();
            // vm.confidence=0;vm.con_acc=0;vm.pat_acc=0;vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
            // vm.patternslip=0;vm.contentslip=0;
        },
        cancel(){
            const vm=this;
            recognition.stop();
            this.isRecord=false;this.patternmic=false;this.contentmic=false;
            this.speechresult=[];this.recorditem='';this.patterntimelist=[];this.contenttimelist=[];this.speechcontent='';
            vm.close();
            
            return
        }
        ,recordcontrol(action){
            if(this.isRecord==false){
                this.isRecord=true;this.recorditem=action;
                switch (action){
                    case 'pattern':{this.patternmic=true;this.patterntimelist.push([new Date()]);this.patternslip += 1;recognition.continuous=false;this.record();break;}
                    case 'content':{this.contentmic=true;this.contenttimelist.push([new Date()]);this.contentslip += 1;recognition.continuous=true;this.recordcontent();break;}
                }
                
            }else
            {   this.isRecord=false;
                if (this.recorditem!=action){
                    alert(`Recording different items at the same time is not allowed`);
                    recognition.stop();
                    this.isRecord=false;this.patternmic=false;this.contentmic=false;
                    this.speechresult=[];this.recorditem='';
                    return
                }
                switch (action){
                    case 'pattern':{this.patternmic=false;
                    if ( this.patterntimelist.length>0){
                    this.patterntimelist[this.patterntimelist.length-1].push(new Date());}
                        this.endrecordpattern();break;}
                    case 'content':{this.contentmic=false;
                    if ( this.contenttimelist.length>0){
                    this.contenttimelist[this.contenttimelist.length-1].push(new Date());this.endcontent();break;}}
                }
            }
        }
        ,record(){
            recognition.start();
            recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
                let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
                this.confidence=temp_con;  this.speechresult.push(text);
                });
        }
        ,recordcontent(){
            recognition.start();
            recognition.addEventListener('result', event => {
            const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
            let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
            this.confidence=temp_con;
            this.speechcontent = `${text}.`; this.speechresult.push(text);});
        },
        endrecordpattern(){
            recognition.abort();
            let word=(this.speechresult[this.speechresult.length-1]);
            if (word==undefined){
                alert("Did not detect your voice, please record again");
                return
            }else{word = word[0].toUpperCase() + word.substring(1);}
            let arr =this.patternlist.map(ele=>{return this.getEditDistance(ele,word)});
            let min = Math.min(...arr);
            this.pattern = this.patternlist[arr.indexOf(min)];
            if (this.confidence !== 'undefined'){
            this.pat_acc=(this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length);}
            else{this.pat_acc=0;}
            this.speechresult=[];this.recorditem='';this.speechcontent='';
        },
        endcontent(){
            recognition.abort();
            if (this.speechresult[this.speechresult.length-1]==undefined){
                alert("Did not detect your voice, please record again");
                return}
            this.content = this.speechresult[this.speechresult.length-1];
            if (this.confidence !== 'undefined'){
            this.con_acc=(this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length);}
            else{this.con_acc=0;}
            this.speechresult=[];this.recorditem='';this.speechcontent='';},
    },
    created(){
        this.$timelog.push(new Date());
    }
}
    

</script>