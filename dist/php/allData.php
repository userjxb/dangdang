<?php

    include 'conn.php';

    $reslut = mysql_query("select * from books ");

    $arr = array();
    for($i=0;$i<mysql_num_rows($reslut);$i++) {
        $arr[$i] = mysql_fetch_array($reslut,MYSQL_ASSOC);
    }
    echo json_encode($arr);

?>