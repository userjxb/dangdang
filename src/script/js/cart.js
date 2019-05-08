/* 购物车页面js (合计、计算数量改变后单个商品的价格、删除、判断是否登录、全选)*/

// 数据渲染
;(function() {
    class drawCart {
        constructor() {
            this.$bookslist = $(".bookslist"); // 商品信息盒子
            this.$phpUrl = 'http://10.31.163.63/dangdang/php/';
        }

        init() {
            var _this = this;
            // 获取cookie，执行渲染列表的函数
            if($.cookie('cookiesid') && $.cookie('cookienum')){
                var s=$.cookie('cookiesid').split(',');//数组sid
                var n=$.cookie('cookienum').split(',');//数组num
                $.each(s,function(i,value){
                    _this.bookslist(s[i],n[i]);
                });
            }
            // 商品数量的改变
            this.bookCount();
        }
        // 数据渲染
        bookslist(id,count){
            var _this = this;
            $.ajax({
                url: this.$phpUrl + 'allData.php',//获取所有的接口数据
                dataType:'json',
                success: function(data) {
                    $.each(data,function(index,value){
                        if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                            var $clonebox=_this.$bookslist.find("ul:hidden").clone(true);
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
                }
            })
        }
        // 计算总价和总的商品件数，必须是选中的商品
        
        // 商品数量的改变
        bookCount() {
            var _this = this;
            $("#more").on("click",function() {
                var n = $(this).parents('.num').find('input').val();//值
                n++;
                if(n>99) {
                    n=99;
                }
                $(this).parents('.num').find('input').val(n); //赋值回去
                $(this).parents('ul').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格
                _this.setCookie($(this));
            });
            $("#less").on("click",function() {
                var n = $(this).parents('.num').find('input').val();//值
                n--;
                if(n<1) {
                    n=1;
                }
                $(this).parents('.num').find('input').val(n); //赋值回去
                $(this).parents('ul').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格
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
                $(this).parents('ul').find('.f5 span').html(_this.singlegoodsprice($(this)));//改变后的价格
            });
        }
        // 计算数量改变后单个商品的价格
        singlegoodsprice(obj) { //obj:当前元素
            var $dj = parseFloat(obj.parents('ul').find('.f3 span').html()); //单价
            var $cnum = parseInt(obj.parents('.num').find('input').val()); //数量
            return ($dj * $cnum).toFixed(2);//结果
        }
        // 重新设置cookie
        setCookie(obj) {
            var arrsid=[]; //商品的id
            var arrnum=[]; //商品的数量
            //提前获取cookie里面id和num
            if($.cookie('cookiesid') && $.cookie('cookienum')){
                arrsid=$.cookie('cookiesid').split(',');//cookie商品的sid  
                arrnum=$.cookie('cookienum').split(',');//cookie商品的num
            }
            // 重新设置
            var $index = obj.parents('ul').find('img').attr('sid');//通过id找数量的位置
            arrnum[$.inArray($index,arrsid)] = obj.parents('.num').find('input').val();
            $.cookie('cookienum', arrnum.toString(), 7);
        }
        // 删除单个商品
    }
    new drawCart().init();
})();
