<template>
<div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">Microphone Test
        </a>           
        <ul class="navbar m-0">
            <li class="list-unstyled"><span class="text-white mr-3">UserID:{{$userid}}</span></li>
        </ul>
    </nav>
  <div id='landing page'>
    <div class='homebg d-flex justify-content-center align-items-center '>
      <div class="col-md-8 bg-light custombg">
        <!-- microphone -->
        <div class="d-flex justify-content-center mic">
          <a href="#" class="btn btn-primary circle-icon d-flex align-items-center justify-content-center" :class="{'circle-icon-record':isRecord}"
          @click.prevent="recordcontrol()"> <font-awesome-icon icon="microphone-alt" size="2x"  /></a>
        </div>
          <h5 class="text-center my-3">Click button and speak </h5>
          <p class="my-2 text-black-50 text-center">{{transcript}}</p>
        
        <!-- Pass mic test -->
        <div v-if='showMic' class="mt-5 ">
          <div class='row justify-content-around d-flex' v-if="Micok">
              <a class="col-5 p-4 d-flex bg-primary align-items-center justify-content-center text-white"
              href='#' @click.prevent='startSurvey()'>Ready to Go ! Entet the Survey</a>
          </div>
          <div v-else> <p class="alert text-center"> Can't detect your voice clearly, <br> please check your microphone and record again</p></div>
        </div>
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
export default {name: 'Welcome',
data:function(){return {Micok:false,showMic:false,transcript:'',isRecord:false,confidence:0,}},
  methods:{
  startSurvey(){
    const vm=this; vm.$router.push(`/${this.$firCase}`)},
  recordcontrol(){
    this.isRecord=!this.isRecord;
    
    if (this.isRecord){
      this.showMic=false; 
      recognition.start();
      recognition.addEventListener('result', event => {
        const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
        let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
        this.confidence=temp_con; 
        this.transcript = `${text}.`;
        console.log(this.transcript);
      });
    }
    else{
      recognition.abort();
      console.log('stop');
      this.showMic=true; 
      let acc = this.confidence[this.confidence.length-1];
      if (acc>0.8){this.Micok=true} else{ this.Micok=false;};
    }
  }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mic {margin-top:25%}
.custombg{height: 100vh;}
.circle-icon {
    background:#007bff;
    width: 75px;
    height: 75px;
    border-radius: 50%;
}
.circle-icon-record{
background:#dc3545;
}
.circle-icon:hover{
background:#0274ee;
}
.alert{
  color: #721c24;
  background-color: #f8d7da;
}

</style>
