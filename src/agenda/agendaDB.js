const db = require('../db');

async function buscarAgenda() {
  const resultado = await db.query('SELECT * FROM agenda_disponivel ORDER BY data, hora');
  return resultado.rows;
}

async function adicionarAgenda(event, data, hora) {
  await db.query(
    'INSERT INTO agenda_disponivel (data, hora, disponivel) VALUES ($1, $2, true)',
    [data, hora]
  );
}

async function alterarAgenda(event, id, data, hora, disponivel) {
  await db.query(
    'UPDATE agenda_disponivel SET data = $1, hora = $2, disponivel = $3 WHERE id = $4',
    [data, hora, disponivel, id]
  );
}

async function deletarAgenda(event, id) {
  await db.query('DELETE FROM agenda_disponivel WHERE id = $1', [id]);
}

module.exports = {
  buscarAgenda,
  adicionarAgenda,
  alterarAgenda,
  deletarAgenda,
};
