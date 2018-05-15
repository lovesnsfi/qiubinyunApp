class ObjectHelper{
    static isNullOrUndefined(value){
        if(value!=null&&value!=""&&value!=undefined){
            return false;
            //不为空
        }
        else{
            return true;   //为空
        }
    }
}

module.exports=ObjectHelper;