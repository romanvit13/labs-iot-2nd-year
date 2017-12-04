var index = 0;
useLocalStorage = false;
function isOnline() {
    return window.navigator.onLine;
}

function newsAdd() {
    var listOfNews = [];
    if (($('#news-name').val() === "") ||
        ($('#news-text').val() === "")) {
        alert('Деякі дані не заповнені');
        return false;
    }
    if (isOnline()) {
        $('#news-name').val('');
        $('#news-text').val('');
        alert('Новину успішно додано');
    } else {
        if (useLocalStorage) {
            var caption = document.getElementById('caption').value;
            var text = document.getElementById('text').value;
            index++;
            var objects = [];
            objects.push({"caption": caption, "text": text});
            localStorage.setItem(index, JSON.stringify(objects));
            document.getElementById('newsForm').reset();
            alert("Відсутній зв'зязок, збережено в локальному сховищі.");
        }
        else {
            var transaction = db.transaction(["news"], "readwrite");
            var store = transaction.objectStore("news");
            var news1 = {
                caption: document.getElementById('caption').value,
                text: document.getElementById('text').value
            };
            store.add(news1);
        }
        document.getElementById('newsForm').reset();
    }

}
