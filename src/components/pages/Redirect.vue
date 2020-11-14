<template>
<div>   
  <div id='landing page'>
        <div class='homebg d-flex justify-content-center align-items-center row'>
                <div class="col-lg-8 p-5 bg-light">
                    <p class="mb-5 align-middle">
                      Thank you for your time and contribution to our study. To make a better experience for future use, please help us in satisfaction survey.</p>   
                    <div class="d-flex justify-content-around">
                      <p> Your userid for survey is {{$userid}}</p>
                    </div>
                      
                    <div class='row justify-content-around d-flex'>
                        <a class="col-5 p-4 d-flex bg-primary align-items-center justify-content-center text-white"
                        href='https://docs.google.com/forms/d/e/1FAIpQLSfThDTyYrZXl_RdEpBwBzoxJozEbsPD0ek6jjMRINCaeSSSGQ/viewform'>5 mins questionnaire</a>
                    </div>
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

</style>