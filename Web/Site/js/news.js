window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
        if (isOnline()) {
            getNews();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}


function getNews() {
    leng = localStorage.length + 1;
    for (var i = 1; i < leng; i++) {
        news = JSON.parse(localStorage.getItem('1'));
        var parentElem = document.getElementById('news-list');
        var out = document.createElement('div');
        out.id = 'news';
        out.innerHTML =
            "<div class='col-md-4' ><div class='thumbnail'> <a href='#'> <img src='images/news3.jpg'>" +
            "<div class='caption'><p>" + news[0].caption + "</p>" +
            "</div> <p>" + news[0].text + "</p> </a></div></div>";
        parentElem.appendChild(out);
    }
}