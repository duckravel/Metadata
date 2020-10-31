<template>
<div>
    <div v-for="(arc,key) in data[currentpage]"  :key="key">
        <svg class="svgitem w-100 h-100" style='left:0;z-index:600' >
            <!-- pin -->
            <text v-if="arc.annotype=='pin'"
                :x="arc.geometry.x"
                :y="arc.geometry.y"
                :style="arc.style"
            > &#xf276</text>
            <!-- rectangle -->
            <rect v-if="arc.annotype=='rect'"
                :x="arc.geometry.x"
                :y="arc.geometry.y"
                :width="arc.width"
                :height="arc.height"
                :style="arc.style"
            />     
            <!-- circle -->
            <circle v-if="arc.annotype=='circle'"
                :cx="arc.geometry.x"
                :cy="arc.geometry.y"
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
</template>
<script>
export default {
    props:['data','currentpage']
}
</script>