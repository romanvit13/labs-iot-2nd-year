function isOnline() {
    return window.navigator.onLine;
}

window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            getResponse();
            alert('Завантажено!');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

var lab8 = true;
var useLocalStorage = true;
var index = 0;

function addResponse() {
    if ($('#name').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }

    if (isOnline()) {
        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('reviewsList');
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
        if (lab8) {
            var date = new Date;
            var author = document.getElementById('name').value;
            var text = document.getElementById('text').value;
            index++;
            var objects = [];
            objects.push({'author': author, 'text': text, 'date': date});
            localStorage.setItem(index, JSON.stringify(objects));
            document.getElementById('form').reset();
            alert('Збережено в Local Storage.');
        }
        else {
            var transaction = db.transaction(["reviews"], "readwrite");
            var store = transaction.objectStore("reviews");
            var review = {
                message: document.getElementById('text').value,
                author: document.getElementById('name').value,
                time: new Date
            };
            store.add(review);
            document.getElementById('form').reset();
            alert('Збережено в IndexDB.');
        }
    }
}

function getResponse() {
    if (lab8) {
        leng = localStorage.length + 1;
        for (var i = 1; i < leng; i++) {
            responds = JSON.parse(localStorage.getItem(i));
            var parentElem = document.getElementById('reviewsList');
            var out = document.createElement('div');
            out.id = 'responses';
            out.innerHTML =
                out.innerHTML =
                    "<div class = container>" +
                    "<div class='main-text' style='border-bottom: solid 1px'>" +
                    "<br>" +
                    "<span class='author'>" + responds[0].author + "</span>" + " " +
                    "<span class='date'>" + responds[0].date + "</span><p><br>" + responds[0].text +
                    "</p><br></div></div>";
            parentElem.appendChild(out);
            localStorage.clear();
            index = 0;
        }
    } else {
        var transaction = db.transaction(["reviews"], "readonly");
        var store = transaction.objectStore("reviews");

        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('reviewsList');
                var out = document.createElement('div');
                out.id = 'review';
                out.innerHTML = "<div class = container>" +
                    "<div class='main-text' style='border-bottom: solid 1px'>" +
                    "<br>" +
                    "<span class='author'>" + cursor.value.author + "</span>" + " " +
                    "<span class='date'>" + cursor.value.time + "</span><p><br>" + cursor.value.message +
                    "</p><br></div></div>";
                parentElem.appendChild(out);
            }
        }
    }
}