<template>
<div>   
  <!-- <nav class="navbar navbar-expand-lg border-bottom d-flex justify-content-center" style='background-color: rgba(255, 255, 255, 0.863);' id='menu'>
        <div class='h2'>Speech Based Metadata Creation</div>
  </nav> -->
  <div id='landing page'>
    <div class='homebg d-flex justify-content-center align-items-center'>
      <div class="col-md-8 p-5 bg-light col-6">
        <p class="mb-5 align-middle">
          Welcome to the speech-base metadata creation experiment. In order to improve the user satisfication in metadata creation, we integrate the speech recognition into the process.
          Through this experiment, we will have better understanding toward the use of speech recognition in this domain. 
          Before the experiment, we ask you to prepare a microphone which can clearly recieve your voice and do the testing below to ensure the audio can be delivered completely.    
        </p>
        <div class="card m-2">
          <h5 class="card-header">Please click mic and speak a full sentence</h5>
          <div class="card-body">
              <p  class="card-text" >{{transcript}}</p>
              <div class="text-right">
                <a href="#" class="btn btn-primary rounded-circle" :class="{'btn-danger':isRecord}"
                @click.prevent="recordcontrol()"><font-awesome-icon icon="microphone-alt"/></a></div>
          </div>
        </div>
        <div v-if='showMic'>
          <div class='row justify-content-around d-flex' v-if="Micok">
              <a class="col-5 p-4 mt-3 d-flex bg-primary align-items-center justify-content-center text-white"
              href='#' @click.prevent='startSurvey()'>Ready to Go ! Entet the Survey</a>
          </div>
          <div v-else><p class="text-danger">We can't detect your voice clearly, please record again or check your device</p></div>
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
    console.log(this.isRecord);
    if (this.isRecord){
      this.showMic=false; 
      recognition.start();
      recognition.addEventListener('result', event => {
        const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
        let temp_con = Array.from(event.results).map(result=>result[0]).map(result=>result.confidence);
        this.confidence=temp_con; 
        this.transcript = `${text}.`;
      });
    }
    else{
      recognition.abort();
      this.showMic=true; 
      let acc = this.confidence.reduce((a,b)=>{return a+b})/this.confidence.length;
      if (acc>0.8){this.Micok=true} else{ this.Micok=false};
    }
  }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
