export default class ObjectHelper{
    static isNullOrUndefined(value){
        if(value!=null&&value!=""&&value!=undefined){
            return false;
            //不为空
        }
        else{
            return true;   //为空
        }
    }
    static checkFormData(formData){
        var flag=true;
        for(var i in formData){
            if(ObjectHelper.isNullOrUndefined(formData[i])){
                flag=false;
                break;
            }
        }
        return flag;
    }
    static setStorage(name,value){
        localStorage.setItem(name,value);
    }
    static getStorage(name){
        return localStorage.getItem(name);
    }
    static checkLogin(){
        let u_id=ObjectHelper.getStorage("u_id");
        if(u_id!=null&&u_id!=""&&u_id!=undefined){
            return true;
        }
        else{
            return false;
        }
    }
}