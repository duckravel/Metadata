import $ from 'jquery';
export default {    
    methods: {
        ano_pageChange(dir){
            if (dir=='next'){++this.currentpage;}
            else{--this.currentpage;}
        },
        surveyModal(dir){
            const vm =this;
            vm.dir=dir;
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
                this.$info.annotation = vm.drawlist;
                vm.saveload(vm.congnition);
                if (vm.currentpage < 4){
                vm.ano_pageChange(vm.dir);}
                else{
                    vm.congnition={'1':0,'2':0,'3':0,'4':0,'5':0,type:'',userID:'',order:0};
                    vm.tosurvey();
                }
            }
        },
        keycompare(item){
            let newindex=-1; const vm=this;
            vm.drawlist[vm.currentpage].forEach((ele,key)=>{
                if(ele.id===item.id){newindex=key;}
            });
            return newindex;
            },
        selected(result){
            const vm=this;
            let newindex =  this.keycompare(result.data);
            if (result.selected){
            let stroke='#2e2d2c',fill='#e8e815',strokeWidth=5;
            switch(vm.drawlist[vm.currentpage][newindex].annotype){
                case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
                case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
                case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};
            }}
            else{
                let stroke='#ff0000',fill='#821717',strokeWidth=5;
                switch(vm.drawlist[vm.currentpage][newindex].annotype){
                    case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
                    case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
                    case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};}
        }},
        rm(item){
            const vm=this;
            let newindex =  this.keycompare(item);
            vm.drawlist[vm.currentpage].splice(newindex,1);
        },
        modal(result){
            const vm=this; vm.isAdd=result.isNew;
            if (result.isNew){
                vm.templist = result.data;
                vm.templist.annotime = vm.time_cal(result.annotime[0],result.annotime[result.annotime.length-1]);}
            else{
                vm.content=result.content;
                vm.pattern=result.pattern;
                vm.itemid=result.index;
            }
            this.showmodal=result.open;
        },
        close(){const vm=this; vm.showmodal=false; vm.confidence=0;vm.con_acc=0;vm.pat_acc=0;vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;}
    }
}