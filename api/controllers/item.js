var Item   = require('../models/item');

//Find all items
exports.findAll = function(req, res) {
    Item.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};


//find items by id
exports.findById = function(req, res) {
    var id = req.params.id;

    if (id) {
        Item.find({'_id':id},function(err, result) {
            return res.send(result);
        });
    }
    return res.sendStatus(400);
};


//Create Item
exports.create = function(req, res) {
    var nom = req.body.nom;
    var categorie = req.body.categorie;
    var sousCategorie = req.body.sousCategorie;
    var quantite = req.body.quantite;

    // create a sample user
    var newItem = new Item({
        nom: nom,
        categorie: categorie,
        sousCategorie: sousCategorie,
        quantite: quantite
    });

    // save the sample user
    newItem.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Items saved successfully');
        res.json({ item: result._id});
    });

};


//Update item
exports.update = function(req, res) {
    var id = req.params.id;

    if (id) {
        Item.findById(id)
            .then(function(itemObject){
                var categorie = (req.body.categorie == null ? itemObject.categorie : req.body.categorie);
                var sousCategorie = (req.body.sousCategorie == null ? itemObject.sousCategorie : req.body.sousCategorie);
                var nom = (req.body.nom == null ? itemObject.nom : req.body.nom);
                var quantite = (req.body.quantite == null ? itemObject.quantite : req.body.quantite);
                Item.findByIdAndUpdate(id,
                    { $set: { nom: nom, categorie: categorie, sousCategorie: sousCategorie, quantite: quantite }},
                    { new:true })
                .then(function (result) {
                    console.log('Updated '+ result._id +' item');
                    return res.status(202).json(result);
                }).catch((err) => { res.send(err); });
            }).catch((err) => { res.send(err); });

    } else {
        return res.status(400).json("N'oubliez l'id en paramètre dans l'url");
    }
};


//Delete Item
exports.delete = function(req, res){
    var id = req.params.id;
    if (id) {
        Item.remove({'_id': id}, function (err) {
            if (err) throw err;
            return res.send({deleted: id});
        });
    }
    return res.status(400).json("N'oubliez l'id en paramètre dans l'url");
};
