var mongoose = require('mongoose');
var Item = require('./item');

// Create emprunt schema
var EmpruntSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user_mail: {
        type: String,
        required: true
    },
    dateStart: {
        type: Date,
        default: Date.now
    },
    dateEnd: {
        type: Date,
        default: null
    },
    etat: {
        type: String,
        enum: ['neuf', 'bon', 'usé', 'détruit']
    },
    quantite: { // nombre d'items empruntés
        type: Number
    }
}, {timestamps: true});


module.exports = mongoose.model('Emprunt', EmpruntSchema);
