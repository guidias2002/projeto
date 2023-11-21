// Obtém os botões de aumentar e diminuir fonte
var aumentarFonteButton = document.getElementById("aumentar-fonte");
var diminuirFonteButton = document.getElementById("diminuir-fonte");

// Define o tamanho de fonte inicial
var tamanhoFonte = 16;

// Função para aumentar o tamanho da fonte
function aumentarFonte() {
    tamanhoFonte += 2;
    document.body.style.fontSize = tamanhoFonte + "px";

    aumentarFonteButton.style.fontSize = "16px";
    diminuirFonteButton.style.fontSize = "16px";
}

// Função para diminuir o tamanho da fonte
function diminuirFonte() {
    tamanhoFonte -= 2;
    document.body.style.fontSize = tamanhoFonte + "px";

    aumentarFonteButton.style.fontSize = "16px";
    diminuirFonteButton.style.fontSize = "16px";
}

// Adiciona eventos aos botões
aumentarFonteButton.addEventListener("click", aumentarFonte);
diminuirFonteButton.addEventListener("click", diminuirFonte);
