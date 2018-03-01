var Emprunt   = require('../models/emprunt');
var Item   = require('../models/item');

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
        res.json(result[0]);
    });
};

exports.create = function(req, res){
    var item = req.body.item;
    var user_mail = req.body.user_mail;
    var etat = req.body.etat;
    var quantite = req.body.quantite ;

    Item.findById(item)
        .then(function(resu){
            Item.findByIdAndUpdate( item, { $set: { quantite: resu.quantite - quantite} }, { runValidators: true})
                .then(function (resu){
                    var emprunt = new Emprunt({
                        item: item,
                        user_mail: user_mail,
                        etat: etat,
                        quantite: quantite
                    });
                    emprunt.save(function(err, emprunt) {
                        if (err) res.send(err);
                        console.log('Emprunt saved successfully');
                        res.json(emprunt);
                    });
                }).catch((err) => { res.send(err);});
        }).catch((err) => { res.send(err);});



};

exports.findByUserMailAndItem = function(req, res){
    var user_mail = req.body.user_mail;
    var item = req.body.item;

    Emprunt.find({"item": item, "user_mail": user_mail}, function(err, result){
        if (err) res.json(err);
        res.json(result[0]);
    })
}


exports.update = function(req, res){
    var id = req.params.id;
    var isEmprunt = req.body.isEmprunt;
    var updates = {};
    var itemQuantity;
    var quantite = parseInt(req.body.quantite);

    Emprunt.findById(id)
        .then(function (oldEmprunt) {

            // On check si ces paramètres ont été envoyé sinon on remet les anciens
            if (req.body.etat) { updates.etat = req.body.etat ; }
            if (req.body.dateEnd) { updates.dateEnd = req.body.dateEnd ; }

            if (req.body.quantite) {
                updates.quantite = (isEmprunt == 'true' ?
                    parseInt(req.body.quantite) : (oldEmprunt.quantite) - parseInt(req.body.quantite)
                ) ;
            }

            Emprunt.findByIdAndUpdate(id, {$set: updates}, {new: true, runValidators: true})
                .then(function (newEmprunt) {

                    if( req.body.quantite != null){

                        Item.findById(newEmprunt.item)
                            .then(function (item) {
                                itemQuantity = ( isEmprunt == 'true' ?
                                        (item.quantite + oldEmprunt.quantite - quantite) :
                                        (item.quantite + quantite)
                                );
                                if (parseInt(itemQuantity) >= 0) {
                                    Item.findByIdAndUpdate(item.id,
                                        {$set: {quantite: itemQuantity}}, {new: true, runValidators: true})
                                        .then(function (updatedItem) {
                                            console.log('update item');
                                            return res.status(202).json('success : updated with quantity change');
                                        }).catch((err) => {
                                        res.send(err);
                                    });
                                } else {
                                    Emprunt.findByIdAndUpdate(id,
                                        {
                                            $set: {
                                                etat: oldEmprunt.etat,
                                                dateEnd: oldEmprunt.dateEnd,
                                                quantite: oldEmprunt.quantite
                                            }
                                        }, {new: true, runValidators: true})
                                        .then(function (updatedItem) {
                                            return res.status(400).json('Update failed because of quantity');
                                        }).catch((err) => { res.send(err);});
                                }
                            }).catch((err) => { res.send(err);});
                    } else {
                        return res.status(202).json('success : updated without quantity change');
                    }
                }).catch((err) => { res.send(err); });
        }).catch((err) => { res.send(err); });

};

exports.delete = function(req, res){
    var id = req.params.id;
    Emprunt.remove({'_id':id },function(err) {
        if (err) res.send(err);
        return res.send({deleted : id});
    });
};

exports.reset = function(req, res){
    Emprunt.remove({}, function(err) {
        if (err) res.send(err);
        return res.send({deleted : 'ok'});
    });
};
