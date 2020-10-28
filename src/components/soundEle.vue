<template>
<div>
<div v-for='(element,itemid) in data' :key='itemid'>
<div class='row mb-2' id='soundheight' v-if='itemid==page'>
    <div class='col-lg-4 bg-white border-right' id='data'>
        <div class="card m-2">
            <h5 class="card-header">Place</h5>
            <div class="card-body">
                <p  class="card-text" v-if="place">{{element.place}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle"  :class="{'btn-primary':place,'btn-danger':place==false}" 
                 @click.prevent="recordcontrol('place',itemid);">
                <font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Place Alais</h5>
            <div class="card-body">
                <p class="card-text" v-if="Altername">{{element.Altername}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn rounded-circle"  :class="{'btn-primary':Altername,'btn-danger':Altername==false}" 
                @click.prevent="recordcontrol('Altername',itemid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Category </h5>
            <div class="card-body">
                <p  class="card-text" v-if="Category">{{element.Category}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':Category,'btn-danger':Category==false}"
                @click.prevent="recordcontrol('Category',itemid);"><font-awesome-icon icon="microphone-alt"/></a></div>
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
                    @click.prevent="recordcontrol('Description',itemid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">Starttime</h5>
            <div class="card-body">
                <p  class="card-text" v-if="StartTime">{{element.StartTime}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':StartTime,'btn-danger':StartTime==false}"
                @click.prevent="recordcontrol('StartTime',itemid);"><font-awesome-icon icon="microphone-alt"/></a></div>
            </div>
        </div>
        <div class="card m-2">
            <h5 class="card-header">EndTime</h5>
            <div class="card-body">
                <p  class="card-text" v-if="EndTime">{{element.EndTime}}</p>
                <p  class="card-text" v-else >{{totext}}</p>
                <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-primary':EndTime,'btn-danger':EndTime==false}"
                @click.prevent="recordcontrol('EndTime',itemid);"><font-awesome-icon icon="microphone-alt"/></a></div>
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
    props:['data','page'],//'element','itemid'
    // extends:typeelement,
    data() {return {
            totext:'',speechresult:[],isRecord:false,timelist:[],
            recorditem:'',place:true,Altername:true,Category:true,Description:true,EndTime:true,StartTime:true}
        },
    methods: {
        recordcontrol(ele,pageid){const vm=this;
            if(this.isRecord==false){
                vm.isRecord=true;
                switch (ele){
                    case 'place':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;}
                    case 'Altername':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'Category':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'Description':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'StartTime':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;} 
                    case 'EndTime':{vm[ele]=false;vm.timelist.push(new Date());vm.record(ele);break;} 
                }
                this.recorditem=ele;
            }else
            {   this.isRecord=false;
                if (this.recorditem!=ele){
                    recognition.stop();
                    this[ele]=true;this[this.recorditem]=true;
                    this.speechresult=[];this.totext='';this.recorditem='';
                    alert(`Recording different items at the same time is not allowed`);
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
            recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
                this.totext = `${text}.`;
                this.speechresult.push(this.totext);
                });
        },
        endrecord(ele,pageid){
            const vm=this;
            recognition.stop();
            this[ele]=true;
            if (this.speechresult[this.speechresult.length-1]==undefined){
                alert("Did not detect your voice, please record again");
                return
            }
            let result = {page:pageid,element:ele,data:this.speechresult[this.speechresult.length-1],time:this.timelist};
            this.$emit('catchdata',result);
            this.speechresult=[];this.totext='';this.recorditem='';this.timelist=[];
            
        },
        link(element){return `${element.materialLink}`},
    },
}
</script>