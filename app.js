let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","green","purple"];
let hiScore=0;

let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    // console.log("game started");
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
})
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}
function userFlash(btn){
     btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)

}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log((randIdx+1));
    // console.log(randColor);
    // console.log(randBtn);

    //random button flash
    gameSeq.push(randColor);
    // console.log(gameSeq);
    btnflash(randBtn);

}
function checkAns(indx){
    // console.log("level=",level)
    // let indx=level-1;
    if(userSeq[indx]==gameSeq[indx]){
        // console.log("same Value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{ 
        let score=level-1;
        if(score>hiScore){
           hiScore=score;
        }
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        h2.innerHTML=`
            Game Over! Your score was <b>${score}</b><br>
            Press any key to restart.<br>
            Highest Score: <b>${hiScore}</b>
        `;    
        reset();  
    }
}
function btnPress(){
    console.log("btn pressed");
    // console.log(this);
    let btn=this;
    userFlash(btn);
    // let btnid=document.getElementById()
    // userSeq.push(btn);
    // console.log(userSeq);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);

    checkAns(userSeq.length-1);


}
let allBtn=document.querySelectorAll(".btn");
for(btn of allBtn)
{
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    userSeq=[];
    gameSeq=[];
    level=0;
}