const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe sont requis');
    }
    
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send('Utilisateur inscrit avec succès');
    } catch (err) {
        res.status(500).send('Erreur lors de l\'inscription de l\'utilisateur');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe sont requis');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Utilisateur non trouvé');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mot de passe incorrect');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Erreur lors de la connexion de l\'utilisateur');
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    }
};