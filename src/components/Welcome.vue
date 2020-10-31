<template>
<div>   
  <nav class="navbar navbar-expand-lg border-bottom" style='background-color: rgba(255, 255, 255, 0.863);' id='menu'>
        <div class='h2'>Prototype</div>
  </nav>
  <div id='landing page'>
        <div class='homebg d-flex'>
            <div class="row justify-content-center align-items-center">
                <div class="col-md-8 p-5 bg-light col-6">
                    <p class="mb-5 align-middle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos maxime at fugiat ut? Laborum, sunt laboriosam corporis accusantium placeat quia repellat, neque soluta quibusdam natus odio ipsum deleniti. Similique, voluptatibus!</p>   
                    <div class='row justify-content-around d-flex'>
                        <a class="col-5 p-4 d-flex bg-primary align-items-center justify-content-center text-white"
                        href='#' @click.prevent='startSurvey()'>Entet the Survey</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {name: 'Welcome',
  methods:{
  startSurvey(){
    const vm=this; vm.$router.push(`/${this.$firCase}`)}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
