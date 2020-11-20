<template>
<div>   
  <div id='landing page'>
      <div class="backgroundshadow"></div>
        <div class='homebg d-flex justify-content-center align-items-center row custombg'>
                <div class="col-lg-5 p-5 shadow">
                    <p class="h2 text-white align-middle text-center"><b>THANK YOU</b> </p>
                    <p class="h5 text-white align-middle text-center"><b>for your contribution.</b></p> 
                    <p class="mt-2 text-white align-middle text-center">We will proceed a quick user interview, please share with us your take away from the experiment.</p> 
                </div>
          </div>
          
    </div>
  </div>
</template>

<script>
export default {name: 'reditect'}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .custombg{
  background-image: url(https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg);
  background-repeat: no-repeat;
  background-size: cover;
 }
 .shadow{
   background-color: rgba(0, 0, 0, 0.63);
 }
 .backgroundshadow{
   background-color: rgba(0, 0, 0, 0.37);
   position: absolute;
    left: 0;
    top:0;
    height: 95vh;
    width: 100vw;
}

</style>