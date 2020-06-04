const cart = JSON.parse(localStorage.getItem('cart'));
    setPage(cart);


    // 定义生成页面的函数
    function setPage(cartMsg) {

      // 设定结算信息

      // 商品种类
      let cartType = 0;
      // 商品数量
      let cartNum = 0;
      // 总价格
      let cartPay = 0;


      // 购物车信息,如果是一个空数组,渲染显示其他内容
      if (cartMsg.length == 0) {
        $('.container').html('您的购物车空空如也,赶快叫家人来购物');
        return;
      }
      let str = `
      <div class="panel panel-info ">
        <div class="panel-body bg-info">
          <div class="checkbox">
            <button name="true" class="btn btn-danger btn-lg">全选</button>
            <button name="false" class="btn btn-danger btn-lg">不选</button>
            <button name="not" class="btn btn-danger btn-lg">反选</button>
          </div>
        </div>
        <div class="panel-footer">
          <ul class="cart-list">
    `;           

      cartMsg.forEach(function (item, key) {
        // console.log(item);

        str += `
        <li class="cart-item">
          <div class="left">
            <input index=${key} type="checkbox" ${item.bool == true ? 'checked' : ''} >
          </div>
          <div class="right">
            <div class="media">
              <div class="media-left">
                <a href="#">
                  <img class="media-object" src="${item.msg.goods_small_logo}" alt="...">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">${item.msg.goods_name}</h4>
                <p>
                  <i class="glyphicon glyphicon-yen"></i>
                  <span>${item.msg.goods_price}</span>
                </p>
                <div class="btn-group pull-right" role="group" aria-label="...">
                  <button name="-"  index="${key}" ${item.num <= 1 ? 'disabled' : ''} type="button" class="btn btn-default">-</button>
                  <button name="num" type="button" class="btn btn-default" disabled>${item.num}</button>
                  <button name="+" index="${key}" ${item.num >= item.msg.goods_number ? 'disabled' : ''} type="button" class="btn btn-default">+</button>
                </div>
                <button name="del" index="${key}" class="del btn btn-danger">我不要了</button>
              </div>
            </div>
          </div>
        </li>
      `;

        if (item.bool == true) {
          cartType++;

          cartNum += item.num;

    
          cartPay += item.num * item.msg.goods_price;
        }


      })

      str += `
        </ul>
        </div>
      </div>

      <div class="parice">
        <h3 name="cartType">已选中${cartType}种商品</h3>
        <h3 name="cartNum">已选中${cartNum}件商品</h3>
        <h3 name="cartPay" class="p-h">结算${cartPay.toFixed(2)}元</h3>
		<button class="del btn btn-danger">去支付</button>
      </div>
    `;
      $('.container').html(str);


    }

  

    $('.container').click(function (e) {
      
      const ele = e.target;

      if ($(ele).attr('name') == 'true') {
        
        cart.forEach(function (item) {
          item.bool = true;
        })

        setPage(cart);
      }

      if ($(ele).attr('name') == 'false') {
        cart.forEach(function (item) {
          item.bool = false;
        })
        setPage(cart);
      }

      if ($(ele).attr('name') == 'not') {
        $('[type="checkbox"]').each(function (key, item) {
          let bool = !($(item).prop('checked'));
      
          cart[key].bool = bool;
        })

        // 根据新的数据,重新渲染页面
        setPage(cart);
      }


      if ($(ele).attr('name') == 'del') {
    

        let key = $(ele).attr('index');
        cart.splice(key, 1);
   
        setPage(cart);

      }

    
      if ($(ele).attr('type') == 'checkbox') {
        let key = $(ele).attr('index');
        cart[key].bool = $(ele).prop('checked');
        setPage(cart);
      }

      if ($(ele).attr('name') == '-') {
        let key = $(ele).attr('index');
        cart[key].num--;
        setPage(cart);
      }

   
      if ($(ele).attr('name') == '+') {
        let key = $(ele).attr('index');
        cart[key].num++;
        setPage(cart);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    })