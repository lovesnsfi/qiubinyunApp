export function toDate(value){
    var d=new Date(value);
    var str=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds();
    return str;
}