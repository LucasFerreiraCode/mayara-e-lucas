// ===========================
// DATA DE INÍCIO DO NAMORO
// ===========================
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


// ===========================
// CONFIGURAÇÃO DO TRECHO DA MÚSICA
// ===========================
const inicioMusica = 20;   // 00:20
const fimMusica = 130;    // 02:10


// ===========================
// BOTÃO ENTRAR + TRECHO DA MÚSICA COM FADE-IN
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnEntrar");
    const telaInicial = document.getElementById("telaInicial");
    const site = document.getElementById("site");
    const musica = document.getElementById("musica");

    if (botao) {
        botao.addEventListener("click", () => {

            // --- MOSTRAR SITE ---
            telaInicial.style.display = "none";
            site.style.display = "block";

            // --- TOCAR TRECHO DA MÚSICA COM FADE-IN ---
            if (musica) {
                musica.currentTime = inicioMusica;
                musica.volume = 0; // começa sem som
                musica.play().catch(err => {
                    console.log("Erro ao tocar música:", err);
                });

                // FADE-IN ROMÂNTICO
                const volumeFinal = 0.6;
                const passo = 0.02;     // velocidade do aumento
                const intervaloFade = 150; // intervalo em ms

                const fade = setInterval(() => {
                    if (musica.volume < volumeFinal) {
                        musica.volume = Math.min(musica.volume + passo, volumeFinal);
                    } else {
                        clearInterval(fade);
                    }
                }, intervaloFade);

                // LOOP DO TRECHO
                musica.addEventListener("timeupdate", () => {
                    if (musica.currentTime >= fimMusica) {
                        musica.currentTime = inicioMusica;
                        musica.play();
                    }
                });
            }

            // --- SCROLL PARA TOPO ---
            try {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } catch (e) {
                window.scrollTo(0, 0);
            }

            // --- ACESSIBILIDADE ---
            try {
                site.setAttribute("tabindex", "-1");
                site.focus();
            } catch (e) { }
        });
    }
});


// ===========================
// FOTO EM TELA CHEIA
// ===========================
function abrirImagem(elemento) {
    const img = elemento.querySelector("img").src;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("imagemGrande").src = img;
}

function fecharImagem() {
    document.getElementById("modal").style.display = "none";
}


// ===========================
// SURPRESA
// ===========================
function mostrarSurpresa() {
    document.getElementById("modalSurpresa").style.display = "flex";
}

function fecharSurpresa() {
    document.getElementById("modalSurpresa").style.display = "none";
}
