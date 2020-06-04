$("#codeSpan").onclick=function(){
		
		showCode();/*产生验证码*/
		$("#codeSpan").onclick=function(){
			showCode(); /*点击span,重新产生验证码*/
			$("#codeSpan").innerHTML=code;
			sendCode(code);/*把代码发送到后端*/
		}
		$("#btnLogin").onclick=function(){
			if($("#code").value!=$("#codeSpan").innerHTML){
				alert("验证码不正确");
				showCode();
				return;
			}
			login();
		}
	}
	function showCode(){
		$("#codeSpan").innerHTML=getCode(4);
	}
	function getCode(n){
		let str="";
		for(var i=0;i<n;i++){
			str=str+Math.round(Math.random()*10);
		}
		return str;
	}
	function sendCode(code){
		ajax({
			method:"get",
			url:"code.php",
			params:"code="+$("#codeSpan").innerHTML
		});
	}
	function login(){
		ajax({
			method:"post",
			url:"post.php",
			params:`username=${$("#userId").value}&userpsw=${$("#passId").value}`,
			cb:function(result){
				if(result=="1"){
					addCookie("username",$("#userId").value,7);
					let count=5;
					$("#message-box").innerHTML=`恭喜您,登录成功,${count}秒后跳转到<a href="index.html">首页</a>`
					let myTime=setInterval(()=>{
						count--;
						if(count==0){
							clearInterval(myTime);
							location.href="index.html"
							return;
						}
					},500);
				}else{
					$("#message-box").innerHTML="亲，不好意思，登录失败"
					showCode()
				}
			}
		})
	}