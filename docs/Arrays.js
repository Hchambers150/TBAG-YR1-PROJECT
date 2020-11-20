var unInitItems = [

    ["Dagger", "weapon", "shittyDaggerBig.png", "shittyDaggerInv.png", 1, 0, "This dagger feels too heavy."],
    ["Helmet", "helm", "", "leatherCoif.png", 0, 1, "This leather coif won't offer much protection..."],
    ["Leather Body", "body", "", "leatherBody.png", 0, 3, "This studded leather body won't offer much protection..."],
    ["Broad Sword", "weapon", "", "broadSword.png", 3, 0, "This broadsword seems pretty capable!"],
    ["Rat Bane", "weapon", "", "ratBane.png", 2, 0, "Seems like the perfect size for killing rats..."],
    ["Steel Tipped Boots", "boots", "", "steelTippedBoots.png", 0, 2, "These boots seem to offer a good amount of protection!"],
    ["Glasses", "helm", "", "glasses.png", 0, 0, "I can't see what these could be useful for..."],
    ["Steel Platebody", "body", "", "steelBody.png", 0, 4, "This heavy steel body should protect me."], // Good Images...
    ["Steel Fullhelm", "helm", "", "steelHelm.png", 0, 2, "This heavy steel fullhelm should protect me."],
    ["Steel Boots", "boots", "", "steelBoots.png", 0, 2, "These heavy steel boots should protect me."],
    ["Steel Platelegs", "legs", "", "steelLegs.png", 0, 4, "These heavy steel platelegs should protect me."],

];

var conversationArray = { // null == deadend, false == exit tree, true == enterCombat()

    gnome1: {

        whoAreYou: ["Who am I? I've lived on these grounds for years! It's only until now that I've been hidden.", [
            ["I've never seen you!", null, "Honest, I was here."],
            ["Ask for a quest", "quest"]
        ]],

        quest: ["Ah, a quest is what you're after? This'll open up a whole new chapter!", [
            ["Thanks, bye!", false],
        ]],

        sayHello: ["Hello, yourself", [
            ["Say  goodbye", false],
            ["Who are you?", "whoAreYou"]
        ]],

        default: [null, [
            ["Say hello.", "sayHello"],
            ["Ask for a quest", "quest"],
            ["Attack", true]
        ]]
    }

};

var conversationArray2 = {

    gnome1: {

        grabGnome: { // ID, topicID, conditions, openText
            id: "grabGnome", topicID: null, conditions: {
                requirement: "min 10 strength", pass: ["The creature stops flailing.", "bound = true"], fail: ["The creature jumps from your grasp.", null]
            }, openText: null, options: {
                1: {},
                2: {},
                3: {},
            }
        },

        runGnome: {
            id: "runGnome", topicID: null, conditions: null,
            openText: "The creature starts freaking out and running around the room, knocking things over, and trying to find a way to escape.", options: {
                grabGnome: {
                    text: "Grab the creature.", nextNode: "grabGnome"
                },
                letGo: {
                    text: "Leave him alone.", nextNode: null
                }
            }
        },

        wifeTell2: {
            id: "wifeTell2", topicID: null, conditions: null,
            openText: ""
        },

        wifeTell: {
            id: "wifeTell", topicID: "quest", conditions: null,
            openText: "In that case... I had to leave my wife back there. Just a few rooms back - I didn't want to leave her, it's just... She insisted.",

            options: {
                optionOne: {
                    text:"We have to go and help her!", nextNode: "wifeTell2"
                },
                optionTwo: {
                    text:"She's probably dead...", nextNode: "runGnome"
                }
            }
        },

        halt: {

        },

        default: {
            id: "default", topicID: "greeting", conditions: null,
            openText: "The creature appears to be very afraid.",

            options: {
                optionOne: {
                    text: "Halt!", nextNode: "halt"
                },
                optionTwo: {
                    text: "Who are you?", nextNode: "wifeTell"
                },
                optionThree: {
                    text: "What are you?", nextNode: "speciesTell"
                }
            }
        },
    }

}

var allMonsters = { //name, weapon, hp, dmg, level, img, lootArray, weapon

    gnome1: {
        id: "gnome1", name: "Gnome", weapon: "dagger", description: "Looks like he's seen some shit...",
        hp: 15, dmg: 2, level: 1,
        img: "https://static.wixstatic.com/media/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg/v1/fill/w_564,h_846,al_c,q_90/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg", lootarray: [], conversationClass: conversationArray2.gnome1
    }

}

var allRooms = {

    basement: {
        roomID: "basement", description: "Dusty room tee hee",
        connectedRooms: ["room1", null, null, null],
        containers: [],
        monsters: [],
        special: {
            1: {
                eventNum: 3, command: "spawn", amount: "1", monsters: [allMonsters.gnome1],
                spawnText: "A small creature comes crawling out from underneath one of the worktables."
            },
            2: {
                eventNum: 10, command: "print", text: "This is a test - nothing but a test! Honest!"
            },
            3: {
                eventNum: 5, command: "despawn", amount: "1", monsters: ["gnome1"], 
                despawnText: "The gnome manages to squeeze himself through a mouse hole on the other side of the room."
            }
            
        }
    }

}


//var gnome1 = new NPC(allMonsters.gnome1);