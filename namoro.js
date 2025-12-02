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
// CONFIGURAÇÃO DA MÚSICA
// ===========================
const inicioMusica = 20;
const fimMusica = 130;


// ===========================
// VARIÁVEIS DO SLIDER
// ===========================
let slides = [];
let fotos = [];
let videos = [];

let ordemSlides = [];
let slideAtual = 0;
let tempoFoto = 6000;
let timeoutSlider = null;


// ===========================
// BOTÃO ENTRAR + MÚSICA + SLIDER
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnEntrar");
    const telaInicial = document.getElementById("telaInicial");
    const site = document.getElementById("site");
    const musica = document.getElementById("musica");

    slides = Array.from(document.querySelectorAll(".slide"));
    fotos = Array.from(document.querySelectorAll(".slide.foto"));
    videos = Array.from(document.querySelectorAll(".slide.video"));

    if (botao) {
        botao.addEventListener("click", () => {

            // MOSTRAR SITE
            telaInicial.style.display = "none";
            site.style.display = "block";

            // TOCAR MÚSICA COM FADE-IN
            if (musica) {
                musica.currentTime = inicioMusica;
                musica.volume = 0;
                musica.play().catch(() => { });

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

            // ✅ INICIAR SLIDER CORRIGIDO
            if (slides.length > 0) {
                iniciarSlider();
            }

            window.scrollTo(0, 0);
        });
    }
});


// ===========================
// SLIDER FIXO: 1 VÍDEO > 1 FOTO > RESTO FOTOS
// ===========================
function iniciarSlider() {
    ordemSlides = [];
    const max = Math.max(fotos.length, videos.length);

    // Intercala: vídeo > foto
    for (let i = 0; i < max; i++) {
        if (videos[i]) ordemSlides.push(videos[i]);
        if (fotos[i]) ordemSlides.push(fotos[i]);
    }

    // Se sobrar só fotos, adiciona elas no final
    if (fotos.length > videos.length) {
        const resto = fotos.slice(videos.length);
        resto.forEach(foto => {
            if (!ordemSlides.includes(foto)) ordemSlides.push(foto);
        });
    }

    slides = ordemSlides;
    slideAtual = 0;
    mostrarSlide(slideAtual);
}

function mostrarSlide(index) {
    if (timeoutSlider) clearTimeout(timeoutSlider);

    slides.forEach(slide => {
        slide.classList.remove("active");

        const video = slide.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    const slide = slides[index];
    slide.classList.add("active");

    const video = slide.querySelector("video");

    if (video) {
        video.muted = true;
        video.play();

        video.onended = () => {
            proximoSlide();
        };

    } else {
        timeoutSlider = setTimeout(() => {
            proximoSlide();
        }, tempoFoto);
    }
}

function proximoSlide() {
    slideAtual++;
    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }
    mostrarSlide(slideAtual);
}

function slideAnterior() {
    slideAtual--;
    if (slideAtual < 0) slideAtual = slides.length - 1;
    mostrarSlide(slideAtual);
}


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