<template>
<div>
<div v-for="(item,key) in data[currentpage]"  :key="item.id">
<div class="no-gutters border-bottom" @click="item.selected=!item.selected; select(item.selected,item)" :class="{'bg-light':item.selected}">
    <div class='pl-2 pt-2 d-flex justify-content-between mb-0'>
        <div><p class='text-center h5 mb-0'>{{item.id}}</p>
            <p class="badge badge-info m-0">{{item.annotype}}</p>
            <p class="badge badge-warning m-0">{{item.pattern}}</p></div>
        <div>
            <button class="btn btn-outline-secondary btn-sm ztop" @click.stop='modify(item,key)' >edit</button>
            <button class="btn btn-outline-danger btn-sm ztop" @click.stop="rm(item)">Delete</button>
        </div>
    </div>
    <div class='pl-2  mt-1'>
        <p class='text-black-50'>{{item.content}}</p>
    </div>
</div>
</div>   
</div>
</template>
<script>
export default {
    props:['data','currentpage'],
    methods: {
        rm(item){
            this.$emit('delete',item);
        },
        modify(item,key){
            let result={open:true,isNew:false,index:key,content:item.content,pattern:item.pattern};
            this.$emit('openmodal',result);
        },
        select(isselect,item){
            let result={selected:isselect,data:item};
            this.$emit('isselect',result);
        },
        },
}
</script>
<style scoped>
.ztop{z-index: 900;}

</style>