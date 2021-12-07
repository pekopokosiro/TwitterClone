
<?php
// エラー表示あり
ini_set('display_errors', 1);
// 日本時間にする
date_default_timezone_set('Asia/Tokyo');
// URL/ディレクトリ設定
define('HOME_URL', '/');
// データベースの接続情報
define('DB_HOST', 'CLEARDB_DATABASE_URL');
define('DB_USER', 'root');
define('DB_PASSWORD', 'b17b26331719ad:08928e37@us-cdbr-east-04.cleardb.com/heroku_c2b349a1af63846');
define('DB_NAME', 'twitter_clone');