// game - based javascript done here:

var currentRoom;
var commands = [

    // go
    ["go", ]

];

function updateScroll() {
    var element = document.getElementById("output");
    element.scrollTop = element.scrollHeight;
}

function checkInput(ele) {

    if (event.key == 'Enter') {
        //console.log("Wow, this works");
        //console.log(ele.value);
        scanInput(ele.value);
    }

}

function scanInput(str) {

    // split it into words, if word1 == command -> follow command-specific instruction
    var strArray = str.split(" ");
    console.log(strArray);

    //
    for (var i = 0; i < commands[0].length; i++) { }

}

function go(roomID) {
    for (var i = 0; i < allRooms.length; i++) {
        // match roomID with room, updateRoom
        if (allRooms[i].roomID.toLowerCase() == roomID.toLowerCase()) {
            updateRoom(allRooms[i]);
            look();
        }
    }
}

function updateRoom(room) {
    currentRoom = room;
}

function look() {
    return currentRoom.description;
}


function battlePrint(x) {
    var output = document.getElementById("battleOutput");
    output.innerHTML = output.innerHTML + "<br>" + x;
    document.getElementById('battleOut').scrollTop = document.getElementById('battleOut').scrollHeight;
}

function print(x) {
    var output = document.getElementById("output");
    output.innerHTML = output.innerHTML + "<br>" + x;
    document.getElementById('textArea').scrollTop = document.getElementById('textArea').scrollHeight;
}

function getModifiers(con, dex, str, int, wis, cha) {
    var tempArray = [con, dex, str, int, wis, cha];
    var toReturn = [];

    for (var i = 0; i < tempArray.length; i++) {
        tempArray[i] = parseInt(tempArray[i]);
        if (tempArray[i] == 8 || tempArray[i] == 9) {
            toReturn[i] = -1;
        } else if (tempArray[i] == 10 || tempArray[i] == 11) {
            toReturn[i] = 0;
        } else if (tempArray[i] == 12 || tempArray[i] == 13) {
            toReturn[i] = 1;
        } else if (tempArray[i] == 14 || tempArray[i] == 15) {
            toReturn[i] = 2;
        } else if (tempArray[i] == 16 || tempArray[i] == 17) {
            toReturn[i] = 3;
        } else if (tempArray[i] == 18 || tempArray[i] == 19) {
            toReturn[i] = 4;
        } else if (tempArray[i] == 20) {
            toReturn[i] = 5;
        }
           
    }
    return (toReturn);
}

function checkEquipped() {
    // go through helm, body, legs, boots, weapon, gloves, ring , get all dmg, defence values

}


function addToInv(x) {
    // x = object / array has:
    //     img, name, 

    // first, scan inventory for a free space
    // then, 
    // lastly, print "you equip" objectname


    for (var i = 0; i < player.inventory.length; i++) {
        //console.log("yee", player.inventory[i].innerHTML)
        if (player.inventory[i].innerHTML == "") {

            var toPrint = "You put the <font class='special'>" + x.name +"</font> in your inventory.";
            print(toPrint);

            player.inventory[i].innerHTML = x.inventHtml;
            return;

        }

    }
}

var unInitItems = [

    ["Shitty Dagger", "weapon", "shittyDaggerBig.png", "shittyDaggerInv.png", 1, 0, "This dagger feels too heavy."],
    ["Helmet", "helm", "shittyDaggerBig.png", "leatherCoif.png", 0, 1, "This leather coif won't offer much protection..."],
    ["Leather Body", "body", "", "leatherBody.png", 0, 3, "This studded leather body won't offer much protection..."],
    ["Broad Sword", "weapon", "", "broadSword.png", 3, 0, "This broadsword seems pretty capable!"],
    ["Rat Bane", "weapon", "", "ratBane.png", 2, 0, "Seems like the perfect size for killing rats..."],
    ["Steel Tipped Boots", "boots", "", "steelTippedBoots.png", 0, 2, "These boots seem to offer a good amount of protection!"],
    ["Glasses", "helm", "", "glasses.png", 0, 0, "I can't see what these could be useful for..."],
    ["Steel Plateody", "body", "", "steelBody.png", 0, 4, "This heavy steel body should protect me."], // Good Images...
    ["Steel Fullhelm", "helm", "", "steelHelm.png", 0, 2, "This heavy steel fullhelm should protect me."],
    ["Steel Boots", "boots", "", "steelBoots.png", 0, 2, "These heavy steel boots should protect me."],
    ["Steel Platelegs", "legs", "", "steelLegs.png", 0, 4, "These heavy steel platelegs should protect me."],
    ["Mom's Note", "readable", "The last thing my Mother left me...", "letter.png", ["Page 1 | Lots of text", "Page 2 | Lots of text", "Page 3 | Lots of text"]]
];

var allItems = [];

function initAllItems() {

    // go through init items
    // create a new Object for each

    for (var i = 0; i < unInitItems.length; i++) {
        var x = unInitItems[i];
        if (x[1] == "readable") {
            allItems[i] = new Readable(x[0], x[1], x[2], x[3], x[4]);
        } else {
            allItems[i] = new Item(x[0], x[1], x[2], x[3], x[4], x[5], x[6]);
        }
    }

}

function giveStartItems() {
    for (var i = 0; i < allItems.length; i++) {
        addToInv(allItems[i]);
    }
}

class Readable {
    constructor(name, type, description, invImg, readText) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.invImg = invImg;
        this.readText = readText;
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

        this.imageOutHtml = this.ImageOutHtml(name,bigImg);
        this.inventHtml = this.InventHtml(name, invImg);


    }

    ImageOutHtml = function (name, bigImg) {
        var total = '<img src="'+bigImg+'" title="'+name+'/>';

        return total;

    }

    InventHtml = function (name, invImg) {
        var total = '<div id="' + name + 'Item" data-type="' + this.type + '" title="'+name+'" data-allowDrop="false" class="invImg" style="background-color:black;background-image: url(\'itemImgs/' + invImg +'\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

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

        this.health = baseHealth + (this.stats.conMod*2);
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


//var player = new Player('test testington', 8, 10, 12, 14, 16, 20);
