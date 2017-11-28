var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function newsAdd() {
    var listOfNews = [];
    if (($('#news-name').val() === "") ||
        ($('#news-text').val() === "")) {
        alert('Деякі дані не заповнені');
        return false;
    } else {
        if (isOnline()) {
            $('#news-name').val('');
            $('#news-text').val('');
            alert('Новину успішно додано');
        } else {
            i++;
            listOfNews.push({
                "News name": $('#news-name').val(),
                "News text": $('#news-text').val(),
            });
            localStorage.setItem(i, JSON.stringify(listOfNews));
            $('#news-name').val('');
            $('#news-text').val('');
            alert("Відсутній зв'зязок, збережено в локальному сховищі.");
        }
    }

}

function onlineNewsAdd() {
    if (($('#news-name').val() === "") ||
        ($('#news-text').val() === "")) {
        alert('Деякі дані не заповнені');
        return false;
    } else {
        $('#news-name').val('');
        $('#news-text').val('');
        alert('Новину успішно додано');
    }
}

function localNewsAdd() {
    var listOfNews = [];
    if (($('#news-name').val() === "") ||
        ($('#news-text').val() === "")) {
        alert('Деякі дані не заповнені');
        return false;
    } else {
        var picture = document.getElementById('news-img').value;
        var caption = document.getElementById('news-name').value;
        var text = document.getElementById('news-text').value;
        listOfNews.push({"caption":caption,"text":text,"picture":picture});
        i++;
        localStorage.setItem(i, JSON.stringify(listOfNews));
        $('#news-name').val('');
        $('#news-text').val('');
        alert("Відсутній зв'зязок, збережено в локальному сховищі.");
    }
}