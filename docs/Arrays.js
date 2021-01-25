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

var unInitItemsArray = {

    momsNote: {
        id: "momsNote", name: "Mom's Note", type: "readable", img: "scroll.png", description: "The last thing my Mother left me...",
        pages: {
            default: {
                id: "default", title: "Page One", content: "", nextPage: "pageTwo", lastPage: null, parent: "momsNote"
            },
            pageTwo: {
                id: "pageTwo", title: "Page Two", content: "", nextPage: "pageThree", lastPage: "default", parent: "momsNote"
            },
            pageThree: {
                id: "pageThree", title: "Page Three", content: "", nextPage: null, lastPage: "pageTwo", parent: "momsNote"
            },
        }
    },

    wifeImg: {
        id: "wifeImg", name: "Gnomish picture", type: "item", img: "wifeImg.png", description: "A picture of a gnome woman."
    },

    gnomeDagger1: {
        id: "gnomeDagger", name: "Gnome Dagger", type: "pWep", img: "shittyDaggerInv.png",
        attacks: {
            attackOne: {
                name: "Slash", type: "slash", dmgType: "physical", dmgRange: [1, 5], special: null,
                description: "A fast slash."
            },
            attackTwo: {
                name: "Stab", type: "stab", dmgType: "physical", dmgRange: [2, 6], special: { id: "bleed", maxDmg: 2, chance: 30, turns: 3 },
                description: "A quick stab."
            },
            attackThree: {
                name: "Throw", type: "range", dmgType: "physical", dmgRange: [1, 3], special: { id: "disarmPlayer", chance: 5, turns: 2 },
                description: "I suppose there are other uses for this..."
            }

        },
        description: "This dagger feels too heavy."
    },

    dagger: {
        id: "dagger", name: "Dagger", type: "pWep", img: "shittyDaggerInv.png",
        attacks: {
            attackOne: {
                name: "Slash", type: "slash", dmgType: "physical", dmgRange: [1, 5], special: null,
                description: "A bolt of lightning that has a chance to stun enemies."
            },
            attackTwo: {
                name: "Stab", type: "stab", dmgType: "physical", dmgRange: [2, 6], special: { id: "bleed", maxDmg: 2, chance: 30, turns: 3 },
                description: "A bolt of fire that has a chance to burn enemies."
            },
            attackThree: {
                name: "Throw", type: "range", dmgType: "physical", dmgRange: [1, 3], special: { id: "disarmPlayer", chance: 5, turns: 2 },
                description: "I suppose there are other uses for this..."
            }

        },
        description: "This dagger feels too heavy."
    },

    wand: {
        id: "wand", name: "Wand", type: "mWep", img: "wand.png",
        attacks: {
            attackOne: {
                name: "Lightning Bolt", type: "spell", dmgType: "magic", dmgRange: [1, 7],
                special: { type: "stun", id: "Stunned", chance: 10, minTurns: 1, maxTurns: 2 },
                description: "A bolt of lightning that has a chance to stun enemies."
            },
            attackTwo: {
                name: "Fire Bolt", type: "spell", dmgType: "magic", dmgRange: [15, 16],
                special: { type: "burn", id: "Burning", chance: 33, minDMG: 1, maxDMG: 3, minTurns: 1, maxTurns: 3 },
                description: "A bolt of fire that has a chance to burn enemies."
            },
            attackThree: {
                name: "Wand Bash", type: "stab", dmgType: "physical", dmgRange: [1, 3], special: null,
                description: "I suppose there are other uses for this..."
            }
        },
        description: "This crudely crafted wand hasnt seen much action."
    },

    leatherHelmet: {
        id: "leatherHelmet", name: "Leather Helmet",
        type: "armour", armourType: "helm", img: "leatherCoif.png", def: 1,
        description: "This leather coif wont offer much protection."
    },

    leatherBody: {
        id: "leatherBody", name: "Leather Body",
        type: "armour", armourType: "body", img: "leatherBody.png", def: 1,
        description: "This leather body wont offer much protection."
    },

    healthPot: {
        id: "healthPotion", name: "Health Potion", type: "heal", img: "healthPot.png", heal: 5,
        description: "Looks like it will heal some health."
    },

    gnomeFists: {
        id: "gnomeFists", name: "Gnome Fists", type: "pWep", img: "fists.png",
        attacks: {
            attackOne: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 1],
                special: null,
                description: "I can try hitting them."
            },
            attackTwo: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 2],
                special: null,
                description: "I can try hitting them."
            },
            attackThree: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 2],
                special: null,
                description: "I can try hitting them."
            }
        },
        description: "My fists."
    },

    playerFists: {
        id: "fists", name: "Fists", type: "pWep", img: "fists.png", 
        attacks: {
            attackOne: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 1],
                special: null,
                description: "I can try hitting them."
            },
            attackTwo: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 2],
                special: null,
                description: "I can try hitting them."
            },
            attackThree: {
                name: "Punch", type: "blunt", dmgType: "physical", dmgRange: [1, 2],
                special: null,
                description: "I can try hitting them."
            }
        },
        description: "My fists."
    },
}

var allItems = [];

function initItems() {
    var temp = Object.keys(unInitItemsArray);

    createMomsNote();

    console.log(temp)
    for (var i = 0; i < temp.length; i++) {
        if (i != 8 ) {
            var t = unInitItemsArray[temp[i]]
            console.log(t);

            switch (t.type) {
                case "armour":
                    i.type = i.armourType;
                    allItems[allItems.length] = new Armour(t);
                    stealthToInv(allItems[allItems.length - 1])
                    break;
                case "heal":
                    allItems[allItems.length] = new Health(t);
                    stealthToInv(allItems[allItems.length - 1]);
                    break;
                case "readable":
                    allItems[allItems.length] = new Readable(t);
                    stealthToInv(allItems[allItems.length - 1])
                    break;
                case "item":
                    allItems[allItems.length] = new Item(t);
                    stealthToInv(allItems[allItems.length - 1])
                    break;
                case "pWep":
                case "mWep":
                    allItems[allItems.length] = new Weapon(t);
                    stealthToInv(allItems[allItems.length - 1])
                    break;
            }
        }
    }

}

//stealthToInv(allItems[])

var currentQuests = [];

var quests = {
    follow_the_gnome: {
        npcID: "gnome1"
    },

    find_the_wife: {
        npcID: "gnomeWife"
    }

}

var conversationArray2 = {

    gnome1: {
        default: { // id, topicID, conditions, openText, options{optionOne{text, nextnode}}
            id: "default", topicID: null, conditions: null,
            openText: `The humanoid creature didn't seem to notice you, and has turned his back and squatted down to check his backpack. <br><br>
            His scabbard appears to hold a <font class='special' data-type='pWep'>dagger</font>. 
            From a distance, you can hear him muttering <font class="convo"> "Where is it, oh, where could it be?"</font>`,
            options: {
                optionOne: {
                    text: "Grab the gnome", nextNode: "held"
                },
                optionTwo: {
                    text: '<font class="convo">"Halt!"</font>', nextNode: "startled"
                },
                optionThree: {
                    text: "Ignore the creature.", nextNode: "exit"
                }
            }
        },

        held: {
            id: null, topicID: null, cBool: true, conditions: {
                req: "min 9 dex",
                pass: {
                    id: "held", topicID: null, conditions: null,
                    openText: "You rush the creature from behind and grapple him - his small size makes it very easy for you.", options: {
                        optionOne: {
                            text: '<font class="convo">"Who are you?"</font>', nextNode: "geraldGnutter"
                        },
                        optionTwo: {
                            text: '<font class="convo">"What are you doing here?"</font>', nextNode: "theTunnel"
                        },
                        optionThree: {
                            text: "Attack the creature.", nextNode: "fight -- stunned"
                        }
                    }
                }, fail: {
                    id: "held", topicID: null, conditions: null,
                    openText: "You rush the creature from behind and grapple him - his small size makes it very easy for you.", options: {
                        optionOne: {
                            text: '<font class="convo">"Who are you?"</font>', nextNode: "geraldGnutter"
                        },
                        optionTwo: {
                            text: '<font class="convo">"What are you doing here?"</font>', nextNode: "theTunnel"
                        },
                        optionThree: {
                            text: "Attack the creature.", nextNode: "fight -- stunned"
                        }
                    }
                }
            },
            openText: null, options: null
        },

        geraldGnutter: {
            id: "geraldGnutter", topicID: null, conditions: null,
            openText: `<font class="convo">"Me? I'm Gerald G. Gnutter, a fine upstanding Gnome citizen. I am - I was a soldier, back in Gnottingham… Well, that was a long time ago."</font> `,

            options: {
                optionOne: {
                    text: "--", nextNode: null
                },
                optionTwo: null,
                optionThree: {
                    text: "--", nextNode: null
                }
            }
        },

        theTunnel: {
            id: "theTunnel", topicID: null, conditions: null,
            openText: `<font class="convo">"Well, up until recently, I've been travelling with my wife, through the tunnel… After Gnottingham was purged… I don't even want to think about it."</font>`,

            options: {
                optionOne: {
                    text: '<font class="convo">"Where is your wife?"</font>', nextNode: "wife"
                },
                optionTwo: {
                    text: `<font class="convo">"What happened?"</font>`, nextNode: "preGnottingham"
                },
                optionThree: {
                    text: '<font class="mystical">"The tunnel?"</font>', nextNode: "theTunnel2"
                }
            }
        },

        theTunnel2: {
            id: null, topicID: null, cBool: true, conditions: {
                req: "min 15 cha",
                pass: {
                    id: "theTunnel2", topicID: null, conditions: null,
                    openText: `<font class="convo">"I've spent the last 20 years mapping out that dungeon
                    - there's all sorts in there; dragons and cities for them to prey on, deserts, woodland - mountains, even! It's
                    not like the stories of old, there is no sky, no stars... But, I finally came across this passage!
                    This tunnel, leading to this door, which lead to this room! And from the sounds of it, I was right! I'm finally... Finally free!"</font>`, options: {
                        optionOne: null,
                        optionTwo: null,
                        optionThree: {
                            text: "--", nextNode: null
                        }
                    }
                }, fail: {
                    id: "theTunnel2", topicID: null, conditions: null,
                    openText: `<font class="convo">"I've spent the last 20 years gathering that information! I'm not just going to tell you!"</font>`, options: {
                        optionOne: null,
                        optionTwo: null,
                        optionThree: {
                            text: "--", nextNode: null
                        }
                    }
                }
            },
            openText: null, options: null
        },

        wife: {
            id: "wife", topicID: null, conditions: null,
            openText: `<font class="convo">"I had to leave her a few rooms back… We were attacked, and, well, 
            she told me to keep going - and I didn’t have time to think, you see, and… I probably don't have enough time to go back…"</font>`,

            options: {
                optionOne: {
                    text: `<font class="convo">"We need to go now!"</font>`, nextNode: "followGnome"
                },
                optionTwo: null,
                optionThree: {
                    text: `<font class="convo">"You're right, she's probably dead."</font>`, nextNode: "wifeLeave"
                }
            }
        },

        wifeLeave: {
            id: ` `,
            topicID: "quest", quest: "find_the_wife", conditions: null,
            openText: `The gnome suddenly looks visibly drained and drops to his knees. 
            He casts a quick glance around the room, looks at you, picks up his backpack, and heads to the stairway.<br><br>
            As he turns to leave, a small slip of paper falls from his backpack. Before you have the chance to call out to him, he is out of sight.`,

            options: {
                optionOne: {
                    text: "--", nextNode: null
                },
                optionTwo: {
                    text: "--", nextNode: null
                },
                optionThree: {
                    text: "--", nextNode: null
                }
            }
        },

        followGnome: {
            id: "followGnome", topicID: "quest", quest: "follow_the_gnome", conditions: null,
            openText: `<font class="convo">"Ok, if you think so... Follow me, she was just a few rooms back!"<br><br>
                        The gnome disappears into the wall he came from.</font>`,

            options: {
                optionOne: {
                    text: "--", nextNode: null
                },
                optionTwo: {
                    text: "--", nextNode: null
                },
                optionThree: {
                    text: "--", nextNode: null
                }
            }
        },

        preGnottingham: {
            id: "preGnottingham", topicID: null, conditions: null,
            openText: `<font class="convo">"Are you sure you want to know? It's a long story."</font>`,

            options: {
                optionOne: null,
                optionTwo: {
                    text: '<font class="convo">"Yes, I want to know."</font>', nextNode: "gnottingham"
                },
                optionThree: {
                    text: "--", nextNode: null
                }
            }
        },

        gnottingham: {
            id: "gnottingham", topicID: null, conditions: null,
            openText: `The gnome continued; <font class="convo">"we had been working hard - and I mean very hard - to meet the yearly Quota. 
            We wanted to Grand Reward, so we toiled on the Fields; the City Mages would use their crop growing magic,
            and almost all the food we had went towards fulfilling the Quota…"</font>`,

            options: {
                optionOne: null,
                optionTwo: {
                    text: '<font class="convo">"The Quota?"</font>', nextNode: "quota"
                },
                optionThree: {
                    text: '<font class="convo">"What happened next?"</font>', nextNode: "gnottingham2"
                }
            }
        },

        quota: {
            id: "quota", topicID: null, conditions: null,
            openText: `<font class="convo">"You don't know what the Quota is? Does that mean to say you also don’t know of the Grand Rewards or the Janak? 
            Could that mean His Power doesn’t reach here… Is it that I'm out?"</font>`,

            options: {
                optionOne: null,
                optionTwo: {
                    text: `<font class="convo">"You're not making any sense..."</font>`, nextNode: "nonsense"
                },
                optionThree: {
                    text: "--", nextNode: null
                }
            }
        },

        nonsense: {
            id: "nonsense", topicID: null, conditions: null,
            openText: `<font class="convo">"Oh..."</font>`,

            options: {
                optionOne: null,
                optionTwo: null,
                optionThree: null
            }
        },

        gnottingham2: {
            id: "gnottingham2", topicID: null, conditions: null,
            openText: `<font class="convo">"Well, we kept churning out food, of course; almost all of it was funnelled to the Nurseries. 
            The Meatplants ended up taking all the nutrients from the soil, though, and they dried up.
            The gnomes in the Nurseries… weren't getting enough, shall we say, and they started… Well, they started…"</font>`,

            options: {
                optionOne: null,
                optionTwo: null,
                optionThree: {
                    text: '"Started what?"', nextNode: "gnottinghamFeeding"
                }
            }
        },

        gnottinghamFeeding: {
            id: null, topicID: null, cBool: true, conditions: {
                req: "min 12 cha",
                pass: {
                    id: "gnottinghamFeeding", topicID: null, conditions: null,
                    openText: `<font class="convo">"Well, the Expectants… They started with the Clergy - the gnomes in charge of organising and splitting rations -
                    then, after they were finished with, the Expectants turned on each other… The earlier Expectants were more nimble than the later ones,
                    and they managed to gnaw through them in just a few days… Luckily, my wife was able to get out before it all started, and thank the Cielestials I had stocked up at home.</font>"`, options: {
                        optionOne: null,
                        optionTwo: {
                            text: '--', nextNode: null
                        },
                        optionThree: {
                            text: "--", nextNode: null
                        }
                    }
                }, fail: {
                    id: "gnottinghamFeeding", topicID: null, conditions: null,
                    openText: `<font class="convo">"I can't even bring myself to say it..."</font>`, options: {
                        optionOne: null,
                        optionTwo: {
                            text: '--', nextNode: null
                        },
                        optionThree: {
                            text: "--", nextNode: null
                        }
                    }
                }
            },
            openText: null, options: null
        },

        startled: {
            id: "startled", topicID: null, conditions: null,
            openText: `	The creature turns with a start - as you get a better look at him, you notice his small stature and large eyes and ears.<br><br>
                        <font class="convo">"Wha - I didn't see you there…" the creature mumbles, "say, have you seen a photo around here?"</font>`,
            options: {
                optionOne: {
                    text: '<font class="convo">"Yes."</font>', nextNode: "picture"
                },
                optionTwo: {
                    text: '<font class="convo">"No."</font>', nextNode: "wife"
                },
                optionThree: null
            }
        },

        picture: {
            id: null, topicID: null, cBool: true, conditions: {
            req: "has picture1",
            pass: {
                id: "picture", topicID: null, conditions: null,
                openText: `<font class="convo">"Ah! You found it - I don't know how I managed to lose this!"</font>`, options: {
                    optionOne: {
                        text: '', nextNode: ""
                    },
                    optionTwo: {
                        text: '', nextNode: ""
                    },
                    optionThree: {
                        text: "", nextNode: ""
                    }
                }
            }, fail: {
                id: "picture", topicID: null, conditions: null,
                openText: `<font class="convo">"You don't have it though, do you? How could you possibly have it? That functionality isn't even in this game!"</font>`, options: {
                    optionOne: {
                        text: '<font class="convo">"Who are you?"</font>', nextNode: "geraldGnutter"
                    },
                    optionTwo: {
                        text: '<font class="convo">"What are you doing here?"</font>', nextNode: "theTunnel"
                    },
                    optionThree: {
                        text: "Attack the creature.", nextNode: "fight -- stunned"
                    }
                }
            }
        },
        openText: null, options: null
    },
        
    },

    gnomeWife_husAlive: {
        default: {

        }
    },

    gnomeWife_husDead: {
        default: {

        }
    }
}

var allMonsters = { //name, weapon, hp, dmg, level, img, lootArray, weapon

    gnome1: {
        id: "gnome1", name: "Male Gnome", weapon: unInitItemsArray.gnomeDagger1, description: "Looks like hes seen a lot...",
        hp: 15, mana: 0, def: 3, level: 1,
        img: "https://static.wixstatic.com/media/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg/v1/fill/w_564,h_846,al_c,q_90/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg",
        lootArray: ["wifeImg", "gnomeDagger1", "3 healthPotion"], conversationClass: conversationArray2.gnome1
    },

    gnomeWife: {
        id: "gnomewife", name: "Female Gnome", weapon: unInitItemsArray.gnomeFists, description: "An unassuming gnome lady.",
        hp: 5, def: 0, level: 1,
        img: "https://static.wixstatic.com/media/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg/v1/fill/w_564,h_846,al_c,q_90/619502_30f1a5b8130b4290b64b146e2b17c056~mv2.jpg",
        lootArray: ["1 goldRing", "10 healthPotion", "1 gnomeEar"], conversationClass: conversationArray2.gnomeWife
    },

    woot: {
        id: "woot", name: "Woot"
    }

}

var allContainers = {
    

}

var allRooms = {

    basement: {
        roomID: "basement", roomName: "Basement", description: "Your childhood basement.",
        connectedRooms: ["room1", null, null, null],
        containers: [],
        monsters: [],
        special: {
            1: {
                eventNum: 1, command: "spawn", amount: "1", monsters: [allMonsters.gnome1],
                spawnText: ["A small <font class='special' data-type='NPC' data-npc='", "' data>creature</font> comes crawling out from underneath one of the worktables."]
            },
            2: {
                eventNum: 2, command: "spawn", amount: "1", monsters: [allMonsters.gnomeWife],
                spawnText: ["A small <font class='special' data-type='NPC' data-npc='", "' data>creature</font> comes crawling out from underneath one of the worktables."]
            },
            //,
            //3: {
            //    eventNum: 0, command: "print", text:"Bitches aint shit"
            //},
            //4: {
            //    eventNum: "*", command: "print", text: "Every time"
            //}
            
        }
    },

    room1: {
        roomID: "room1", roomName: "", description: "Just a tight squeeze away from your childhood home; the floor, walls, and ceiling are covered in opal moss.",
        connectedRooms: ["room1", null, null, null],
        containers: [],
        monsters: [],
        special: {
            1: {
                eventNum: 1, command: "spawn", amount: "1", monsters: [allMonsters.gnome1, allMonsters.gnomeWife],
                spawnText: ["A small <font class='special' data-type='NPC' data-npc='", "' data>creature</font> comes crawling out from underneath one of the worktables."]
            },
            2: {
                eventNum: 1, command: "print", text: "Weee!"
            }
            //,
            //3: {
            //    eventNum: 0, command: "print", text:"Bitches aint shit"
            //},
            //4: {
            //    eventNum: "*", command: "print", text: "Every time"
            //}

        }
    }

}