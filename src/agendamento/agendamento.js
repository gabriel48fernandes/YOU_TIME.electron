let servicoSelecionado = null;
let dataSelecionada = null;
let horaSelecionada = null;
let diasIndex = 0;
const DIAS_POR_PAGINA = 5;
let tabAtual = 'agendamentos';

// Função para mostrar/esconder tabs
function mostrarTab(tab) {
  tabAtual = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  if (tab === 'agendamentos') {
    document.getElementById('tab-agendamentos').style.display = 'block';
    document.getElementById('tab-novo').style.display = 'none';
  } else {
    document.getElementById('tab-agendamentos').style.display = 'none';
    document.getElementById('tab-novo').style.display = 'block';
  }
}

// Carrega os agendamentos existentes do usuário
async function carregarAgendamentos() {
  const idcliente = localStorage.getItem('idcliente');
  const perfil = localStorage.getItem('perfil');
  const container = document.getElementById('lista-agendamentos');
  
  let lista;
  
  if (perfil === 'user') {
    lista = await window.senacAPI.buscarAgendamentosPorCliente(idcliente);
  } else {
    lista = await window.senacAPI.buscarAgendamentos();
  }

  container.innerHTML = '';

  if (!lista.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum agendamento</h3>
        <p>Você ainda não tem agendamentos. Clique na aba "Novo" para criar seu primeiro agendamento!</p>
      </div>
    `;
    return;
  }

  lista.forEach(agendamento => {
    const card = document.createElement('div');
    card.className = 'agendamento-card';
    const dataFormatada = new Date(agendamento.data).toLocaleDateString('pt-BR');
    const horaFormatada = agendamento.hora.substring(0, 5);
    let botoes = '';
    if (perfil === 'adm') {
      botoes = `<button class="btn-excluir-agendamento" data-id="${agendamento.id}">Excluir</button>`;
    }
    card.innerHTML = `
      <div class="agendamento-header">
        <div class="agendamento-servico">${agendamento.nome_servico}</div>
        <div class="agendamento-status">Agendado</div>
      </div>
      <div class="agendamento-info">
        <span>📅 ${dataFormatada}</span>
        <span>🕐 ${horaFormatada}</span>
      </div>
      ${botoes}
    `;
    container.appendChild(card);
  });
  if (perfil === 'adm') {
    container.querySelectorAll('.btn-excluir-agendamento').forEach(btn => {
      btn.onclick = async function() {
        if (confirm('Deseja excluir este agendamento?')) {
          await window.senacAPI.deletarAgendamento(this.dataset.id);
          carregarAgendamentos();
        }
      };
    });
  }
}

// Carrega os serviços disponíveis
async function carregarServicos() {
  const servicos = await window.senacAPI.buscarServicos();
  const container = document.getElementById('lista-servicos');
  container.innerHTML = '';

  servicos.forEach(servico => {
    const div = document.createElement('div');
    div.classList.add('service');
    div.onclick = () => selecionarServico(div, servico);
    
    let duracao = '';
    if (servico.duracao && !isNaN(servico.duracao)) {
      duracao = ` - ${servico.duracao}min`;
    }
    
    const precoFormatado = Number(servico.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    div.innerHTML = `
      <img src="https://source.unsplash.com/140x90/?barber,${servico.nome}" alt="${servico.nome}">
      <div class="service-info">
        <h4>${servico.nome}</h4>
        <p>${precoFormatado}${duracao}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

function selecionarServico(element, servico) {
  document.querySelectorAll('.service').forEach(e => e.classList.remove('selected'));
  element.classList.add('selected');
  servicoSelecionado = servico;
}

function proximoPasso() {
  if (!servicoSelecionado) return alert('Selecione um serviço!');
  
  document.getElementById('step-inicial').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  carregarAgenda();
}

function voltarEtapa() {
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step-inicial').style.display = 'block';
  
  // Limpa seleções
  servicoSelecionado = null;
  dataSelecionada = null;
  horaSelecionada = null;
  document.querySelectorAll('.service').forEach(e => e.classList.remove('selected'));
}

async function carregarAgenda() {
  const agenda = await window.senacAPI.buscarAgenda();
  const diasMap = {};
  
  agenda.filter(a => a.disponivel).forEach(a => {
    if (!diasMap[a.data]) diasMap[a.data] = [];
    diasMap[a.data].push(a);
  });
  
  const datasUnicas = Object.keys(diasMap).sort();
  const divSemana = document.getElementById('dias-semana');
  const divDias = document.getElementById('dias-disponiveis');
  
  divSemana.innerHTML = '';
  divDias.innerHTML = '';

  const datasFormatadas = datasUnicas.map(data => {
    const dataObj = new Date(data);
    const diaNumero = String(dataObj.getDate()).padStart(2, '0');
    const diasSemanaAbrev = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const mesesAbrev = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    
    return {
      data,
      diaNumero,
      diaSemana: diasSemanaAbrev[dataObj.getDay()],
      mes: mesesAbrev[dataObj.getMonth()]
    };
  });

  function renderDias() {
    divSemana.innerHTML = '';
    divDias.innerHTML = '';
    
    if (datasFormatadas.length > DIAS_POR_PAGINA) {
      const setaEsq = document.createElement('div');
      setaEsq.className = 'seta-dia';
      setaEsq.innerHTML = '&#8592;';
      setaEsq.onclick = () => {
        diasIndex = Math.max(0, diasIndex - 1);
        renderDias();
      };
      divDias.appendChild(setaEsq);
    }
    
    const semanaRow = document.createElement('div');
    semanaRow.style.display = 'flex';
    semanaRow.style.gap = '8px';
    semanaRow.style.justifyContent = 'center';
    
    const datasRow = document.createElement('div');
    datasRow.style.display = 'flex';
    datasRow.style.gap = '8px';
    datasRow.style.justifyContent = 'center';
    
    for (let i = diasIndex; i < Math.min(diasIndex + DIAS_POR_PAGINA, datasFormatadas.length); i++) {
      const df = datasFormatadas[i];
      
      const dSemana = document.createElement('div');
      dSemana.className = 'weekday-label';
      dSemana.innerText = df.diaSemana;
      semanaRow.appendChild(dSemana);
      
      const d = document.createElement('div');
      d.className = 'date';
      d.innerHTML = `<span class="date-day">${df.diaNumero}</span><span class="date-weekday">${df.mes}</span>`;
      d.onclick = () => selecionarData(d, df.data, diasMap[df.data]);
      datasRow.appendChild(d);
    }
    
    divSemana.appendChild(semanaRow);
    divDias.appendChild(datasRow);
    
    if (datasFormatadas.length > DIAS_POR_PAGINA) {
      const setaDir = document.createElement('div');
      setaDir.className = 'seta-dia';
      setaDir.innerHTML = '&#8594;';
      setaDir.onclick = () => {
        diasIndex = Math.min(datasFormatadas.length - DIAS_POR_PAGINA, diasIndex + 1);
        renderDias();
      };
      divDias.appendChild(setaDir);
    }
  }
  
  renderDias();
}

function selecionarData(el, data, horariosDoDia) {
  document.querySelectorAll('#dias-disponiveis .date').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  dataSelecionada = data;
  
  const divHorarios = document.getElementById('horarios');
  divHorarios.innerHTML = '';
  
  horariosDoDia.forEach(h => {
    const t = document.createElement('div');
    t.className = 'time';
    t.innerText = h.hora.substring(0, 5);
    t.onclick = () => selecionarHora(t, h);
    divHorarios.appendChild(t);
  });
}

function selecionarHora(el, h) {
  document.querySelectorAll('.time').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  horaSelecionada = h;
}

async function enviarAgendamento() {
  if (!dataSelecionada || !horaSelecionada || !servicoSelecionado) {
    return alert('Preencha todos os dados!');
  }
  
  const cliente = localStorage.getItem('idcliente');
  if (!cliente) return alert('Cliente não identificado');
  
  try {
    await window.senacAPI.adicionarAgendamento(cliente, servicoSelecionado.id, horaSelecionada.id);
    alert('Agendamento realizado com sucesso!');
    
    // Volta para a tela inicial e recarrega os agendamentos
    voltarEtapa();
    carregarAgendamentos();
    
    // Volta para a aba de agendamentos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab-btn').classList.add('active');
    document.getElementById('tab-agendamentos').style.display = 'block';
    document.getElementById('tab-novo').style.display = 'none';
    
  } catch (error) {
    alert('Erro ao realizar agendamento. Tente novamente.');
    console.error('Erro:', error);
  }
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  const nome = sessionStorage.getItem('nome') || localStorage.getItem('nome') || 'Usuário';
  const saudacao = `Olá, <strong id="nome-usuario">${nome}</strong>!`;
  const pSaudacao = document.querySelector('.messages p');
  if (pSaudacao) pSaudacao.innerHTML = saudacao;
  // Carrega dados iniciais
  carregarAgendamentos();
  carregarServicos();
});