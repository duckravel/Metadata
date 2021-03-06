export default {
    methods: {
        //use by all
        tosurvey(){
            const vm=this;
            vm.$router.push('/survey');
        },
        time_cal(t1,t2){
            if (t1 && t2 == undefined){return 0}
            else{
            let second = t2.getSeconds()-t1.getSeconds();
            let min= t2.getMinutes()-t1.getMinutes();
            let hour = t2.getHours()-t1.getHours();
            let day = t2.getDay()-t1.getDay();
            let time = (day*24*60*60)+(hour*60*60)+(min*60)+second;
            return time}},
        saveload(data){
            if(!this.$case.isFin){
                data.type = this.$firCase;
                data.userID = this.$userid;
                data.order = 1;
                this.$info.loadFir = data;

            }else{
                data.type = this.$secCase;
                data.userID = this.$userid;
                data.order = 2;
                this.$info.loadSec = data;
            }
        }
    }
}