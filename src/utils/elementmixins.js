import { Modal } from "bootstrap";
import $ from 'jquery';
export default {
    methods: {
        checkelement(place,Altername,Category,StartTime,EndTime,Description){
            //using length to check if each element is filled
            let list = [place,Altername,Category,StartTime,EndTime,Description];  
            return list.every(ele=>ele.length>0);
            },
        next(dir,type){
                //pageChange contains three seperate works: store data, check data, add survey, and change page
                const vm=this;
                let element=vm.sourcedata[vm.currentpage];
                vm.storeelement(vm.currentpage,type);
                let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
                if (dir=='next' && !check){                    
                        alert('Please fill the empty field');
                        return
                } else {
                    vm.surveyModal();
                    vm.resetelement();
                }
        }
        ,pageChange(dir='next'){
            const vm =this;
            if (dir=='next'){++vm.currentpage;}
            else {--vm.currentpage;}
        },
        surveyModal(){
            const vm =this;
            $('#surveyModal').modal('show');
        },
        saveModal(){
            const vm=this;
            if (vm.load<=0){
                vm.isFilled=true;
                setTimeout(function(){vm.isFilled=false;}, 3000);
            }else{
                vm.congnition[`${vm.currentpage+1}`]=vm.load;
                $('#surveyModal').modal('hide');
                vm.load=0; vm.pageChange();}   
        },
        resetelement(){
            const vm=this;
            vm.place_time=0;vm.alter_time=0;vm.Cate_time=0;vm.Desc_time=0;vm.Stime=0;vm.Etime=0,vm.loading=0;
        }
        ,storeelement(page,type){
            const vm=this;
            vm.sourcedata[page].userid = this.$userid;
            vm.sourcedata[page].type=type;
            vm.sourcedata[page].page_id = parseInt(page)+1;
            vm.sourcedata[page].place_time+=vm.place_time;
            vm.sourcedata[page].alter_time+=vm.alter_time;
            vm.sourcedata[page].Cate_time+=vm.Cate_time;
            vm.sourcedata[page].Desc_time+=vm.Desc_time;
            vm.sourcedata[page].Stime+=vm.Stime;
            vm.sourcedata[page].Etime+=vm.Etime;
            },
    },
}