var Emprunt   = require('../models/emprunt');
var Item   = require('../models/item');
const assert = require('assert');

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



}
//a revoir
exports.update = function(req, res){
    var id = req.params.id;
    var isEmprunt = ( req.body.isEmprunt ? true  : false );
    var updates = {};

    Emprunt.findById(id)
        .then(function (result) {

            // On check si ces paramètres ont été envoyé sinon on remet les anciens
            if( req.body.etat ) { updates.etat = req.body.etat ; }
            if ( req.body.dateEnd) { updates.dateEnd = req.body.dateEnd ; }

            var quantite = req.body.quantite ;
            quantite = (isEmprunt ? quantite : quantite * -1);

            if(quantite) { updates.quantite = quantite ; }
            Emprunt.findByIdAndUpdate( id, { $set: updates }, { new : true, runValidators: true})
                .then(function (updatedEmprunt) {
                    Item.findByIdAndUpdate(updatedEmprunt.item,
                            { $set: { quantite:parseInt(result.quantite+quantite) }},{ new : true , runValidators: true });
                    return res.status(202).json(updatedEmprunt);
                }).catch((err) => { res.send(err); });
        }).catch((err) => { res.send(err); });

}

exports.delete = function(req, res){
    var id = req.params.id;
    Emprunt.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};

exports.reset = function(req, res){
    Emprunt.remove({}, function(err) {
        if (err) throw err;
        return res.send({deleted : 'ok'});
    });
};
