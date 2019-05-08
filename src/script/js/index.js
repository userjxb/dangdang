/* 主页js效果 (下拉菜单、搜索引擎、数据渲染、懒加载)*/

// 导入页头和页尾
;(function ($) {
    $(".header").load("header.html"); // 引入头部html
    $(".footer").load("footer.html"); // 引入尾部html
})(jQuery);

//banner简单轮播图
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
            // 鼠标移入关闭自动轮播、鼠标移出开启自动轮播
            this.$silderBox.on("mouseover",function() {
                clearInterval(_this.timer);
            });
            this.$silderBox.on("mouseout",function() {
                _this.autoplay();
            });
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

// 幻灯片效果(新书预售)
;(function ($) {
    class slider {
        constructor() {
            //获取元素
            this.$imgsUl = $('.open-to-booking .content');
            this.$imgsLi = $('.open-to-booking .content li');
            this.$olBtn = $('.open-to-booking ol li');
            this.$leftBtn = $('.open-to-booking .prev');
            this.$rightBtn = $('.open-to-booking .next');

            this.timer = null;
            this.num = 0;
            this.bstop = true;
        }
        init() {
            var _this = this;
            // 小圆点控制
            this.$olBtn.on('mouseover', function () {
                _this.num = $(this).index();
                _this.imgChange();
            });
            // 点击左按钮切换到上一张
            this.$leftBtn.on('click', function () {
                _this.prev();
            });
            // 点击右按钮切换到上一张
            this.$rightBtn.on('click', function () {
                _this.next();
            });
        }
        // 图片切换
        imgChange() {
            var _this = this;

            if(this.num < 0) {
                this.num = this.$olBtn.length - 1;
            }else if(this.num > this.$olBtn.length - 1) {
                this.num = 0;
            }
            
            this.$olBtn.eq(this.num).addClass('active').siblings().removeClass('active');

            this.$liWidth = this.$imgsLi.eq(0).width();
            this.l = -this.$liWidth * this.num;
            
            this.$imgsUl.stop().animate({
                left: this.l
            }, function () {
                _this.bstop = true;
            });
        }
        // 左按钮功能
        prev() {
            if(this.bstop) {
                this.bstop = false;
                this.num--;
                this.imgChange();
            }
        }
        // 右按钮功能
        next() {
            if(this.bstop) {
                this.bstop = false;
                this.num++;
                this.imgChange();
            } 
        }
    }
    new slider().init();

})(jQuery);

// 幻灯片效果(新书上架)
;(function ($) {
    class slider {
        constructor() {
            //获取元素
            this.$imgsUl = $('.slider .content');
            this.$imgsLi = $('.slider .content .con');
            this.$olBtn = $('.slider .btns li');
            this.$leftBtn = $('.slider .prev');
            this.$rightBtn = $('.slider .next');

            this.timer = null;
            this.num = 0;
            this.bstop = true;
        }
        init() {
            var _this = this;
            // 小圆点控制
            this.$olBtn.on('mouseover', function () {
                _this.num = $(this).index();
                _this.imgChange();
            });
            // 点击左按钮切换到上一张
            this.$leftBtn.on('click', function () {
                _this.prev();
            });
            // 点击右按钮切换到上一张
            this.$rightBtn.on('click', function () {
                _this.next();
            });
        }
        // 图片切换
        imgChange() {
            var _this = this;

            if(this.num < 0) {
                this.num = this.$olBtn.length - 1;
            }else if(this.num > this.$olBtn.length - 1) {
                this.num = 0;
            }
            
            this.$olBtn.eq(this.num).addClass('active').siblings().removeClass('active');

            this.$liWidth = this.$imgsLi.eq(0).width();
            this.l = -this.$liWidth * this.num;
            
            this.$imgsUl.stop().animate({
                left: this.l
            }, function () {
                _this.bstop = true;
            });
        }
        // 左按钮功能
        prev() {
            if(this.bstop) {
                this.bstop = false;
                this.num--;
                this.imgChange();
            }
        }
        // 右按钮功能
        next() {
            if(this.bstop) {
                this.bstop = false;
                this.num++;
                this.imgChange();
            } 
        }
    }
    new slider().init();

})(jQuery);

// 数据渲染
;(function ($) {
    class drawAll {
        constructor() {
            this.$newbook = $('.newbook .content .con'); //新书上架
            this.$exclusive = $(".exclusive .tab-content .con"); //独家特供
            this.$chiefRecommend = $(".chief-recommend .tab-content .con"); //主编推荐
            this.$guessYouLike = $(".guess-you-like .tab-content .con"); //猜你喜欢
            this.$readerRecommend = $(".reader-recommend .tab-content .con"); //读者推荐
            this.$phpUrl = 'http://10.31.163.63/dangdang/php/';
        }
        
        init() {
            var _this = this;
            this.drawData(this.$newbook,8); //新书上架渲染
            this.drawData(this.$exclusive,10); //独家特供渲染
            this.drawData(this.$chiefRecommend,10); //主编推荐渲染
            this.drawData(this.$guessYouLike,10); //猜你喜欢渲染
            this.drawData(this.$readerRecommend,10); //读者推荐渲染
        }

        // 数据渲染
        drawData(ele,num) {
            var _this = this;
            $.ajax({
                url: this.$phpUrl + 'allData.php',
                dataType:'json',
                success:function(data) {
                    let $htmlStr = '';
                    let ebookHtmlStr = '';
                    // 判断有没有传入num
                    var n = num || data.length;
                    
                    $.each(data, function (index, value) {
                        // 电子书价格的拼接
                        ebookHtmlStr = `<span class="ebookprice">
                                            <span class="ebookprice_title">电子书</span>
                                            <span class="sign">¥</span><span class="num">${value.ebookprice}</span>
                                        </span>`;
                        // 每本图书的拼接
                        if(index<n) {
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
                        }
                    });
                    ele.html($htmlStr);
                }
            });
        }
    }
    
    new drawAll().init();
})(jQuery)