// note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.post('/notes', function(req, res){
        console.log(req.body);
    res.send(req.body)
});
};

module.exports = function(app, db) {
    app.get('/notes/:id', function(req, res){
        const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, function(err, item){
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(item);
}
});
});

    app.post('/notes', function(req, res){
        const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, function(err, result){
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
        }
        });
    });
};
