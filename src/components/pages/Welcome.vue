<template>
<div>
  
    <nav class="navbar navbar-dark bg-dark p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">Welcome to metadata creation experiment
      </a>           
       <ul class="navbar m-0">
            <li class="nav-item list-unstyled text-nowrap">
                <button class="btn btn-sm btn-outline-warning" @click='startSurvey'>Next</button>
            </li>
        </ul>
    </nav>
    <div class="d-flex flex-column custombg">
    <div class="container row my-5 justify-content-center">
      <div class="col-11">
        <h4>Introduction</h4>
        <p class="mb-3">Welcome to metadata creation experiment, this is a research project involving 3 European universities: NOVA IMS (Lisbon Portugal), UJI (Castellon, Spain), 
          and WWU (Muenster, Germany). Geospatial metadata is essential for data discoverability, and the experiment tries to understand the preferences of users in the metadata creation. The whole survey takes 40 minutes on average to complete, and your contribution will be crucial for future actions related to the topic.</p>
        <h4>Procedure</h4>
        <p class="mb-3">Before the experiment, we will conduct a background survey. During the experiment, you will take 2 tasks. The element creation task will ask you to contribute the metadata element (such as the location, alternate name, category of the maps). For annotation task, you will be asked to read maps and make annotation based on what you observe from the map. You will contribute your information through typing or speaking. After the experiment, we will have a short user interview.
        </p>   
        <help></help>
        <h4>Consent</h4>
        <p class="mb-3">I have understood during the experiment, some of my personal data will be collected (education, age, gender, nationality, email) and operation data will be recorded as a video for the observational use, and have had any questions answered satisfactorily, and I willingly consent to participate in this study. I understand that if I should have any questions about my rights as a research subject, I can contact the experiment designer Pei-Chun Lai by her email (al396421@uji.es)</p>
        <p class="mb-3">If you volunteer to participate the experiment, please share your screen and we will start the video recording.</p>
      </div>
    </div>
    <footer class="border-top mt-auto ">
      
      <div class="container d-flex justify-content-center align-items-center">
        
        <div class="col-10 d-flex justify-content-between align-items-center">
          <div class="mt-2 text-secondary footersize" > <b>Partners:</b> 
          <ul>
            <li>Westfälische Wilhelms-Universität Münster (WWU)</li>
            <li>Universitat Jaume I (UJI)</li>
            <li>Universidade Nova de Lisboa (UNL)</li>
          </ul>
        </div>
        <img src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/WWU.png" alt="wwu" class="custom_img">
        <img src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/uji.png" alt="uji" class="custom_img2">
        <img src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/nova.png" alt="nova" class="custom_img2">
        </div>
      </div>
    </footer>
  </div>
 
</div>
</template>

<script>
import help from './help';
export default {
components:{help},
methods:{
  startSurvey(){
    const vm=this; vm.$router.push('/mictest');
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custombg{
  height: calc(100vh - 40px);
}
.custom_img{
  height: 50px;
  padding: 0px;
  margin: 0px;
}
.custom_img2{
  height: 100px;
  padding: 0px;
  margin: 0px;

}
.footersize{
  font-size: 10px;
}

</style>
