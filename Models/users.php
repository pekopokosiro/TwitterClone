<?php


/////////////////////////////
//ユーザーデータを処理
////////////////////////////

//ユーザーを作成
//@param array $data
//@return bool
//
function createUser(array $data){
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //接続チェック
    if ($mysqli->connect_errno){
            echo 'MySQLの接続に失敗しました。：'. $mysqli->connect_error. "\n";
        exit;
    }
//登録のSQLを作成
    $query = 'INSERT INTO users(email, name , nickname, password) VALUES(?,?,?,?)';
//?はplaseholder あとでセットする。
    $statement = $mysqli->prepare($query);

//パスワードをハッシュ値に変換する
$data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

//? の部分にセットする内容
// S４つはセットする値が４つあるため
//第一引数のsは（文字を表すSTRINGS）変数の方を指定している。
$statement->bind_param('ssss', $data['email'], $data['name'], $data['nickname'],$data['password']);


//処理を実行 executeが実行
$response = $statement->execute();
if($response === false){
    echo 'エラーメッセージ：'.$mysqli->error . "\n";

}

//接続を開放 closでプリペアドステートメントを終了、データベースも終了
$statement->close();
$mysqli->close();

return $response;
}
?>