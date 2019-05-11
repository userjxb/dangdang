<?php

    header('Content-Type: text/html;charset=utf-8');

    if(isset($_GET['keyword'])) {
        $keyword = $_GET['keyword'];
        $content=file_get_contents('http://schprompt.dangdang.com/suggest_new.php?keyword='.$keyword );
        // echo $content;
        echo iconv("GB2312","UTF-8",$content);
    }

?>