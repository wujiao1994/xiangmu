//	时间

var box=document.getElementById("time");
	box.innerHTML= change(new Date);
	setInterval(function(){
		box.innerHTML= change(new Date);
	},1000)
	
	function change(d){
		var	y=d.getFullYear();
		var m=d.getMonth()+1;
		var r=d.getDate();
		var w=d.getDay();
		var h=d.getHours();
		var mm=d.getMinutes();
		var s=d.getSeconds();
		
		switch(w){
			case 0:
				w="星期日";break;
			case 1:
				w="星期一";break;
			case 2:
				w="星期二";break;
			case 3:
				w="星期三";break;
			case 4:
				w="星期四";break;
			case 5:
				w="星期五" ;break;
			case 6:
				w="星期六";break;
		}
		var str=y+"年"+createzero(m)+"月"+r+"日 "+ w+" "+createzero(h)+":"+createzero(mm)+":"+createzero(s)+"";
		return str;
	}
	function createzero(n){
		return n>=10?""+ n:"0"+n;
	}
	createzero();
//=====================================================
//	鼠标移入出现移出消失
	var dis=document.querySelector(".select .ul2");
	dis.onmouseover=function(){
		document.querySelector(".menu").style.display="block";
	}
	dis.onmouseleave=function(){
		document.querySelector(".menu").style.display="none";
	}
//=================================================
//	轮播图
	let imgDoms = document.getElementsByClassName("img");   
	let dous = document.getElementsByClassName("li");
	let ord = 0; //当前播放的图片序号。从0开始  //0
	let myTimer = null;
	window.onload = function(){
	    autoPlay();
	    for(let i=0;i<dous.length;i++){
	        dous[i].onclick = function(){
	            stopPlay();
	            goImg(i);
	        }
	    }
	    document.getElementById("bannerBox").onmouseover = function(){
	        stopPlay();
	    }
	    document.getElementById("bannerBox").onmouseout = function(){
	        continuePlay();
	    }
	}
	// 1、自动播放
	function autoPlay(){    
	    myTimer = setInterval(function(){
	        // 一、数据处理
	        // 1、计算
	        let outOrd = ord;//出的图片的序号 0 1  4
	        ord++;//1 2 
	        // 2、边界处理
	        if(ord>2){
	            ord = 0;
	        }
	        // 二、外观呈现(DOM)
	        // 1、图片淡入淡出
	        fadeInOut(imgDoms[outOrd],imgDoms[ord],500);
	        // 2、豆豆的变化
	        dous[outOrd].style.backgroundColor = "white";
	        dous[outOrd].style.color = "black";
	        dous[ord].style.backgroundColor = "dimgrey";   
	        dous[ord].style.color = "white";   
	    },1000)
	}
	
	// 2、点击豆豆切换对应的图片
	function goImg(transOrd){
	    // 一、数据处理
	    // 1、数据计算
	    let outOrd = ord; //3
	    ord = transOrd; //0
	    // 2、边界处理
	    if(ord<0){
	        ord = 2;
	    }    
	    if(ord>2){
	        ord = 0;
	    }   
	    fadeInOut(imgDoms[outOrd],imgDoms[ord],500);
	    dous[outOrd].style.backgroundColor = "white";
	     dous[outOrd].style.color = "black";
	    dous[ord].style.backgroundColor = "dimgrey"; 
	     dous[ord].style.color = "white"; 
	}
	function stopPlay(){
	    window.clearInterval(myTimer);
	}
	function continuePlay(){
	    autoPlay();
	}
	function nextImg(){
	    goImg(ord+1);    
	}
	function previousImg(){
	    goImg(ord-1);
	}	

//====================================================
//	倒计时
	var oNum = document.getElementById("num");
	var oNum1 = document.getElementById("num1");
	function go(){
		var miao=setInterval(function(){
			oNum.innerHTML--;			
			if(oNum.innerHTML==0){
				clearInterval(miao);
				var fen=setInterval(function(){
					oNum1.innerHTML--;
					if(oNum1.innerHTML==0){
						clearInterval(fen);
					}
				},1000)
			}
		},1000)
	}
	go();
//=========================================
//	商品列表
	var data = [{
	        img:"https://img12.360buyimg.com/n7/s230x230_jfs/t1/106286/14/12513/103193/5e4a1065E7a137a8b/1936fb0ea08071e9.jpg!cc_230x230.jpg",
	        price:"￥9.9",
	        name:"保拉(Paola) 螺丝刀套装6件套 精密小十字一字批头组合 钟表眼镜(不适合笔记本)拆机维修工具1901",
	        goodsId:"123asd"
	    },{
	        img:"https://img12.360buyimg.com/n7/s230x230_jfs/t1/119034/17/7656/1103735/5ec4e0f4E189174f9/12c3e26db3e56726.jpg!cc_230x230.jpg",
	        price:"￥29.00",
	        name:"【百字 免打孔拖鞋架 浴室卫生间鞋架 拖鞋置物架】",
	        goodsId:"ajgjgj"
	    },{
	        img:"https://img20.360buyimg.com/n7/s230x230_jfs/t1/113064/39/7409/281062/5ec38eefEd968e8f5/053477b3ad1a8540.jpg!cc_230x230.jpg",
	        price:"￥9.9",
	        name:"茶花 多功能刮皮刀瓜果刀果蔬削皮器去皮器削皮刀 2220",
	        goodsId:"12u3"
	    },{
	        img:"https://img14.360buyimg.com/n7/s230x230_jfs/t1/109844/7/18586/130753/5ec3a681E2ee6b010/d1962bb0770a83b4.jpg!cc_230x230.jpg",
	        price:"￥59.00",
	        name:"快乐日记儿童口罩",
	        goodsId:"afa876"
	    },{
	        img:"https://img20.360buyimg.com/n7/s230x230_jfs/t1/136802/35/604/1125280/5ecf6d91E85d5baf5/0f495f2c5a79d176.jpg!cc_230x230.jpg",
	        price:"￥99.00",
	        name:"访客FK 收纳箱2只装100L*2超大号塑料整理箱北欧风印花被子衣服储物箱玩具箱子带轮子有盖收纳盒",
	        goodsId:"afa876"
	    },{
	        img:"https://img11.360buyimg.com/n7/s230x230_jfs/t1/122385/10/3218/254159/5ecfe107E6efa8655/02ca7014b9e1f94a.jpg!cc_230x230.jpg",
	        price:"￥19.00",
	        name:"三只松鼠小零食儿童",
	        goodsId:"afa876"
	    },{
	        img:"https://img20.360buyimg.com/n7/s230x230_jfs/t4483/318/2899787596/359687/6064d5ea/58f4675fN8ef6b24e.jpg!cc_230x230.jpg",
	        price:"￥29.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	        img:"https://img20.360buyimg.com/n7/s230x230_jfs/t1/74409/20/14108/464964/5db8c03bEa8488164/0f5521a3d7eb0f73.jpg!cc_230x230.jpg",
	        price:"￥199.00",
	        name:"中国金币 2020版熊猫银纪念币 2020年熊猫银币 全新 30克银币单枚送红盒",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/s230x230_jfs/t1/116174/37/8469/248359/5ece895cE9eb2539f/c3ca755751a4c496.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	        img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    },{
	    	img:"https://img13.360buyimg.com/n7/s230x230_jfs/t1/136647/39/623/211619/5ecfa42cEc842c7c3/f40ebabf67454719.jpg!cc_230x230.jpg",
	        price:"￥1899.00",
	        name:"贝亲(Pigeon) 婴儿棉签棉棒 细轴棉棒 耳孔清洁棉签 肚脐清洁棉签 400支装 KA53",
	        goodsId:"afa876"
	    }];
	    class GoodsList{
	    	constructor(){
	    		this.data = data;
            	this.product = document.querySelector("#product-list");
	    	}
	    	init(){
	    		 var str = "";
		            for(var i=0;i<this.data.length;i++){
		                str += `<div class="goods" index="${this.data[i].goodsId}">
		                            <img src="${this.data[i].img}" alt="">
		                            <span>${this.data[i].price}</span>
		                            <p>${this.data[i].name}</p>
		                            <input type="button" value="加入购物车" class="add">
		                        </div>`
                    }
		            this.product.innerHTML = str;
	    	}
		    addEvent(){
		    	var that = this;
            	this.product.onclick = function(eve){
            		var e = eve || window.event;
                	var tar = e.target || e.srcElement;
                	if(tar.className === "add"){
                		that.goodsId = tar.parentNode.getAttribute("index");
                    	that.setData();
                	}
        		}
		    }
		    setData(){
		    	var gm = localStorage.getItem("goodsMsg");
		    	if(gm === null){
		    		gm = [{
		    			goodsId:this.goodsId,
	                    num:1,
	                    msg:this.getData(this.goodsId)
		    		}];
		    	}else{
		    		gm = JSON.parse(gm);
		    		var zhuangtai = 0;
		    		for(var i=0;i<gm.length;i++){
		    			if(gm[i].goodsId === this.goodsId){
		    				gm[i].num++;
	                        zhuangtai = 1;
	                        break;
		    			}
		    		}
		    		if(zhuangtai == 0){
		    			gm.push({
		    				goodsId:this.goodsId,
	                        num:1,
	                        msg:this.getData(this.goodsId)
		    			})
		    		}
		    	}
		    	localStorage.setItem("goodsMsg",JSON.stringify(gm));
		    }
		    getData(id){
		    	for(var i=0;i<this.data.length;i++){
		    		if(this.data[i].goodsId === id){
		    			return this.data[i];
		    		}
		    	}
		    	return {};
		    }
	    }	    
	    var g = new GoodsList();
	    g.init();
	    g.addEvent();
//========================================================
	$(".Top").click(function() {
			$("html,body").animate({scrollTop:0},600); 
		})
	 $(".Top").mouseover(function () {
		       $(".Top").css({color:'white',background:'green'});
		    }).mouseout(function () {
		    	$(".Top").css({color:'#FD3F31',background:'white'});
            })
            //返回顶部显示
		$(window).on('scroll',function(){
		    var $scroll=$(this).scrollTop();
		    if($scroll>=120){
		        $('.Top').show();
		    }else{
		        $('.Top').hide();
		    }
		})
