const login = document.getElementById('btn-login')
const usuario = document.getElementById('usuario')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')

login.addEventListener('click', validarLogin)


async function validarLogin() {
    const retorno = await window.senacAPI.validarLogin(usuario.value, senha.value);
    console.log(retorno);

    if (retorno.perfil) {
        msg.textContent = 'Logando...';
        msg.style.color = 'green';
        
        localStorage.setItem('perfil', retorno.perfil);


        if (retorno.perfil === 'adm') {
            await window.janelaAPI.abrirJanelaAdmin();
        } else if (retorno.perfil === 'user') {
             localStorage.setItem('idcliente', retorno.idcliente);
            await window.janelaAPI.abrirJanelaUser();
        } else {
            msg.textContent = 'Perfil desconhecido';
            msg.style.color = 'red';
        }

    } else {
        msg.textContent = 'Usuário ou senha inválidos';
        msg.style.color = 'red';
        
    }
}

