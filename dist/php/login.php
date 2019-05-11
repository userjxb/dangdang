<?php

    include 'conn.php';

    if(isset($_POST['name']) && isset($_POST['pass'])) {
        $name = $_POST['name'];
        $pass = sha1($_POST['pass']);

        $usernameRes=mysql_query("select * from user where username='$name' and password='$pass' ");
        $telRes=mysql_query("select * from user where tel='$name' and password='$pass' ");
        $emailRes=mysql_query("select * from user where email='$name' and password='$pass' ");
        
        $flag1 = mysql_fetch_array($usernameRes,MYSQL_ASSOC);
        $flag2 = mysql_fetch_array($telRes,MYSQL_ASSOC);
        $flag3 = mysql_fetch_array($emailRes,MYSQL_ASSOC);

        if($flag1 || $flag2 || $flag3) {
            echo true;
        }else {
            echo false;
        }
    }
?>