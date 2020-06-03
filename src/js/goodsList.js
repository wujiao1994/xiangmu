var oli=document.querySelectorAll(".selectBox li");
	var oconts=document.querySelectorAll(".conts>div");
	
	for(let i=0;i<oli.length;i++){
		oli[i].onclick=function(){ /*给所有的li绑定事件*/
			for(var j=0;j<oli.length;j++){ /*拿到所有的li,*/
				oli[j].className="";  /*情况li的样式*/
				oconts[j].style.display="none"; /*隐藏所有内容*/
			}
			oli[i].className="active"; /*给当前的li添加样式*/
			oconts[i].style.display="block"; /*显示当前内容*/
		}	
	}