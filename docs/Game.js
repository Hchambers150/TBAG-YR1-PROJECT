// game - based javascript done here:

function beginGame(name, con, dex, str, int, wis, cha) {

    // give all items

    player = new Player(name, con, dex, str, int, wis, cha);
    //var temp = [
    //    // readables
    //    ["Mom's Note", "readable", "The last thing my Mother left me...", "scroll.png", [
    //        "Page 1 | " + createMomsNote(),
    //        "Page 2 | Lots of text",
    //        "Page 3 | Lots of text"
    //    ]]
    //];
    //console.log(createMomsNote())

    initItems();
    player.currentRoom.checkEvents();
    //initAllItems(temp);
    //giveStartItems();
    updateScroll();
}

function createMomsNote() {

    //unInitItemsArray.momsNote.pages.default.title;

    var toBe = player.name + `,
    I don't know how long I've been gone, but if you've found this letter I'm probably far, far away; but there's one thing
    that I do know - one thing that will never change - I miss you.<br><br>
    `;

    if (player.stats.con <= 10) {
        toBe += `I miss my frail little boy, whom I nursed back to health all those years ago. You probably don't remember, do you? That whole year you
        were bed-bound; I would come and read to you every night and you would glare at me. I would describe special, magical places
        to you and you would stare at me with eyes full of wonder, and excitement. It was horrible for me, sharing sceneries and 
        feelings with you that you couldn't go out and experience yourself.`;
    } else if (player.stats.con >= 15) {

        toBe += `I miss my big bear! When you were very, very young, you would eat and eat and eat. Whatever I gave you, you would wolf it down! And
you looked so cute, with your big cheeks and soft arms, I could've gobbled you up any day! And once, when you went for an
adventure and I didn't see you for the entire day, until you came back after dark, covered in a rash from a poison Oak -
but by the next day, you were fit as a fiddle again, and you went for another adventure.`;
    }

    if (player.stats.dex < 10) {
        toBe += `You found your thick fingers and shaky hands cumbersome, and you were never good at anything fiddly.
        I could always hear you stomping around the house like an animal - `;
        //momsNote = momsNote + "<br><br>But when you got older, ";
    } else if (player.stats.dex > 15) {
        //momsNote = momsNote + "<br><br>But when you got older,";
    }

    unInitItemsArray.momsNote.pages.default.content = toBe;

    //page two

    //unInitItemsArray.momsNote.pages.pageTwo.title = "Page Two";
    var toBe = "";

    if (player.stats.str < 10) {

    } else if (player.stats.str > 15) {

    }

    toBe += "The only thing your Father left behind was his workshop;";

    if (player.stats.int < 10) {
        toBe += `and all it seemed to produce was dust. 
The worktables lay bare; disused tools were strewn about the shelves,
lifeless creations remained unfinished, their purposes indistinguishable. `;
    } else if (player.stats.int > 15) {
        toBe += `and you gave it a use. Before you encountered Magicks, you would tinker away, creating plaything 
after plaything; from wind-up mechanical animals which would pace around your room at night, to blunt weapons 
which were used to hack at bushes and vines on the grounds. When you attuned, however, you learned to imbue your 
creations with the Elements. Fires brewed in the bellies of your mechanical beasts, churning their motors; 
Water was used to extinguish them. 
Manufactured Air currents helped guide lightweight aircraft from room to room; and you utilised the power of Earth`
    }

    //unInitItemsArray.momsNote.pages.pageThree.title = "Page three";
    var toBe = "";

    if (player.stats.wis < 10) {

    } else if (player.stats.wis > 15) {

    }

    if (player.stats.cha < 10) {

    } else if (player.stats.cha > 15) {

    }

    //return momsNote;
}


function checkStats(stat) {
    //console.log(player.stats);
    var temp = Object.keys(player.stats);
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == stat) {
            //console.log("ree", temp[i], player.stats[temp[i]])
            return player.stats[temp[i]];
        }
    }
}

function updateScroll() {
    var element = document.getElementById("output");
    element.scrollTop = element.scrollHeight;
}

function checkInput(ele) {

    if (event.key == 'Enter') {
        scanInput(ele.value);
        ele.value = "";
        player.currentRoom.checkEvents();
    }

}

function checkItems(xID) {

    for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].id.toLowerCase() == xID.toLowerCase()) {
            console.log(allItems[i].id.toLowerCase(), xID.toLowerCase())
            return allItems[i];
        } else if(allItems[i].name.toLowerCase() == xID.toLowerCase()) {
            console.log(allItems[i].id.toLowerCase(), xID.toLowerCase())
            return allItems[i];
        }
    }

    return false;
}

function checkReadables(xID) {
    for (var i = 0; i < allReadables.length; i++) {
        if (toString(allReadables[i].name.toLowerCase()) == toString(xID.toLowerCase())) {
            return allReadables[i];
        }
    }

    return false;
}

function checkMonsters(xID) {
    //console.log(xID)
    var temp = player.currentRoom.monsters;
    for (var i = 0; i < temp.length; i++) {
        //console.log(temp[i].id)
        if (xID.toLowerCase() == temp[i].id.toLowerCase()) {
            //console.log("yee!", player.currentRoom.monsters[i])
            return player.currentRoom.monsters[i];
        }
    }
}

var last;

function scanInput(str) {

    // split it into words, if word1 == command -> follow command-specific instruction
    var strArray = str.split(" ");

    switch (strArray[0].toLowerCase()) {
        case "look":
            print(player.currentRoom.description);
            player.currentRoom.eventNum++;
            break;

        case "wait":
            print("You do nothing.")
            player.currentRoom.eventNum++;
            break;

        case "repeat":
        case "again":
            scanInput(last);
            break;

        case "move":
        case "travel":
        case "go":
            break;

        case "enter":
            break;

        case "exit":
        case "leave":
            break;

        case "loot":
        case "pilfer":
        case "take":
        case "open":
            // check if container or door

            player.currentRoom.eventNum++;
            break;

        case "drop":
            player.currentRoom.eventNum++;
            break;

        case "store":
            player.currentRoom.eventNum++;
            break;

        case "equip":
            break;

        case "use":
            break;

        case "examine":
            player.currentRoom.eventNum++;
            break;

        case "read":
            if (strArray.length > 2) {
                var toCheck = "";
                for (i = 1; i < strArray.length; i++) {
                    toCheck = toCheck + " " + strArray[i];
                }

                var temp = checkReadables(toCheck);
                if (temp != false) {
                    enterReading(temp.readText);
                }
            } else {
                enterReading(checkReadables(strArray[1]));
            }
            
            break;

        case "pull":
        case "push":
        case "flick":
        case "flip":
        case "press":
        case "interact":
            //doButton(strArray[1]);
            player.currentRoom.eventNum++;
            break;

        case "talk":
            player.currentRoom.eventNum++;
            break;

        case "attack":
            player.currentRoom.eventNum++;
            break;

        case "clear":
            document.getElementById('output').innerText = " ";
            break;

        case "help":
            print(`<pre class="important">
+----------------------------------------------------------------------------------------------+<br>
| Command | Args                 | Desc                                                        |<br>
|----------------------------------------------------------------------------------------------|<br>
| Help    | ----                 | Prints the help menu                                        |<br>
| Use     | {item1} {item2}      | Uses the <font class="special">FIRST ITEM</font> on the <font class="special">SECOND ITEM</font>                      |<br>
| Go      | {direction} / {room} | Moves your character into a room in the specified direction |<br>
 +---------------------------------------------------------------------------------------------+<br>
           </br></pre>`);
                
                break;

        default:
            print("You do nothing. <font class='important'>[Please make sure your command is correct! Use 'help'!]</font>");
            break;
    }

    last = str;

}

function go(roomID) { // change to DIRECTION
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

function addToInv(item) {
    //console.log(item);
    for (var i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].innerHTML == "") {

            var toPrint = 'You put the <font class="special" title="' + item.name + '" data-type="' + item.type + '">' + item.name + '</font> in your inventory.';
            print(toPrint);
            player.inventory[i].innerHTML = item.inventHtml;

            return;
        }
    }

    var toPrint = 'You put the <font class="special" title="' + item.name + '" data-id="'+ item.id +'" data-type="' + item.type + '">' + item.name + '</font> in your inventory.';
    print(toPrint);
    player.inventory[player.inventory.length].innerHTML = item.inventHtml;
}