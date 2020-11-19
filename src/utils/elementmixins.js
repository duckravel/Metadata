export default {
    methods: {
        checkelement(place,Altername,Category,StartTime,EndTime,Description){
            //using length to check if each element is filled
            let list = [place,Altername,Category,StartTime,EndTime,Description];  
            return list.every(ele=>ele.length>0);
            },
        pageChange(dir,type){
            //pageChange contains three seperate works: check data, store data, and change
            const vm=this;
            let element=vm.sourcedata[vm.currentpage];
            if (dir=='next'){
                let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
                if (check==false){
                    alert('Please fill the empty field');
                    return
                };
                vm.storeelement(vm.currentpage,type);
                ++vm.currentpage;}
            else {vm.storeelement(vm.currentpage,type);
                    --vm.currentpage;
                    }
        },
        storeelement(page,type){
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
            //clear the time variables for the next calculation
            vm.place_time=0;vm.alter_time=0;vm.Cate_time=0;vm.Desc_time=0;vm.Stime=0;vm.Etime=0;
            },
    },
}