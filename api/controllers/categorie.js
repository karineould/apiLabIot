var Categorie   = require('../models/categorie');
var SousCategorie   = require('../models/sousCategorie');
var Item = require('../models/item');
exports.findAll = function(req, res) {
    Categorie.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};

exports.findById = function(req, res){
    var id = req.params.id;
    Categorie.findById(id, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};

exports.create = function(req, res){
    var nom = req.body.nom;
    var categorie = new Categorie({
        nom: nom
    });

    categorie.save(function(err, result) {
        if (err) res.status(400).json(err);
        console.log('Categorie saved successfully');
        res.json(result);
    });
};


exports.update = function(req, res){
    var id = req.params.id;
    var nom = req.body.nom;

    if(id){
        Categorie.findByIdAndUpdate( id, { $set: { nom: nom } },
            function (err, result) {
                if (err) return res.status(400).json(err);
                console.log('Updated '+ result._id +' categorie');
                return res.status(202).json({updated:result._id});
            });
    }
};

exports.delete = function(req, res){
    var id = req.params.id;
    
    Categorie.remove({'_id':id },function(err) {
        if (err) res.send(err);
        SousCategorie.deleteFromCatId(id);
        Item.deleteFromCatId(id);
        return res.json({deleted : id});
    });
};
