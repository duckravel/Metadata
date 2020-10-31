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
            <!-- <button class="btn btn-sm btn-outline-light" @click='cancel'>Discard</button> -->
            <button class="btn btn-sm btn-outline-warning" @click='submit'>Submit</button>
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
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = SpeechRecognition? new SpeechRecognition() : false
recognition.lang = 'en-US';
recognition.continuous=true;
recognition.interimResults=true;
export default {
    name:'SoundAnnotation',
    data(){return {contenttimelist:[],patterntimelist:[],currentpage:0,annotationdata:source.annotationdata,annotype:'',patternlist:pattern.pattern,templist:'',drawlist:[[],[],[],[],[]],isAdd:true,itemid:-1,showmodal:false,content:'',pattern:'',isSubmit:false,
    pat_acc:0,con_acc:0,confidence:0,recorditem:'',totext:'',speechcontent:'',speechresult:[],isRecord:false,patternmic:false,contentmic:false,}},
    components:{annoComponent,rowData,rowDisplay},
    methods:{
        ano_pageChange(dir){
            if (dir=='next'){++this.currentpage;}
            else{--this.currentpage;}
        },
        time_cal(t1,t2){
            let second = t2.getSeconds()-t1.getSeconds();
            let min= t2.getMinutes()-t1.getMinutes();
            let hour = t2.getHours()-t1.getHours();
            let day = t2.getDay()-t1.getDay();
            let time = (day*24*60*60)+(hour*60*60)+(min*60)+second;
            return time},
        modal(result){
            const vm=this; vm.isAdd=result.isNew;
            if (result.isNew){
                this.templist = result.data;
                vm.templist.annotime = vm.time_cal(result.annotime[0],result.annotime[result.annotime.length-1]);}
            else{
                vm.content=result.content;
                vm.pattern=result.pattern;
                vm.itemid=result.index;
                result={open:true,isNew:true,data:vm.templist[vm.templist.length-1]};
            }
            this.showmodal=result.open;
        },
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
        keycompare(item){
            let newindex=-1; const vm=this;
            vm.drawlist[vm.currentpage].forEach((ele,key)=>{
                if(ele.id===item.id){newindex=key;}
            });
            return newindex;
            },
        selected(result){
            const vm=this;
            let newindex =  this.keycompare(result.data);
            if (result.selected){
            let stroke='#2e2d2c',fill='#e8e815',strokeWidth=5;
            switch(vm.drawlist[vm.currentpage][newindex].annotype){
                case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
                case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
                case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};
            }}
            else{
                let stroke='#ff0000',fill='#821717',strokeWidth=5;
                switch(vm.drawlist[vm.currentpage][newindex].annotype){
                    case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
                    case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
                    case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};}
        }},
        rm(item){
            const vm=this;
            let newindex =  this.keycompare(item);
            vm.drawlist[vm.currentpage].splice(newindex,1);
        },
        save(){
            const vm=this;let patterntime=0; let contenttime=0;
            if (vm.isRecord){alert('Please stop your recording')};
            if (vm.patterntimelist.length>0){patterntime=vm.patterntimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if (vm.contenttimelist.length>0){contenttime=vm.contenttimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
            if(vm.isAdd)
            {vm.templist.content=vm.content;vm.templist.con_acc=vm.con_acc;vm.templist.pattern=vm.pattern;vm.templist.pat_acc=vm.pat_acc;
            vm.templist.type='speech';
            vm.templist.page_id=parseInt(vm.currentpage)+1;
            vm.templist.materialLink=vm.annotationdata[vm.currentpage];
            vm.templist.contenttime=contenttime;vm.templist.patterntime=patterntime;
            vm.drawlist[vm.currentpage].push(vm.templist)}
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
        },
        close(){const vm=this; vm.showmodal=false; vm.confidence=0;vm.con_acc=0;vm.pat_acc=0;vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;},
        cancel(){
            $('#alertModal').modal('show');
            this.isSubmit=false;
        },
        recordcontrol(action){
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
                    recognition.stop();
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
        },
        record(){
            recognition.start();
            recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
                let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
                this.confidence=temp_con;  this.speechresult.push(text);
                });
        },
        recordcontent(){
            recognition.start();
            recognition.addEventListener('result', event => {
            const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
            let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
            this.confidence=temp_con;
            this.speechcontent = `${text}.`; this.speechresult.push(text);});
        },
        endrecordpattern(){
            recognition.abort(); let isMatch;
            let word=(this.speechresult[this.speechresult.length-1]);
            if (word==undefined){
                alert("Did not detect your voice, please record again");
                return
            }else{word = word[0].toUpperCase() + word.substring(1);
            isMatch = this.patternlist.some(ele=>ele==word);}
            if(!isMatch){alert(` We detect the word '${word}', and it doesn't match any of pattern`);
            return}else{this.pattern= word; this.pat_acc=(this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length)}
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
            //save last element sets;
            const vm=this;
            if (!this.$case.isFin){
                this.$info.annotation = vm.drawlist;
                // console.log(this.$info);
                this.$case.isFin=true;
                vm.$router.push(`/${this.$secCase}`)
            }
            else{
                this.$info.annotation = vm.drawlist;
                console.log(this.$info);
                let data = this.$info;
                this.$http.post('http://localhost:3000/restful/data',data).then(res=>{console.log(res)});
            }
        },
    },        
    created(){
        console.log(this.$case.isFin);
    }
}
    

</script>