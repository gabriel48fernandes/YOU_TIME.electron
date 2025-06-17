const db = require('../db');

// clienteDB.js
async function buscarClientes() {
  const resultado = await db.query('SELECT * FROM cliente ORDER BY id');
  return resultado.rows;
}


async function adicionarCliente(event, nome, telefone, email) {
  await db.query(
    'INSERT INTO cliente (nome, telefone, email) VALUES ($1, $2, $3)',
    [nome, telefone, email]
  );
}

async function alterarCliente(event, id, nome, telefone, email) {
  await db.query(
    'UPDATE cliente SET nome = $1, telefone = $2, email = $3 WHERE id = $4',
    [nome, telefone, email, id]
  );
}

async function deletarCliente(event, id) {
  await db.query('DELETE FROM cliente WHERE id = $1', [id]);
}

module.exports = {
  buscarClientes,
  adicionarCliente,
  alterarCliente,
  deletarCliente,
};
