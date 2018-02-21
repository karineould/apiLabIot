var mongoose = require('mongoose');
var Categorie = require('./categorie');
var SousCategorie = require('./sousCategorie');

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
        required: true,
        validate : {
            validator: function (quantite) {
                return quantite >= 0;
            },
            message: "{VALUE} is negative"
        }
    }
}, {timestamps: true});

// ItemSchema.path('quantite').validate(function(value) {
//     if (value < 0) {
//         return false;
//     }
//     return true;
// });


module.exports = mongoose.model('Item', ItemSchema);
