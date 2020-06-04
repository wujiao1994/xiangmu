
 let arr = (decodeURI(window.location.search).substring(1)).split('=');
   

    getAjax(arr[1]); 
	



    function getAjax(key , page=1 ,line=8) {
      $.ajax({
        url: 'goods_select.php',
        data: {
       
          cat_one_id: key,
        
          page: page,
          
          line: line,
        },
       
        type: 'get',
       
        dataType: 'json',
       
        success(res) {
       
          console.log(res);

        
          let str = '';

          
          
          res.forEach(function(item){
            
            str += `
            <li class="list-item">
              <div class="panel panel-primary">
                <div class="panel-body">
                  <ol class="breadcrumb">
                    <li><a href="#">${item.cat_one_id}</a></li>
                    <li><a href="#">${item.cat_two_id}</a></li>
                    <li class="active">${item.cat_three_id}</li>
                  </ol>
                </div>
                <div class="panel-footer">
                  <div class="row">
                    <div class="">
                      <div class="thumbnail">
                        <img
                          src="${item.goods_big_logo}"
                          alt="...">
                        <div class="caption">
                          <h3>${item.goods_name}</h3>
                          <p>
                            <i class="glyphicon glyphicon-yen"></i>
                            <span>${item.goods_price}</span>
                          </p>
                          <p><a href="JavaScript:;" class="btn btn-primary" role="button">查找相似商品</a> 
                             <a href="./detail.html?goods_id=${item.goods_id}" class="btn btn-danger" role="button">查看商品详情</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
          `;
          })
		
          
          $('ul').html(str);


          $('.M-box').pagination({
            pageCount: res[0]['sumPage'],  // 总页数
            totalData: res[0]['row'],      // 总数据
            current:  res[0]['page'],      // 当前页
            showData:  8,   
            count:  2,      
            coping:true ,  
            homePage: '首页',    
            endPage:  '末页' ,   
            prevContent:  '上一页',
            nextContent:  '下一页',

           
            callback : function(result){
            
              getAjax(arr[1] , result.getCurrent() ); 
            }

        });

        }
      })

    }
//============================
//var oli=document.querySelectorAll(".selectBox li");
//	var oconts=document.querySelectorAll(".conts>div");
//	
//	for(let i=0;i<oli.length;i++){
//		oli[i].onclick=function(){ /*给所有的li绑定事件*/
//			for(var j=0;j<oli.length;j++){ /*拿到所有的li,*/
//				oli[j].className="";  /*情况li的样式*/
//				oconts[j].style.display="none"; /*隐藏所有内容*/
//			}
//			oli[i].className="active"; /*给当前的li添加样式*/
//			oconts[i].style.display="block"; /*显示当前内容*/
//		}	
//	}
//========================================================