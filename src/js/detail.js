const arr = decodeURI(window.location.search).substring(1).split('=');
	
	
	

    $.ajax({
      url: 'goods_select_list_pdo.php',
      type: 'post',
      data: { goods_id: arr[1] },
      dataType: 'json',
      success(res) {
    
        let str = `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">商品详细信息</h3>
          </div>
          <div class="panel-body">
            <div class="media">
              <div class="media-left">
                <a href="#">
                  <img class="media-object" src="${res.goods_small_logo}" alt="...">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">${res.goods_name}</h4>
                <p>
                  <i class="glyphicon glyphicon-yen"></i>
                  <span>${res.goods_price}</span>
                </p>
                <div class="btn-group" role="group" aria-label="...">
                  <button type="button" class="btn btn-default">XL</button>
                  <button type="button" class="btn btn-default">L</button>
                  <button type="button" class="btn btn-default">M</button>
                  <button type="button" class="btn btn-default">S</button>
                  <button type="button" class="btn btn-default">XS</button>
                </div>
                <p>
                  <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
                  <a href="javascript:;" name="incar" class="btn btn-danger btn-lg" role="button">加入购物车</a>
                </p>
              </div>
            </div>
            <ul class="nav nav-tabs">
              <li role="presentation" class="active"><a href="#">商品详细信息</a></li>
              <li role="presentation"><a href="#">商品参数信息</a></li>
              <li role="presentation"><a href="#">相关商品</a></li>
            </ul>
            <div>
                ${res.goods_introduce}
            </div>
          </div>
        </div>
        
        `;

        // 将str写入到div中
        $('.container').html(str);

       
        setCart(res);
      }
    })

    function setCart(res) {

      $('.container').on('click', '[name="incar"]', function () {
        // 判断,是否有 登录状态码 是否是 1
        if (localStorage.getItem('login') != 1) {
          // 登录状态码不是 1 , 证明没有登录 , 要跳转登录页面
          // 弹出一个确认框,如果点击确定,跳转登录页面,点击取消,不做操作
          let bool = window.confirm('您还没有登录,是否现在就去登录');
          if (bool == true) {
            // 如果点击确定,也就是返回值是true,跳转登录页面
            window.location.href = `./login.html?url=${window.location}`;
          }
        } else {
          

          if (localStorage.getItem('cart') == null) {
           
            let cartObj = {};

            // 向对象中写入数据 

            // 购买产品信息
            cartObj.msg = res;
            // 购买数量
            cartObj.num = 1;
            // 购买状态
            cartObj.bool = true;

            
            const cart = [];
            // 将商品信息对象,写入到数组中
            cart.push(cartObj);
            // 将数组写入到localStorage 中
            localStorage.setItem('cart', JSON.stringify(cart));

          } else {
           
            let bool = true;


            // localStorage中存储的数据信息是 json串 的形式 
            // 需要转化会对应的形式

            // console.log( JSON.parse(localStorage.getItem('cart'))  )

            let newCart = JSON.parse(localStorage.getItem('cart'));

            newCart.forEach(function (item) {
              // item中存储的就是每一个购物车商品的具体信息
              // 就是 商品的 id编号信息
              // goods_id 的数据类型 是字符串类型
              // 如果 item中存储的 已有的商品信息 和 res 中存储的要写入的商品信息相同
              if (item.msg.goods_id == res.goods_id) {
                // 证明要写入的商品,已经存在,要在购买商品数据量上加1;
                item.num++;
                // 当前修改的是已有商品购买的数据
                // 只是修改的是 newCart 中的数据,不是 localStorage 中的数据
                // localStorage 中的数据,必须通过 setItem()语法来重新设定

                // 如果商品已经存在
                // 给开关变量赋值为false
                bool = false;

                // forEach语句,不支持break
              }
            })


           

            if (bool == true) {
              // 建立对象,存储当前商品的信息
              let cartObj = {};

              // 向对象中写入数据 

              // 购买产品信息
              cartObj.msg = res;
              // 购买数量
              cartObj.num = 1;
              // 购买状态
              cartObj.bool = true;

              // 将新的查新信息,作为一个新的单元,写入到newCart中
              newCart.push(cartObj);
            }

            
            localStorage.setItem('cart', JSON.stringify(newCart));
          }

          // 跳转至购物车页面
          window.location.href = 'shoppingCart.html';
        }

      })
    }

    /*
      详情页 步骤 思路总结
    
      1,获取前端页面传参 goods_id

      2,根据 goods_id 向后台数据库 发送请求,根据请求响应体,生成页面
        因为查询的是 goods_is 响应体 是 唯一的商品信息

        根据商品信息,生成页面内容,并且渲染页面内容

        其中 商品详细信息 存储在 goods_introduce 信息中
        是 用户存储在数据库中的 内容,是设定的标签和标签内容,我们直接使用即可

        调用执行 给 加入购物车按钮,添加的事件
            因为执行时,要获取当前的数据信息,必须要在ajax异步请求中调用,才能获取信息

      3,封装函数,参数是ajax异步请求的响应体,作用是给 加入购物车 标签 添加点击事件
            因为标签是异步请求之后,根据响应体生成的
            不能直接给标签绑定事件,必须通过 事件委托 执行

            执行判断 的内容 
              1. --- 如果没有登录状态码,表示没有登录
                    携带当前页面的参数跳转至登录页面
                    在登录页面,登录成功之后,会返回当前详情页

              2. --- 如果有登录状态码,表示已经登录
                  2-1. --- localStorage 中 如果没有 cart
                    表示当前没有购物车数据信息,直接 localStorage 的 cart中写入数据
                    数据内容包括3个方面
                       当前商品的数据  购买数量  购买状态
                    通过 localStorage.setItem(cart , JSON.stringify() )
                    以JSON串的形式写入

                  2-2. --- localStorage 中 如果已有 cart
                    表示当前有购物车数据信息
                    需要判断,购物车信息中,是否已经有需要加入的商品
                        2-2-1:
                          新建一个变量,存储 判断结果 赋值 true
                          新建一个数组,存储 购物车信息,需要将 JSON串 还原为对应的数据类型

                          循环遍历 cart 中 存储的数据信息
                              如果  存储的数据信息.goods.id 等于 res.goods_id
                                    也就是当前商品的id信息,与购物车中商品的id信息相同
                                    也就是这个要加入的商品,已经存储在购物车中了
                                    修改 购物车数据信息 购买商品数据量 +1
                                    给变量赋值 false , 表示 商品信息已经存在于购物车
                        2-2-2:
                          循环遍历结束,根据变量中存储的信息执行判断
                              如果变量是true,证明商品没有存在于购物车
                              给购物车中新增单元,单元内容是当前商品信息
                                  信息包括3方面:
                                      商品信息,购买数量1,购买状态true

                        2-2-3:
                          将新的购物车信息数组 写入到 localStorage 的 cart 中
                          注意要写成 JSON 串的形式
    */



    /*
    
    

    事件委托方法2
    判断 事件对象e 点击的目标
    通过 事件对象e 获取的点击目标 是 JavaScript标签对象形式
    $('.container').click(function(e){
      console.log(e.target.getAttribute('name'));
    })

    定义成函数的语法,在ajax中,请求成功调用

    function setCart(res){
      // 判断点击的是否是 incar 按钮
      if( e.target.getAttribute('name') == 'incar' ){
        // 如果没有登录状态码
        if (localStorage.getItem('login') != 1){
            let bool = window.confirm('您还没有登录,是否现在就去登录');
            if (bool == true) {
              // 携带当前地址参数,跳转到登录页面
              window.location.href = `./login.html?url=${window.location}`;
            }
            
        // 如果有登录状态码
        }else{
          // 判断,如果购物车内容为空
          if (localStorage.getItem('cart') == null) {
            // 新增数据内容
            let cartObj = {};
            cartObj.msg = res;
            cartObj.num = 1;
            cartObj.bool = true;

            // 购物车数据数组
            const cart = [];
            cart.push(cartObj);

            // 写入localStorage,json串形式
            localStorage.setItem('cart', JSON.stringify(cart));

          }else{
            // 有购物车数据
            
            // 定义存储结果变量
            let bool = true;

            // 存储 购物车数据信息
            let newCart = JSON.parse(localStorage.getItem('cart'));

            // 循环遍历
            newCart.forEach(function (item) {
              
              // 如果购物车id信息和写入数据id信息相同
              if (item.msg.goods_id == res.goods_id) {
                // 证明要写入的商品,已经存在,要在购买商品数据量上加1;
                item.num++;
 
                // 给开关变量赋值为false
                bool = false;
              }
            })

            // 如果已有数据不存在
            if (bool == true) {
              // 建立对象,存储当前商品的信息
              let cartObj = {};

              // 购买产品信息
              cartObj.msg = res;
              // 购买数量
              cartObj.num = 1;
              // 购买状态
              cartObj.bool = true;

              newCart.push(cartObj);
            }

            // 需要将新的数据信息,写入到 localStorage 中,也就是重新设定 cart 中的数据
            localStorage.setItem('cart', JSON.stringify(newCart));
          }
        }
      }
    }