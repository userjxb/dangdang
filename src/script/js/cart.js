/* 购物车页面js (默认全选)*/

// 判断是否登录
;(function ($) {
    class isLogined {
        constructor() {
            this.$account = $.cookie('account');
        }

        init() {
            // 如果cookie不存在，则请求登录
            if(this.$account) {
                $('.login-tip').hide();
                $('.welcome').show();
            }else {
                $('.login-tip').show();
                $('.welcome').hide();
            }
            // 退出登录
            this.exit();
        }
        // 退出登录
        exit() {
            $('.exit-btn').on('click',function() {
                if(confirm("你确定要退出吗？")) {
                    $.cookie("account","null",{expires:-1});
                    $('.login-tip').show();
                    $('.welcome').hide();
                }
            });
        }
    }
    new isLogined().init();
})(jQuery);

// 数据渲染+cookie+操作
;(function() {
    class drawCart {
        constructor() {
            this.$bookslist = $(".bookslist"); // 商品信息盒子
            this.$phpUrl = 'http://10.31.163.63/dangdang/php/';
            this.arrsid=[]; //商品的id
            this.arrnum=[]; //商品的数量
            this.timer = null;
        }

        init() {
            var _this = this;
            // 获取cookie，执行数据渲染函数
            this.getCookie();
            $.each(_this.arrsid,function(index,value){
                        _this.drawList(_this.arrsid[index],_this.arrnum[index]);
                    });
            // 全选
            this.allSelect();
            // 商品数量的改变
            this.bookCount();
            // 删除当前商品
            this.delCurrentItem();
            // 删除所有被选中的商品
            this.delAllItem();
            // 将购物车里的商品数量存入cookie
            this.timer = setTimeout(function() {
                _this.saveAmount();
            },100);
        }
        // 将购物车里的所有商品数量存入cookie
        saveAmount() {
            var $sum=0;
            $('.book-item:visible').each(function(index,element){
                $sum += parseInt($(element).find('.f4 .num input').val());
            });
            // 存入cookie
            $.cookie("amount",$sum,{expires:7});
        }
        // 获取cookie里面的数据
        getCookie() {
            if($.cookie('cookiesid') && $.cookie('cookienum')){
                this.arrsid=$.cookie('cookiesid').split(',');//cookie商品的sid  
                this.arrnum=$.cookie('cookienum').split(',');//cookie商品的num
            }
        }
        // 数据渲染
        drawList(id,count){
            var _this = this;
            $.ajax({
                url: this.$phpUrl + 'allData.php',//获取所有的接口数据
                dataType:'json',
                success: function(data) {
                    $.each(data,function(index,value){
                        if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                            var $clonebox=$(".book-item:hidden").clone(true);
                            $clonebox.find(".f1 img").attr("src",value.picurl); //书的图片
                            $clonebox.find(".f1 img").attr("sid",value.sid); //书的图片
                            $clonebox.find(".f2").html(value.name); //书名
                            $clonebox.find(".f3 span").html(value.newprice); //单价
                            $clonebox.find(".f4 input").val(count); //购买数量
                            $clonebox.find(".f5 span").html((value.newprice*count).toFixed(2)); //单品总额
                            $clonebox.css('display','block');
                            _this.$bookslist.append($clonebox);
                        }
                    });
                    _this.compute(); //总计
                }
            })
        }
        // 全选操作
        allSelect() {
            var _this = this;
            // 全选按钮
            $('#all').on("change",function() {
                $('.book-item:visible').find('.single').prop('checked',$(this).prop('checked'));
                _this.compute(); //总计
            });
            // 单个选项按钮
            this.$bookslist.on("change",".single",function() { // $(this)指向.single
                if($('.book-item:visible').find('input:checkbox').length==$('.book-item:visible').find('input:checked').length) {
                    $('#all').prop('checked',true);
                }else {
                    $('#all').prop('checked',false);
                }
                _this.compute(); //总计
            });
        }
        // 合计
        compute() {
            var $sum=0;
            var $count=0;
            $('.book-item:visible').each(function(index,element){
                if($(element).find('.single').prop('checked')){
                    $sum   += parseInt($(element).find('.f4 .num input').val());
                    $count += parseFloat($(element).find('.f5 span').html());
                }
            });
            // 赋值
            $('.book-count').find('span').html($sum);
            $('.all-price').find('span').html($count.toFixed(2));
        }
        // 商品数量的改变
        bookCount() {
            var _this = this;
            $(".more").on("click",function() {
                var n = $(this).parents('.num').find('input').val();//值
                n++;
                if(n>99) {
                    n=99;
                }
                $(this).parents('.num').find('input').val(n); //赋值回去
                $(this).parents('.book-item').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格

                _this.compute(); //总计选中的商品数量
                _this.saveAmount(); //总计所有商品数量
                _this.setCookie($(this)); //重新设置cookie
            });
            $(".less").on("click",function() {
                var n = $(this).parents('.num').find('input').val();//值
                n--;
                if(n<1) {
                    n=1;
                }
                $(this).parents('.num').find('input').val(n); //赋值回去
                $(this).parents('.book-item').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格

                _this.compute(); //总计选中的商品数量
                _this.saveAmount(); //总计所有商品数量
                _this.setCookie($(this)); //重新设置cookie
            });
            $(".num input").on("input",function() {
                var $reg = /^\d+$/g; //只能输入数字
                var $value = parseInt($(this).val());
                if ($reg.test($value)) {//是数字
                    if ($value >= 99) {//限定范围
                        $(this).val(99);
                    } else if ($value <= 0) {
                        $(this).val(1);
                    } else {
                        $(this).val($value);
                    }
                } else {//不是数字
                    $(this).val(1);
                }
                $(this).parents('.book-item').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格

                _this.compute(); //总计选中的商品数量
                _this.saveAmount(); //总计所有商品数量
                _this.setCookie($(this)); //重新设置cookie
            });
        }
        // 计算数量改变后单个商品的价格
        singlegoodsprice(obj) { //obj:当前元素
            var $dj = parseFloat(obj.parents('.book-item').find('.f3 span').html()); //单价
            var $cnum = parseInt(obj.parents('.num').find('input').val()); //数量
            return ($dj * $cnum).toFixed(2);//结果
        }
        // 重新设置cookie
        setCookie(obj) {
            //提前获取cookie里面id和num
            this.getCookie();
            // 重新设置
            var $index = obj.parents('.book-item').find('img').attr('sid');//通过id找数量的位置
            this.arrnum[$.inArray($index,this.arrsid)] = obj.parents('.num').find('input').val();
            $.cookie('cookienum', this.arrnum.toString(),{expires:7});
        }
        // 删除cookie方法
        delCookie(sid,arrsid) {
            var $index = -1;
	        $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid == value){
	    		    $index = index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	    }
            });
            arrsid.splice($index, 1);//删除数组对应的值
            this.arrnum.splice($index, 1);//删除数组对应的值
            $.cookie('cookiesid', arrsid.toString(), {expires:7});//添加cookie
	        $.cookie('cookienum', this.arrnum.toString(), {expires:7});//添加cookie
        }
        // 删除当前商品
        delCurrentItem() {
            var _this = this;
            this.$bookslist.on('click','.f6 .del',function() {
                _this.getCookie();
                if(confirm('你确定要删除吗？')){
                    $(this).parents('.book-item').remove();// 通过当前点击的元素找到整个一行列表，删除
                    _this.delCookie($(this).parents('.book-item').find('.f1 img').attr('sid'),_this.arrsid); // 删除对应的cookie
                    _this.compute(); //总计选中的商品数量
                    _this.saveAmount(); //总计所有商品数量
                }
            });
        }
        // 删除所有被选中的商品
        delAllItem() {
            var _this = this;
            $('.del-all').on('click',function() {
                _this.getCookie();
                if(confirm('你确定要删除吗？')) {
                    $('.book-item:visible').each(function(index,element) {
                        if($(element).find('.f1 input:checkbox').prop('checked')){ //只删除被选中的元素
                            $(element).remove();
                            _this.delCookie($(element).find('.f1 img').attr('sid'),_this.arrsid); // 删除对应的cookie
                        }
                    });
                    _this.compute(); //总计选中的商品数量
                    _this.saveAmount(); //总计所有商品数量
                }
            });
        }
    }
    new drawCart().init();
})();
