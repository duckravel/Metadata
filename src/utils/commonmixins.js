export default {
    methods: {
        submit(){
            //save last element sets;
            const vm =this;
            let element=vm.sourcedata[vm.currentpage];
            let check = vm.checkelement(element.place,element.Altername,element.Category,element.StartTime,element.EndTime,element.Description);
            if (check==false){
                alert('Please fill the empty field');
                return}
            vm.storeelement(vm.currentpage);
            if (!this.$firfin){
                this.$info.element = vm.sourcedata;
                console.log(this.$info);
                this.firfin=true;
                vm.$router.push(`/${this.$secCase}`)
                }
            else{
                this.$info.element = vm.sourcedata;
                // this.$http.post('http://localhost:3000/restful/data',//data
                // ).then(console.log(res));
            }
        },
    }
}