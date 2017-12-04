var index = 0;

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
            var caption = document.getElementById('caption').value;
            var text = document.getElementById('text').value;
            index ++;
            var objects = [];
            objects.push({"caption":caption,"text":text});
            localStorage.setItem(index , JSON.stringify(objects));
            document.getElementById('newsForm').reset();
            alert("Відсутній зв'зязок, збережено в локальному сховищі.");
        }
    }
}
