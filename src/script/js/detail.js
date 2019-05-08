/* 详情页js */

// 引入头部
;(function($) {
    $(".topbar").load("header.html .topbar");
    $(".logo-line").load("header.html .logo-line");
    $(".nav-top").load("header.html .nav-top");    
})(jQuery);

// 发送接收数据
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
                    _this.$spic.find('img').attr('src',data.picurl);
                    _this.$bpic.attr('src',data.picurl);
                    _this.$title.html(data.name); //书名
                    _this.$description.html(data.description); //描述
                    _this.$msg.find('.author span').html(data.author); //作者
                    _this.$msg.find('.press span').html(data.press); //出版社
                    _this.$msg.find('.press-time span').html(data.presstime); //出版时间
                    _this.$price.find('.new-price .p').html(data.newprice); //新价格
                    _this.$price.find('.old-price').html(data.oldprice); //旧价格
                    // 判断是否有电子书价
                    data.ebookprice?_this.$price.find('.ebook-price .p').html(data.ebookprice): _this.$price.find('.ebook-price').html('');
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
                    this.liWidth = 60;
                    _this.$picList.width(this.liWidth*urlArr.length);
                }
            });
        }
    }
    new details().init();
})(jQuery);

//放大镜效果
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
            this.$imgLi = $('.pic-group ul li');
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

            // 一开始左边按钮隐藏，若小组片多于5张则右边按钮显示
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
            if($imgLi.length == this.showlength) {
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
