/* 详情页js */

// 引入头部
;(function($) {
    $(".topbar").load("header.html .topbar");
    $(".logo-line").load("header.html .logo-line");
    $(".nav-top").load("header.html .nav-top");    
})(jQuery);

// 判断是否登录
; (function ($) {
    class isLogined {
        constructor() {
            this.timer = null;
            this.$account = $.cookie('account');
            this.phpUrl = "http://10.31.163.63/dangdang/php/";
        }

        init() {
            var _this = this;
            // 延迟取元素
            this.timer = setTimeout(function () {
                // 如果cookie存在，则显示欢迎，否则请求登录
                _this.showInfo();
                clearTimeout(_this.timer);
            }, 150);
            // 获取昵称
            this.getPetName();
            // 退出登录
            this.exit();
        }
        // 如果cookie存在，则显示欢迎，否则请求登录
        showInfo() {
            if (this.$account) {
                $('.pleaseLogin').hide();
                $('.welcomeWord').find('span').html(this.$account);
                $('.welcomeWord').show();
            } else {
                $('.pleaseLogin').show();
                $('.welcomeWord').hide();
            }
        }
        // 获取昵称
        getPetName() {
            var _this = this;
            $.ajax({
                type: 'get',
                url: this.phpUrl + 'getPetName.php',
                data: {
                    account: this.$account
                },
                dataType: "json",
            }).done(function (data) {
                _this.$account = data.username;
            });
        }
        // 退出登录
        exit() {
            var _this = this;
            $('.header').on('click', '.exit', function () {
                if (confirm("你确定要退出吗？")) {
                    $.cookie("account", "null", { expires: -1 });
                    $('.pleaseLogin').show();
                    $('.welcomeWord').hide();
                }
            });
        }
    }
    new isLogined().init();
})(jQuery);

// 数据渲染
;(function($) {
    class details {
        constructor() {
            this.$spic = $('.spic'); //小图片的父盒子
            this.$bpic = $('.bpic'); //大图片
            this.$picList = $('.pic-group ul'); // 小图片组
            this.$title = $('.show-info .title span'); //书名
            this.$description = $(".show-info .description"); //描述
            this.$msg = $('.show-info .msg'); //信息
            this.$price = $('.show-info .price'); //价格
            this.$phpUrl = 'http://10.31.163.63/dangdang/php/';
        }
        
        init() {
            var _this = this;
            var $sid = location.search.substring(1).split('=')[1];
            
            $.ajax({
                url: this.$phpUrl + 'oneData.php',
                data: {
                    sid : $sid
                },
                dataType: 'json',
                success: function (data) {
                    _this.$spic.find('img').attr('src',data.picurl); //给小图片设置地址
                    _this.$spic.find('img').attr('sid', data.sid); //给小图片设置sid
                    _this.$bpic.attr('src',data.picurl); //给大图片设置地址
                    _this.$title.html(data.name); //书名
                    _this.$description.html(data.description); //描述
                    _this.$msg.find('.author span').html(data.author); //作者
                    _this.$msg.find('.press span').html(data.press); //出版社
                    _this.$msg.find('.press-time span').html(data.presstime); //出版时间
                    _this.$price.find('.new-price .p span').html(data.newprice); //新价格
                    _this.$price.find('.old-price span').html(data.oldprice); //旧价格
                    // 判断是否有电子书价
                    data.ebookprice?_this.$price.find('.ebook-price .p span').html(data.ebookprice): _this.$price.find('.ebook-price').html('');
                    // 小图
                    var liStr = '';
                    var urlArr = data.piclist.split(',');
                    if(urlArr[0] != ''){
                        $.each(urlArr, function (index, value) { 
                            liStr += `<li><a href="javascript:;"><img src=${value}></a></li>`;
                        });
                        _this.$picList.html(liStr);
                    }
                    // 计算ul宽度
                    var liWidth = _this.$picList.find("li").outerWidth(true);
                    _this.$picList.width(liWidth*urlArr.length);
                }
            });
        }
        // 发送接收数据
    }
    new details().init();
})(jQuery);

// 放大镜效果
;(function($) {
    class fdj {
        constructor() {
            // 取元素
            this.$spic = $('.spic'); // 小图
            this.$sf = $('.spic .sf'); // 小放大镜
            this.$bpic = $('.bpic'); // 大图
            this.$bf = $('.bf'); // 大图的父盒子
            // 小图 和 左右按钮
            this.$imgUl = $('.pic-group ul');
            this.$prev = $('.pic-group .prev');
            this.$next = $('.pic-group .next');
        }
    
        init() {
            let _this = this;
            this.$spic.hover(function () {
                    // over
                    _this.over();
                }, function () {
                    // out
                    _this.out();
                }
            );
            // 显示图片的长度
            this.showlength = 5;

            // 一开始左边按钮隐藏
            this.$prev.hide();

            this.$prev.on('click',function() {
                _this.prev();
            });
            this.$next.on('click',function() {
                _this.next();
            });
            // 点击小图
            this.$imgUl.on('click','li',function(e) {
                let target = $(e.target);
                _this.liClick(target);
            });
        }
    
        over() {
            let _this = this;
            //计算放大镜的宽高
            this.bili = this.$bpic.width()/this.$spic.width();
            this.$sf.width(this.$bf.width()/this.bili);
            this.$sf.height(this.$bf.height()/this.bili);
            
            this.$sf.show();
            this.$bf.show();
    
            this.$spic.on('mousemove',function(e) {
                _this.move(e);
            });
        }
    
        out() {
            this.$sf.hide();
            this.$bf.hide();
        }
    
        move(e) {
            let l = e.pageX - this.$spic.offset().left - this.$sf.width()/2;
            let t = e.pageY - this.$spic.offset().top - this.$sf.height()/2;
            
            if(l<=0){
                l = 0;
            }else if(l>=this.$spic.width()-this.$sf.width()) {
                l = this.$spic.width()-this.$sf.width()
            }
            if(t<=0){
                t = 0;
            }else if(t>=this.$spic.height()-this.$sf.height()) {
                t = this.$spic.height()-this.$sf.height()
            }
    
            this.$sf.css({
                left: l,
                top: t
            });
    
            this.$bpic.css({
                left: -l*this.bili,
                top: -t*this.bili
            });
        }
        //点击小图
        liClick(curEle) {
            let imgUrl = curEle.attr('src');
            imgUrl = imgUrl.replace(/x/g,'u');
            this.$spic.find('img').attr('src',imgUrl);
            this.$bpic.attr('src',imgUrl);
        }
        // 左方向键
        prev() {
            var $imgLi = $('.pic-group ul li');
            if(this.showlength>5){
                this.showlength--;
                this.$next.show();
            }
            if(this.showlength == 5) {
                this.$prev.hide();
            }
            this.$imgUl.animate({
                left: -(this.showlength-5)*$imgLi.eq(0).outerWidth(true)
            });
        }
        // 右方向键
        next() {
            var $imgLi = $('.pic-group ul li');
            if($imgLi.length>this.showlength){
                this.showlength++;
                this.$prev.show();
            }
            if($imgLi.length <= this.showlength) {
                this.$next.hide();
            }
            this.$imgUl.animate({
                left: -(this.showlength-5)*$imgLi.eq(0).outerWidth(true)
            });
        }
    }
    new fdj().init(); 
})(jQuery);

//购买数量的加减
;(function($) {
    class bookCount {
        constructor() {
            this.$more = $("#more");
            this.$less = $("#less");
            this.$num = $(".num input");
        }

        init() {
            var _this = this;
            // 加量
            this.$more.on('click',function() {
                _this.more();
            });
            // 减量
            this.$less.on('click',function() {
                _this.less();
            });
            // 输入改变数量
            this.$num.on('input',function() {
                _this.input();
            });
        }
        // 加量
        more() {
            var n = this.$num.val();
            n++;
            if(n>99) {
                n=99;
            }
            this.$num.val(n);
        }
        // 减量
        less() {
            var n = this.$num.val();
            n--;
            if(n<1) {
                n = 1;
            }
            this.$num.val(n);
        }
        // 输入改变数量
        input() {
            var $reg = /^\d+$/g; //只能输入数字
            var $value = parseInt(this.$num.val());
            if ($reg.test($value)) {//是数字
                if ($value >= 99) {//限定范围
                    this.$num.val(99);
                } else if ($value <= 0) {
                    this.$num.val(1);
                } else {
                    this.$num.val($value);
                }
            } else {//不是数字
                this.$num.val(1);
            }
        }
    }
    new bookCount().init();
})(jQuery);

// 添加购物车商品到cookie
;(function($) {
    class cart {
        constructor() {
            this.$addBtn = $('#add-to-cart');
            this.$count = $(".num input")
            this.arrsid = []; //商品的sid
            this.arrnum = []; //商品的数量
            this.amount = 0;  //商品的总量
            this.timer = null;
        }

        init() {
            var _this = this;
            // 一开始就显示购物车里商品的总量(利用setTimeout延迟获取元素)
            this.timer = setTimeout(function() {
                // 获取商品总量cookie
                if($.cookie('amount')) {
                    _this.amount = parseInt($.cookie('amount')); //商品的总量
                }
                $(".shopping-cart b").html(_this.amount); // 赋值购物车里的商品总量
                clearTimeout(_this.timer); //清除定时器
            },100);
            // 点击加入购物车
            this.$addBtn.on('click', function() {
                _this.btnClick();
                $(".shopping-cart b").html(_this.amount); //改变商品总量
            });
        }
        //获取cookie值
        cookietoarray() {
            if($.cookie('cookiesid') && $.cookie('cookienum')) {
                this.arrsid = $.cookie('cookiesid').split(','); //cookie商品的sid  
                this.arrnum = $.cookie('cookienum').split(','); //cookie商品的num
            }
        }
        //点击加入购物车按钮。
        btnClick() {
                //获取当前的按钮对应的商品的sid
                var $sid = this.$addBtn.parents('.detail').find('#smallpic').attr('sid');
                this.cookietoarray();//获取已经存在的cookie值。
                
                if($.inArray($sid,this.arrsid) != -1) { //商品存在，数量叠加 
                    //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
                    var num = parseInt(this.arrnum[$.inArray($sid,this.arrsid)]) + parseInt(this.$count.val());
                    this.arrnum[$.inArray($sid,this.arrsid)] = num;
                    $.cookie('cookienum', this.arrnum.toString(),{expires:7}); //数组存入cookie
                    this.amount += parseInt(this.$count.val());
                    $.cookie('amount', this.amount,{expires:7}); //总量存入cookie
                } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
                    this.arrsid.push($sid); //将当前的id存入数组
                    $.cookie('cookiesid', this.arrsid.toString(),{expires:7}); //数组存入cookie
                    this.arrnum.push(this.$count.val());
                    $.cookie('cookienum', this.arrnum.toString(),{expires:7}); //数组存入cookie
                    this.amount += parseInt(this.$count.val());
                    $.cookie('amount', this.amount,{expires:7}); //总量存入cookie
                }
        }
    }
    new cart().init();
})(jQuery);