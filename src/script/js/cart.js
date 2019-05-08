/* 购物车页面js (合计、加减、删除、判断是否登录、全选)*/

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
        }

        bookslist(id,count){
            var _this = this;
            $.ajax({
                url: this.$phpUrl + 'allData.php',//获取所有的接口数据
                dataType:'json',
                success: function(data) {
                    $.each(data,function(index,value){
                        if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                            var $clonebox=_this.$bookslist.find("ul:hidden").clone(true,true);
                            $clonebox.find(".f1 img").attr("src",value.picurl);
                            $clonebox.find(".f2").html(value.name);
                            $clonebox.find(".f3 span").html(value.newprice);
                            $clonebox.find(".f4 input").val(count);
                            $clonebox.find(".f5 span").html(value.newprice*count);
                            _this.$bookslist.append($clonebox);
                        }
                    });
                }
            })
        }
    }
    new drawCart().init();
})();

// 合计
;(function($) {
    class total {
        constructor() {
            this.$bookslist = $(".bookslist");
            this.totalNum = $(".all-const .book-count span");
            this.totalPrice = $(".all-const .all-price");
        }

        init() {
            
        }
    }
    new total().init();
})(jQuery);
