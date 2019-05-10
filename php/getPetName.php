<?php

    include 'conn.php';

    if(isset($_GET['account'])) {
        $account = $_GET['account'];

        $result = mysql_query("select * from user where username='$account' or tel='$account' or email='$account' ");

        echo json_encode(mysql_fetch_array($result,MYSQL_ASSOC));
    }

?>