class Room {
    constructor(roomClass) {
        this.roomID = roomClass.roomID;
        this.description = roomClass.description;

        this.connectedRooms = roomClass.connectedRooms; // array [N, E, S, W] {roomAsObject}
        this.containers = roomClass.containers; // array [containerAsObject]
        this.monsters = roomClass.monsters; //array [monsterAsObject]
        this.special = roomClass.special;
        this.eventNum = 0; // increases as player events occur - special things may happen at certain events
    }

    checkEvents = function () {
        console.log("Nice 1")
        var temp = Object.keys(this.special);
        if (this.special != null) {
            //console.log("ree",this.special[temp[0]])
            for (var i = 0; i < temp.length; i++) {
                console.log(temp[i])
                var currentNode = this.special[temp[i]];

                if (currentNode.eventNum == this.eventNum) {
                    switch (currentNode.command) {
                        case "spawn":
                            // find monster in allMonsters, add it to this.monsters;
                            // init monsters

                            for (var i = 0; i < currentNode.amount; i++) {
                                for (var j = 0; j < currentNode.monsters.length; j++) {

                                    // init monster with string as object name
                                    print("a <font class='special' data-type='NPC' data-NPC='gnome1'>creature</font> runs out from under a desk!")
                                    var gnome1 = new NPC(allMonsters.gnome1);
                                    this.monsters.push(gnome1);

                                }
                            }

                            break;
                        case "print":
                            break;
                        case "despawn":
                            break;
                    }
                }
            }
        }
    }
}

class Readable {
    constructor(name, type, description, invImg, readText) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.invImg = invImg;
        this.readText = readText;

        this.inventHtml = this.InventHtml(name, invImg);
    }

    InventHtml = function (name, invImg) {
        var total = '<div id="' + name + 'Item" data-type="' + this.type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-color:black;background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

        return total;
    }

    read = function () {
        enterReading(this.readText);
    }
}

class Item {

    // HOW WILL THIS WORK??
    // ondrop event will use these Objects to equip() and unequip()
    // to do that, some code needs to be stored here to identify THE LITERAL OBJECT

    constructor(name, type, bigImg, invImg, physicalDmg, magicDmg, description) {
        this.name = name;
        this.type = type;

        this.pDmg = physicalDmg;
        this.mDmg = magicDmg;
        this.description = description;
        this.bigImg = bigImg;
        this.invImg = invImg;

        this.isInInventory = false;

        this.imageOutHtml = this.ImageOutHtml(name, bigImg);
        this.inventHtml = this.InventHtml(name, invImg);


    }

    ImageOutHtml = function (name, bigImg) {
        var total = '<img src="' + bigImg + '" title="' + name + '/>';

        return total;

    }

    InventHtml = function (name, invImg) {
        var total = '<div id="' + name + 'Item" data-type="' + this.type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

        return total;
    }

}

class Player {

    constructor(name, con, dex, str, int, wis, cha) {

        var baseMana = 10;
        var baseHealth = 15;

        this.name = name;
        this.stats(con, dex, str, int, wis, cha);
        this.inventory = this.Inventory();
        this.health = baseHealth + (this.stats.conMod * 2);
        this.mana = baseMana + (this.stats.intMod * 2);

        this.currentRoom = new Room(allRooms.basement);
    }

    stats = function (con, dex, str, int, wis, cha) {
        this.stats.con = con;
        this.stats.dex = dex;
        this.stats.str = str;
        this.stats.int = int;
        this.stats.wis = wis;
        this.stats.cha = cha;

        var tempArray = getModifiers(con, dex, str, int, wis, cha);
        this.conMod = tempArray[0];
        this.dexMod = tempArray[1];
        this.strMod = tempArray[2];
        this.intMod = tempArray[3];
        this.wisMod = tempArray[4];
        this.chaMod = tempArray[5];

        setStats(name, con, dex, str, int, wis, cha);

    }

    Inventory = function () {
        var inventoryArray = [];

        for (var i = 0; i < 30; i++) {
            // link inventory [i] to inventory element
            var tempName = 'slot' + (i + 1);

            inventoryArray[i] = document.getElementById(tempName);

        }

        return inventoryArray;
    }
}

class Monster {
    constructor(monster) {
        this.id = monster.id;
        this.description = monster.description;
        this.name = monster.name;
        this.level = monster.level;
        this.img = monster.img;
        this.containsLoot = this.getLoot(monster.lootArray);

        this.weapon = monster.weapon;

        this.hp = monster.hp;
        this.dmg = monster.dmg;
        this.effectiveHP = monster.hp;
        this.effectiveDmg = monster.dmg;
        this.inflictions = [];
    }

    checkInflictions = function () {
        for (var i = 0; i < this.inflictions.length; i++) {
            switch (this.inflictions[i]) {
                case "stunned":
                    // cannot perform any actions
                    break;
                case "cursed":
                    // cannot perform magic attacks
                    break;
                case "bound":
                    // cannot perform physical actions
                    break;
                case "weak":
                    // damage is reduced
                    break;
                case "poisoned":
                    // health reduced per turn
                    break;
            }
        }
    }
    
    getLoot = function (x) {

        return; // return an array of DEFINITE ITEMS

    }

    enterCombat = function () { // do this here or globally?
        document.getElementById('textArea').style.display = 'none';
        document.getElementById('inputWrap').style.display = 'none';
        document.getElementById('battleArea').style.display = 'flex';

        //document.getElementById('monsterTitle').innerText = this.name;
        //document.getElementById('monsterImg').src = this.imgSource;
        //document.getElementById('monHP').innerText = this.health;
    }

    attack = function() {
        // calculate damage done | dmgType, dmg, level

        // deplete players hp

        // print damage done

    }

    checkDeath = function () {
        // check if this.hp <= 0
        // remove / delete this
    }

}

function getConvoPiece(ID, convoClass) {
    var temp = Object.keys(convoClass);
    console.log("bitch boy", ID, convoClass, temp, temp[1])

    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == ID) {
            // we got him
            console.log(convoClass[temp[i]])
            return convoClass[temp[i]];
        }
    }

    console.log("ERROR! CONVO CLASS NOT FOUND!");

}

class NPC extends Monster {

    constructor(monster) {

        super(monster);

        //this.speechArray = speechClass; // should be one of these weird bad boys https://gamedev.stackexchange.com/questions/40519/how-do-dialog-trees-work
        this.conversation = this.Conversation(monster.conversationClass);
        this.conversation = monster.conversationClass;
        this.currentNode;
    }

    deadEnd = function () {
       // how to handle this?
    }

    getCurrentOptions = function () {
        // how to handle this? so the user can revert to a point in which there are available / unexplored replies
    }

    speak = function () {
        this.currentNode = this.conversation.default;
        enterConvo(this.id, this.currentNode, this.conversation);
    }

    nextSpeak = function (x) {
        // x = 

    }

    Conversation = function (x) {

        


        return x;
    }
}