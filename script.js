const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const inputArea = document.getElementById("inputArea");

let currentScene = 0;
let escapeClicks = 0;


// печать текста
function typeText(text, callback){
    textEl.innerHTML="";
    let i=0;
    const interval=setInterval(()=>{
        textEl.innerHTML+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            if(callback)callback();
        }
    },25);
}


// обычные кнопки
function showChoices(choices){
    choicesEl.innerHTML="";
    choices.forEach(c=>{
        const btn=document.createElement("button");
        btn.innerText=c.text;
        btn.onclick=()=>goTo(c.next);
        choicesEl.appendChild(btn);
    });
}


// УБЕГАЮЩАЯ КНОПКА
function showEscapeButton(){
    choicesEl.innerHTML="";
    const btn=document.createElement("button");
    btn.innerText="Нажми меня";

    btn.onmouseover=()=>{
        if(escapeClicks<4){
            btn.style.position="absolute";
            btn.style.left=Math.random()*70+"vw";
            btn.style.top=Math.random()*70+"vh";
            escapeClicks++;
        }else{
            btn.onmouseover=null;
            btn.innerText="Ладно 😄";
            btn.style.position="static";
        }
    };

    btn.onclick=()=>{
        if(escapeClicks>=4) goTo(3);
    };

    choicesEl.appendChild(btn);
}


function goTo(scene){
    currentScene=scene;
    inputArea.classList.add("hidden");
    loadScene();
}


// проверка шифра
function submitAnswer(){
    const val=document.getElementById("answerInput").value
        .toUpperCase()
        .replaceAll(",","")
        .trim();

    if(val==="Я РЯДОМ СОЛНЫШКО"){
        goTo(7);
    }else{
        typeText("Почти... попробуй ещё раз ❤️");
    }
}



const scenes = [

{
text:"Добро пожаловать в систему проверки отношений",
choices:[{text:"Продолжить",next:1}]
},

{
text:"Совместимость: опасно высокая",
choices:[{text:"Дальше",next:2}]
},

{
text:"Попробуй нажать кнопку",
escape:true
},

{
text:"Ладно... ты слишком настойчивая",
choices:[{text:"Что дальше?",next:4}]
},

{
text:"Ты могла сейчас листать тикток или спать... но ты здесь",
choices:[
{text:"Случайно",next:5},
{text:"Из-за тебя",next:5}
]
},

{
text:"Предсказание будущего... много смеха, счастья и один странный парень",
choices:[{text:"Хмм",next:6}]
},

{
text:`Он оставил сообщение...\n33 18 / 33 5 5 4 15 13 / 19 15 12 14 29 25 12 15`,
input:true
},

{
text:"Сообщение прочитано",
choices:[{text:"...",next:8}]
},

{
text:"Я больше не могу говорить за него",
choices:[{text:"Слушаю",next:9}]
},

{
text:"Он просто хочет провести с тобой ещё много времени",
choices:[{text:"И?",next:10}]
},

{
text:`Я долго думал что подарить...
но лучше так,

если тебе правда что-то нужно,
скажи мне,

я хочу подарить именно то,
что сделает тебя счастливее`,
choices:[{text:"Я скажу ❤️",next:11}],
hearts:true
},

{
text:"Договорились ❤️",
choices:[{text:"Подожди...",next:12}]
},

{
text:`И ещё кое-что...`,
choices:[{text:"?",next:13}]
},

{
text:`Я готов делать тебе подарки не только по праздникам,

а просто когда тебе что-то нужно
или хочется,

потому что важен не день в календаре`,
choices:[{text:"...",next:14}]
},

{
text:`И этот сайт.. 

я сделал только для тебя`,
choices:[{text:"Почему?",next:15}]
},

{
text:`Потому что

Я очень сильно ТЕБЯ люблю, правда правда правда ❤️`,
hearts:true
}

];


function loadScene(){
    const s=scenes[currentScene];

    if(s.escape){
        typeText(s.text,showEscapeButton);
        return;
    }

    if(s.input){
        typeText(s.text,()=>inputArea.classList.remove("hidden"));
        choicesEl.innerHTML="";
        return;
    }

    typeText(s.text,()=>{
        if(s.choices)showChoices(s.choices);
        else choicesEl.innerHTML="";
    });

    if(s.hearts)startHearts();
}

loadScene();


// сердца
function startHearts(){
const canvas=document.getElementById("hearts");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let hearts=[];
setInterval(()=>{
hearts.push({x:Math.random()*canvas.width,y:canvas.height,size:10+Math.random()*20});
},200);

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.font="20px Arial";
hearts.forEach(h=>{
ctx.fillStyle="pink";
ctx.fillText("❤",h.x,h.y);
h.y-=1.5;
});
requestAnimationFrame(draw);
}
draw();
}