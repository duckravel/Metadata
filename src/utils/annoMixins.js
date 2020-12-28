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
                vm.annometa(vm.meta,vm.currentpage); vm.meta.content=[];vm.meta.pattern=[];
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
        close(){const vm=this; vm.showmodal=false; 
            vm.confidence=0;vm.con_acc=0;vm.pat_acc=0;vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
            vm.patternslip=0;vm.contentslip=0;        
        }
        ,timeconvert(data){
            let t = new Date(data); 
            console.log(t,data);
            let second = t.getSeconds();
            let min= t.getMinutes();
            let hour = t.getHours();
            let date = t.getDate();
            let month = t.getMonth()+1;
            let year = t.getFullYear();
            return `${year}-${month}-${date}${hour}:${min}:${second}`
        }
        ,annometa(item,page){
        let result=[];
        let len = Math.max(item.pattern.length,item.content.length);
        for (let i=0;i<len;i++){
            if(item.pattern[i]==undefined){item.pattern[i]=""};
            if(item.content[i]==undefined){item.content[i]=""};
            let t = this.timeconvert(item.date[i]);
            result.push({"termCode":item.pattern[i],"description":item.content[i],"dateCreated":t});
        };
        let ele ={
            "@context": "https://schema.org",
            "@type": "Map",
            "comment":result,
        };
        let data = `anno_${page+1}`;
        // console.log(data);console.log(JSON.stringify(ele));
        this.$info.meta[data] = JSON.stringify(ele);
        return 
        }
    }
}