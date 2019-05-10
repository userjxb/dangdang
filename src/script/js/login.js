/* 登录js */
 
// 引入尾部html
;(function($) {
    $(".footer").load("footer.html");
})(jQuery);

// 登录
;(function($) {
    class login {
        constructor() {
            this.loginBtn = $('.login-btn a');
            this.phpUrl = "http://10.31.163.63/dangdang/php/";
        }

        init() {
            var _this= this;
            // 按钮登录
            this.loginBtn.on('click',function() {
                _this.login();
            });
            // 回车键登陆
            $(document).on('keydown',function(e) {
                if(e.keyCode == 13) {
                    _this.login();
                }
            });
        }
        // 登录
        login() {
            var $account = $('#account').val();
            var $password = $('#password').val();
            $.ajax({
                type: 'post',
                url: this.phpUrl + 'login.php',
                data: {
                    name: $account,
                    pass: $password
                }
            }).done(function(data) {
                if(!data){  //用户名或者密码错误
                    alert('用户名或者密码错误');
                    $('#password').val('');
                }else{  //成功,勾选自动登录存cookie7天,否则不设置时间,跳转到首页
                    if($('#auto').prop('checked')){
                        $.cookie('account',$account,{expires:7});
                    } else {
                        $.cookie('account',$account);
                    }
                    location.href='index123.html';
                }
            });
        }
    }
    new login().init();
})(jQuery);