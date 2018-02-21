var mongoose = require('mongoose');
var Item = require('./item');

// Create emprunt schema
var EmpruntSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, "can't be null"],
    },
    user_mail: {
        type: String,
        required: [true, "can't be null"],
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
        required: [true, "can't be null"],
        enum: ['neuf', 'bon', 'usé', 'détruit']
    },
    quantite: { // nombre d'items empruntés
        type: Number,
        required: [true, "can't be null"],
        min: 0,
        validate : {
            validator: function (quantite) {
                return quantite >= 0;
            },
            message: "{VALUE} is negative"
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Emprunt', EmpruntSchema);
