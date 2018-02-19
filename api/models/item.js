var mongoose = require('mongoose');
var Categorie = require('./Categorie');
var SousCategorie = require('./SousCategorie');

// Create item schema
var ItemSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    sousCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SousCategorie'
    },
    quantite: {
        type: Number,
        default : 1
    },
    QRCode: String
}, {timestamps: true});


module.exports = mongoose.model('Item', ItemSchema);
