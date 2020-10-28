// game - based javascript done here:

var conMod;
var dexMod;
var strMod;
var intMod;
var wisMod;
var chaMod;

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

function equip(x) {
    // x = event; therefore

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

            player.inventory[i].innerHTML = x.inventHtml;
            return;

        }

    }

    //<div id="lootWeaponTest" draggable="true" ondragstart="drag(event)">

    //</div>
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
        var total = '<div id="' + name + 'inv" data-type="' + this.type + '" data-allowDrop="false" class="invImg" style="background-image: url(\'itemImgs/' + invImg +'\');" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"></div>';

        return total;
    }

}

var unInitItems = [
    
    ["Shitty Dagger", "weapon", "shittyDaggerBig.png", "shittyDaggerInv.png", 1, 0, "This dagger feels too heavy."],
    ["Shitty Dagger", "weapon", "shittyDaggerBig.png", "shittyDaggerInv.png", 1, 0, "This dagger feels too heavy."]
    
];

//function initItems(x) {
//    for (var i = 0; i < x.length; i++) {
//        var toString(initItems[x][0]) 
//    }

//}

class Player {

    constructor(name, con, dex, str, int, wis, cha) {

        var baseMana = 10;
        var baseHealth = 15;

        this.name = name;

        this.stats(con, dex, str, int, wis, cha);

        this.inventory = this.Inventory();

        this.health = baseHealth + (conMod*2);
        this.mana = baseMana + (intMod*2);

    }

    stats = function (con, dex, str, int, wis, cha) {
        this.stats.con = con;
        this.stats.dex = dex;
        this.stats.str = str;
        this.stats.int = int;
        this.stats.wis = wis;
        this.stats.cha = cha;

        var tempArray = getModifiers(con, dex, str, int, wis, cha);
        conMod = tempArray[0];
        dexMod = tempArray[1];
        strMod = tempArray[2];
        intMod = tempArray[3];
        wisMod = tempArray[4];
        chaMod = tempArray[5];

        setStats(con, dex, str, int, wis, cha);
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
