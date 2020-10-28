var annoMixin = {
    data: function () {
      return {contenttimelist:[],patterntimelist:[],currentpage:0,annotationdata:source.annotationdata,type:'',patternlist:pattern.pattern,templist:'',drawlist:[[],[],[],[],[]],isAdd:true,itemid:-1,showmodal:false,content:'',pattern:'',isSubmit:false}},
    methods:{
      ano_pageChange(dir){
        if (dir=='next'){++this.currentpage;}
        else{--this.currentpage;}
    },
    time_cal(t1,t2){
        let second = t2.getSeconds()-t1.getSeconds();
        let min= t2.getMinutes()-t1.getMinutes();
        let hour = t2.getHours()-t1.getHours();
        let day = t2.getDay()-t1.getDay();
        let time = (day*24*60*60)+(hour*60*60)+(min*60)+second;
        return time},
    modal(result){
        const vm=this; vm.isAdd=result.isNew;
        if (result.isNew){
            this.templist = result.data;
            vm.templist.annotime = vm.time_cal(result.annotime[0],result.annotime[result.annotime.length-1]);}
        else{
            vm.content=result.content;
            vm.pattern=result.pattern;
            vm.itemid=result.index;
            result={open:true,isNew:true,data:vm.templist[vm.templist.length-1]};
        }
        this.showmodal=result.open;
    },
    watch_content(action){
        const vm=this;
        if(action=='focus'){vm.contenttimelist.push([new Date()]);}
        else{vm.contenttimelist[vm.contenttimelist.length-1].push(new Date());}
    },
    watch_pattern(action){
        const vm=this;
        if(action=='focus'){vm.patterntimelist.push([new Date()]);}
        else{vm.patterntimelist[vm.patterntimelist.length-1].push(new Date());}
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
        switch(vm.drawlist[vm.currentpage][newindex].type){
            case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
            case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
            case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};
        }}
        else{
            let stroke='#ff0000',fill='#821717',strokeWidth=5;
            switch(vm.drawlist[vm.currentpage][newindex].type){
                case 'rect': case 'circle':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill};stroke:${stroke};strokewidth:${strokeWidth};opacity:0.7`;break};
                case 'pencil':{ vm.drawlist[vm.currentpage][newindex].style=`stroke-width:${strokeWidth};stroke:${stroke};fill:none`;break};
                case 'pin':{ vm.drawlist[vm.currentpage][newindex].style=`fill:${fill}`;break};}
    }},
    rm(item){
        const vm=this;
        let newindex =  this.keycompare(item);
        vm.drawlist[vm.currentpage].splice(newindex,1);
    },
    save(){
        const vm=this;let patterntime=0; let contenttime=0;
        if (vm.isRecord){alert('Please stop your recording')};
        if (vm.patterntimelist.length>0){patterntime=vm.patterntimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
        if (vm.contenttimelist.length>0){contenttime=vm.contenttimelist.map(ele=>{return vm.time_cal(ele[0],ele[1])}).reduce((acc,cur)=>{return acc+cur});}
        if(vm.isAdd)
        {vm.templist.content=vm.content;vm.templist.pattern=vm.pattern;
            vm.templist.contenttime=contenttime;vm.templist.patterntime=patterntime;
            vm.drawlist[vm.currentpage].push(vm.templist)}
        else{
            vm.drawlist[vm.currentpage][vm.itemid].content=vm.content;
            vm.drawlist[vm.currentpage][vm.itemid].pattern=vm.pattern;
            vm.drawlist[vm.currentpage][vm.itemid].contenttime += contenttime;
            vm.drawlist[vm.currentpage][vm.itemid].patterntime += patterntime;   
        } 
        vm.close();
        vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;vm.patterntimelist=[];vm.contenttimelist=[];
    },
    close(){const vm=this; vm.showmodal=false; vm.content=""; vm.pattern="";vm.templist='';vm.itemid=-1;},
    cancel(){
        $('#alertModal').modal('show');
        this.isSubmit=false;
    },
  }
  }