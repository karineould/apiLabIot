var mongoose = require('mongoose');

// Create categorie schema
var CategorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model('Categorie', CategorieSchema);
