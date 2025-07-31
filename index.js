const time = 100; // tempo de atualização do jogo (influencia na velocidade)
const velocidade = 20; // quantidade de pixel pulada a cada atualização
const notes = []; // vetor que salva cada uma das notas que estão sendo exibidas
const margemTop = 10; // distancia entre as notas (cima-baixo)
const limite = 10; // distancia em que as notas somem após passar das "casas"
const clickError = 5; // margem de erro para contabilizar o click (erro para cima e erro para baixo)
const qtd = 4; // quantidade de colunas
const ErrorPoints = 5; // quantidade de pontos que se perde caso erre o click ou deixe uma passar
const WinPoints = 10; // quantidade de pontos que se ganha ao acertar a nota
let table, startMargin, noteTam; // variaveis internas
let points = 0; // variavel dos pontos

window.onload =()=>{
    table = document.querySelector("table");
    startMargin = table.offsetLeft;
    noteTam = table.querySelector("td").offsetWidth;
    addNote();
    gameUpdate();
}

function gameUpdate(){
    let remove_notes = [];
    notes.forEach(n=>{
        let newPos = (n.html.offsetTop+velocidade);
        n.html.style.top = newPos+'px';

        if(newPos> (table.offsetTop+table.offsetHeight)+limite){
            remove_notes.push(notes.indexOf(n));
        }
    })
    remove_notes.forEach(i=>{
        notes[i].html.remove();
        if(notes[i].state==0){
            points -= (points>0)?ErrorPoints:0;
            console.log(points);
        }
        notes.splice(i, 1);
    })
    if(notes[notes.length-1].html.offsetTop > noteTam+margemTop) addNote();
    setTimeout(gameUpdate, time);
}
function addNote(){
    let colum = (Math.floor((qtd)*Math.random()));
    let note = document.createElement('div');
        note.classList.add('note');
        note.style.left = (startMargin+(noteTam)*colum)+"px";
        note.style.top = '0px';
    notes.push({
        html:note,
        colum:colum,
        state:0
    });
    document.body.insertAdjacentElement('afterbegin', note);
}


document.addEventListener("keydown", (e)=>{
    let clickColum = (e.code=="ArrowLeft")?0:(e.code=="ArrowUp")?1:(e.code=="ArrowDown")?2:(e.code=="ArrowRight")?3:-1;

    if(clickColum>=0){
        let marcou_algum = false;
        notes.forEach(n=>{
            if(n.colum==clickColum){
                if(n.html.offsetTop > (table.offsetTop-clickError) &&
                    n.html.offsetTop < (table.offsetTop+table.offsetHeight+clickError)){
                        marcou_algum = true;
                        n.html.style.background = 'green';
                        n.state = 1;
                        points+=10;
                        console.log(points);
                    }
            }
        });
        if(!marcou_algum){
            points -= (points>0)?ErrorPoints:0;
            console.log(points);
        }
    }
});