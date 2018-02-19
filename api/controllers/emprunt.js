var Emprunt   = require('../models/emprunt');

exports.findAll = function(req, res) {
    Emprunt.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};

exports.findById = function(req, res){
    var id = req.params.id;
    Emprunt.findById(id, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
}

exports.create = function(req, res){
    var nom = req.body.nom;
    var emprunt = new Emprunt({
        nom: nom
    });

    emprunt.save(function(err, result) {
        if (err) res.status(400).json(err);
        console.log('Emprunt saved successfully');
        res.json(result);
    });
}

exports.update = function(req, res){
    var id = req.params.id;
    var nom = req.body.nom;
    if(id){
        Emprunt.findByIdAndUpdate( id, { $set: { nom: nom } },
            function (err, result) {
                if (err) return res.status(400).json(err);
                console.log('Updated '+ result._id +' emprunt');
                return res.sendStatus(202);
            });
    }
    res.sendStatus(404);
}

exports.delete = function(req, res){
    var id = req.params.id;
    Emprunt.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};
