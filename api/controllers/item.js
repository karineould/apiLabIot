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
    var nom = req.body.nom;
    var categorie = req.body.categorie;
    var sousCategorie = req.body.sousCategorie;
    var quantite = req.body.quantite;

    if (id) {
        Item.findByIdAndUpdate(id, {
            $set: {
                nom: nom,
                categorie: categorie,
                sousCategorie: sousCategorie,
                quantite: quantite
            }
        }, function (err, result) {
                if (err) return console.log(err);
                console.log(result._id);
                console.log('Updated '+ result._id +' item');
                return res.sendStatus(202);
            });
    }
    return res.sendStatus(400);
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
    return res.sendStatus(400);
};
