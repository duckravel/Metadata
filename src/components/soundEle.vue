<template>
<div>
<div v-for='(element,pageid) in data' :key='pageid'>
<div class='row mb-2' id='soundheight' v-if='pageid==page'>
    <div class='col-lg-4 bg-white border-right' id='data'>
        <div class="card m-2">
            <h5 class="card-header">Place</h5>
            <div class="card-body">
                <p  class="card-text" v-if="place">{{element.place}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle"  :class="{'btn-primary':place,'btn-danger':place==false}" 
                 @click.prevent="recordcontrol('place',pageid);">
                <font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">place Alias</h5>
            <div class="card-body">
                <p class="card-text" v-if="Altername">{{element.Altername}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn rounded-circle"  :class="{'btn-primary':Altername,'btn-danger':Altername==false}" 
                @click.prevent="recordcontrol('Altername',pageid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Category </h5>
            <div class="card-body">
                <p  class="card-text" v-if="Category">{{element.Category}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':Category,'btn-danger':Category==false}"
                @click.prevent="recordcontrol('Category',pageid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Description </h5>
            <div class="card-body">
                <p  class="card-text" v-if="Description">{{element.Description}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                    <a href="#" class="btn btn-primary rounded-circle" 
                    :class="{'btn-primary':Description,'btn-danger':Description==false}"
                    @click.prevent="recordcontrol('Description',pageid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Starttime</h5>
            <div class="card-body">
                <p  class="card-text" v-if="StartTime">{{element.StartTime}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':StartTime,'btn-danger':StartTime==false}"
                @click.prevent="recordcontrol('StartTime',pageid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">EndTime</h5>
            <div class="card-body">
                <p  class="card-text" v-if="EndTime">{{element.EndTime}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':EndTime,'btn-danger':EndTime==false}"
                @click.prevent="recordcontrol('EndTime',pageid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
    </div>               
    <div class="col-lg-8 no-gutters p-0">
        <iframe class="w-100 h-100" frameborder="0" :src="link(element)"></iframe>
    </div>
</div>
</div>
</div>
</template>
<script>
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = SpeechRecognition? new SpeechRecognition() : false
recognition.lang = 'en-US';
recognition.continuous=true;
recognition.interimResults=true;
export default {
    name: 'soundElement',
    props:['data','page'],//'element','pageid'
    // extends:typeelement,
    data() {return {
            totext:'',speechresult:[],isRecord:false,timelist:[],confidence:0,
            recorditem:'',place:true,Altername:true,Category:true,Description:true,EndTime:true,StartTime:true}
        },
    methods: {
        recordcontrol(ele,pageid){const vm=this;
            if(!vm.isRecord){
                vm.isRecord=true;
                switch (ele){
                    case 'place':{vm.timelist.push(new Date());vm.record(ele);break;}
                    case 'Altername':{vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'Category':{vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'Description':{vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'StartTime':{vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'EndTime':{vm.timelist.push(new Date());vm.record(ele);break;} 
                }
                vm.recorditem=ele;
            }else
            {   vm.isRecord=false;
                if (vm.recorditem!=ele){
                    recognition.abort();
                    vm[vm.recorditem]=true;
                    vm.speechresult=[];vm.totext='';vm.recorditem='';
                    alert("Recording different items at the same time is not allowed");
                    return
                }else{
                switch (ele){
                    case 'place':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                    case 'Altername':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                    case 'Category':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                    case 'Description':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                    case 'StartTime':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                    case 'EndTime':{vm.timelist.push(new Date());vm.endrecord(ele,pageid);break;}
                }}
            }
        },
        record(ele,id){
            const vm=this;
            recognition.start();
            recognition.onstart = function() {vm[ele]=false;};
            recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
                let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
                this.confidence=temp_con;
                this.totext = `${text}.`;
                this.speechresult.push(this.totext);
                });
        },
        endrecord(ele,pageid){
            const vm=this;
            recognition.abort();
            recognition.onend = function() {vm[ele]=true;};
            if (vm.speechresult[vm.speechresult.length-1]==undefined){
                alert("Did not detect your voice, please record again");
                return
            };
            let tempAcc =vm.confidence.reduce((a,b)=>{return a+b})/vm.confidence.length;
            let result = {page:pageid,element:ele,data:vm.speechresult[vm.speechresult.length-1],time:this.timelist,acc:tempAcc};
            vm.speechresult=[];vm.totext='';vm.recorditem='';vm.timelist=[];
            vm.$emit('catchdata',result);
            
            
        },
        link(element){return `${element.materialLink}`},
    },
}
</script>