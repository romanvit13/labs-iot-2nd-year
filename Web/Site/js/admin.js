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
