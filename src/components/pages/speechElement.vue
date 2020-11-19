<template>
    <div>
        <div id='menu'>
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled"  href="#">Map Metadata
                    <span class="text-white h6 ml-1">UserID:{{$userid}}</span>    
                    </a>           
                
                <nav class="d-flex justify-content-end">
                    <ul class="pagination mb-0" >                                 
                        <li class="page-item">
                            <a class="page-link" href="#" @click.prevent="pageChange('pre','Speech')" v-if='currentpage!=0'>Pre</a>
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
                            <a class="page-link" href="#" @click.prevent="pageChange('next','Speech')" v-if='currentpage!=sourcedata.length-1'>Next</a>
                        </li>
                    </ul>
                  </nav>
                <ul class="navbar-nav px-3">
                  <li class="nav-item text-nowrap">
                    <button  class="btn btn-sm btn-outline-warning" @click='submit'>Submit</button>
                    <!-- v-if='currentpage==sourcedata.length-1' -->
                  </li>
                </ul>
              </nav>
        </div>
        <div class="contentarea">
        <soundEle v-on:catchdata='store_sounddata' :data="sourcedata" :page='currentpage'
        ></soundEle>
        </div>
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
import soundEle from '../soundEle';
import source from '../../data/source.json'
import commonmixin from '../../utils/commonmixins.js';
import elementmixins from '../../utils/elementmixins.js';
import $ from 'jquery';
export default {
    data(){return {currentpage:0,sourcedata:source.data,place_time:0,alter_time:0,Cate_time:0,Cate_acc:0,Desc_time:0,Stime:0,Etime:0,congnition:{},load:0,isFilled:false}},
    components:{soundEle},
    mixins:[commonmixin,elementmixins],
    methods:{
        store_sounddata(result){
            const vm=this;
            let page=result.page,element=result.element,data=result.data,eletime=vm.time_cal(result.time[0],result.time[1]),tempAcc = result.acc;
            vm.sourcedata[page][element] = data;
            switch(element){
                case 'place':{vm.sourcedata[page].place_time+=eletime; vm.sourcedata[page].place_acc=tempAcc;break;}
                case 'Altername':{vm.sourcedata[page].alter_time+=eletime;vm.sourcedata[page].alter_acc=tempAcc;break;}
                case 'Category':{vm.sourcedata[page].Cate_time+=eletime;vm.sourcedata[page].Cate_acc=tempAcc;break;}
                case 'Description':{vm.sourcedata[page].Desc_time+=eletime;vm.sourcedata[page].Desc_acc=tempAcc;break;}
                case 'StartTime':{ vm.sourcedata[page].Stime+=eletime;vm.sourcedata[page].S_acc=tempAcc;break;}
                case 'EndTime':{vm.sourcedata[page].Etime+=eletime;vm.sourcedata[page].E_acc=tempAcc;break;}
            }
        },
        submit(){
            const vm =this; let element=vm.sourcedata[vm.currentpage]; let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
            if (check==false){
                alert('Please fill the empty field');
                return}
            vm.storeelement(vm.currentpage,'Speech');
            this.$info.element = vm.sourcedata;
            vm.saveload(vm.congnition);vm.congnition={};
            vm.tosurvey();
        },
    },
}
</script>