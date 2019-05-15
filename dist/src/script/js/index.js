"use strict";var _createClass=function(){function e(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}!function(t){t(".header").load("header.html"),t(".footer").load("footer.html")}(jQuery),function(t){function n(){_classCallCheck(this,n),this.timer=null,this.$account=t.cookie("account"),this.phpUrl="http://10.31.163.63/dangdang/php/"}(new(_createClass(n,[{key:"init",value:function(){var t=this;this.timer=setTimeout(function(){t.showInfo(),clearTimeout(t.timer)},150),this.getPetName(),this.exit()}},{key:"showInfo",value:function(){this.$account?(t(".pleaseLogin").hide(),t(".welcomeWord").find("span").html(this.$account),t(".welcomeWord").show()):(t(".pleaseLogin").show(),t(".welcomeWord").hide())}},{key:"getPetName",value:function(){var n=this;t.ajax({type:"get",url:this.phpUrl+"getPetName.php",data:{account:this.$account},dataType:"json"}).done(function(t){n.$account=t.username})}},{key:"exit",value:function(){t(".header").on("click",".exit",function(){confirm("你确定要退出吗？")&&(t.cookie("account","null",{expires:-1}),t(".pleaseLogin").show(),t(".welcomeWord").hide())})}}]),n)).init()}(jQuery),function(h){function t(){_classCallCheck(this,t),this.phpUrl="http://10.31.163.63/dangdang/php/"}(new(_createClass(t,[{key:"init",value:function(){var t=this;h(".header").on("input",".search .text",function(){t.ajax()}),h(".header").on("focus",".search .text",function(){h(".search-content").is(":empty")||h(".search-content").show()}),h(".header").on("blur",".search .text",function(){h(".search-content").hide()})}},{key:"ajax",value:function(){var a=this,o=h(".search-content");h.ajax({type:"get",url:this.phpUrl+"searchData.php",data:{keyword:h(".search .text").val()}}).done(function(t){var n=t.split(";")[0].split("="),i="";h.each(n,function(t,n){console.log(n),a.isJsonFormat(n)&&(i=n)});var e=h.parseJSON(i)[2];if(""!=e.join()){var s="";h.each(e,function(t,n){h.each(n,function(t,n){s+="<li>"+t+"</li>"})}),o.html(s).show()}})}},{key:"isJsonFormat",value:function(t){try{h.parseJSON(t)}catch(t){return!1}return!0}}]),t)).init()}(jQuery),function(n){function t(){_classCallCheck(this,t),this.amount=0,this.timer=null}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.timer=setTimeout(function(){n.cookie("amount")&&(t.amount=parseInt(n.cookie("amount"))),n(".shopping-cart b").html(t.amount),clearTimeout(t.timer)},100)}}]),t)).init()}(jQuery),function(t){function n(){_classCallCheck(this,n),this.$header=t(".header")}(new(_createClass(n,[{key:"init",value:function(){this.$header.on("mouseover",".all",function(){t(".dropmenu").stop().animate({height:512},200)}),this.$header.on("mouseout",".all",function(){t(".dropmenu").stop().animate({height:0},200)}),t(".list-select").hover(function(){t(".hide-menu").show()},function(){t(".hide-menu").hide()})}}]),n)).init()}(jQuery),function(n){function t(){_classCallCheck(this,t),this.$silderBox=n(".slider-tab"),this.$olBtns=n(".slider-tab .btns li"),this.$pics=n(".slider-tab .pics li"),this.timer=null,this.num=0}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.autoplay(),this.$silderBox.on("mouseover",function(){clearInterval(t.timer)}),this.$silderBox.on("mouseout",function(){t.autoplay()}),this.$olBtns.on("mouseover",function(){t.num=n(this).index(),t.imgChange()})}},{key:"imgChange",value:function(){this.num<0?this.num=this.$olBtns.length-1:this.num>this.$olBtns.length-1&&(this.num=0),this.$olBtns.eq(this.num).addClass("active").siblings().removeClass("active"),this.$pics.eq(this.num).show().siblings().hide()}},{key:"autoplay",value:function(){var t=this;this.timer=setInterval(function(){t.num++,t.imgChange()},2e3)}}]),t)).init()}(jQuery),function(n){function t(){_classCallCheck(this,t),this.$backBox=n(".aside .back-top"),this.$backTop=n(".aside .back-top a")}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.showOrhide(),n(window).scroll(function(){t.showOrhide()}),this.$backTop.click(function(){t.back()})}},{key:"showOrhide",value:function(){this.$top=n("html,body").scrollTop(),500<this.$top?this.$backBox.show():this.$backBox.hide()}},{key:"back",value:function(){n("html,body").animate({scrollTop:0})}}]),t)).init()}(jQuery),jQuery(".tab").tab({etype:"mouseover",btnLi:".tab-title li",contentLi:".tab-content .con",addLiClass:"active"}),function(n){function t(){_classCallCheck(this,t),this.$imgsUl=n(".open-to-booking .content"),this.$imgsLi=n(".open-to-booking .content li"),this.$olBtn=n(".open-to-booking ol li"),this.$leftBtn=n(".open-to-booking .prev"),this.$rightBtn=n(".open-to-booking .next"),this.timer=null,this.num=0,this.bstop=!0}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.$olBtn.on("mouseover",function(){t.num=n(this).index(),t.imgChange()}),this.$leftBtn.on("click",function(){t.prev()}),this.$rightBtn.on("click",function(){t.next()})}},{key:"imgChange",value:function(){var t=this;this.num<0?this.num=this.$olBtn.length-1:this.num>this.$olBtn.length-1&&(this.num=0),this.$olBtn.eq(this.num).addClass("active").siblings().removeClass("active"),this.$liWidth=this.$imgsLi.eq(0).width(),this.l=-this.$liWidth*this.num,this.$imgsUl.stop().animate({left:this.l},function(){t.bstop=!0})}},{key:"prev",value:function(){this.bstop&&(this.bstop=!1,this.num--,this.imgChange())}},{key:"next",value:function(){this.bstop&&(this.bstop=!1,this.num++,this.imgChange())}}]),t)).init()}(jQuery),function(n){function t(){_classCallCheck(this,t),this.$imgsUl=n(".slider .content"),this.$imgsLi=n(".slider .content .con"),this.$olBtn=n(".slider .btns li"),this.$leftBtn=n(".slider .prev"),this.$rightBtn=n(".slider .next"),this.timer=null,this.num=0,this.bstop=!0}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.$olBtn.on("mouseover",function(){t.num=n(this).index(),t.imgChange()}),this.$leftBtn.on("click",function(){t.prev()}),this.$rightBtn.on("click",function(){t.next()})}},{key:"imgChange",value:function(){var t=this;this.num<0?this.num=this.$olBtn.length-1:this.num>this.$olBtn.length-1&&(this.num=0),this.$olBtn.eq(this.num).addClass("active").siblings().removeClass("active"),this.$liWidth=this.$imgsLi.eq(0).width(),this.l=-this.$liWidth*this.num,this.$imgsUl.stop().animate({left:this.l},function(){t.bstop=!0})}},{key:"prev",value:function(){this.bstop&&(this.bstop=!1,this.num--,this.imgChange())}},{key:"next",value:function(){this.bstop&&(this.bstop=!1,this.num++,this.imgChange())}}]),t)).init()}(jQuery),function(o){function t(){_classCallCheck(this,t),this.$newbook=o(".newbook .content .con"),this.$exclusive=o(".exclusive .tab-content .con"),this.$chiefRecommend=o(".chief-recommend .tab-content .con"),this.$guessYouLike=o(".guess-you-like .tab-content .con"),this.$readerRecommend=o(".reader-recommend .tab-content .con"),this.$phpUrl="http://10.31.163.63/dangdang/php/"}(new(_createClass(t,[{key:"init",value:function(){var n=this;this.drawData(this.$newbook,8),this.drawData(this.$exclusive.eq(0),10),this.drawData(this.$chiefRecommend.eq(0),10),this.drawData(this.$guessYouLike,10),this.drawData(this.$readerRecommend.eq(0),10),this.$exclusive.each(function(t){0<t&&n.drawData(o(this),t)}),this.$chiefRecommend.each(function(t){0<t&&n.drawData(o(this),t)}),this.$readerRecommend.each(function(t){0<t&&n.drawData(o(this),4*t)})}},{key:"drawData",value:function(n,a){o.ajax({url:this.$phpUrl+"allData.php",dataType:"json",success:function(t){var i="",e="",s=a||t.length;o.each(t,function(t,n){e='<span class="ebookprice">\n                                            <span class="ebookprice_title">电子书</span>\n                                            <span class="sign">¥</span><span class="num">'+n.ebookprice+"</span>\n                                        </span>",t<s&&(i+='<li>\n                                            <a href="detail.html?sid='+n.sid+'" target="_blank">\n                                                <img class="lazy" data-original='+n.picurl+'>\n                                            </a>\n                                            <p class="name">\n                                                <a href="detail.html?sid='+n.sid+'">'+n.name+'</a>\n                                            </p>\n                                            <p class="author">'+n.author+' 著</p>\n                                            <p class="price">\n                                                <span class="new-price">\n                                                    <span class="sign">¥</span>\n                                                    <span class="num">'+n.newprice+'</span>\n                                                </span>\n                                                <span class="old-price">\n                                                    <span class="sign">¥</span>\n                                                    <span class="num">'+n.oldprice+"</span>\n                                                </span>\n                                                "+(n.ebookprice?e:"")+"\n                                            </p>\n                                        </li>")}),n.html(i),n.find(".lazy").lazyload({effect:"fadeIn"})}})}}]),t)).init()}(jQuery);