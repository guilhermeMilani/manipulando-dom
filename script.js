const html = document.querySelector('html');
const imagens = document.querySelector('.app__image');
const displayTempo = document.querySelector('#timer');
const titulo = document.querySelector('.app__title')

const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const botaoTemporizador = document.querySelector('#start-pause');
const iconeBotaoTemporizador = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const botoes = document.querySelectorAll('.app__card-button');
const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPause = new Audio('/sons/pause.mp3');
const audioIniciar = new Audio('/sons/play.wav')
const audioFinalizar = new Audio('/sons/beep.mp3')
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


botaoFoco.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
})

botaoDescansoCurto.addEventListener('click',()=>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
})

botaoDescansoLongo.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
})

inputMusica.addEventListener('change', () =>{
    if (inputMusica.checked) {
        musica.play();
    }else{
        musica.pause();
    }
})


function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (btn) {
        btn.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    imagens.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            botaoFoco.classList.add('active');
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            botaoDescansoCurto.classList.add('active');
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
            botaoDescansoLongo.classList.add('active');
        default:
            break;
    }
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <=0) {
        zerar();
        audioFinalizar.play();
        alert('acabou');
        return
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
}
botaoTemporizador.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        iniciarOuPausarBtn.textContent = 'Começar';
        iconeBotaoTemporizador.setAttribute('src','/imagens/play_arrow.png')
        zerar();
        return
    }else{
        audioIniciar.play();
    }
    iconeBotaoTemporizador.setAttribute('src','/imagens/pause.png')
    iniciarOuPausarBtn.textContent = 'Pausar';
    intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();