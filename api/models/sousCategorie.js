var mongoose = require('mongoose');
var Categorie = require('./categorie');
var Items = require('./item');

// Create sousCategorie schema
var SousCategorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
}, {timestamps: true});

SousCategorieSchema.statics.deleteFromCatId = function (id) {
    this.deleteMany({categorie: id},(err)=>{
        if(err) {
            throw err;
        }
    });
}

module.exports = mongoose.model('SousCategorie', SousCategorieSchema);
