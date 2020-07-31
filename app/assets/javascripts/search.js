$(function() {

  let search_list = $(".content");

  function appendTweet(tweet) {
    if(tweet.user_sign_in && tweet.user_sign_in.id == tweet.user_id){
      let html = `<div class="content__post" style="background-image: url(${tweet.image});">
                  <div class="content__post__more">
                    <ul class="more_list">
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="get" >詳細</a>
                      </li>
                      <li>
                        <a href="/tweets/${tweet.id}/edit" data-method="get" >編集</a>
                      </li>
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="delete" >削除</a>
                      </li>
                    </ul>
                  </div>
                  <p>${tweet.text}</p><br>
                  <span class="contents__post__name">
                    <a href="/users/${tweet.user_id}">
                      <span>投稿者</span>${tweet.nickname}
                    </a>
                  </span>
                </div>`
    search_list.append(html);
    } else {
      let html = `<div class="content__post" style="background-image: url(${tweet.image});">
                  <div class="content__post__more">
                    <ul class="more_list">
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="get" >詳細</a>
                      </li>
                    </ul>
                  </div>
                  <p>${tweet.text}</p><br>
                  <span class="content__post__name">
                    <a href="/users/${tweet.user_id}">
                      <span>投稿者</span>${tweet.nickname}
                    </a>
                  </span>
                </div>`
    search_list.append(html);
    }
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class='name'>${ msg }</div>`
    search_list.append(html);
  }

  $(".search-input").on("keyup", function() {
    let input = $(".search-input").val();
    $.ajax({
      type: 'GET',
      url: '/tweets/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(tweets) {
      search_list.empty();
      $(".contents.row").empty();
      if (tweets.length !== 0) {
        tweets.forEach(function(tweet){
          appendTweet(tweet);
        });
      }
      else {
        appendErrMsgToHTML("一致するツイートがありません");
      }
    })
    .fail(function() {
      alert('error');
    });
  });
});