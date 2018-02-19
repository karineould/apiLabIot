var SousCategorie   = require('../models/sousCategorie');

//Find all sous categorie
exports.getAll = function(req, res) {
    SousCategorie.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};


//find sous categorie by id
exports.findById = function(req, res) {
    var id = req.params.id;

    if (id) {
        SousCategorie.find({'_id':id},function(err, result) {
            return res.send(result);
        });
    }
    return res.sendStatus(400);
};


//Create sous categorie
exports.create = function(req, res) {
    var nom = req.body.nom;
    var categorie = req.body.categorie;

    // create a sample user
    var newSousCat = new SousCategorie({
        nom: nom,
        categorie: categorie
    });

    // save the sample user
    newSousCat.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Sous-categorie saved successfully');
        res.json({ sousCategorie: result._id});
    });

};


//update Sous categorie
exports.update = function(req, res) {
    var id = req.params.id;
    var nom = req.body.nom;
    var categorie = req.body.categorie;

    if (id) {
        SousCategorie.findByIdAndUpdate(id, {
            $set: {
                nom: nom,
                categorie: categorie
            }
        }, function (err, result) {
            if (err) return console.log(err);
            console.log(result._id);
            console.log('Updated '+ result._id +' sous categorie');
            return res.sendStatus(202);
        });
    }
    return res.sendStatus(400);
};


//Delete sous categorie
exports.delete = function(req, res){
    var id = req.params.id;
    if (id) {
        SousCategorie.remove({'_id': id}, function (err) {
            if (err) throw err;
            return res.send({deleted: id});
        });
    }
    return res.sendStatus(400);
};
