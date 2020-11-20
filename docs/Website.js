// website - based javascript done here:



var currentRoom;
var player;

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    var x = document.getElementById("customCtx");

    console.log(event.path[0])
    test(event);

    x.style.display = "block";
    x.style.left = (event.pageX - 10) + "px";
    x.style.top = (event.pageY - 10) + "px";

}, false);

document.addEventListener("click", function (event) {
    var x = document.getElementById("customCtx");
    x.style.display = "none";
    x.style.left = "";
    x.style.top = "";

}, false);

function test(ev) {
    var m = document.getElementById('customCtx');
    var c = document.getElementById('menuWrap');
    var t = document.getElementById('ctxTitle')
    

    if (o == false) {
        //var o = checkMonsters(ev.path[0].title);
        console.log("test")
    }

    switch (ev.path[0].getAttribute('data-type')) {
        case "enemy":
            // enterCombat();
            break;
        case "helm":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="" class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "body":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="" class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "legs":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="" class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "boots": // examine, inspect, drop,
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="" class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "weapon":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="" class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "readable":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            //convert o.readText to array

            var temp = "";
            for (var i = 0; i < o.readText.length; i++) {
                if (i != o.readText.length - 1) {
                    temp = temp + "`" + o.readText[i] + "`" + ',';
                } else {
                    temp = temp + "`" + o.readText[i] + "`";
                }

            }

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="enterReading([`+ temp + `])" class="menuItem">Read</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "NPC":
            var m = checkMonsters(ev.path[0].getAttribute('data-npc'));
            console.log(m)
            t.innerText = m.name;
            c.innerHTML = `
                <span onclick="print('`+ m.description + `')" class="menuItem">Examine</span><br>
                <span onclick="checkMonsters('`+ m.id + `').speak()" class="menuItem">Speak to</span><br>
                <span onclick="enterCombat('`+ m.id + `')" class="menuItem">Attack</span><br>
            `;
            break;

        default:
            t.innerHTML = "<font class='important'>Error!</font>"
            c.innerHTML = " ";
            break;

    }

}

//startup.style.webkitAnimationPlayState = "paused";

//var statPoints = 27;
var statPoints = 27;
var player;
var currentColor = "dark";

function toggleSettings() {
    var settings = document.getElementById('settingsMenu');
    console.log(settings.style);
    if (settings.style.display == "flex") {
        settings.style.display = "";
    } else if (settings.style.display == "") {
        settings.style.display = "flex";
    }

}

function changeColors() {


    if (currentColor == "dark") { // turn to LIGHT
        currentColor = "light";
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        document.getElementById('locationInfo').style.backgroundColor ='black';
        document.getElementById('locationInfo').style.color = 'white';
        document.getElementById('input').style.backgroundColor = 'white';
        document.getElementById('presets').style.backgroundColor = 'white';
        document.getElementById('presets').style.color = 'black';
        document.getElementById('presets').style.color = 'black';
        //document.getElementsByClassName('drop').style.border = '1px solid black';
        //document.getElementsByClassName('invImage').style.backgroundColor = 'white';

        document.getElementById('battleArea').style.backgroundColor = 'white';
        document.getElementById('battleArea').style.color = 'white';
        document.getElementById('monsterTitle').style.color = 'white';
        document.getElementById('monsterTitleWrap').style.backgroundColor = 'black';
        document.getElementById('battleArea').style.borders = '1px solid black';
        document.getElementById('monsterWrap').style.backgroundColor = 'white';
        

    } else if (currentColor == "light") { // turn to DARK
        //document.div.style.backgroundColor = 'red';
        currentColor = "dark";
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        document.getElementById('locationInfo').style.backgroundColor = 'white';
        document.getElementById('locationInfo').style.color = 'black';
        document.getElementById('input').style.backgroundColor = 'black';
        document.getElementById('presets').style.backgroundColor = 'black';
        document.getElementById('presets').style.color = 'white';
        //document.getElementByClassName('drop').style.border = '1px solid white';
        //document.getElementByClassName('inventorySlot').style.border = '1px solid white';
        //document.getElementsByClassName('invImage').style.backgroundColor = 'black';
        document.getElementById('battleArea').style.backgroundColor = 'black';
        document.getElementById('battleArea').style.color = 'black';
        document.getElementById('monsterTitle').style.color = 'black';
        document.getElementById('monsterTitleWrap').style.backgroundColor = 'white';
        document.getElementById('battleArea').style.borders = '1px solid white';
        document.getElementById('monsterWrap').style.backgroundColor = 'black';
    }

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
            array[i].setAttribute('allowDrop', true);
        }
    }
}

function checkDrop(ev, el) {
    if (ev.target.childNodes.length == 1) {
        if (el.getAttribute('allowDrop') == "true") {
            ev.preventDefault();
        }
    }
}

function allowDrop(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function inventDrop(ev) {
    // check its empty
    if (ev.target.childNodes.length == 0 && ev.target.className == 'inventorySlot') {
        ev.preventDefault();
    } else {
        console.log("Slot is full!");
    }

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

function getStats() { // revisit; should
    name = document.getElementById("charName").value;
    con = parseInt(document.getElementById("conStat").innerText);
    dex = parseInt(document.getElementById("dexStat").innerText);
    str = parseInt(document.getElementById("strStat").innerText);
    int = parseInt(document.getElementById("intStat").innerText);
    wis = parseInt(document.getElementById("wisStat").innerText);
    cha = parseInt(document.getElementById("chaStat").innerText);

    if (statPoints == 0 && name != "") {
        

        document.getElementById("startup").style.animation = '1s ease-out 0s 1 slideOutToTop';
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        beginGame(name, con, dex, str, int, wis, cha);

    } else if (statPoints == 27) { // for testing!! delete!!!
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        beginGame(name, con, dex, str, int, wis, cha);

    } else if (name == "" || name.length > 20) {
        errors.innerText = "Invalid name! Max length: 20";

    } else if (statPoints != 0) {
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
    //document.getElementById('monsterImg').src = enemy.img;
    //document.getElementById('monHP').innerText = enemy.health;

}

function exitCombat() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('battleArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}

function enterConvo(NPCID, startNode, convo) {

    for (var i = 0; i < player.currentRoom.monsters.length; i++) {
        console.log()
        if (NPCID == player.currentRoom.monsters[i].id) {
            document.getElementById('textArea').style.display = 'none';
            document.getElementById('inputWrap').style.display = 'none';
            document.getElementById('talkArea').style.display = 'flex';

            // set options and defaultText

            var choiceOne = document.getElementById('choiceOne');
            var choiceTwo = document.getElementById('choiceTwo');
            var choiceThree = document.getElementById('choiceThree');

            document.getElementById('NPCTitle').innerText = player.currentRoom.monsters[i].name;
            document.getElementById('NPCTitle').setAttribute('data-id', player.currentRoom.monsters[i].id);
            document.getElementById('NPCImg').src = player.currentRoom.monsters[i].img;
            document.getElementById('NPCSpeech').innerText = startNode.openText;

            choiceOne.innerText = startNode.options.optionOne.text;
            choiceOne.setAttribute('data-nextNode', startNode.options.optionOne.nextNode); //ID only!

            choiceTwo.innerText = startNode.options.optionTwo.text;
            choiceTwo.setAttribute('data-nextNode', startNode.options.optionTwo.nextNode);

            choiceThree.innerText = startNode.options.optionThree.text;
            choiceThree.setAttribute('data-nextNode', startNode.options.optionThree.nextNode);

            // NPC.speak();

        } else {
            console.log("Enemy not found");
            print("Enemy not found");
        }
    }

    
}

function nextConvo(ev) {
    //console.log(ev.path[0].getAttribute('data-nextnode'))
    //var temp = document.getElementById('NPCTitle').getAttribute('data-id');
    //for (var i = 0; i < player.currentRoom.monsters.length; i++) {
    //    if (player.currentRoom.monsters[i] == temp) {
    //        for (var i = 0; i < Object.keys(player.currentRoom.monsters[i].convo).length) {
    //            // idek what to do here -- find the nextnode node... please... too tired time 404
    //        }
    //    }
    //}
}

function exitConvo() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('talkArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}

var currentPage;
var tempArrayReading;

function enterReading(text) { // probably change to pass in OBJECT
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

function updatePage(x) {
    var title = document.getElementById('pageTitle');
    var main = document.getElementById('pageText');

    title.innerText = tempArrayReading[x][0];
    main.innerHTML = tempArrayReading[x][1];
}

function nextPage() {
    if (currentPage < tempArrayReading.length - 1) {
        currentPage = currentPage + 1;
        updatePage(currentPage);
    }
}

function lastPage() {
    if (currentPage > 0) {
        currentPage = currentPage - 1;
        updatePage(currentPage);
    }
}

function exitReading() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('readArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}