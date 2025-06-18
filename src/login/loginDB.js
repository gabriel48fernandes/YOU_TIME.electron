const db = require('../db');

async function validarLogin(event, login, senha) {
    const resultado = await db.query('SELECT * FROM usuario where username = $1 and password = $2', [login, senha]);
  
    if (resultado.rows.length > 0) {
      return true;
    }
  
    return false;
}
module.exports = { validarLogin };
