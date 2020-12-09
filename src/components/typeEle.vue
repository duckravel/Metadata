<template>
    <div>
        <div  v-for='(element,index) in data' :key='index'> 
            <div v-if ='index==page'>
        <div class='row w-100'> 
            <div class="col-md-4 bg-white mt-2 border-right">
                <form action="" class="p-2">
                    <div class="form-group">
                        <label for="">Placename </label>
                        <input v-model='element.place'  type="text" class="form-control" id='Place' autocomplete="off" @focus="time_in('place')" @blur="time_out('place')" required>
                    </div>
                    <div class="form-group">
                        <label for="">Alternative placename</label>
                        <input v-model='element.Altername' type="text" class="form-control" id='Altername' autocomplete="off" @focus="time_in('Altername')" @blur="time_out('Altername')">
                    </div>
                    <div class="form-group">
                        <label for="">Topic</label>
                        <input v-model='element.Category' type="text" class="form-control" id='Category' autocomplete="off" @focus="time_in('Category')" @blur="time_out('Category')">
                    </div>
                    <div class="form-group">
                        <label for="">Description</label>
                        <input v-model='element.Description' type="text" class="form-control" id='Description' autocomplete="off" @focus="time_in('Description')" @blur="time_out('Description')">
                    </div>
                    <div class="form-group">
                            <label for="StartTime" >Start time</label>
                            <input v-model='element.StartTime' type="date" class="form-control " id='StartTime' @focus="time_in('StartTime')" @blur="time_out('StartTime')"
                            :disabled="stime[page]">
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id='Stime_unknown' v-model='stime[page]' @focus="time_in('StartTime')" @blur="time_out('StartTime')">
                                <label class="form-check-label" for="Stime_unknown">Unknown</label>                                
                            </div>
                    </div>
                    <div class="form-group">
                        <label for="" >End time</label>
                        <input v-model='element.EndTime' type="date" class="form-control" id='EndTime' @focus="time_in('EndTime')" @blur="time_out('EndTime')"
                        :disabled="etime[page]">
                        <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id='Etime_unknown' v-model='etime[page]' @focus="time_in('EndTime')" @blur="time_out('EndTime')">
                                <label class="form-check-label" for="Etime_unknown">Unknown</label>                                
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-8 no-gutters p-0">
                <iframe class="w-100 h-100" :src="link(element)"
                frameborder="0"
                ></iframe>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'typeEle',
    props:['element','data','page','stime','etime'],
    data:function(){
            return {inputs:'',inpute:'',place_time:0,alter_time:0,Cate_time:0,Cate_acc:0,Desc_time:0,Stime:0,Etime:0,pages:10,currentpage:0}
        },
        methods:{
            time_in(event){
                this.inputs=new Date();
            },
            time_out(event){      
                const vm = this;      
                vm.inpute=new Date();
                let timeresult=vm.time_esteimator(vm.inputs,vm.inpute,event);
                this.$emit('timelistener',timeresult);
            },
            time_esteimator(t1,t2,event){
                const vm=this;
                let time=0;            
                let second = t2.getSeconds()-t1.getSeconds();
                let min= t2.getMinutes()-t1.getMinutes();
                let hour = t2.getHours()-t1.getHours();
                let day = t2.getDay()-t1.getDay();
                time = (day*24*60*60)+(hour*60*60)+(min*60)+second;
                return [time,event]

            },
            link(element){return `${element.materialLink}`}
        },
}
</script>