<template>
    <div>
     <section id='task_element creation' class="p-1">
         <h5>Task-Element Creation</h5>
         <div class="row">
             <div class="col-md-7">
                 <img style="width:100%" src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/mapcollections/Instruction3.png" alt="">
             </div>
             <div class="col-md-5">
                 <ul class="p-0">
                     <ol class="p-0"><h5><span class="badge badge-secondary">1</span> <span class="h6">Observe geovisualization in the map</span></h5></ol>
                     <ol class="p-0"><h5><span class="badge badge-secondary">2</span> <span class="h6">Create contents for each element</span></h5></ol> 
                 </ul>
             </div>
         </div>
     </section>
          <section id='task_annotation creation' class="p-1">
         <h5>Task-Annotation Creation</h5>
         <div class="row">
            <div class="col-md-7">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/mapcollections/Instruction1.png" alt="First slide">
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="https://raw.githubusercontent.com/duckravel/Metadata/main/src/data/mapcollections/Instruction2.png" alt="Second slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon text-secondary" aria-hidden="true">
                        <font-awesome-icon icon="chevron-circle-left" size="2x"/>
                    </span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon text-secondary" aria-hidden="true">
                        <font-awesome-icon icon="chevron-circle-right" size="2x"/>
                    </span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
            </div>
            <div class="col-md-5">
                <ul class="p-0">
                    <ol class="p-0"><h5><span class="badge badge-secondary">1</span> <span class="h6">Observe geovisualization in the map</span></h5></ol>
                    <ol class="p-0"><h5><span class="badge badge-secondary">2</span> <span class="h6">Use drawing tools to annotate the pattern you observe</span></h5></ol> 
                    <ol class="p-0"><h5><span class="badge badge-secondary">3</span> <span class="h6">Select the pattern</span></h5>
                    <ul>
                        <li class="m-1">Cluster: Group of items</li>
                        <li class="m-1">Outlier: Any data item that differs significantly from other observations</li>
                        <li class="m-1">Correlation: Relationship between some data dimensions</li>
                        <li class="m-1">Trend: The data distribution has a general tendency</li>
                        <li class="m-1">Frequency: Some data elements appear number of times</li>
                        <li class="m-1">Distribution: Items on may spread out with a specific manner.</li>
                        <li class="m-1">Observation: Does't belong to any category, but worth recording that stands out to you personally</li>
                    </ul>
                    </ol> 
                    <ol class="p-0"><h5><span class="badge badge-secondary">4</span> <span class="h6">Give more details of the pattern</span></h5></ol> 
                </ul>
            </div>
         </div>
     </section>

    </div>
</template>
<script>
export default {
    name:'help',
}
</script>
<style scoped>
.carousel-control-next-icon{
   color:black; 
}
</style>