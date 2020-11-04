// website - based javascript done here:

var notepad = document;
notepad.addEventListener("contextmenu",function(event){
    event.preventDefault();
    var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "block";
    ctxMenu.style.left = (event.pageX - 10)+"px";
    ctxMenu.style.top = (event.pageY - 10)+"px";
},false);
notepad.addEventListener("click",function(event){
    var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "";
    ctxMenu.style.left = "";
    ctxMenu.style.top = "";
},false);

//startup.style.webkitAnimationPlayState = "paused";

//var statPoints = 27;
var statPoints = 0;
var player;

function startAnim() {
    startup.style.webkitAnimationPlayState = "running";
    document.getElementById("playBtn").style.display = "none";
}

function startGame() { // only called once!!
    // give Mom's Note, scroll output down, hide first screen, show 2nd screen

    var element = document.getElementById("output");
    element.scrollTop = element.scrollHeight;

}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    var source = ev.currentTarget.getAttribute('data-type');
    var array = document.getElementsByClassName('drop');
    for (var i = 0; i < array.length; i++) {
        if (array[i].getAttribute('data-type') === source) {
            // allowdrop
            //console.log("success!", array[i])
            array[i].setAttribute('allowDrop', true);
        }
    }
}

function checkDrop(ev, el) {
    //console.log(ev, ev.target.childNodes)
    if (ev.target.childNodes.length == 1) {
        console.log("hooray!")
        if (el.getAttribute('allowDrop') == "true") {
            ev.preventDefault();
        }
    }
}

function allowDrop(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    //console.log(ev);
}

function inventDrop(ev) {
    // check its empty
    //console.log("HIOIII",ev.target.style.className)
    if (ev.target.childNodes.length == 0 && ev.target.className == 'inventorySlot') {
        ev.preventDefault();
    } else {
        console.log("Slot is full!");
    }
    
}

function preventDrop(ev) {
    //NO DROP!!
    return;

}

function increaseStat(x) {
    var statInt = parseInt(document.getElementById(x).innerText);
    var stat = document.getElementById(x);

    var errors = document.getElementById("errors");
    var skillpoints = document.getElementById("remainingStat");

    if (statInt == 20) {
        errors.innerText = "Your stat scores may not go above 20!";
    } else {
        errors.innerText = "";
    }

    if (statPoints == 0) {
        errors.innerText = "You're out of stat points!"
    }

    if (statInt < 20 && statPoints > 0) {
        stat.innerText = statInt + 1;
        statPoints--;
        //console.log(statPoints);
    }

    if (stat.innerText.length == 2) {
        stat.style.left = "-0.5em";
    } else {
        stat.style.left = "-0.2em";
    }

    skillpoints.innerText = statPoints;
    if (skillpoints.innerText.length == 2) {
        skillpoints.style.left = "-1.3em";
    } else {
        skillpoints.style.left = "-1em";
    }

}

function decreaseStat(x) {
    var stat = document.getElementById(x);
    var statInt = parseInt(document.getElementById(x).innerText);

    var errors = document.getElementById("errors");
    var skillpoints = document.getElementById("remainingStat");

    if (statInt == 8) {
        errors.innerText = "Your stat scores may not go lower than 8!";
    } else {
        errors.innerText = "";
    }

    if (statInt > 8) {
        stat.innerText = statInt - 1;
        statPoints++;
    }

    if (stat.innerText.length == 2) {
        stat.style.left = "-0.5em";
    } else {
        stat.style.left = "-0.2em";
    }

    skillpoints.innerText = statPoints;
    if (skillpoints.innerText.length == 2) {
        skillpoints.style.left = "-1.3em";
    } else {
        skillpoints.style.left = "-1em";
    }

}

var name;
var con;
var dex;
var str;
var int;
var wis;
var cha;
var player;

function checkButton() {
 // check to make sure everything is O.K
 // then, start game;
    // player = new Player(getStats());
    // initItems();
    // initMonsters(); } How to handle monsters that can be a monster or an npc?
    // initNPCs();     } OR npcs are types of monsters? - good idea

}


function getStats() { // revisit; should
    name = document.getElementById("charName").value;
    if (statPoints == 0 && name != "") {
        name = document.getElementById("charName").value;
        con = parseInt(document.getElementById("conStat").innerText);
        dex = parseInt(document.getElementById("dexStat").innerText);
        str = parseInt(document.getElementById("strStat").innerText);
        int = parseInt(document.getElementById("intStat").innerText);
        wis = parseInt(document.getElementById("wisStat").innerText);
        cha = parseInt(document.getElementById("chaStat").innerText);

        document.getElementById("startup").style.animation = '1s ease-out 0s 1 slideOutToTop';
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        player = new Player(name, con, dex, str, int, wis, cha);
        initAllItems();
        giveStartItems();
        updateScroll();

    } else if (statPoints == 27) { // for testing!! delete!!!
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        player = new Player(name, con, dex, str, int, wis, cha);

    } else if (name == "" || name.length > 20) {
        errors.innerText = "Invalid name! Max length: 20";

    } else if (statPoints == 0) {
        errors.innerText = "You've not spent all of your stat points!";
    }
}

function setStats(name, con, dex, str, int, wis, cha) {
    var liveCon = document.getElementById("conLive");
    var liveDex = document.getElementById("dexLive");
    var liveStr = document.getElementById("strLive");
    var liveInt = document.getElementById("intLive");
    var liveWis = document.getElementById("wisLive");
    var liveCha = document.getElementById("chaLive");

    var checkPos = [liveCon, liveDex, liveStr, liveInt, liveWis, liveCha];

    liveCon.innerText = con;
    liveDex.innerText = dex;
    liveStr.innerText = str;
    liveInt.innerText = int;
    liveWis.innerText = wis;
    liveCha.innerText = cha;

    document.getElementById("gearTitle").innerText = name;

    for (var i = 0; i < checkPos.length; i++) {
        if (checkPos[i].innerText.length == 1) {
            checkPos[i].style.left = "1.15em";
        }
    }
}

function enterCombat(enemy) {
    document.getElementById('textArea').style.display = 'none';
    document.getElementById('inputWrap').style.display = 'none';
    document.getElementById('battleArea').style.display = 'flex';

    //document.getElementById('monsterTitle').innerText = enemy.name;
    //document.getElementById('monsterImg').src = enemy.imgSource;
    //document.getElementById('monHP').innerText = enemy.health;

}

function exitCombat() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('battleArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}

var currentPage;
var tempArrayReading;

function enterReading(text) {
    document.getElementById('textArea').style.display = 'none';
    document.getElementById('inputWrap').style.display = 'none';
    document.getElementById('readArea').style.display = 'block';
    document.getElementById('battleArea').style.display = 'none';

    var title = document.getElementById('pageTitle');
    var main = document.getElementById('pageText');

    for (var i = 0; i < text.length; i++) {
        text[i] = text[i].split("|"); // this is very volatile. im tired, so i think ill come back to this tomorrow
    }

    title.innerText = text[0][0];
    main.innerHTML = text[0][1];
    currentPage = 0;
    tempArrayReading = text;
}

function nextPage() {
    if (currentPage < tempArrayReading.length-1) {
        currentPage = currentPage + 1;

    }
}

function lastPage() {


}

function exitReading() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('readArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}