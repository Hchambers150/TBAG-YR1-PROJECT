// website - based javascript done here:

var currentRoom;
var player;

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    var x = document.getElementById("customCtx");

    //console.log(event.path[0])
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
        //console.log("test")
    }

    switch (ev.path[0].getAttribute('data-type')) {
        case "room": // examine, loot
            var o = player.currentRoom;
            t.innerText = o.name;
            c.innerHTML = `
                <span onclick='examine("basement")' class="menuItem">Examine</span><br>
                <span onclick="print('Not yet implemented')" class="menuItem">Loot</span><br>
            `;

            m.style.height = "3em";
            break;

        case "enemy":
            // enterCombat();
            break;

        case "helm":
        case "body":
        case "legs":
        case "boots":
        case "gloves":
        case "ring":
        case "armour":
        case "item":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;
            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick='enterInspect("`+ o.name + `")' class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "mWep":
        case "pWep":
        case "weapon":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;
            c.innerHTML = `
                <span onclick='print("`+ o.description + `")' class="menuItem">Examine</span><br>
                <span onclick='enterInspect("`+ o.name + `")' class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;
            m.style.height = "4em";
            break;

        case "heal":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;
            c.innerHTML = `
                <span onclick="" class="menuItem">Drink</span><br>
                <span onclick='print("`+ o.description + `")' class="menuItem">Examine</span><br>
                <span onclick='enterInspect("`+ o.name + `")' class="menuItem">Inspect</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;
            m.style.height = "5em";
            break;
        case "readable":
            var o = checkItems(ev.path[0].title);
            t.innerText = o.name;

            //convert o.readText to array

            console.log("hi", o.readText)

            var temp = "";
            for (var i = 0; i < o.readText.length; i++) {
                if (i != o.readText.length - 1) {
                    temp = temp + "`" + o.readText[i] + "`" + ',';
                } else {
                    temp = temp + "`" + o.readText[i] + "`";
                }

            }

            console.log(o.id)

            c.innerHTML = `
                <span onclick="print('`+ o.description + `')" class="menuItem">Examine</span><br>
                <span onclick="checkItems('` + o.id + `').read()" class="menuItem">Read</span><br>
                <span onclick="" class="menuItem">Drop</span><br>
            `;

            m.style.height = "4em";
            break;

        case "NPC":
            if (player.isInConversation == false) {
                var e = checkMonsters(ev.path[0].getAttribute('data-npc'));
                if (e.isDead == false) {
                    t.innerText = e.name;
                    c.innerHTML = `
                <span onclick="print('`+ e.description + `')" class="menuItem">Examine</span><br>
                <span onclick="checkMonsters('`+ e.id + `').speak()" class="menuItem">Speak to</span><br>
                <span onclick="enterCombat('`+ e.id + `')" class="menuItem">Attack</span><br>
            `;
                    m.style.height = "5em";
                } else {
                    t.innerText = e.name;
                    c.innerHTML = `
                <span onclick="print('`+ e.description + `')" class="menuItem">Examine</span><br>
                <span onclick="print('Not yet implemented')" class="menuItem">Loot</span><br>
                
                `;
                    m.style.height = "3em";
                }
            } else {
                var e = checkMonsters(ev.path[0].getAttribute('data-npc'));
                if (e.isDead == false) {
                    t.innerText = e.name;
                    c.innerHTML = `
                <span onclick="print('`+ e.description + `')" class="menuItem">Examine</span><br>
                <span onclick="checkMonsters('`+ e.id + `').speak()" class="menuItem">Speak to</span><br>
                <span onclick="enterCombat('`+ e.id + `')" class="menuItem">Attack</span><br>
            `;
                    m.style.height = "5em";
                } else {
                    t.innerText = e.name;
                    c.innerHTML = `
                <span onclick="print('`+ e.description + `')" class="menuItem">Examine</span><br>
                <span onclick="print('Not yet implemented')" class="menuItem">Loot</span><br>
                
                `;
                    m.style.height = "3em";
                }
            }
            
            break;

        default:
            t.innerHTML = "<font class='important'>Error!</font>"
            c.innerHTML = " ";
            break;
    }
}

var statPoints = 27;
var player;
var currentColor = "dark";

function toggleSettings() {
    var settings = document.getElementById('settingsMenu');
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
        document.getElementById('locationInfo').style.backgroundColor = 'black';
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

    //} else if (statPoints == 27) { // for testing!! delete!!!
    //    document.getElementById("startup").style.display = 'none';
    //    document.getElementById("main").style.display = 'block';

    //    beginGame(name, con, dex, str, int, wis, cha);

    } else if (name == "" || name.length < 1) {
        errors.innerText = "Invalid name! Min Length: 1";

    }
    else if (name == "" || name.length > 20) {
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

function calcMin(stat, min) {
    if (checkStats(stat) >= min) {
        //console.log(checkStats(stat),true);
        return true;
    } else {
        //console.log(false);
        return false;
    }
}

function calcMax(stat, max) {
    if (checkStats(stat) <= max) {
        //console.log(true);
        return true;
    } else {
        //console.log(false);
        return false;
    }
}

function reqMeaning(x) {
    x = x.split(" ");
    switch (x[0]) {
        case "min":
            //console.log(x)
            var result = calcMin(x[2], x[1]);
            //console.log("IAKJFGSKJAHFKJSA", result);
            return result;
            break;
        case "max":
            var result = calcMax(x[2], x[1]);
            //console.log("IAKJFGSKJAHFKJSA", result);
            return result;
            break;
    }
}

function enterConvo(NPC, x) {

    document.getElementById('textArea').style.display = 'none';
    document.getElementById('inputWrap').style.display = 'none';
    document.getElementById('talkArea').style.display = 'flex';

    var choiceOne = document.getElementById('choiceOne');
    var choiceTwo = document.getElementById('choiceTwo');
    var choiceThree = document.getElementById('choiceThree');
    var all = [choiceOne, choiceTwo, choiceThree];

    document.getElementById('NPCTitle').innerText = NPC.name;
    document.getElementById('NPCTitle').setAttribute('data-id', NPC.id);
    document.getElementById('NPCImg').src = NPC.img;
    document.getElementById('NPCImg').setAttribute('data-type', 'NPC');
    document.getElementById('NPCImg').setAttribute('data-npc', NPC.id);
    document.getElementById('NPCOut').innerHTML = x.openText;

    player.isInConversation = true;

    for (var i = 0; i < all.length; i++) {
            if (x.options[Object.keys(x.options)[i]] != null) {
                var temp = x.options[Object.keys(x.options)[i]];
                all[i].innerHTML = temp.text;
                all[i].setAttribute('data-nextNode', temp.nextNode);
        }
    } 
}

function nextConvo(ev) {
    var npcID = document.getElementById("NPCTitle").getAttribute('data-id');
    var x = checkMonsters(npcID);
    var next = ev.path[0].getAttribute('data-nextNode');
    if (next.split(" ")[0] == "fight") {
        enterCombat(x.id);
    }
    var temp = x.getNextNode(next);
}

function exitConvo() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('talkArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
    player.isInConversation = false;
}

function enterInspect(itemID) {
    var x = checkItems(itemID);

    //reset
    document.getElementById('itemDesc').innerText = "";
    document.getElementById('attackOneTitle').innerText = "";
    document.getElementById('attackOneDmg').innerText = "";
    document.getElementById('attackOneDesc').innerText = "";
    document.getElementById('attackOneSpec').innerText = "";
    document.getElementById('attackTwoTitle').innerText = "";
    document.getElementById('attackTwoDmg').innerText = "";
    document.getElementById('attackTwoDesc').innerText = "";
    document.getElementById('attackTwoSpec').innerText = "";
    document.getElementById('attackThreeTitle').innerText = "";
    document.getElementById('attackThreeDmg').innerText = "";
    document.getElementById('attackThreeDesc').innerText = "";

    document.getElementById('attack-one').style.display = "none";
    document.getElementById('attack-two').style.display = "none";
    document.getElementById('attack-three').style.display = "none";

    // default things
    document.getElementById('iaTitle').innerText = x.name;
    document.getElementById('inspectIMG').style.content = 'url(/itemImgs/' + x.invImg + ')';
    document.getElementById('iaWrap').style.display = 'flex';
    document.getElementById('itemDesc').innerText = x.description;

    switch (x.type) {
        case "mWep":
        case "pWep":
            document.getElementById('attack-one').style.display = "block";
            document.getElementById('attack-two').style.display = "block";
            document.getElementById('attack-three').style.display = "block";

            document.getElementById('itemDesc').innerText = x.description;
            //att 1
            document.getElementById('attackOneTitle').innerText = x.attackOne.name;
            document.getElementById('attackOneDmg').innerText = "Damage: "+  x.attackOne.dmgRangeMin + " - " + x.attackOne.dmgRangeMax;
            document.getElementById('attackOneDesc').innerText = x.attackOne.description;
            //document.getElementById('attackOneSpec').innerText = "Damage: " + x.attackOne.special;
            if (x.attackOne.special != null) {
                document.getElementById('attackOneSpec').innerText = x.attackOne.special.id + " "+ x.attackOne.special.chance + "%";
            } else {
                document.getElementById('attackOneSpec').innerText = "";
            }

            //att 2
            document.getElementById('attackTwoTitle').innerText = x.attackTwo.name;
            document.getElementById('attackTwoDmg').innerText = "Damage: " + x.attackTwo.dmgRangeMin + " - " + x.attackTwo.dmgRangeMax;
            document.getElementById('attackTwoDesc').innerText = x.attackTwo.description;
            if (x.attackTwo.special != null) {
                document.getElementById('attackTwoSpec').innerText = x.attackTwo.special.id +" " + x.attackTwo.special.chance + "%";
            } else {
                document.getElementById('attackTwoSpec').innerText = "";
            }
            //att 3
            document.getElementById('attackThreeTitle').innerText = x.attackThree.name;
            document.getElementById('attackThreeDmg').innerText = "Damage: " + x.attackThree.dmgRangeMin + " - " + x.attackThree.dmgRangeMax;
            document.getElementById('attackThreeDesc').innerText = x.attackThree.description;
            if (x.attackThree.special != null) {
                document.getElementById('attackThreeSpec').innerText = x.attackThree.special.id + " " + x.attackThree.special.chance + "%";
            } else {
                document.getElementById('attackThreeSpec').innerText = "";
            }
            break;
        case "":
            break;
        case "armour":
            break;
        case "default":

            break;
    }
}

function exitInspect() { document.getElementById('iaWrap').style.display = 'none'; }

var currentPage;
var tempArrayReading;

function enterReading(o) {
    document.getElementById('textArea').style.display = 'none';
    document.getElementById('inputWrap').style.display = 'none';
    document.getElementById('readArea').style.display = 'block';
    document.getElementById('battleArea').style.display = 'none';

    var title = document.getElementById('pageTitle');
    var main = document.getElementById('pageText');

    console.log(o);

    title.innerHTML = "<u>" + o.title + "</u>";
    main.innerHTML = o.content;
    o.parent.currentPage = o;
    currentPage = o;

}

function updatePage(x) {
    var title = document.getElementById('pageTitle');
    var main = document.getElementById('pageText');

    title.innerText = tempArrayReading[x][0];
    main.innerHTML = tempArrayReading[x][1];
}

function nextPage() {
    console.log(currentPage);
    checkItems(currentPage.parent).nextPage();
}

function lastPage() {
    console.log(currentPage);
    checkItems(currentPage.parent).lastPage();
}

function exitReading() {
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('readArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}

function getCombatItems() {

    var helm = document.getElementById('helmDrop');
    var body = document.getElementById('bodyDrop')
    var legs = document.getElementById('legsDrop')
    var boots = document.getElementById('bootsDrop')
    var weapon = document.getElementById('weaponDrop')
    var gloves = document.getElementById('glovesDrop')
    var ring = document.getElementById('ringDrop');
    var ring = document.getElementById('ringDrop');

    var all = [helm, body, legs, boots, weapon, gloves, ring];
    var actual = ["helm", "body", "legs", "boots", "mWep", "pWep", "gloves", "ring"];
    var checker = ["helm", "body", "legs", "boots", "mWep", "pWep", "gloves", "ring"];

    for (var i = 0; i < all.length; i++) {
        console.log(all[i])
        console.log(all[i].firstElementChild);
        var temp = all[i].firstElementChild;
        var data;
        if (temp != null) {
            data = all[i].firstElementChild.getAttribute("data-id");
            var current = checkItems(data);
            console.log(current);

            if (current.type == "armour") {
                for (var j = 0; j < actual.length; j++) {
                    if (current.armourType == actual[j]) { actual[j] = current; }
                }
            } else {
                for (var j = 0; j < actual.length; j++) {
                    if (current.type == actual[j]) { actual[j] = current; };
                }
            }

        } else {
            var current = null;
        }
    }
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] == checker[i]) { actual[i] = null; }
    }

    return actual;

}

function getEnemyStats() {


}

var combatItems;
var weapon;
var enemy;

function enterCombat(enemyID) {
    exitConvo();
    document.getElementById('battleEnded').style.display = "none";
    document.getElementById("battleOutput").innerText = "";
    combatItems = getCombatItems();

    if (combatItems[4] != null) {
        weapon = combatItems[4];
    } else if (combatItems[5] != null) {
        weapon = combatItems[5];
    } else {
        weapon = allItems[8];
        console.log(weapon);
    }

    document.getElementById('attackOne').innerText = weapon.attackOne.name;
    document.getElementById('attackTwo').innerText = weapon.attackTwo.name;
    document.getElementById('attackThree').innerText = weapon.attackThree.name;

    player.isInCombat = true;

    document.getElementById('textArea').style.display = 'none';
    document.getElementById('inputWrap').style.display = 'none';
    document.getElementById('battleArea').style.display = 'flex';

    enemy = checkMonsters(enemyID);

    document.getElementById('monsterTitle').innerText = enemy.name;
    document.getElementById('monsterImg').src = enemy.img;
    document.getElementById('monHP').innerHTML = "Health: " + enemy.hp + "<br> Mana: " + enemy.mana;
    updateBattleScreen();
    var inflictions = "";
    for (var i = 0; i < enemy.inflictions; i++) {
        inflictions += "<br> *" + enemy.inflictions[i] + "*"
    }
    document.getElementById('monStatus').innerText = inflictions;
    
    enemy.checkInflictions();

}

function doAttack(attack) {
    console.log(attack);
    calcDamage(attack.dmgRangeMin, attack.dmgRangeMax);
    enemy.calcTurn();
}

function updateBattleScreen() {
    document.getElementById('monHP').innerHTML = "Health: " + enemy.hp + "<br> Mana: " + enemy.mana;
    var inflictions = "";
    for (var i = 0; i < enemy.inflictions; i++) {
        inflictions += "<br> *" + enemy.inflictions[i] + "*"
    }

    if (enemy.hp <= 4) {
        document.getElementById('attack3').style.color = "white";
    } else {
        document.getElementById('attack3').style.color = "#474747";
    }
    document.getElementById('monStatus').innerText = inflictions;

}

function calcDamage(min, max) {
    var damage = Math.floor(Math.random() * (max - min + 1) + min); // to do: add on extra str / mage dmg
    battlePrint("You hit the <font class='special'>" + enemy.name + "</font> for <font class='important'>" + damage + " damage.</font> ");
    enemy.hp -= damage;

    if (enemy.hp <= 0) {
        enemy.hp = 0;
        battlePrint("The " + enemy.name + " falls to the floor.");
        enemy.description = "The " + enemy.name + " is dead, and growing cold."
        enemy.isDead = true;
        updateBattleScreen()
        battleEndScreen();
        // end battle, give loot
    }

    updateBattleScreen();

}

function parseLoot() {

    var toUpdate = document.getElementById('lootGrid');
    var temp = "";
    console.log(enemy)
    for (var i = 0; i < enemy.containsLoot.length; i++) {
        console.log(enemy.containsLoot[i]);
        temp += "<div class='inventorySlot lootSlot'>" + enemy.containsLoot[i].inventHtml + "</div>";
    }
    console.log(temp)
    toUpdate.innerHTML = temp;
}

function battleEndScreen() {
    // change fightchoice to battleended
    // show loot
    // remove enemy, 
    document.getElementById('battleEnded').style.display = "block";
    parseLoot();
    enemy.remove();
}

function calcSpecial(special) {
    switch (special.type) {
        case "burn":
            var chanced = Math.floor(Math.random() * 101);
            if (special.chance > chanced) {
                //do it
            }
            break;
        case "stun":
            break;
    }
}

function enemyAttack() {
    
}

function trySpare() {

    // based on wisdom / con (higher)

    console.log(player.stats.dex);

    if (player.mods.wisMod >= player.mods.conMod) {
        var temp = player.mods.wisMod;
    } else { var temp = player.mods.conMod }

    var chanced = Math.floor((Math.random() * 21) + temp);
    console.log(chanced);
    if (chanced > 15) {
        exitCombat();
        enemy.spared = true;
        print("You spare the <font class='special' data-type='NPC' data-npc='" + enemy.id + "'>" + enemy.name + "</font>.");
    } else {
        battlePrint("<font class='important'>You do not manage to escape from the creature!</font>");
    }

}

function tryRun() {
    // dependent on dex stat
    // base = -1, highest = 5
    console.log(player.stats.dex);

    var chanced = Math.floor((Math.random() * 21) + player.mods.dexMod);
    console.log(chanced);
    if (chanced > 15) {
        exitCombat();
        print("You run away from the <font class='special' data-type='NPC' data-npc='"+ enemy.id +"'>" + enemy.name + "</font>.");
    }



}

function exitCombat() {
    player.isInCombat = false;
    document.getElementById('textArea').style.display = 'block';
    document.getElementById('inputWrap').style.display = 'block';
    document.getElementById('battleArea').style.display = 'none';

    document.getElementById('textArea').scrollTop = document.getElementById('output').scrollHeight;
}
