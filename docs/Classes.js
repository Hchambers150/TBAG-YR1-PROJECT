class Room {
    constructor() {
        this.roomID = roomID;
        this.description = description;

        this.connectedRooms = connectedRooms; // array

        this.contains = contains; // array
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
        var total = '<div id="' + name + 'Item" data-type="' + this.type + '" title="' + name + '" data-allowDrop="false" class="invImg" style="background-color:black;background-image: url(\'itemImgs/' + invImg + '\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

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
    constructor(name, dmgType, hp, dmg, level) {
        this.name = name;
        this.dmgType = dmgType;
        this.hp = hp;
        this.dmg = dmg;
        this.level = level;
    }
}