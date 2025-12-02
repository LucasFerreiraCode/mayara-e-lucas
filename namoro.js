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
const inicioMusica = 20;
const fimMusica = 130;


// ===========================
// BOTÃO ENTRAR + MÚSICA + AUTO-PLAY DOS VÍDEOS
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnEntrar");
    const telaInicial = document.getElementById("telaInicial");
    const site = document.getElementById("site");
    const musica = document.getElementById("musica");

    const videos = document.querySelectorAll(".foto video");

    if (botao) {
        botao.addEventListener("click", () => {

            // MOSTRAR SITE
            telaInicial.style.display = "none";
            site.style.display = "block";

            // TOCAR TRECHO DA MÚSICA COM FADE-IN
            if (musica) {
                musica.currentTime = inicioMusica;
                musica.volume = 0;
                musica.play().catch(err => {
                    console.log("Erro ao tocar música:", err);
                });

                const volumeFinal = 0.6;
                const passo = 0.02;
                const intervaloFade = 150;

                const fade = setInterval(() => {
                    if (musica.volume < volumeFinal) {
                        musica.volume = Math.min(musica.volume + passo, volumeFinal);
                    } else {
                        clearInterval(fade);
                    }
                }, intervaloFade);

                musica.addEventListener("timeupdate", () => {
                    if (musica.currentTime >= fimMusica) {
                        musica.currentTime = inicioMusica;
                        musica.play();
                    }
                });
            }

            // AUTO-PLAY + LOOP DOS VÍDEOS
            videos.forEach(video => {
                video.muted = true;
                video.loop = true;
                video.play().catch(() => { });
            });

            // SCROLL PARA TOPO
            try {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (e) {
                window.scrollTo(0, 0);
            }

            // ACESSIBILIDADE
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
    const modal = document.getElementById("modal");
    const imagemGrande = document.getElementById("imagemGrande");

    modal.style.display = "flex";
    imagemGrande.src = img;
}

function fecharImagem() {
    document.getElementById("modal").style.display = "none";
}

// ===========================
// VÍDEO EM TELA CHEIA COM SOM
// ===========================
function abrirVideo(elemento) {
    const video = elemento.querySelector("video");
    const src = video.querySelector("source").src;

    const modal = document.getElementById("modalVideo");
    const videoGrande = document.getElementById("videoGrande");

    videoGrande.src = src;
    videoGrande.muted = false;
    videoGrande.volume = 1;
    modal.style.display = "flex";
    videoGrande.play();
}

function fecharVideo() {
    const modal = document.getElementById("modalVideo");
    const videoGrande = document.getElementById("videoGrande");

    videoGrande.pause();
    videoGrande.currentTime = 0;
    videoGrande.src = "";
    modal.style.display = "none";
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
