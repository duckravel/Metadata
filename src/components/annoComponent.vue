<template>
<div>
     <div v-on:mousemove.stop="move"  v-on:mousedown.stop="start">
        <div v-for="(arc,index) in templist" :key='index'>
            <svg class="svgitem w-100 h-100" style='left:0;z-index:700'>
            <!-- pin -->
                <text v-if="arc.annotype=='pin'"
                    :x="arc.x"
                    :y="arc.y"
                    :style="arc.style"
                > &#xf276 </text>
            <!-- rectangle -->
                <rect v-if="arc.annotype=='rect'"
                    :x="arc.x"
                    :y="arc.y"
                    :width="arc.width"
                    :height="arc.height"
                    :style="arc.style"
                />     
                <!-- circle -->
                <circle v-if="arc.annotype=='circle'"
                    :cx="arc.x"
                    :cy="arc.y"
                    :r='arc.radius'
                    :style='arc.style'
                />
                <!-- pencil -->
                <polyline v-if="arc.annotype=='pencil'" 
                    :points="arc.points"
                    :style="arc.style"                            
                />
        </svg>                
        </div>  
    </div>
    
</div>
</template>
<script>
export default {
    name:'annoComponent',
    props:['page','data','drawingtype','tempisempty'],
    data(){return {
        templist:[{annotype:'pin',x: 0, y:0,style:{fontsize:`1px`,fill:`transparent`}}],
        annotime:[],isdraw:false,stroke: '#ff0000',fill: '#821717',strokeWidth: 5,rotate:0
    }},
    methods:{
        start(event){
            // this.templist=[];
            const vm=this;vm.isdraw=false;vm.annotime=[];
            switch(this.drawingtype)
            {   
                case 'circle': {vm.annotime.push(new Date());vm.startCircle(event); break;}
                case 'rect': {vm.annotime.push(new Date());vm.startRect(event); break;}
                case 'pin': {vm.annotime.push(new Date());vm.pin(event); break;}
                case 'pencil': {vm.annotime.push(new Date());vm.startpencil(event); break;}
            }
        },
        move(event){
            const vm=this;
            switch(vm.drawingtype)
            {   
                case 'circle': vm.drawCircle(event); break;
                case 'rect': vm.drawRect(event); break;
                case 'pencil':vm.drawpencil(event);break;
            }
        },
        pin(event){
            const vm=this;
            vm.templist.push({
                        userid:this.$userid,
                        page_id:0,
                        type:'',
                        id:Date.now(),
                        materialLink:'',
                        annotype:'pin',x: event.clientX, y: event.clientY-40,
                        width: 0, height: 0,radius: 0,rotate: 0,points:`${event.clientX},${event.clientY-40} `,selected:false,
                        style: `fill:${vm.fill}`});
                        vm.annotime.push(new Date());
                        let result={open:true,isNew:true,data:vm.templist[vm.templist.length-1],annotime:vm.annotime};
                vm.$emit('openmodal',result);
        },
        startRect(event){
            const vm=this;           
            vm.templist.push({
                userid:this.$userid,
                page_id:0,
                type:'',
                id:Date.now(),
                materialLink:'',
                annotype: 'rect',
                x: event.clientX, y: event.clientY-40,width: 0, height: 0,radius: 0,rotate: 0,points:`${event.clientX},${event.clientY-40} `,selected:false,
                style:`fill:${vm.fill};stroke:${vm.stroke};strokewidth:${vm.strokeWidth};opacity:0.7`,
            });
            vm.isdraw=true;
        },
        startCircle(event){
            const vm=this;           
            vm.templist.push({
                userid:this.$userid,
                page_id:0,
                type:'',
                id:Date.now(),
                materialLink:'',
                annotype:'circle',
                x: event.clientX, y: event.clientY-40,width: 0, height: 0,radius: 0,rotate: 0,points:`${event.clientX},${event.clientY-40}`,selected:false,
                style:`fill:${vm.fill};stroke:${vm.stroke};strokewidth:${vm.strokeWidth};opacity:0.7`,
            });
            vm.isdraw=true;
        },
        startpencil(event){
            const vm=this;
            vm.templist.push(
                {   userid:this.$userid,
                    page_id:0,
                    type:'',
                    id:Date.now(), 
                    materialLink:'',
                    annotype: 'pencil',
                    x: 0, y: 0,width: 0, height: 0,radius: 0,rotate: 0,
                    points: `${event.clientX},${event.clientY-40} `,selected:false,
                    style: `stroke-width:${vm.strokeWidth};stroke:${vm.stroke};fill:none`,
                });
            vm.isdraw=true;
        },
        drawRect(event){
            const vm=this;
            //if leftclick and status is drawing
            if (event.buttons == 1 && vm.isdraw){
                let lastRect=vm.templist[vm.templist.length-1]
                lastRect.height = Math.abs(event.clientY -40- lastRect.y);
                lastRect.width  = Math.abs(event.clientX - lastRect.x);
            }
            else if (event.button == 0 && vm.isdraw){
                vm.isdraw=false;
                vm.annotime.push(new Date());
                let result={open:true,isNew:true,data:vm.templist[vm.templist.length-1],annotime:vm.annotime};
                this.$emit('openmodal',result);
            }
        },
        drawCircle(event){
            const vm=this;
            //if leftclick and status is drawing
            if (event.buttons == 1 && vm.isdraw){
                let lastCircle = vm.templist[vm.templist.length-1];        
                let a = Math.abs(event.clientY -40- lastCircle.y);
                let b = Math.abs(event.clientX - lastCircle.x);
                lastCircle.radius = Math.sqrt((a * a) + (b * b));
            }
            else if (event.button == 0 && vm.isdraw){
                vm.isdraw=false;
                vm.annotime.push(new Date());
                let result={open:true,isNew:true,data:vm.templist[vm.templist.length-1],annotime:vm.annotime};
                this.$emit('openmodal',result);
            }
        },
        drawpencil(event){
            const vm=this;
            if(event.buttons == 1 && vm.isdraw){
                let lastLine = vm.templist[vm.templist.length-1];
                lastLine.points += `${event.clientX},${event.clientY-40} `;
            }
            else if (event.buttons == 0 && vm.isdraw){
                vm.isdraw=false;
                // result={open:true,isNew:true,data:vm.templist[vm.templist.length-1]};
                vm.annotime.push(new Date());
                let result={open:true,isNew:true,data:vm.templist[vm.templist.length-1],annotime:vm.annotime};
                this.$emit('openmodal',result);
            }
        },
    },
    watch:{
        tempisempty:function(){
            if (this.tempisempty==''){this.templist=[{annotype:'pin',x: 0, y:0,style:{fontsize:`1px`,fill:`transparent`}}]};
        }
    }
    
}
</script>