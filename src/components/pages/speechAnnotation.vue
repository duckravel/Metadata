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
    pat_acc:0,con_acc:0,confidence:0,recorditem:'',totext:'',speechcontent:'',speechresult:[],isRecord:false,patternmic:false,contentmic:false,}},
    components:{annoComponent,rowData,rowDisplay},
    methods:{
        save(){
            const vm=this;let patterntime=0; let contenttime=0;
            if (vm.isRecord){alert('Please stop your recording')};
            if (vm.patterntimelist.length>0){patterntime=vm.patterntimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if (vm.contenttimelist.length>0){contenttime=vm.contenttimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            // new 
            if(vm.isAdd)
            {vm.templist.content=vm.content;vm.templist.con_acc=vm.con_acc;vm.templist.pattern=vm.pattern;vm.templist.pat_acc=vm.pat_acc;
            vm.templist.type='Speech';
            vm.templist.page_id=parseInt(vm.currentpage)+1;
            vm.templist.materialLink=vm.annotationdata[vm.currentpage];
            vm.templist.contenttime=contenttime;vm.templist.patterntime=patterntime;
            vm.drawlist[vm.currentpage].push(vm.templist)}
            // edit 
            else{
                vm.drawlist[vm.currentpage][vm.itemid].content=vm.content;
                vm.drawlist[vm.currentpage][vm.itemid].pattern=vm.pattern;
                vm.drawlist[vm.currentpage][vm.itemid].con_acc += vm.con_acc;
                vm.drawlist[vm.currentpage][vm.itemid].pat_acc += vm.pat_acc;
                vm.drawlist[vm.currentpage][vm.itemid].contenttime += contenttime;
                vm.drawlist[vm.currentpage][vm.itemid].patterntime += patterntime;   
            } 
            vm.close();
            vm.confidence=0;vm.con_acc=0;vm.pat_acc=0;vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
        }
        ,recordcontrol(action){
            if(this.isRecord==false){
                this.isRecord=true;this.recorditem=action;
                switch (action){
                    case 'pattern':{this.patternmic=true;this.patterntimelist.push([new Date()]);recognition.continuous=false;this.record();break;}
                    case 'content':{this.contentmic=true;this.contenttimelist.push([new Date()]);recognition.continuous=true;this.recordcontent();break;}
                }
                
            }else
            {   this.isRecord=false;
                if (this.recorditem!=action){
                    alert(`Recording different items at the same time is not allowed`);
                    recognition.abort();
                    this.isRecord=false;this.patternmic=false;this.contentmic=false;
                    this.speechresult=[];this.recorditem='';
                    return
                }
                switch (action){
                    case 'pattern':{this.patternmic=false;this.patterntimelist[this.patterntimelist.length-1].push(new Date());
                        this.endrecordpattern();break;}
                    case 'content':{this.contentmic=false;this.contenttimelist[this.contenttimelist.length-1].push(new Date());this.endcontent();break;}
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
            this.pat_acc=(this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length);
            this.speechresult=[];this.recorditem='';
        },
        endcontent(){
            recognition.abort();
            if (this.speechresult[this.speechresult.length-1]==undefined){
                alert("Did not detect your voice, please record again");
                return}
            this.content = this.speechresult[this.speechresult.length-1];
            this.con_acc=(this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length);
            this.speechresult=[];this.recorditem='';},
        submit(){
            const vm=this;
            this.$info.annotation = vm.drawlist;
            vm.tosurvey();
            
        }
    },
}
    

</script>