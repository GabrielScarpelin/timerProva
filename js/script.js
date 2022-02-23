let minutes = 3
let seconds = 0
function aumentarTempo(){
    if (rodando == false){
        seconds += 10
        if (seconds >= 60){
            seconds = 0
            minutes += 1
        }
        if (minutes < 10){
            if (seconds < 10){
                document.getElementById('textoTempo').innerText = `0${minutes}:0${seconds}`
            }
            else{
                document.getElementById('textoTempo').innerText = `0${minutes}:${seconds}`
            }
        }
        else{
            if (seconds < 10){
                document.getElementById('textoTempo').innerText = `${minutes}:0${seconds}`
            }
            else{
                document.getElementById('textoTempo').innerText = `${minutes}:${seconds}`
            }
        }
    }
}
function diminuirTempo(){
    if (rodando == false){
        if (seconds == 0 && minutes == 0){
            minutes = 0
            seconds = 0
            document.getElementById('textoTempo').innerText = `0${minutes}:0${seconds}`
        }
        else{
            seconds -= 10
            if (seconds < 0) {
                seconds = 50
                minutes -= 1
            }
            if (minutes < 10) {
                if (seconds < 10) {
                    document.getElementById('textoTempo').innerText = `0${minutes}:0${seconds}`
                }
                else {
                    document.getElementById('textoTempo').innerText = `0${minutes}:${seconds}`
                }
            }
            else {
                if (seconds < 10) {
                    document.getElementById('textoTempo').innerText = `${minutes}:0${seconds}`
                }
                else {
                    document.getElementById('textoTempo').innerText = `${minutes}:${seconds}`
                }
            }
        }
    }  
}
var cron;
var minutoIncial;
let segundoInicial;
function iniciarTimer(){
    minutoIncial = minutes
    segundoInicial = seconds
    numeroQuestoes = document.getElementById('entradaQuestoes').value == '' ? 1 : document.getElementById('entradaQuestoes').value
    cron = setInterval(() => {timer()}, 1000)
}
var rodando = false
var cronPausa;
function timer(){
    rodando = true;
    if (seconds == 0){
        if (minutes == 0){
            if (numeroQuestoes <= 1){
               clearInterval(cron)
               rodando = false;
               minutes = minutoIncial
               seconds = segundoInicial + 5
               document.getElementById('audioFim').play()
            }
            else{
                numeroQuestoes--
                document.getElementById('audio').play()
                minutes = minutoIncial
                seconds = segundoInicial + 5
                

            }
        }
        else {
            minutes -= 1
            seconds = 59
        }
    }
    else {
        seconds -= 1;
    }
    document.getElementById('textoTempo').innerHTML = (minutes < 10 ? '0'+ minutes:minutes) + ':' + (seconds < 10 ? '0'+seconds:seconds)
    
}
function terminarQuestao(){
    if ((segundoInicial + seconds) >= 60){
        minutes += Math.floor((segundoInicial + seconds)/60) + minutoIncial
        seconds = ((segundoInicial + seconds)%60) + segundoInicial
        numeroQuestoes--
    }
    else{
        minutes += minutoIncial
        seconds = segundoInicial + seconds
        numeroQuestoes--
    }
}
function pausarTimer(){
    clearInterval(cron)
    rodando = false
}
function resumeTimer(){
    if (rodando == false && ((minutoIncial && segundoInicial) != undefined)){
        cron = setInterval(() => {timer()}, 1000)
    }
}
