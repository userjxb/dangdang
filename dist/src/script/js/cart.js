"use strict";var _createClass=function(){function n(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(i,e,t){return e&&n(i.prototype,e),t&&n(i,t),i}}();function _classCallCheck(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}!function(i){function e(){_classCallCheck(this,e),this.$account=i.cookie("account")}(new(_createClass(e,[{key:"init",value:function(){this.$account?(i(".login-tip").hide(),i(".welcome").show()):(i(".login-tip").show(),i(".welcome").hide()),this.exit()}},{key:"exit",value:function(){i(".exit-btn").on("click",function(){confirm("你确定要退出吗？")&&(i.cookie("account","null",{expires:-1}),i(".login-tip").show(),i(".welcome").hide())})}}]),e)).init()}(jQuery),function(){function i(){_classCallCheck(this,i),this.$bookslist=$(".bookslist"),this.$phpUrl="http://10.31.163.63/dangdang/php/",this.arrsid=[],this.arrnum=[],this.timer=null}(new(_createClass(i,[{key:"init",value:function(){var t=this;this.getCookie(),$.each(t.arrsid,function(i,e){t.drawList(t.arrsid[i],t.arrnum[i])}),this.allSelect(),this.bookCount(),this.delCurrentItem(),this.delAllItem(),this.timer=setTimeout(function(){t.saveAmount()},100)}},{key:"saveAmount",value:function(){var t=0;$(".book-item:visible").each(function(i,e){t+=parseInt($(e).find(".f4 .num input").val())}),$.cookie("amount",t,{expires:7})}},{key:"getCookie",value:function(){$.cookie("cookiesid")&&$.cookie("cookienum")&&(this.arrsid=$.cookie("cookiesid").split(","),this.arrnum=$.cookie("cookienum").split(","))}},{key:"drawList",value:function(n,o){var s=this;$.ajax({url:this.$phpUrl+"allData.php",dataType:"json",success:function(i){$.each(i,function(i,e){if(n==e.sid){var t=$(".book-item:hidden").clone(!0);t.find(".f1 img").attr("src",e.picurl),t.find(".f1 img").attr("sid",e.sid),t.find(".f2").html(e.name),t.find(".f3 span").html(e.newprice),t.find(".f4 input").val(o),t.find(".f5 span").html((e.newprice*o).toFixed(2)),t.css("display","block"),s.$bookslist.append(t)}}),s.compute()}})}},{key:"allSelect",value:function(){var i=this,e=setTimeout(function(){$(".book-item:visible").find(".single").prop("checked",$("#all").prop("checked")),i.compute(),clearTimeout(e)},100);$("#all").on("change",function(){$(".book-item:visible").find(".single").prop("checked",$(this).prop("checked")),i.compute()}),this.$bookslist.on("change",".single",function(){$(".book-item:visible").find("input:checkbox").length==$(".book-item:visible").find("input:checked").length?$("#all").prop("checked",!0):$("#all").prop("checked",!1),i.compute()})}},{key:"compute",value:function(){var t=0,n=0;$(".book-item:visible").each(function(i,e){$(e).find(".single").prop("checked")&&(t+=parseInt($(e).find(".f4 .num input").val()),n+=parseFloat($(e).find(".f5 span").html()))}),$(".book-count").find("span").html(t),$(".all-price").find("span").html(n.toFixed(2))}},{key:"bookCount",value:function(){var e=this;$(".more").on("click",function(){var i=$(this).parents(".num").find("input").val();99<++i&&(i=99),$(this).parents(".num").find("input").val(i),$(this).parents(".book-item").find(".f5 span").html(e.singlegoodsprice($(this))),e.compute(),e.saveAmount(),e.setCookie($(this))}),$(".less").on("click",function(){var i=$(this).parents(".num").find("input").val();--i<1&&(i=1),$(this).parents(".num").find("input").val(i),$(this).parents(".book-item").find(".f5 span").html(e.singlegoodsprice($(this))),e.compute(),e.saveAmount(),e.setCookie($(this))}),$(".num input").on("input",function(){var i=parseInt($(this).val());/^\d+$/g.test(i)?99<=i?$(this).val(99):i<=0?$(this).val(1):$(this).val(i):$(this).val(1),$(this).parents(".book-item").find(".f5 span").html(e.singlegoodsprice($(this))),e.compute(),e.saveAmount(),e.setCookie($(this))})}},{key:"singlegoodsprice",value:function(i){return(parseFloat(i.parents(".book-item").find(".f3 span").html())*parseInt(i.parents(".num").find("input").val())).toFixed(2)}},{key:"setCookie",value:function(i){this.getCookie();var e=i.parents(".book-item").find("img").attr("sid");this.arrnum[$.inArray(e,this.arrsid)]=i.parents(".num").find("input").val(),$.cookie("cookienum",this.arrnum.toString(),{expires:7})}},{key:"delCookie",value:function(t,i){var n=-1;$.each(i,function(i,e){t==e&&(n=i)}),i.splice(n,1),this.arrnum.splice(n,1),$.cookie("cookiesid",i.toString(),{expires:7}),$.cookie("cookienum",this.arrnum.toString(),{expires:7})}},{key:"delCurrentItem",value:function(){var i=this;this.$bookslist.on("click",".f6 .del",function(){i.getCookie(),confirm("你确定要删除吗？")&&($(this).parents(".book-item").remove(),i.delCookie($(this).parents(".book-item").find(".f1 img").attr("sid"),i.arrsid),i.compute(),i.saveAmount())})}},{key:"delAllItem",value:function(){var t=this;$(".del-all").on("click",function(){t.getCookie(),confirm("你确定要删除吗？")&&($(".book-item:visible").each(function(i,e){$(e).find(".f1 input:checkbox").prop("checked")&&($(e).remove(),t.delCookie($(e).find(".f1 img").attr("sid"),t.arrsid))}),t.compute(),t.saveAmount())})}}]),i)).init()}();