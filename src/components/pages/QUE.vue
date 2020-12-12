<template>
    <div>
        <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">User Experience Survey</a>
            <ul class="navbar m-0 px-3">
            <li class="list-unstyled"><span class="text-white mr-3">UserID:{{$userid}}</span></li>
            <li v-if='!this.$case.isFin' class="list-unstyled"><button class="btn btn-sm btn-outline-warning "  @click.prevent='submit'>Next</button></li>
            <li v-else class="list-unstyled"><button class="btn btn-sm btn-outline-warning "  @click.prevent='submit'>Submit</button></li>
            </ul>
            
            
        </nav>
    <div class="row d-flex justify-content-center m-4">
        <div class="col-lg-8" >
        <h5 class="text-center"> Share your feedback on  <span class="text-primary">{{task}} </span> metadata creation</h5>
        </div>
    </div>
    <!-- Questionnaire -->
    <div class="row d-flex justify-content-center mx-2 my-4">
        <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"> <span class="text-danger">*</span> Obstructive</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.support' :name="`radio${item}`" :id="`radio${item}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Supportive</div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Complicated </div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.easy' :name="`radio${item+7}`" :id="`radio${item+7}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+7}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Easy</div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Inefficient</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item+14'>
                        <input class="form-check-input" type="radio" v-model='Que.efficient' :name="`radio${item+14}`" :id="`radio${item+14}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+14}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Efficient </div>
            </div>
        </div>
            <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Confusing</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item+21'>
                        <input class="form-check-input" type="radio" v-model='Que.clear' :name="`radio${item+21}`" :id="`radio${item+21}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+21}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Clear </div>
            </div>
        </div>
            <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Boring</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.exciting' :name="`radio${item+28}`" :id="`radio${item+28}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+28}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Exciting</div>
            </div>
        </div>
            <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Not interesting</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.interesting' :name="`radio${item+35}`" :id="`radio${item+35}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+35}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Interesting</div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Conventional </div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.conventional' :name="`radio${item+42}`" :id="`radio${item+42}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+42}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Inventive  </div>
            </div>
        </div>
                <div class="col-lg-8">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Usual</div>
                <div class="col-6 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='Que.usual' :name="`radio${item+49}`" :id="`radio${item+49}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item+49}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-3 text-left">Leading edge </div>
            </div>
        </div>
    </div>

    <!-- submission window -->
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="ml-auto m-2">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="container text-center">
                <p class="text-success"> <font-awesome-icon :icon="['far','check-circle']"/></p>
                <p class='h4 mb-3'> Thanks for your contribution</p>
                <p class="text-black-50">We are processing your data...</p>
                <div class="d-flex justify-content-center"><div class="loader"></div></div>
            </div>
        </div>
      </div>
    </div>
  </div>
    </div>    
</template>
<script>
import commonmixin from '../../utils/commonmixins.js';
import $ from 'jquery';
export default {
    data(){return {task:'',Que:{type:'',order:0,userID:'',support:0,easy:0,efficient:0,clear:0,exciting:0,interesting:0,conventional:0,usual:0}
    }},
    mixins:[commonmixin],
    methods: {
        submit(){
            //store value => check value => nextact (next task or submit)
            const vm=this;
            vm.storeQue();
            if (!vm.check()){
                alert('Please fill the empty field');
                return
            }
            vm.toNextAct();
        },
        check(){
            const vm = this;
            //Que to array and take off type/userID
            let queValue = Object.values(vm.Que).slice(2);
            //Lenght of all value greater than 1 => all fields filled => return true
            return queValue.every(function(ele){return ele>0})
        },
        case(){
            let result = '';
            if(!this.$case.isFin){
                result = this.$firCase.split('_');
            }else{
                result = this.$secCase.split('_');
            }
            return result
        }
        ,storeQue(){
            const vm=this;
            vm.Que.userID = this.$userid;
            let result = vm.case();
            if(!this.$case.isFin){
                vm.Que.type = result[0];
                vm.Que.order=1;
                this.$info.queFir = vm.Que;
            }else{
                vm.Que.type = result[0];
                vm.Que.order=2;
                this.$info.queSec = vm.Que;
            }

        },
        reset(){
            const vm=this;
            vm.Que={type:'',userID:'',support:0,easy:0,efficient:0,clear:0,exciting:0,interesting:0,conventional:0,usual:0};

        },
        uitimelog(){
            const vm=this;
            this.$info.user.s1Time = vm.time_cal(this.$timelog[0],this.$timelog[1]);
            this.$info.user.s2Time = vm.time_cal(this.$timelog[2],this.$timelog[3]);
        },
        toNextAct(){
            const vm=this;
            //clean the data 
            //console.log(this.$timelog);
            vm.reset();
            if (!this.$case.isFin){
                this.$case.isFin=true;
                vm.$router.push(`/${this.$secCase}`)
            }
            else{
                //calcuate the time;
                vm.uitimelog();
                let data = this.$info;
                console.log(data);
                $('#alertModal').modal('show');
                this.$http.post(process.env.APIDATA,data).then(
                    res=>{ 
                    setTimeout(function(){ $('#alertModal').modal('hide');}, 1000);
                    setTimeout(function(){ vm.$router.push('/redirect') }, 2000);});
            }
            
        },
        toUpper(word,num){
            return word.charAt(num).toUpperCase()+word.slice(1);
        }
    },
    created(){
        const vm = this;
        let result = vm.case();
        //the name of task
        vm.task = `${vm.toUpper(result[0],0)} ${vm.toUpper(result[1],0)}`
        //record the time of study finished
        this.$timelog.push(new Date());
        vm.time_cal(this.$timelog[0],this.$timelog[1]);
    }

}
</script>

<style scoped>
    .custom_i{
        width:100%;
        height:100vh;

    }
</style>