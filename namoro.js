// DATA DE INÍCIO DO NAMORO
const dataInicio = new Date("2025-02-11T00:00:00");

function atualizarContador() {
    const agora = new Date();
    const diff = agora - dataInicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);

    const contador = document.getElementById("contador");
    if (contador) {
        contador.innerHTML = `${dias} dias, ${horas} horas e ${minutos} minutos ❤️`;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

// BOTÃO ENTRAR (FORMA SEGURA)
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnEntrar");
    const telaInicial = document.getElementById("telaInicial");
    const site = document.getElementById("site");
    const musica = document.getElementById("musica");

    if (botao) {
        botao.addEventListener("click", () => {
            telaInicial.style.display = "none";
            site.style.display = "block";

            if (musica) {
                musica.play();
            }
            // garantir que a página vá para o topo em dispositivos móveis
            try {
                // 'smooth' works well on iPhone Safari and gives a natural feel
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } catch (e) {
                window.scrollTo(0, 0);
            }
            // dar foco no container principal para melhorar navegação por teclado
            try {
                site.setAttribute('tabindex', '-1');
                site.focus();
            } catch (e) {}
        });
    }
});

// FOTO EM TELA CHEIA
function abrirImagem(elemento) {
    const img = elemento.querySelector("img").src;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("imagemGrande").src = img;
}

function fecharImagem() {
    document.getElementById("modal").style.display = "none";
}

// SURPRESA
function mostrarSurpresa() {
    document.getElementById("modalSurpresa").style.display = "flex";
}

function fecharSurpresa() {
    document.getElementById("modalSurpresa").style.display = "none";
}