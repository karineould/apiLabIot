var mongoose = require('mongoose');
var Categorie = require('./categorie');
var SousCategorie = require('./sousCategorie');

// Create item schema
var ItemSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "can't be blank"],
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: [true, "can't be blank"],
    },
    sousCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SousCategorie'
    },
    quantite: {
        type: Number,
        default : 1
    }
}, {timestamps: true});


module.exports = mongoose.model('Item', ItemSchema);
