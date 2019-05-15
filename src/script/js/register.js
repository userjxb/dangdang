/* 注册js */

// 引入尾部html
; (function ($) {
    $(".footer").load("footer.html");
})(jQuery);

// 注册
; (function ($) {

    class register {
        constructor() {
            this.regForm = $('#reg-form');
            this.phpUrl = "http://10.31.163.63/dangdang/php/";
        }

        init() {
            // 自定义规则
            $.validator.addMethod("isMobile", function (value, element) {
                var length = value.length;
                var mobile = /^1[35789]\d{9}$/;
                return this.optional(element) || (length == 11 && mobile.test(value));
            }, "手机号格式错误");
            $.validator.addMethod("isAgreeRule", function(value, element) {
                return element.checked;
            }, "请阅读并同意用户协议后提交");

            this.regForm.validate({
                rules: {
                    tel: {
                        required: true,
                        isMobile: true,
                        remote: {
                            type: 'post',
                            url: this.phpUrl + "register.php"
                        }
                    },
                    username: {
                        required: true,
                        minlength: 2,
                        maxlength: 20,
                        remote: {
                            type: 'post',
                            url: this.phpUrl + "register.php"
                        }
                    },
                    email: {
                        required: true,
                        email: true,
                        remote: {
                            type: 'post',
                            url: this.phpUrl + "register.php"
                        }
                    },
                    password: {
                        required: true,
                        minlength: 6,
                        maxlength: 16
                    },
                    repass: {
                        required: true,
                        equalTo: '#password'
                    },
                    agreeRule: {
                        isAgreeRule: true
                    }
                },
                messages: {
                    tel: {
                        required: '手机号不能为空',
                        digits: "手机号格式错误",
                        minlength: "手机号格式错误",
                        maxlength: "手机号格式错误",
                        remote: "手机号已被注册"
                    },
                    username: {
                        required: '用户名不能为空',
                        minlength: '用户名不能小于2个字符',
                        maxlength: '用户名不能大于20个字符',
                        remote: '用户名已被注册'
                    },
                    email: {
                        required: '邮箱不能为空',
                        email: '邮箱格式错误',
                        remote: '邮箱已被注册'
                    },
                    password: {
                        required: '密码不能为空',
                        minlength: '密码不能小于6位'
                    },
                    repass: {
                        required: '密码重复不能为空',
                        equalTo: '密码不匹配'
                    }
                },
                success: function (label, ele) {
                    label.text('√').addClass("success");
                },
                submitHandler:function(form){  
                    alert("注册成功");     
                    form.submit();
                }
            });
        }
    }
    new register().init();
})(jQuery);