var mongoose = require('mongoose');
var Categorie = require('./Categorie');

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
    }
}, {timestamps: true});


module.exports = mongoose.model('SousCategorie', SousCategorieSchema);
