require('dotenv').config()
const app = require("./app.js");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Le service d'authentification est en cours d'exécution sur le port ${port}`);
});