const db = require('../db');

async function buscarServicos() {
  const resultado = await db.query('SELECT * FROM servicos ORDER BY id');
  return resultado.rows;
}

async function adicionarServico(event, nome, preco, duracao) {
  await db.query(
    'INSERT INTO servicos (nome, preco, duracao_minutos) VALUES ($1, $2, $3)',
    [nome, preco, duracao]
  );
}

async function alterarServico(event, id, nome, preco, duracao) {
  await db.query(
    'UPDATE servicos SET nome = $1, preco = $2, duracao_minutos = $3 WHERE id = $4',
    [nome, preco, duracao, id]
  );
}

async function deletarServico(event, id) {
  await db.query('DELETE FROM servicos WHERE id = $1', [id]);
}

module.exports = {
  buscarServicos,
  adicionarServico,
  alterarServico,
  deletarServico,
};
