const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "L'e-mail est requise."],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: `Le format de l'email est invalide !`
        }
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est requis.'],
        validate: {
            validator: function (password) {
                const regexPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{9,}$/;
                return regexPassword.test(password);
            },
            message: `Le mot de passe invalide ! Il doit contenir au moins 9 caractères dont au moins une lettre majuscule, un symbole et un chiffre.`
        }
    }
});

userSchema.plugin(uniqueValidator, {
    message: `L'adresse e-mail est déjà utilisé !`
});

const User = mongoose.model("User", userSchema);
module.exports = User;
