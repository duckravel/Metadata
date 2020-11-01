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
                            <a class="page-link" href="#" @click.prevent="pageChange('pre')" v-if='currentpage!=0'>Pre</a>
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
                            <a class="page-link" href="#" @click.prevent="pageChange('next')" v-if='currentpage!=sourcedata.length-1'>Next</a>
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
        <soundEle v-on:catchdata='store_sounddata' :data="sourcedata" :page='currentpage'
        ></soundEle>
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
import soundEle from '../soundEle';
import source from '../../data/source.json'
import $ from 'jquery';
export default {
    data(){return {currentpage:0,sourcedata:source.data,place_time:0,alter_time:0,Cate_time:0,Cate_acc:0,Desc_time:0,Stime:0,Etime:0}},
    components:{soundEle},
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
        storeelement(page){
            const vm=this;
            vm.sourcedata[page].userid = this.$userid;
            vm.sourcedata[page].type='Speech';
            vm.sourcedata[page].page_id = parseInt(page)+1;
            vm.sourcedata[page].place_time+=vm.place_time;
            vm.sourcedata[page].alter_time+=vm.alter_time;
            vm.sourcedata[page].Cate_time+=vm.Cate_time;
            vm.sourcedata[page].Desc_time+=vm.Desc_time;
            vm.sourcedata[page].Stime+=vm.Stime;
            vm.sourcedata[page].Etime+=vm.Etime;
            //clear the time variables for the next calculation
            vm.place_time=0;vm.alter_time=0;vm.Cate_time=0;vm.Desc_time=0;vm.Stime=0;vm.Etime=0;
            },
        pageChange(dir){
                //pageChange contains three seperate works: check data, store data, and change
            const vm=this;
            let element=vm.sourcedata[vm.currentpage];
            if (dir=='next'){
                let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
                if (check==false){
                    alert('Please fill the empty field');
                    return
                };
                vm.storeelement(vm.currentpage);
                ++vm.currentpage;}
            else {vm.storeelement(vm.currentpage);
                    --vm.currentpage;
                    }
            },
        checkelement(place,Altername,Category,StartTime,EndTime,Description){
            let list = [place,Altername,Category,StartTime,EndTime,Description];  
            return list.every(ele=>ele.length>0);
            },
        time_cal(t1,t2){
            let second = t2.getSeconds()-t1.getSeconds();
            let min= t2.getMinutes()-t1.getMinutes();
            let hour = t2.getHours()-t1.getHours();
            let day = t2.getDay()-t1.getDay();
            let time = (day*24*60*60)+(hour*60*60)+(min*60)+second;
            return time},
        submit(){
            //save last element sets;
            const vm =this;
            let element=vm.sourcedata[vm.currentpage];
            let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
            if (check==false){
                alert('Please fill the empty field');
                return}
            vm.storeelement(vm.currentpage);
            if (!this.$case.isFin){
                this.$info.element = vm.sourcedata;
                console.log(this.$info);
                 this.$case.isFin=true;
                vm.$router.push(`/${this.$secCase}`)
                }
            else{
                this.$info.element = vm.sourcedata;
                $('#alertModal').modal('show');
                this.$http.post('http://localhost:3000/restful/data',this.$info
                ).then(res=>{console.log(res);
                setTimeout(function(){ $('#alertModal').modal('hide');}, 1000);
                setTimeout(function(){ vm.$router.push('/redirect') }, 2000);});
            }
        },
    },
    created(){
        console.log(this.$case.isFin);
    }
}
</script>