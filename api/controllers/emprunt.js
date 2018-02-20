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
        res.json(result);
    });
}

exports.create = function(req, res){
    var item = req.body.item;
    var user_mail = req.body.user_mail;
    var etat = req.body.etat;
    var quantite = req.body.quantite;

    Item.findById(item).then(function(itemObject){
        if(itemObject.quantite >= quantite){
            var emprunt = new Emprunt({
                item: item,
                user_mail: user_mail,
                etat: etat,
                quantite: quantite
            });

            Item.findByIdAndUpdate( item, { $set: { quantite: itemObject.quantite - quantite } })
                .then(function(){
                    emprunt.save(function(err, emprunt) {
                        if (err) res.status(400).json(err);
                        console.log('Emprunt saved successfully');
                        res.json(emprunt);
                    });
                });
        } else {
            res.status(400).json("Vous ne pouvez pas emprunter plus de "+itemObject.quantite+" "+itemObject.nom+"(s)");
        }

    }).catch((err) => {
        res.send(err);
    });

}

exports.update = function(req, res){
    var id = req.params.id;

    if(id){
        Emprunt.findById(id)
            .then(function (result) {

                // On check si ces paramètres ont été envoyé sinon on remet les anciens
                var etat = ( req.body.etat == null ? result.etat :req.body.etat ) ;
                // var quantite = ( req.body.quantite == null ? result.quantite :req.body.quantite ) ;
                var dateEnd = ( req.body.dateEnd == null ? result.dateEnd :req.body.dateEnd ) ;


                Emprunt.findByIdAndUpdate( id,
                    { $set: { etat: etat,  dateEnd: dateEnd} },
                    { new : true })
                    .then(function (updatedEmprunt) {
                        // if(req.body.quantite != null){
                        //     Item.findById(updatedEmprunt.item)
                        //         .then(function(itemObject){
                        //             if(itemObject.quantite >= quantite){
                        //                 Item.findByIdAndUpdate( updatedEmprunt.item,
                        //                     { $set: { quantite: itemObject.quantite - quantite } }, { new : true });
                        //             } else {
                        //                 return res.status(400).json("Vous ne pouvez pas emprunter plus de "+itemObject.quantite+" "+itemObject.nom+"(s)");
                        //             }
                        //         }).catch((err) => { res.send(err); });
                        // }
                        return res.status(202).json(updatedEmprunt);
                    }).catch((err) => { res.send(err); });
            }).catch((err) => { res.send(err); });
    } else {
        return res.status(400).json("N'oubliez l'id en paramètre dans l'url");
    }
}

exports.delete = function(req, res){
    var id = req.params.id;
    Emprunt.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};
