const form = document.getElementById("form")
const nome = document.getElementById("nome")
const genero = document.getElementById("genero")
const dataNascimento = document.getElementById("dataNascimento")
const nomeMaterno = document.getElementById("nomeMaterno")
const cpf = document.getElementById("cpf")
const telefoneCelular = document.getElementById("telefoneCelular")
const telefoneFixo = document.getElementById("telefoneFixo")
const cepInput = document.getElementById("cep")
const rua = document.getElementById("rua")
const bairro = document.getElementById("bairro")
const numero = document.getElementById("numero")
const cidade = document.getElementById("cidade")
const uf = document.getElementById("uf")
const login = document.getElementById("login")
const senha = document.getElementById("senha")
const confirmarSenha = document.getElementById("confirmarSenha")

// mudar if else if para if


form.addEventListener("submit", (event) => {
    event.preventDefault();

    validaNome();
    validaGenero();
    validaData();
    validaNomeMaterno();

    const cpfValue = cpf.value.trim();
    if (!validaCPF(cpfValue)) {
        erroInput(cpf, 'Digite um cpf válido.');
    } else {
        const formItem = cpf.parentElement;
        formItem.classList = "formContent";
    }

    validaTelefoneCelular();
    validaTelefoneFixo();
    validaLogin();
    validaSenha();
    validarConfirmacaoSenha();
    validaNumero();
    
})

cep.addEventListener("focusout", () => {
    const apenasNumeros = /^[0-9]+$/;
    const cepValido = /^[0-9]{8}$/;
    const cepValue = cep.value.trim();
    
    if (!apenasNumeros.test(cepValue) || !cepValido.test(cepValue)) {
        erroInput(cep, "Cep inválido")
    } else {
        const formItem = cep.parentElement;
        formItem.classList = "formContent";
    }

    buscaCep(cepValue);
})

async function buscaCep(cep) {

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (!response.ok) {
            throw await response.json();
        }
        
        const responseCep = await response.json();
        if (responseCep.erro) erroInput(cepInput, 'CEP inválido')
       
        rua.value = responseCep.logradouro || '';
        bairro.value = responseCep.bairro || '';
        cidade.value = responseCep.localidade || '';
        uf.value = responseCep.uf || '';
        

    } catch (error) {
        console.log(error)
    }
}

function validaNome() {
    const nomeValue = nome.value;
    const regex = /^[a-zA-Z\s]{15,60}$/;

    if (!nomeValue) {
        erroInput(nome, 'O campo nome é obrigatório.')
        return;
    };
    
    if (!regex.test(nomeValue)) {
        erroInput(nome, 'O nome deve ter entre 15 e 60 caracteres alfabéticos.')
        return;
    };
    
    if (nomeValue != "" || regex.test(nomeValue)) {
        formItem = nome.parentElement;
        formItem.classList = "formContent";
    }
    
}

function validaGenero() {
    const generoValue = genero.value;
    
    if (generoValue === "") {
        erroInput(genero, 'Selecione uma opção.');
    } else {
        const formItem = genero.parentElement;
        formItem.classList = "formContent"
    }
}

function validaData() {
    const dataNascimentoValue = dataNascimento.value;
    const newDataNascimento = new Date(dataNascimentoValue)

    const dataAtual = new Date();

    if (dataNascimentoValue === "") {
        erroInput(dataNascimento, 'O campo data é obrigatório.');
        return;
    }
    if (isNaN(newDataNascimento.getTime()) || newDataNascimento > dataAtual) {
        erroInput(dataNascimento, 'Data de nascimento inválida ou futura');
        return;
    } 
    if (dataNascimento || !isNaN(newDataNascimento.getTime()) || newDataNascimento < dataAtual) {
        const formItem = dataNascimento.parentElement;
        formItem.classList = "formContent"
    }
}

function validaNomeMaterno() {
    const nomeMaternoValue = nomeMaterno.value;
    const regex = /^[a-zA-Z\s]{15,60}$/;

    if (nomeMaternoValue === "") {
        erroInput(nomeMaterno, 'O campo nome materno é obrigatório.');
    } else if (!regex.test(nomeMaternoValue)) {
        erroInput(nomeMaterno, 'O nome deve ter entre 15 e 60 caracteres alfabéticos.');
    } else {
        const formItem = nomeMaterno.parentElement;
        formItem.classList = "formContent";
    }
}

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF inválido
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito === 10 || primeiroDigito === 11) {
        primeiroDigito = 0;
    }
    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
        return false; // CPF inválido
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito === 10 || segundoDigito === 11) {
        segundoDigito = 0;
    }
    if (segundoDigito !== parseInt(cpf.charAt(10))) {
        return false; // CPF inválido
    }

    return true; // CPF válido
}

function validaTelefoneCelular() {
    const telefoneCelularValue = telefoneCelular.value.trim();
    const regex = /^(\(\d{2}\)\s?|(\d{2}\s?))9\d{4}-\d{4}$/;

    if (telefoneCelularValue === "") {
        erroInput(telefoneCelular, 'O campo telefone celular é obrigatório');
    } else if (!regex.test(telefoneCelularValue)) {
        erroInput(telefoneCelular, 'O campo deve obedecer esse formato (xx) 9xxxx-xxxx ou xx 9xxxx-xxxx.');
    } else {
        const formItem = telefoneCelular.parentElement;
        formItem.classList = "formContent";
    }
}

function validaTelefoneFixo() {
    const telefoneFixoValue = telefoneFixo.value.trim();
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    if (telefoneFixoValue === "") {
        erroInput(telefoneFixo, 'O campo telefone fixo é obrigatório');
    } else if (!regex.test(telefoneFixoValue)) {
        erroInput(telefoneFixo, 'O campo deve obedecer esse formato (xx) xxxx-xxxx ou (xx) xxxx-xxxxx.');
    } else {
        const formItem = telefoneFixo.parentElement;
        formItem.classList = "formContent";
    }
}

function validaLogin() {
    const loginValue = login.value.trim(); 
    const regex = /^[a-zA-Z]{6}$/;

    if (loginValue === "") erroInput(login, 'O campo login é obrigatório.');
    
    if (!regex.test(loginValue)) erroInput(login, 'O login deve ter 6 caracteres alfabéticos.');
    
    if (loginValue != "" || regex.test(loginValue)) {
        formItem = login.parentElement;
        formItem.classList = "formContent";
    }
}

function validaSenha() {
    const senhaValue = senha.value.trim(); 
    const regex = /^[a-zA-Z]{8}$/;

    if (senhaValue === "") erroInput(senha, 'O campo senha é obrigatório.');
    
    if (!regex.test(senhaValue)) erroInput(senha, 'O senha deve ter 8 caracteres alfabéticos.');
    
    if (senhaValue != "" || regex.test(senhaValue)) {
        formItem = senha.parentElement;
        formItem.classList = "formContent";
    }
}

function validarConfirmacaoSenha() {
    const senhaValue = senha.value.trim(); 
    const confirmarSenhaValue = confirmarSenha.value.trim(); 
    
    if (!confirmarSenhaValue) erroInput(confirmarSenha, 'O campo confirmar senha é obrigatório.');

    if (senhaValue === confirmarSenhaValue) {
        formItem = confirmarSenha.parentElement;
        formItem.classList = "formContent";
        return;
    };

    erroInput(confirmarSenha, 'O campo senha e confirmar senha devem ser iguais.');

}

function validaNumero() {
    const numeroValue = numero.value.trim();

    if (numeroValue) {
        formItem = numero.parentElement;
        formItem.classList = "formContent";
        return;
    }

    erroInput(numero, 'O campo número é obrigatório.');
}

function erroInput(input, mensagem) {
    const formItem = input.parentElement;
    const textMessage = formItem?.querySelector("a");
    
    console.log({ textMessage, formItem })
    textMessage.innerText = mensagem;
    formItem.className = "formContent error";
}











