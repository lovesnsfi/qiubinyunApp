class PageJson{
    constructor(status,msg,data){
        this.status=status;
        this.msg=msg;
        this.data=data||"";
    }
    toJson(){
        return JSON.stringify(this);
    }
    toString(){
        return this.toJson();
    }
}

module.exports=PageJson;