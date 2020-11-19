<template>
    <div>
        <div id='menu'>
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled"  href="#">Map Metadata
                    <span class="text-white h6 ml-1" v-if='$userid'>UserID:{{$userid}}</span>    
                    </a>           
                
                <nav class="d-flex justify-content-end">
                    <ul class="pagination mb-0" >                                 
                        <li class="page-item">
                            <a class="page-link" href="#" @click.prevent="pageChange" v-if='currentpage!=0'>Pre</a>
                        </li>
                        <li class="page-item" v-for="(page,index) in sourcedata.length" :key='index' :class='{active:currentpage===page-1}'>
                            <span class="custom-link" v-if="page<=2" >{{page}} </span>
                        </li>
                        <span class="custom-link" href="#">...</span>
                        <li class="page-item" v-for="(page,index) in sourcedata.length" :key='index+10' :class='{active:currentpage===page-1}'>
                            <span v-if="page>2 && page<10 && currentpage===page-1" class="custom-link" >{{page}}</span>
                        </li>
                        <li class="page-item" :class='{active:currentpage===sourcedata.length}'>
                          <span class="custom-link">{{sourcedata.length}}</span>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" @click.prevent="next('next','Type')" v-if='currentpage!=sourcedata.length-1'>Next</a>
                        </li>
                    </ul>
                  </nav>
                <ul class="navbar-nav px-3">
                  <li class="nav-item text-nowrap">
                    <button v-if='currentpage==sourcedata.length-1' class="btn btn-sm btn-outline-warning" @click='submit'>Submit</button>
                  </li>
                </ul>
              </nav>
        </div>
        <div class="contentarea">        
            <typeEle :data='sourcedata' :page='currentpage'
            v-on:timelistener='timeresult'></typeEle></div>
        <!-- modal -->
        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#surveyModal">
  Launch demo modal
</button>

<!-- Modal -->
    <div class="modal fade" id="surveyModal" tabindex="-1" role="dialog" aria-labelledby="surveyModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="surveyModalLabel">How difficult is the task?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row align-items-end my-2">
                <div class="col-3 text-right"><span class="text-danger">*</span> Difficult</div>
                <div class="col-7 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='load' :name="`radio${item}`" :id="`radio${item}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-2 text-left">Easy</div>
            </div>
        </div>
        <div class="alert alert-danger mb-0 round-0" v-if='isFilled'>
            Please select a value
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="saveModal">Save changes</button>
        </div>
        </div>
    </div>
    </div> 
    </div>
</template>

<script>
// import Navbar from './Navbar';
import typeEle from '../typeEle';
import source from '../../data/source.json'
import commonmixin from '../../utils/commonmixins.js';
import elementmixins from '../../utils/elementmixins.js';
import $ from 'jquery';
// var sourcedata = source.data
export default {
    name:'TypeElement',
    props:['user'],
    data(){return{currentpage:0,sourcedata:source.data.map(ele=>{return ele}),place_time:0,alter_time:0,Cate_time:0,Cate_acc:0,Desc_time:0,Stime:0,Etime:0,congnition:{},load:0,isFilled:false}},
    components:{typeEle},
    mixins:[commonmixin,elementmixins],
    methods:{
        timeresult(result){
                const vm=this;
                let time=result[0]; let field =result[1];
                switch(field){
                    case 'place':{vm.place_time=time;break;}
                    case 'Altername':{vm.alter_time=time;break;}
                    case 'Category':{vm.Cate_time=time;break;}
                    case 'Description':{vm.Desc_time=time;break;}
                    case 'StartTime':{vm.Stime=time;break;}
                    case 'EndTime':{vm.Etime=time;break;}
                }
            },
        submit(){
            //save last element sets;
            const vm =this;
            let element=vm.sourcedata[vm.currentpage];
            let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
            if (check==false){
                alert('Please fill the empty field');
                return}
            vm.storeelement(vm.currentpage,'Type');
            this.$info.element = vm.sourcedata;
            vm.saveload(vm.congnition);vm.congnition={};
            vm.tosurvey();
        },
    },
}
</script>
