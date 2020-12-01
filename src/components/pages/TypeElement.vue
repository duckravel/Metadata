<template>
    <div>
        <div id='menu'>
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0 disabled">Map Metadata Element</a>           
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
                <ul class="navbar m-0 px-3">
                    <router-link target="_blank" :to="{path:'/help'}"><li class="list-unstyled"><span class="text-white mr-3">
                    <font-awesome-icon icon="question-circle"/></span></li></router-link>
                  <li class="list-unstyled"><span class="text-white mr-3">UserID:{{$userid}}</span></li>
                  <li class="nav-item text-nowrap list-unstyled">
                    <button  v-if='currentpage==sourcedata.length-1' class="btn btn-sm btn-outline-warning" @click.prevent="next('next','Type')">Next</button>
                  </li>
                </ul>
              </nav>
        </div>
        <div class="contentarea">        
            <typeEle :data='sourcedata' :page='currentpage'
            v-on:timelistener='timeresult'></typeEle></div>
        <!-- modal -->

<!-- Modal -->
    <div class="modal fade" id="surveyModal" tabindex="-1" role="dialog" aria-labelledby="surveyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="surveyModalLabel">This task was:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row align-items-end my-2">
                <div class="col-3  text-center"><span class="text-danger">*</span>Very  Difficult</div>
                <div class="col-7 d-flex justify-content-between">
                    <div class="form-check form-check-inline" v-for="item in 7" :key='item'>
                        <input class="form-check-input" type="radio" v-model='load' :name="`radio${item}`" :id="`radio${item}`" :value='item'>
                        <label class="form-check-label" :for="`radio${item}`">{{item}}</label>
                    </div>
                </div>
                <div class="col-2  text-center">Very Easy</div>
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
    },
}
</script>
