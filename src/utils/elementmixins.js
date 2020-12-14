import $ from 'jquery';
export default {
    methods: {
        checkelement(place,Altername,Category,Description){
            //using length to check if each element is filled
            let list = [place,Altername,Category,Description];  
            return list.every(ele=>ele.length>0);
            },
        timeprocess(){
            const vm =this;
            for (let i=0; i<vm.Elist.length; i++){
                if (vm.Elist[i]==true){vm.sourcedata[i].EndTime='';}}
            for (let i=0; i<vm.Slist.length; i++){
                if (vm.Slist[i]==true){vm.sourcedata[i].StartTime='';}}
            
        }
        ,next(dir,type){
                //pageChange contains three seperate works: store data, check data, add survey, and change page
                const vm=this;
                vm.storeelement(vm.currentpage,type); 
                let element=vm.sourcedata[vm.currentpage];
                let check = vm.checkelement(element.place,element.Altername,element.Category,element.Description);
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
                vm.load=0; 
                    if (vm.currentpage< 4){vm.pageChange();}
                    else{
                        this.$info.element = vm.sourcedata;
                        vm.saveload(vm.congnition);
                        vm.congnition={'1':0,'2':0,'3':0,'4':0,'5':0,type:'',userID:'',order:0};
                        vm.timeprocess();
                        // console.log(vm.sourcedata);
                        vm.eleMeta();
                        vm.tosurvey();  
                    }
                }   
        },
        resetelement(){
            const vm=this;
            vm.place_time=0;vm.alter_time=0;vm.Cate_time=0;vm.Desc_time=0;vm.Stime=0;vm.Etime=0,vm.loading=0;
            vm.place_slip=0;vm.alter_slip=0;vm.Cate_slip=0,vm.Desc_slip=0,vm.S_slip=0,vm.E_slip=0;
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
            vm.sourcedata[page].place_slip += vm.place_slip;
            vm.sourcedata[page].alter_slip +=vm.alter_slip;
            vm.sourcedata[page].Cate_slip +=vm.Cate_slip;
            vm.sourcedata[page].Desc_slip += vm.Desc_slip;
            vm.sourcedata[page].S_slip += vm.S_slip;
            vm.sourcedata[page].E_slip += vm.E_slip;
        },
        eleMeta(){
        let page=0;
        const vm=this;
        vm.sourcedata.forEach(item => {
        let ele ={
                "@context": "https://schema.org",
                "@type": "Map",
                "spatialCoverage":item.place,
                "alternateName":item.Altername,
                "keywords":item.Category,
                "description":item.Description,
                "temporalCoverage":`${item.StartTime}/${item.EndTime}`};
            page+=1;
            let data = `ele_${page}`;
            this.$info.meta[data] = JSON.stringify(ele);
        });
        }
    },
}