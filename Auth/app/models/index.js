const mongoose = require('mongoose');

async function initializeDatabase() {
  
  const options = {
    ssl: true
  };

  mongoose.connect(process.env.MONGODB_URI, options)
    .then(() => console.log('Connexion à MongoDB établie avec succès'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));
}

module.exports = initializeDatabase;