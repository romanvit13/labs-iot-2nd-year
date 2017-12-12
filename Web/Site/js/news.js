function isOnline() {
    return window.navigator.onLine;
}
window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
        if (isOnline()) {
            getNews();
            alert('Завантажено!');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

useLocalStorage = false;
var lab8 = true;

function getNews() {
    if (lab8) {
        leng = localStorage.length + 1;
        for (var i = 1; i < leng; i++) {
            news = JSON.parse(localStorage.getItem(i));
            var parentElem = document.getElementById('newsList');
            var out = document.createElement('div');
            out.id = 'news';
            out.innerHTML =
                "<div class='col-md-4' ><div class='thumbnail'> <a href='#'> <img src='images/news3.jpg'>" +
                "<div class='caption'><p>" + news[0].caption + "</p>" +
                "</div> <p>" + news[0].text + "</p> </a></div></div>";
            parentElem.appendChild(out);
            localStorage.removeItem(i);
            localStorage.clear();
            alert('Отримано з Local storage');
        }
    } else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('newsList');
                var out = document.createElement('div');
                out.innerHTML =
                    "<div class='col-md-4' ><div class='thumbnail'> <a href='#'> <img src='images/news3.jpg'>" +
                    "<div class='caption'><p>" + cursor.value.caption + "</p>" +
                    "</div> <p>" + cursor.value.text + "</p> </a></div></div>";
                parentElem.appendChild(out);
                alert('Отримано з IndexDB');
            }
        }
    }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest().onreadystatechange=function (ev) {  }
    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getOnlineNews() {
    url = "localhost8000";
    httpGet(url);

}