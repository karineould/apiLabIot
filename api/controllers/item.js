var Item   = require('../models/item');

//Find all items
exports.findAll = function(req, res) {
    Item.find({}, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    }).populate('categorie', 'nom').populate('sousCategorie', 'nom');
};


//find items by id
exports.findById = function(req, res) {
    var id = req.params.id;
    Item.find({'_id':id},function(err, result) {
        if (err) res.send(err);
        return res.json(result[0]);
    });

};


//Create Item
exports.create = function(req, res) {
    var nom = req.body.nom;
    var categorie = req.body.categorie;
    var sousCategorie = req.body.sousCategorie;
    var quantite = req.body.quantite;

    var newItem = new Item({
        nom: nom,
        categorie: categorie,
        sousCategorie: sousCategorie,
        quantite: quantite
    });

    newItem.save(function(err, result) {
        if (err) return res.status(400).json(err);

        console.log('Item saved successfully');
        return res.json({ item: result._id});
    });

};


//Update item
exports.update = function(req, res) {
    var id = req.params.id;
    var updates = {};

    if(req.body.nom) { updates.nom = req.body.nom ; }
    if(req.body.categorie) { updates.categorie = req.body.categorie ; }
    if(req.body.sousCategorie) { updates.sousCategorie = req.body.sousCategorie ; }
    if(req.body.quantite) { updates.quantite = req.body.quantite ; }

    Item.findByIdAndUpdate(id, { $set: updates }, { new:true, runValidators: true })
        .then(function (result) {
            console.log('Updated '+ result._id +' item');
            res.status(202).json(result);
        }).catch((err) => { res.send(err); });


};


//Delete Item
exports.delete = function(req, res){
    var id = req.params.id;
    Item.remove({'_id': id}, function (err) {
        if (err) res.status(400).json(err);
        return res.send({deleted: id});
    });

};
