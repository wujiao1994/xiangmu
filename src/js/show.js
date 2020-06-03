class Magnifier{
		constructor(){
			this.sImg=document.querySelector(".magnifierBox .smallbox img");
			this.bImg=document.querySelector(".magnifierBox .bigbox img");
			this.span=document.querySelector(".magnifierBox .smallbox span");
			this.sBox=document.querySelector(".magnifierBox .smallbox");
			this.bBox=document.querySelector(".magnifierBox .bigbox");
			
			this.li = document.querySelectorAll(".magnifierBox .list li");
		}
		addEvent(){
			var that=this;
			this.sBox.onmouseover=function(){
				that.over();
			}
			this.sBox.onmousemove=function(eve){
				var e=eve||event;
				that.move(e);
			}
			this.sBox.onmouseout=function(){
				that.out();
			}
//			切换图片点击事件
			for(var i=0;i<this.li.length;i++){
				this.li[i].onclick=function(){
					that.sImg.src=this.children[0].src; /*让sImg的图片地址等于当前每次循环点击的图片地址*/
					that.bImg.src=this.children[0].src;	/*让bImg的图片地址等于当前每次循环点击的图片地址*/
				}
			}
			
		}
		over(){
			this.span.style.display="block";
			this.bBox.style.display="block";
		}
		move(e){
			var l=this.span.style.left=e.pageX-100-this.span.offsetWidth/2; /*计算遮罩层跟随鼠标移动的left,鼠标最终在span的中间位置*/
			var t=this.span.style.top=e.pageY-252-this.span.offsetHeight/2; /*计算遮罩层跟随鼠标移动的top,鼠标最终在span的中间位置*/
			/*边界限定*/
			if(l<0){l=0;} 
			if(t<0){t=0;}
			if(l>this.sBox.offsetWidth-this.span.offsetWidth){
				l=this.sBox.offsetWidth-this.span.offsetWidth;
			}
			if(t>this.sBox.offsetHeight-this.span.offsetHeight){
				t=this.sBox.offsetWidth-this.span.offsetWidth;
			}
			this.span.style.left=l+"px";
			this.span.style.top=t+"px";
			
//			根据遮罩层移动的距离计算比例
			var x=l/(this.sBox.offsetWidth-this.span.offsetWidth);
			var y=t/(this.sBox.offsetHeight-this.span.offsetHeight);
//			遮罩层移动的比例和大盒子图片移动的比例是一致的
			this.bImg.style.left=(this.bBox.offsetWidth-this.bImg.offsetWidth)*x+"px"; 
			this.bImg.style.top=(this.bBox.offsetHeight-this.bImg.offsetHeight)*y+"px";
		}
		out(){
			this.span.style.display="none";
			this.bBox.style.display="none";
		}
		
	}
	var s=new Magnifier();
	s.addEvent();
//==============================================================
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
//=============================================
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