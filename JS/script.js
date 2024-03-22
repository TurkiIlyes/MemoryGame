let gameImgs = ["img/card1.jpg","img/card1.jpg","img/card2.jpg","img/card2.jpg",
                "img/card3.jpg","img/card3.jpg","img/card4.jpg","img/card4.jpg",
                "img/card5.jpg","img/card5.jpg","img/card6.jpg","img/card6.jpg",
                "img/card7.jpg","img/card7.jpg","img/card8.jpg","img/card8.jpg",
                "img/card9.jpg","img/card9.jpg","img/card10.jpg","img/card10.jpg"];

let icons = ["img/icon1.png","img/icon2.png","img/icon3.png","img/icon4.png",
            "img/icon5.png","img/icon6.png","img/icon7.png","img/icon8.png",
            "img/icon9.png","img/icon10.png","img/icon11.png","img/icon12.png",
            "img/icon13.png","img/icon14.png","img/icon15.png","img/icon16.png",
            "img/icon17.png","img/icon18.png"];

class User{
    constructor(userName,icon,score,rank){
        this.userName=userName;
        this.icon=icon;
        this.score=score;
        this.rank=rank;
    }
    updateuserName(nUserName){
        this.userName=nUserName;
    }
    updateScore(nScore){
        this.score +=nScore;
    }
    updateRank(){
        for(i=0;i<users.length;i++){
            if(users[i].userName===this.userName){
                this.rank=users[i].rank;
            }
        }
        
    }
}


let replay = document.querySelector(".replay");
replay.addEventListener("click",function(e){
    e.target.parentElement.parentElement.style.display="none";

    finalCount=4;
    clickedImgs.length=0;

    clearInterval(intervalCounter);
    boxsLvl = 4;
    lvlImgs =gameImgs.filter(function(e){return e;});
    lvlImgs.length=boxsLvl;
    clickCount=0;
    clickedImgs.length=0;

    // box.forEach(function(e){
    //     backIn(e,1500);
    // });

    
    box.forEach(function(e){
        e.remove();
    });
    createBoxs();
    fil();
    firstStay();
    tryCountf(0);

    // firstLevel();





});
let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click",function(e){
    e.target.parentElement.parentElement.style.display="none";
    setTimeout(function(){
        firstStay();
    },1000);
});

function loseGame(){
    let lose = document.querySelector(".lose");
    lose.style.display="flex";
}

// timeDown(time)
















function fillRanks(){
    let rankTableElements = document.querySelectorAll(".players-rank-zone tbody tr");
    rankTableElements.forEach(function(e){e.remove();});
    for(i=0;i<10 && i<users.length;i++){
        // i=0;
        // while(i<10 && i<users.length){
        let tr = document.createElement("tr");

        let tdOne = document.createElement("td");
        tdOne.appendChild(document.createTextNode(users[i].rank));
        tr.appendChild(tdOne);

        let tdTwo = document.createElement("td");
        let tdImg = document.createElement("img");
        tdImg.src=users[i].icon;
        tdTwo.appendChild(tdImg);
        tr.appendChild(tdTwo);

        let tdThree = document.createElement("td");
        tdThree.appendChild(document.createTextNode(users[i].userName));
        tr.appendChild(tdThree);

        let tdFoor = document.createElement("td");
        tdFoor.appendChild(document.createTextNode(users[i].score));
        tr.appendChild(tdFoor);
        if(users[i].userName===signInZone.value){
            tr.classList.add("active-rank-zone");
        }
        rankTable.appendChild(tr);
        // i++;
    }
}
function playerRankColor(){
    let rankTableElements = document.querySelectorAll(".players-rank-zone tbody tr");
    rankTableElements.forEach(function(e){
    });
}
let rankTable =document.querySelector(".players-rank-zone tbody");
let users = [];
if(localStorage.getItem("users")){
    users=JSON.parse(localStorage.getItem("users"));
    triUsers();
    // fillRanks();
}

let signIn =document.querySelector(".log-in");
let signInBtn =document.querySelector(".log-in-btn");
let signInZone =document.querySelector(".log-in input");
let playerName =document.querySelector(".player-name");
let playerIconZone =document.querySelector(".player-icon");
let playerIcon =document.createElement("img");
playerIconZone.appendChild(playerIcon);
let choseIcon =document.querySelectorAll(".chose-icon .icons");
let chosenIcon;

// choseIcon.forEach(function(e){
//     e.onclick=function(){
        
//         
        
//     }
// });

choseIcon.forEach(function(e){
    e.onclick=function(e){
        chosenIcon=this.lastChild.getAttribute("src");
        if(this.classList.contains("active-icon")){
            choseIcon.forEach(function(e){
                e.classList.remove("active-icon");
                e.classList.remove("not-active-icon");
            }
            );
        }else{
            choseIcon.forEach(function(e){
                e.classList.remove("active-icon");
                e.classList.add("not-active-icon");
            }
            );
            this.classList.add("active-icon");
            this.classList.remove("not-active-icon");
        }
    }
});

function updateUser(){
    for(i=0;i<users.length;i++){
        if(users[i].userName===newUser.userName){
            users[i]=newUser;
        }
    }
    localStorage.setItem("users",JSON.stringify(users));
    triUsers();
    fillRanks();
    playerRankColor();
}
function triUsers(){
    v=false;
    while(v===false){
        v=true;
        for(i=0;i<users.length-1;i++){
            if(users[i].score<users[i+1].score){
                [users[i],users[i+1]]=[users[i+1],users[i]];
                v=false;
            }
        }
    }
    for(i=0;i<users.length;i++){
        users[i].rank=i+1;
    }
}

signInBtn.onclick=function(){
    fillRanks();
    if(userExist(signInZone.value)===false){

        if(chosenIcon===undefined){
            chosenIcon=icons[Math.floor(Math.random()*icons.length)];
        }
        newUser = new User(signInZone.value,chosenIcon,0,9999);
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));
    }else{
        getUserInfos(signInZone.value,chosenIcon);
    }
    playerName.textContent= newUser.userName;
    playerIcon.src=newUser.icon;
    // document.querySelector(".rank").textContent="9999";
    document.querySelector(".rank").textContent=newUser.rank;
    document.querySelector(".score").textContent=newUser.score;
    timeZone.textContent=60;
    score=newUser.score;
    signIn.style.display="none";
}
function getUserInfos(signInUserName,chosenIcon){
    for(i=0;i<users.length;i++){
        if(users[i].userName===signInUserName){
            newUser = new User(users[i].userName,chosenIcon || users[i].icon,users[i].score,users[i].rank);
        }
    }
}
function userExist(signInUserName){
    for(i=0;i<users.length;i++){
        if(users[i].userName===signInUserName){
            return true;
        }
    }
    return false;
}






let currentScore=document.querySelector(".score");
let timeZone=document.querySelector(".time");
let tryCount = document.querySelector(".try");
let intervalCounter;
let score=0;
let countert =5;
let boxsLvl = 4;
let finalCount =4;
let clickCount =0;
let clickedImgs =[];
let done = false;
let box;
let lvlImgs;

function scoreUpdate(){
    score+=(Math.ceil(+timeZone.textContent/5));
    newUser.updateScore(Math.ceil(+timeZone.textContent/5));
    updateUser();
    newUser.updateRank();
    document.querySelector(".rank").textContent=newUser.rank;
    return score;
}
function timeDown(time){
    timeZone.textContent=time;
    setTimeout(function(){
        intervalCounter= setInterval(function(){
            timeZone.textContent-=1;
            if(timeZone.textContent==0){
                clearInterval(intervalCounter);
                loseGame();
            }
        },1000);
    },3000);
}
function tryCountf(doneT){
    tryCount.textContent=`${doneT}/${finalCount/2}`;
}
function createBoxs(){
    for(i=1;i<=boxsLvl;i++){
        let divBox = document.createElement("div");
        divBox.classList.add("box");
        let BoxBack = document.createElement("img");
        BoxBack.classList.add("back");
        BoxBack.src="img/bb.jpg";
        let BoxFront = document.createElement("img");
        BoxFront.classList.add("front");
        divBox.appendChild(BoxBack);
        divBox.appendChild(BoxFront);
        let main = document.querySelector(".game");
        main.appendChild(divBox);
    }
    box=document.querySelectorAll(".game .box");
    if(boxsLvl>16&&boxsLvl<20){
        // 32
        document.querySelector(".game").style.cssText=`grid-template-columns: repeat(${countert++},minmax(6%,20%))`;
    }else if(boxsLvl===20){
        // 32
        document.querySelector(".game").style.cssText=`grid-template-columns: repeat(${countert},minmax(6%,20%))`;
    }
}
function fil(){
    box.forEach(function(e,i){
        let randomNbr =Math.floor(Math.random()*lvlImgs.length);
        e.lastChild.src= lvlImgs[randomNbr];
        lvlImgs=lvlImgs.filter(function(e,i){
            return i!==randomNbr;
        });
        e.lastChild.name=`img${i}`;
    });
}
function stayIn(e){
    e.style.setProperty("transform","rotateY(-180deg)");
}
function backIn(e,time){
    setTimeout(function(){
        e.style.removeProperty("transform");
    },time);
}
function firstStay(){
    setTimeout(function(){
        box.forEach(function(e){
            stayIn(e);
        });
        setTimeout(function(){
            box.forEach(function(e){
                backIn(e,500);
            });
            done = true;
        },1500);
    },1500);
    timeDown(60);
}
window.onload=firstLevel();

function firstLevel(){
    // currentScore.textContent=0;
    lvlImgs =gameImgs.filter(function(e){return e;});
    lvlImgs.length=boxsLvl;
    createBoxs();
    fil();
    // firstStay();
    tryCountf(0);
}
function nextLevel(){
    clearInterval(intervalCounter);
    clickCount=0;
    clickedImgs.length=0;
    lvlImgs =gameImgs.filter(function(e){return e;});
    if(boxsLvl<20){
        // 32
        boxsLvl+=4;
        finalCount+=4;
    }
    lvlImgs.length=boxsLvl;

    box.forEach(function(e){
        backIn(e,1500);
    });
    setTimeout(function(){
        box.forEach(function(e){
            e.remove();
        });
        createBoxs();
        fil();
        firstStay();
        tryCountf(0);
    },3000);
    
}

function test(e){
    if(clickCount===0){
        return false;
    }
    else{
        return clickedImgs.some(function(el){
            return this.lastChild.name===el.imgSrc.lastChild.name;
        },e);
    }
}
document.addEventListener("click",function(){
    box.forEach(function(e){
        e.onclick=function(){
            if(test(e)===true && clickCount%2!==0){
                backIn(e,400);
                clickedImgs.pop();
                clickCount--;
            }else if(test(e)===false&&done===true){
                stayIn(e);
                if(clickCount===0||clickCount%2===0){
                clickedImgs.push({imgSrc:e});
                clickCount++;
                }else if(clickCount<finalCount){
                    if(e.lastChild.src===clickedImgs[clickedImgs.length-1].imgSrc.lastChild.src){
                        clickedImgs.push({imgSrc:e});
                        clickCount++;
                        currentScore.textContent=scoreUpdate();
                        if(timeZone.textContent<=55){
                            timeZone.textContent=+timeZone.textContent+5;
                        }
                        tryCountf(clickCount/2);
                    }
                    else{
                        backIn(e,1500);
                        backIn(clickedImgs[clickedImgs.length-1].imgSrc,1500);
                        clickedImgs.pop();
                        clickCount--;
                    }
                }
                if(clickCount===finalCount){
                    nextLevel();
                }
            }
            
        }
    });
});




let btn = document.querySelector(".move-up");
btn.onclick=function(){
    nextLevel();
}


            // clickedImgs.push({imgSrc:e,ord:getComputedStyle(e)["order"]});
