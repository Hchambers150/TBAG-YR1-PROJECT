var allRoomsArray = [];
var everything = [];


class Room {
    constructor(roomClass) {
        this.id = roomClass.roomID;
        this.description = roomClass.description;

        this.connectedRooms = roomClass.connectedRooms; // array [N, E, S, W] {roomAsObject}
        this.containers = roomClass.containers; // array [containerAsObject]
        this.objects = roomClass.objects;
        this.monsters = roomClass.monsters; //array [monsterAsObject]
        this.special = roomClass.special;
        this.eventNum = 0; // increases as player events occur - special things may happen at certain events

        everything[everything.length] = this;
        //allRoomsArray[]
    }

    checkEvents = function () {
        console.log("Nice 1")
        var temp = Object.keys(this.special);
        if (this.special != null) {
            //console.log("ree",this.special[temp[0]])
            for (var i = 0; i < temp.length; i++) {
                //console.log(temp[i])
                var currentNode = this.special[temp[i]];

                if (currentNode.eventNum == this.eventNum || currentNode.eventNum == "*") {
                    switch (currentNode.command) {
                        case "spawn":
                            // find monster in allMonsters, add it to this.monsters;
                            // init monsters

                            for (var i = 0; i < currentNode.amount; i++) {
                                for (var j = 0; j < currentNode.monsters.length; j++) {

                                    // init monster with string as object name
                                    this.monsters[this.monsters.length] = new NPC(currentNode.monsters[j]);
                                    print(currentNode.spawnText[0] + this.monsters[this.monsters.length-1].id + currentNode.spawnText[1])

                                    //print("a <font class='special' data-type='NPC' data-NPC='" + this.monsters[this.monsters.length-1].id + "'>creature</font> runs out from under a desk!")
                                    //var gnome1 = new NPC(allMonsters.gnome1);
                                    //this.monsters.push(gnome1);

                                }
                            }

                            break;
                        case "print":
                            print(currentNode.text)
                            break;
                        case "despawn":
                            break;
                        case "kill":

                            break;
                        default:
                            console.log("Wrong usage!", currentNode.command)
                            break;
                    }
                }
            }
        }
    }
}

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

        everything[everything.length] = this;
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
        this.currentPage = this.readText.default;
        //this.inventHtml = this.InventHtml(this.name, this.img);
    }

    read = function () {
        enterReading(this.readText.default);
    }

    getPage = function (x) {
        //console.log(this.readText)
        var temp = Object.keys(this.readText);
        for (var i = 0; i < temp.length; i++) {
            //console.log("yee", x, this.readText[temp[i]].id)
            if (x == this.readText[temp[i]].id) {
                //console.log(this.readText[temp[i]]);
                return this.readText[temp[i]];
            }
        }
    }

    nextPage = function () {
        //console.log(this.getPage(this.currentPage.nextPage))
        enterReading(this.getPage(this.currentPage.nextPage));
        this.currentPage = this.currentPage.nextPage;
    }

    lastPage = function () {
        //console.log(this.getPage(this.currentPage.nextPage))
        enterReading(this.getPage(this.currentPage.lastPage));
        this.currentPage = this.currentPage.nextPage;
    }

}

class Health extends Item {

    constructor(item) {
        super(item);
        this.heal = item.heal;
    }

    drink = function(drinker) {
        drinker.hp += this.heal;
        this.remove(); // how does this work?
    }
}

class object {

    constructor(object) {
        this.name = object.name;
        this.id = object.id;
        this.description = object.description;
        this.special = object.special;
        everything[everything.length] = this;
    }

}

class useable extends object {

    constructor(object) {
        super(object);

        this.isActive = object.isActive;
        this.special = {};

    }

    special = function () {

    }

}

class Container extends Object {
    constructor(container) {
        super(container);

        this.loot = parseLoot(container.contains); // ["dagger", "5 apples"]
        this.locked = container.locked; // false / "keyOne"
    }

    parseLoot = function (array) {
        // go through allItems, match items, add items to container invent
        // be able to have "5 apples" etc

        for (var i = 0; i < array.length; i++) {
            var temp = array.split(" ");
            if (temp.length > 1) {
                // locate item in allArray
                // add specified amount to invent

            } else {
                // locate item in allArray
                // add item to invent


            }
        }
    }

    tryUnlock = function (keyID) {
        // if keyID matches this.locked, locked = false, print unlocked
        // else, print wrong key
    }


}

class Player {

    constructor(name, con, dex, str, int, wis, cha) {

        var baseMana = 10;
        var baseHealth = 15;

        this.name = name;
        this.stats = {};
        this.mods = {};
        this.Stats(con, dex, str, int, wis, cha);
        this.inventory = this.Inventory();
        this.health = baseHealth + (this.stats.conMod * 2);
        this.mana = baseMana + (this.stats.intMod * 2);
        this.inflictions = {};

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
        this.mods.conMod = tempArray[0];
        this.mods.dexMod = tempArray[1];
        this.mods.strMod = tempArray[2];
        this.mods.intMod = tempArray[3];
        this.mods.wisMod = tempArray[4];
        this.mods.chaMod = tempArray[5];

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

        this.isDead = false;

        this.weapon = new Weapon(monster.weapon);

        this.spared = false;
        this.hp = monster.hp;
        this.dmg = monster.dmg;
        this.effectiveHP = monster.hp;
        this.effectiveDmg = monster.dmg;
        this.inflictions = [];
        this.turn = true;
        everything[everything.length] = this;
    }
    
    getLoot = function (x) {
        var items = [];
        for (var i = 0; i < x.length; i++) {
            var temp = x[i].split(" ")
            if (temp.length > 1) {
                // make the amount of items (rare!)
                for (var j = 0; j < allItems.length; j++) {
                    if (temp[1] == allItems[j].id) {
                        for (var k = 0; k < temp[0]; k++) {
                            items[items.length] = allItems[j];
                        }
                    }
                }
            } else {
                for (var j = 0; j < allItems.length; j++) {
                    if (x[i] == allItems[j].id) {
                        items[items.length] = allItems[j];
                    }
                }
            }
        }

        console.log(items);
        return items; // return an array of DEFINITE ITEMS

    }

    calcTurn = function () {
        if (this.turn != null){
            this.attack();
        } else {
            print("The " + this.name + " cannot take its turn. ");
            checkInfliction();
        }
    }

    attack = function () {

        for (var i = 0; i < this.inflictions.split(",").length; i++) {

            switch (impairments.split(" ")[0]) {
                case "":
                    break;

                default: // nothing wrong!
                    break;
            }
        }
        // look at player's inflictions; if attack can inflict, do that
        // else, choose highest damage attack

        // calculate damage done | dmgType, dmg, level
        // deplete players hp
        // print damage done

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
                case "electric":
                    // does extra damage to armoured enemies
                    break;
            }
        }
    }

    die = function () {
       // scour currentRoom.monsters, match id to this; splice from array
        this.isDead = true;
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


                }
            }
        }

    }

    Conversation = function (x) {

        return x;
    }
}