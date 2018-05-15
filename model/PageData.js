class PageData{
    constructor(pageIndex,sumCount,pageSize,data){
        this.pageIndex=pageIndex;
        this.sumCount=sumCount,
        this.pageSize=pageSize;
        this.data=data;
        this.pageCount=Math.ceil(this.sumCount/this.pageSize);
    }
    toString(){
        return JSON.stringify(this);
    }
}

module.exports=PageData;