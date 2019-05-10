<?php

    include 'conn.php';
    // 判断手机号是否被注册
    if(isset($_POST['tel'])) {
        $tel = $_POST['tel'];

        $res = mysql_query("select * from user where tel='$tel' ");

        if(!mysql_fetch_array($res,MYSQL_ASSOC)) {
            echo 'true';
        }else {
            echo 'false';
        }
    }

    if(isset($_POST['username'])) {
        $username = $_POST['username'];

        $res = mysql_query("select * from user where username='$username' ");

        if(!mysql_fetch_array($res,MYSQL_ASSOC)) {
            echo 'true';
        }else {
            echo 'false';
        }
    }

    if(isset($_POST['email'])) {
        $email = $_POST['email'];

        $res = mysql_query("select * from user where email='$email' ");

        if(!mysql_fetch_array($res,MYSQL_ASSOC)) {
            echo 'true';
        }else {
            echo 'false';
        }
    }
    
    // 将注册信息添加到数据库
    if(isset($_POST['submit'])) {
        $name = $_POST['username'];
        $pass = sha1($_POST['password']);
        $tel = $_POST['tel'];
        $email = $_POST['email'];
        mysql_query("insert user values(null,'$name','$pass','$tel','$email')");
        header('location:http://10.31.163.63/dangdang/src/login.html');
    }
?>