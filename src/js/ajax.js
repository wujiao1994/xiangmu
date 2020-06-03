function ajax(obj){
    let defaultObj = {
        method:"get",
        url:"#",
        isAsync:true,
        params:"",
        cb:null
    }
    for(let key in obj){
        defaultObj[key] = obj[key];
    }

    let xhr = new XMLHttpRequest();
    
    let urlAndParams = defaultObj.url;
    if(defaultObj.method.toLowerCase()=="get"){
        urlAndParams += "?"+defaultObj.params;
    }    
    xhr.open(defaultObj.method,urlAndParams,defaultObj.isAsync);

    xhr.onreadystatechange = function(){
       if(xhr.readyState==4 && xhr.status==200){            
           defaultObj.cb && defaultObj.cb(xhr.responseText);            
       }
    }
//  xhr.onload = function(){
//      if(xhr.status==200){
//          defaultObj.cb && defaultObj.cb(xhr.responseText);
//      }
//  }
    if(defaultObj.method.toLowerCase()=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defaultObj.params);
    }else{
        xhr.send();
    }
    
}