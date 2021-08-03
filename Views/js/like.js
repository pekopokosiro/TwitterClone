///////////////////////////////////////
// いいね！用のJavaScript
///////////////////////////////////////

$(function () {
    // いいね！（js-likeクラス）がクリックされた時に実行される処理
    $('.js-like').click(function () {
        //this_objにはクリックされた要素が入る。constで宣言すると再代入できなくなる
        const this_obj = $(this);
        const tweet_id = $(this).data('tweet-id');
        //クリックされた要素（this）のデータ属性（data）のlike-idがconstの宣言に入る
        const like_id = $(this).data('like-id');
        // クリック要素（this）の中にあるjs-like-countクラスの要素がconstの宣言に入る
        const like_count_obj = $(this).parent().find('.js-like-count');
        // js-like-count要素からいいね数を取得する
        let like_count = Number(like_count_obj.html());

        if (like_id) {
            // いいね！取り消し
            $.ajax({
                url: 'like.php',
                type: 'POST',
                data: {
                    'like_id': like_id
                },
                timeout: 10000
            })// 取り消しが成功
                .done(() => {
                    // いいね！カウントを減らす　ーーでマイナス
                    like_count--;
                    // 「いいね数」の要素に更新した「いいね」数をセットしている
                    like_count_obj.html(like_count);
                    // クリック要素（this_obj）のデータ属性（data）のlike-idを削除するためnull
                    this_obj.data('like-id', null);

                    // いいね！ボタンの色をグレーに変更
                    $(this).find('img').attr('src', '../Views/img/icon-heart.svg');

                }
                ).fail((data) => {
                    alert('処理中にエラーが発生しました。');
                    console.log(data);
                }
                );
        } else {
            // いいね！付与
            $.ajax({
                url: 'like.php',
                type: 'POST',
                data: {
                    'tweet_id': tweet_id
                },
                timeout: 10000
            })// いいね！が成功
                .done((data) => {
                    // いいね！カウントを増やす
                    like_count++;
                    like_count_obj.html(like_count);
                    this_obj.data('like-id', data['like_id']);

                    // いいね！ボタンの色を青に変更
                    $(this).find('img').attr('src', '../Views/img/icon-heart-twitterblue.svg');
                }
                ).fail((data) => {
                    alert('処理中にエラーが発生しました。');
                    console.log(data);
                }
                );
        }
    })
})