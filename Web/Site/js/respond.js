var useLocalStorage = true;
var index = 0;

window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            reviewsOffline();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}

function addResponse() {
    if ($('#name').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }

    if (isOnline()){
        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('reviews-list');
        var out = document.createElement('div');
        out.id = 'reviews';
        out.innerHTML =
            "<div class='container' style='border-bottom: dotted 1px'>" +
            "   <br><span class='review-author'>" + author + "</span>" +
            "   <span class='review-date'>" + date + "</span>" +
            "   <p><br>" + text + "</p><br></div>";
        parentElem.appendChild(out);
        document.getElementById('form').reset();
    } else {
        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        index ++;
        var objects = [];
        objects.push({'author':author,'text':text,'date':date});
        localStorage.setItem(index , JSON.stringify(objects));
        document.getElementById('form').reset();
        alert('Збережено локально.');
    }
}

function addRespondOffline() {
    var date = new Date;
    var author = document.getElementById('name').value;
    var text = document.getElementById('text').value;
    index ++;
    var objects = [];
    objects.push({'author':author,'text':text,'date':date});
    localStorage.setItem(index , JSON.stringify(objects));
    document.getElementById('form').reset();
    alert('Збережено локально.');
}

function getResponse() {
        leng = localStorage.length+1;
    for (var i = 1; i < leng; i++){
        responds = JSON.parse(localStorage.getItem(i));
        var parentElem = document.getElementById('reviews-list');
        var out = document.createElement('div');
        out.id = 'responses';
        out.innerHTML=
            out.innerHTML =
                "<div class = container>" +
                "<div class='main-text' style='border-bottom: solid 1px'>" +
                "<br>" +
                "<span class='author'>" + responds[0].author + "</span>" +" "+
                "<span class='date'>" + responds[0].date + "</span><p><br>" + responds[0].text+
                "</p><br></div></div>";
        parentElem.appendChild(out);
    }

}