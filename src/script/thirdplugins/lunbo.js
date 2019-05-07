(function ($) {
    jQuery.fn.tab = function (options) {
        // 设置默认参数
        var defaults = {
            etype: 'mouseover',
            btnLi: '.btns li',
            contentLi: '.content .item',
            addLiClass: 'active',
        };
        // 覆盖默认参数
        var settings = $.extend(true,{},defaults,options);
        
        this.each(function () {
            var _this = $(this);
            _this.find(settings.btnLi).on(settings.etype,function() {
               $(this).addClass(settings.addLiClass).siblings().removeClass(settings.addLiClass);
               _this.find(settings.contentLi).eq($(this).index()).show().siblings().hide();
            });
        });
    };
})(jQuery);