var index = 0;
function isOnline() {
    return window.navigator.onLine;
}

useLocalStorage = true;
var lab8 = true;

function newsAdd() {
    var listOfNews = [];
    if (($('#news-name').val() === "") ||
        ($('#news-text').val() === "")) {
        alert('Деякі дані не заповнені');
        return false;
    }
    if (isOnline()) {
        var data = {
            longdescription: $('#news-name').val(),
            shortdescription: $('#news-text').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/bears',
            type: "post",
            dataType: "json",
            data: data
        });
        document.getElementById('newsForm').reset();
        alert('Новину успішно додано');
    } else {
        if (lab8) {
            var caption = document.getElementById('caption').value;
            var text = document.getElementById('text').value;
            index++;
            var objects = [];
            objects.push({"caption": caption, "text": text});
            localStorage.setItem(index, JSON.stringify(objects));
            document.getElementById('newsForm').reset();
            alert('Збережено в Local storage');
        }
        else {
            var transaction = db.transaction(["news"], "readwrite");
            var store = transaction.objectStore("news");
            var news1 = {
                caption: document.getElementById('caption').value,
                text: document.getElementById('text').value
            };
            store.add(news1);
            alert('Збережено в IndexedDB');
        }
        document.getElementById('newsForm').reset();
    }

}
