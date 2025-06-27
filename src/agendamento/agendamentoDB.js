const db = require('../db');

async function buscarAgendamentos() {
  const resultado = await db.query(`
    SELECT 
      agendamentos.id,
      cliente.nome AS nome_cliente,
      servicos.nome AS nome_servico,
      agenda_disponivel.data,
      agenda_disponivel.hora
    FROM agendamentos
    JOIN cliente ON agendamentos.idcliente = cliente.id
    JOIN servicos ON agendamentos.idservico = servicos.id
    JOIN agenda_disponivel ON agendamentos.idagenda = agenda_disponivel.id
    ORDER BY agendamentos.id
  `);
  return resultado.rows;
}
async function buscarAgendamentosPorCliente(event, idcliente) {
    const resultado = await db.query(`
        SELECT 
      agendamentos.id,
      cliente.nome AS nome_cliente,
      servicos.nome AS nome_servico,
      agenda_disponivel.data,
      agenda_disponivel.hora
    FROM agendamentos
    JOIN cliente ON agendamentos.idcliente = cliente.id
    JOIN servicos ON agendamentos.idservico = servicos.id
    JOIN agenda_disponivel ON agendamentos.idagenda = agenda_disponivel.id
    where cliente.id = $1
    ORDER BY agendamentos.id
    
    `, [idcliente]);
      console.log(resultado.rows);
    return resultado.rows;
}


async function adicionarAgendamento(event, idcliente, idservico, idagenda) {
  await db.query(
    'INSERT INTO agendamentos (idcliente, idservico, idagenda) VALUES ($1, $2, $3)',
    [idcliente, idservico, idagenda]
  );

  // Marca como indisponível o horário escolhido
  await db.query('UPDATE agenda_disponivel SET disponivel = false WHERE id = $1', [idagenda]);
}

async function alterarAgendamento(event, id, idcliente, idservico, idagenda) {
  await db.query(
    'UPDATE agendamentos SET idcliente = $1, idservico = $2, idagenda = $3 WHERE id = $4',
    [idcliente, idservico, idagenda, id]
  );
}

async function deletarAgendamento(event, id) {
  const resultado = await db.query('SELECT idagenda FROM agendamentos WHERE id = $1', [id]);
  const hojeAgenda = resultado.rows[0]?.idagenda;

  await db.query('DELETE FROM agendamentos WHERE id = $1', [id]);

  if (hojeAgenda) {
    await db.query('UPDATE agenda_disponivel SET disponivel = true WHERE id = $1', [hojeAgenda]);
  }
}

module.exports = {
  buscarAgendamentos,
  adicionarAgendamento,
  alterarAgendamento,
  deletarAgendamento,
  buscarAgendamentosPorCliente,
};
