<?php

    header('content-type:text/html;charset=utf-8');
    $conn = @mysql_connect('localhost','root','');

    if(!$conn) {
        echo '数据库连接错误！';
    }

    mysql_select_db('dangdang');
    mysql_query('SET NAMES UTF8');

?>