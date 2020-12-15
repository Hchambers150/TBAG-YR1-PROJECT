var allRoomsArray = [];

class Room {
    constructor(roomClass) {
        this.roomID = roomClass.roomID;
        this.description = roomClass.description;

        this.connectedRooms = roomClass.connectedRooms; // array [N, E, S, W] {roomAsObject}
        this.containers = roomClass.containers; // array [containerAsObject]
        this.monsters = roomClass.monsters; //array [monsterAsObject]
        this.special = roomClass.special;
        this.eventNum = 0; // increases as player events occur - special things may happen at certain events
        //allRoomsArray[]
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

//class Readable {
//    constructor(name, type, description, invImg, readText) {
//        this.name = name;
//        this.type = type;
//        this.description = description;
//        this.invImg = invImg;

//    }

//    InventHtml = function (name, invImg) {
//        var total = '<div id="' + name + 'Item" data-type="' + this.type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-color:black;background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

//        return total;
//    }

//    read = function () {
//        enterReading(this.readText);
//    }
//}

class Item {

    constructor(item) {
        //console.log("hiya",item)
        this.id = item.id;
        this.name = item.name;
        this.invImg = item.img;
        this.type = item.type;
        this.description = item.description;
        this.isInInventory = false;
        this.imgOutHtml = this.ImageOutHtml(this.name, this.invImg);
        this.inventHtml = this.InventHtml(this.name, this.invImg);

        //addToInv(this);
    }

    ImageOutHtml = function (name, bigImg) {
        var total = '<img src="' + bigImg + '" title="' + name + '/>';
        return total;
    }

    InventHtml = function (name, invImg) {
        //console.log("tigger toy")
        var total = '<div id="' + name + 'Item" data-id="' + this.id +'"  data-type="' + this.type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';
        return total;
    }

}

class Armour extends Item {
    constructor(item) {
        super(item);
        this.defence = item.def;
        this.type = item.type;
        this.armourType = item.armourType;
        //this.inventHtml = "";
        this.inventHtml = this.armourInventHtml(this.id, this.name, this.armourType, this.invImg);
        //addToInv(this);
    }

    armourInventHtml = function (id, name, type, invImg) {
        //console.log("bigger boy", this.armourType)
        var total = '<div id="' + id + 'Item" data-id="' + id + '" data-type="' + type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';
        return total;
    }
}

var allAttacks = [];

class Attack {
    constructor(attack) {
        this.id = attack.name;
        this.name = attack.name;
        this.type = attack.type;
        this.dmgType = attack.dmgType;
        this.dmgRangeMin = attack.dmgRange[0];
        this.dmgRangeMax = attack.dmgRange[1];
        this.description = attack.description;
        //console.log(attack.special)
        this.special = attack.special;
        //if (attack.special != null) {
        //    this.special = this.Special(attack.special);
        //} else {
        //    this.special = null;
        //}

        allAttacks[allAttacks.length] = this;
    }

    Special = function (x) {
        // special attacks
        switch (x.id) {
            case "stun":
                return {id: x.id, chance: x.chance, }
                break;
            case "burn":
                break;
            case "poison":
                break;
            case "curse":
                break;
        }

    }

}

class Weapon extends Item {
    constructor(item) {
        super(item);
        //console.log(item.attacks);
        this.Attacks(item.attacks);
        this.inventHtml = "";
        this.inventHtml = this.weaponInventHtml(this.id, this.name, this.invImg);
        this.special = item.special;
    }

    weaponInventHtml = function (id, name, invImg) {
        //console.log("bigger boy")
        var total = '<div id="' + id + 'Item" data-id="' + id + '" data-type="weapon" title="' + name + '" data-allowDrop="false" class="invImg" style="background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';
        return total;
    }

    Attacks = function (attacks) {
        //console.log(attacks);
        this.attackOne = new Attack(attacks.attackOne);
        this.attackTwo = new Attack(attacks.attackTwo);
        this.attackThree = new Attack(attacks.attackThree);
    }
}

class Readable extends Item {
    constructor(item) {
        super(item);
        this.readText = item.pages;

        //this.inventHtml = this.InventHtml(this.name, this.img);
    }

    read = function () {
        enterReading(this.pages.default);
    }
}

class Health extends Item {

    constructor(item) {
        super(item);
        this.heal = item.heal;
    }
}

class Player {

    constructor(name, con, dex, str, int, wis, cha) {

        var baseMana = 10;
        var baseHealth = 15;

        this.name = name;
        this.stats = {};
        this.Stats(con, dex, str, int, wis, cha);
        this.inventory = this.Inventory();
        this.health = baseHealth + (this.stats.conMod * 2);
        this.mana = baseMana + (this.stats.intMod * 2);

        this.isInConversation = false;
        this.isInCombat = false;

        this.currentRoom = new Room(allRooms.basement);
    }

    Stats = function (con, dex, str, int, wis, cha) {
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
        console.log("hello?")
        this.id = monster.id;
        this.description = monster.description;
        this.name = monster.name;
        this.level = monster.level;
        this.img = monster.img;
        this.containsLoot = this.getLoot(monster.lootArray);

        this.isDead = false;

        this.weapon = new Weapon(monster.weapon);

        this.hp = monster.hp;
        this.dmg = monster.dmg;
        this.effectiveHP = monster.hp;
        this.effectiveDmg = monster.dmg;
        this.inflictions = [];
        this.turn;
    }

    calcTurn = function () {
        if (this.turn != null) {
            // does turn
            //for()

        } else {
            // does nothing
        }
    }

    checkInflictions = function () {
        for (var i = 0; i < this.inflictions.length; i++) {
            switch (this.inflictions[i]) {
                case "stunned":
                    // cannot perform any actions
                    this.turn = null;
                    break;
                case "cursed":
                    // cannot perform magic attacks
                    this.calcTurn();
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
        console.log("testy testy",x)
        var items = [];
        for (var i = 0; i < x.length; i++) {
            var temp = x[i].split(" ")
            if (temp > 1) {
                // make the amount of items (rare!)
                var temp = x[i].split(" ");

            } else {
                console.log("be tard")
                for (var j = 0; j < allItems.length; j++) {
                    console.log("beepy booper",x[i], allItems[j].id)
                    if (x[i] == allItems[j].id) {
                        items[items.length] = allItems[j];
                    }
                }
            }
        }

        console.log(items);
        return items; // return an array of DEFINITE ITEMS

    }

    enterCombat = function () { // do this here or globally?
        document.getElementById('textArea').style.display = 'none';
        document.getElementById('inputWrap').style.display = 'none';
        document.getElementById('battleArea').style.display = 'flex';

        //document.getElementById('monsterTitle').innerText = this.name;
        //document.getElementById('monsterImg').src = this.imgSource;
        //document.getElementById('monHP').innerText = this.health;
    }

    attack = function () {

        

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

    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == ID) { return convoClass[temp[i]]; }
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
        enterConvo(this, this.currentNode);
    }

    getNextNode = function(nextNode) {
        for (var i = 0; i < Object.keys(this.conversation).length; i++) {
            //console.log("ree3", Object.keys(this.conversation)[i], nextNode);
            
            if (nextNode == Object.keys(this.conversation)[i]) {
                var temp = this.conversation[Object.keys(this.conversation)[i]];
                if (temp.conditions == null) {
                    //console.log("bitch", temp);
                    this.currentNode = temp;
                    enterConvo(this, this.currentNode);
                } else {
                    // -> conditions, calculate req, check req; set openText to pass or fail openText
                    var t = reqMeaning(temp.conditions.req);
                    if (t) {
                       // console.log(temp.conditions);
                        enterConvo(this, temp.conditions.pass);
                    } else {
                        //console.log(temp.conditions);
                        enterConvo(this, temp.conditions.fail);
                    }

                    //console.log("bitch", temp);
                    //this.currentNode = temp;
                    //enterConvo(this, this.currentNode);
                }
            }
        }

    }

    Conversation = function (x) {

        


        return x;
    }
}