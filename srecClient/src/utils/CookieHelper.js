export default class CookieHelper{
    static setCookie(cookieName,cookieValue,expires){
		var cookieStr=cookieName+"="+cookieValue;
		if(arguments.length==3){
			//如果这个地方的参数个数为三个，我就把Cookie的存储时限加入进去
			cookieStr+=";Expires="+expires;
		}
		document.cookie=cookieStr;
    }
    //根据指定的cookieName去取值
	static getCookie(cookieName){
		var cookieArr=document.cookie.split(";");
		for(var i=0;i<cookieArr.length;i++){
			var arr=cookieArr[i].split("=");
			if(arr[0].trim()==cookieName){
				return arr[1];
			}
		}
	}
	//根据指定的cookieName去删除cookie
	static removeCookie(cookieName){
		var cookieStr=cookieName+"='';expires="+new Date("1970-01-01");
		document.cookie=cookieStr;
	}
}