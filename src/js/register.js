//萤火虫
var chong=document.querySelector(".chong");
    class Glowworm{
        constructor(){
            // 获取屏幕的可视区域的宽高，用作将来的随机范围
            this.clientW= document.documentElement.clientWidth;
            this.clientH = document.documentElement.clientHeight;
            // 假设萤火虫的宽高
            this.w = 20;
            this.h = 20;
        }
        createEle(){
            var div = document.createElement("div");
            div.className = "box1";
           chong.appendChild(div);
            // 在创建元素之前一定得先生成随机坐标
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
            // 元素创建好之后，需要立即运动
            this.move(div);
        }
        randomPos(){
            // 随机生成坐标
            this.x = random(0,this.clientW - this.w);
            this.y = random(0,this.clientH - this.h);
        }
        move(ele){
            // 开始运动之前，还得随机生成目标
            this.randomPos();
            // 开始运动
            move(ele,{
                left:this.x,
                top:this.y
            },()=>{
                // 一个动画结束后，重复开启当前动画，即可
                this.move(ele);
            })
        }
    }


    for(var i=0;i<70;i++){
        // 先得到实例
        var g = new Glowworm();
        // 生成随机坐标
        g.randomPos();
        // 再创建元素
        g.createEle();
    }



    function random(a,b){
        return Math.round(Math.random()*(a-b)+b);
    }
//===============================
//注册验证
let isCheck = {
        user:false,
        pass:false,
        pass2:false,
        phone:false
    };
    let hasUser = true; //后端是否存在该用户名
    window.onload = function () {
    	$("#userId").onclick = function () {
    	 	let userIdDom = $("#userId");
        	userIdDom.previousElementSibling.innerHTML="用户名：";
        	checkUserFront()
    	}
        $("#userId").onblur = function () {	
            // 1、前端的验证（格式）
            if(checkUserFront()){
                // 2、后端验证（存在性）
                checkUserBack();
            }
        }
         // 密码验证
        $("#passId").onclick = function () {  
        	let passIdDom = $("#passId");
            passIdDom.previousElementSibling.innerHTML="设置密码:";
           	passIdDom.nextElementSibling.innerHTML="密码的规则：长度在6-18位，数字字母下划线组成";
           
        }
        $("#passId").oninput = function (){
        	checkPass()
        	$("#pass-box").style.display="block";
        	
        }
        
        $("#passId").onchange = function(){
            $("#pass2Id").value = "";
            $("#pass2Id").nextElementSibling.innerHTML = "";
        }

         // 确认密码验证
        $("#pass2Id").onclick = function () {
        	$("#pass2Id").previousElementSibling.innerHTML="确认密码:";
          
        }
        $("#pass2Id").oninput= function () {
        	
           checkPass2();
        }
        $("#phone").onclick=function(){
        	$("#phone").previousElementSibling.innerHTML="手机号:";
        	let phoneDom=$("#phone");
        	phone();
        }
         $("#phone").onblur=function(){
        	let phoneDom=$("#phone");
        	phone();
        }
        

        // 注册
        $("#btnReg").onclick = function () {
            let trueCount = 0;
            for(let key in isCheck){
                if(isCheck[key]){ trueCount++;}
            }
            console.log("trueCount",trueCount);

            // 保证前端验证没有问题
            if(trueCount==4){
                if(!hasUser){
                    regSave();
                    return;
                }
            }            
            alert("亲，请检查您的信息是否输入完整或者是否正确");            
        }
    }

    function checkUserFront() {
        let userIdDom = $("#userId");
        // 用户名的规则：非空，长度在6-18位；由数字，字母下划线；
        let reg = /^\w{6,18}$/;
        if (reg.test(userIdDom.value)) {
            isCheck.user = true;
            return true;
        } else {
            userIdDom.nextElementSibling.innerHTML = "用户名规则:长度在6-18位,由数字,字母下划线";
           
            isCheck.user = false;
            return false;
        }
    }

    function checkUserBack() {
        ajax({
            url: "get.php",
            params: "username=" + $("#userId").value,
            isAsync:false,
            cb: (result) => {
                if (result=="1") {
                    $("#userId").nextElementSibling.style.color = "red";
                    $("#userId").nextElementSibling.innerHTML = "该用户名已经存在";
                    hasUser = true;
                } else {
                    $("#userId").nextElementSibling.style.color = "green";
                    $("#userId").nextElementSibling.innerHTML = "用户名没有人使用，赶紧注册吧！";
                    hasUser = false;
                }
            }
        });
    }

    function checkPass(){
            let passDom = $("#passId");
            let passSpan = $("#pass-box").children;
            for(let i=0;i<passSpan.length;i++){
                passSpan[i].style.backgroundColor="white";
            }            
            // 密码的规则：长度在6-18位，数字字母下划线组成
            let reg = /^\w{6,18}$/;
            if (reg.test(passDom.value)) {
                passDom.nextElementSibling.innerHTML = "√";                
                isCheck.pass = true;

                //1、统计字符类型的个数
                let regLetter = /[a-zA-Z]/;
                let regNum = /[0-9]/;  //数字
                let regLine = /[_]/;  //划线
                count = 0;
                if(regLetter.test(passDom.value)) {
                    count++;
                }
                if (regNum.test(passDom.value)){
                    count++;
                }
                if (regLine.test(passDom.value)){
                    count++;
                }
                switch(count){
                    // 强：三种字符
                    case 3:passSpan[2].style.backgroundColor="green";
                    // 中：两种字符
                    case 2:passSpan[1].style.backgroundColor="yellow";
                      // 弱：一种字符
                    case 1:passSpan[0].style.backgroundColor="red" ;
                    default:;
                }

            } else {    
                isCheck.pass = false;
                passDom.nextElementSibling.innerHTML = "长度在6-18位，数字字母下划线组成";
            }
    }

    function checkPass2(){
        let pass2Dom = $("#pass2Id");
        if(pass2Dom.value===$("#passId").value){
            isCheck.pass2 = true;
            pass2Dom.nextElementSibling.innerHTML = "√";                
        }else{
            isCheck.pass2 = false;
            pass2Dom.nextElementSibling.innerHTML = "密码输入不一致";
        }
    }
  function phone(){
  		let phoneDom=$("#phone");
		var sjreg=/^1[3-9]\d{9}$/;
		if(sjreg.test(phoneDom.value)){
			phoneDom.nextElementSibling.innerHTML="√";
			isCheck.phone = true;
		}else{
			phoneDom.nextElementSibling.innerHTML="请输入正确的手机号";
			isCheck.phone = false;
		}
	}
    function regSave() {
       
        let str = `username=${$("#userId").value}&userpsw=${$("#passId").value}`;
        ajax({
            method: "post",
            url: "post.php",
            params: str,
            cb: (result) => {
                if (result == "1") {
                    $("#message-box").innerHTML = "<a href='login.html'>恭喜您，注册成功！请登录</a>";
                    $("#message-box").style.backgroundColor="white"
                } else {
                    $("#message-box").innerHTML = "不好意思，注册失败！";
                }
            }
        });
    }

	