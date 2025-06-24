const login = document.getElementById('btn-login')
const usuario = document.getElementById('usuario')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')

login.addEventListener('click',validarLogin)


async function validarLogin() {

    const retorno =  await window.senacAPI.validarLogin(usuario.value,senha.value)
    if (retorno) {
        msg.textContent = 'Logando...';
        msg.style.color = 'green';
        await window.janelaAPI.abrirJanelaPrincipal();
    }
    else {
        msg.textContent = 'Usuário ou senha inválidos';
        msg.style.color = 'red';
    }
}
