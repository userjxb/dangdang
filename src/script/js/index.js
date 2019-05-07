/* 主页js效果 */

// 导入页头和页尾
;(function ($) {
    $(".header").load("header.html"); // 引入头部html
    $(".footer").load("footer.html"); // 引入尾部html
})(jQuery);

//banner轮播图
;(function ($) {
    class Silder {
        constructor() {
            this.$silderBox = $(".slider-tab"); //轮播图盒子
            this.$olBtns = $(".slider-tab .btns li"); //小圆点
            this.$pics = $(".slider-tab .pics li"); //图片
            this.timer = null; //定时器
            this.num = 0; //存放索引
        }
        // 初始化方法
        init() {
            var _this = this;
            // 自动轮播
            this.autoplay();
            // 小圆点控制
            this.$olBtns.on('mouseover', function () {
                _this.num = $(this).index();
                _this.imgChange();
            });
        }
        // 图片切换
        imgChange() {
            // 控制索引范围
            if(this.num < 0) {
                this.num = this.$olBtns.length - 1;
            }else if(this.num > this.$olBtns.length - 1) {
                this.num = 0;
            }
            // 控制样式
            this.$olBtns.eq(this.num).addClass('active').siblings().removeClass('active');
            this.$pics.eq(this.num).show().siblings().hide();
        }
        //自动轮播
        autoplay() {
            var _this = this;
            this.timer = setInterval(function() {
                _this.num++;
                _this.imgChange();
            },2000);
        }
    }
    new Silder().init();
})(jQuery);

//返回顶部
;(function($) {
    class backTop {
        constructor() {
            this.$backBox = $('.aside .back-top'); //回到顶部盒子
            this.$backTop = $('.aside .back-top a'); //回到顶部按钮
        }

        init() {
            var _this = this;
            // 回到顶部盒子显示和隐藏
            this.showOrhide();
            $(window).scroll(function () {
                _this.showOrhide();
            });
            // 点击按钮回到顶部
            this.$backTop.click(function () {
                _this.back();
            });
        }
        // 显示和隐藏
        showOrhide() {
            this.$top = $('html,body').scrollTop();
            if (this.$top > 500) {
                this.$backBox.show();
            } else {
                this.$backBox.hide();
            }
        }
        // 回到顶部
        back() {
            $('html,body').animate({
                scrollTop: 0
            });
        }
    }
    new backTop().init();
})(jQuery);

// tab切换
;(function($) {

    $(".tab").tab({
        etype: "mouseover",
        btnLi: ".tab-title li",
        contentLi: ".tab-content .con",
        addLiClass: "active"
    });

})(jQuery);

// 数据渲染
;(function ($) {
    class drawAll {
        constructor() {
            this.$content = $('.newbook .content .con');
            this.$phpUrl = 'http://10.31.163.63/dangdang/php/';
        }
    
        init() {
            var _this = this;
            this.newbook();
        }

        // 新书上架数据渲染
        newbook() {
            var _this = this;
            $.ajax({
                url: this.$phpUrl + 'allData.php',
                dataType:'json',
                success:function(data) {
                    let $htmlStr = '';
                    let ebookHtmlStr = '';
                    let valueArr = []; 
                    $.each(data, function (index, value) {
                        valueArr.push(value);
                        $.each(valueArr,function(index,value) {
                            
                        });
                        // 电子书价格的拼接
                        ebookHtmlStr = `<span class="ebookprice">
                                            <span class="ebookprice_title">电子书</span>
                                            <span class="sign">¥</span><span class="num">${value.ebookprice}</span>
                                        </span>`;
                        // 每本图书的拼接
                        $htmlStr += `<li>
                                        <a href="detail.html?sid=${value.sid}" target="_blank">
                                            <img src=${value.picurl}>
                                        </a>
                                        <p class="name">
                                            <a href="detail.html?sid=${value.sid}">${value.name}</a>
                                        </p>
                                        <p class="author">${value.author} 著</p>
                                        <p class="price">
                                            <span class="new-price">
                                                <span class="sign">¥</span>
                                                <span class="num">${value.newprice}</span>
                                            </span>
                                            <span class="old-price">
                                                <span class="sign">¥</span>
                                                <span class="num">${value.oldprice}</span>
                                            </span>
                                            ${value.ebookprice?ebookHtmlStr:''}
                                        </p>
                                    </li>`;
                    });
                    $htmlStr += $htmlStr;
                    _this.$content.html($htmlStr);
                }
            });
        }
    }
    
    new drawAll().init();
})(jQuery);