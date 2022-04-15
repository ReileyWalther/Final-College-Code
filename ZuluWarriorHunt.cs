/**********************************************************************************************************

                                            The Zulu Warrior Hunt
                                              by Reiley Walther
                                                  CSC 240
                                                 March 2022
                                               Assignment #2
                     
ABOUT THE GAME:
The noon sun's radiant rays shine down from above you as another day in the African Savanna goes by. 
Dinner time approaches quickly in the rural bushveld area, but what is there to eat in a small, off-the-grid 
village? 
You need to go hunting to find something to bring back to the village so that you have food and do not starve. 
You need to prepare for the hunt, but be careful... the bushveld may be home to many antelope, but you are not 
the only hunter out there. You don't want to become the hunted!


WARNING:
The game is an action genre game and may have some detailed and graphic descriptions (rated: PG).
Therefore, parental guidance is strongly advised on all ages who seek to play this game!

PURPOSE:
Provide an intro to C# programming using an Interactive Fiction (IF) text-based game format.

*************************************************************************************************************/

using System;
class ZuluWarriorHunt {

    //need to declare the data
    public static int inventoryCount;
    public static string[] inventoryList;
    public static bool holdSpear;
    public static bool holdBowAndArrow;
    public static bool holdWood;
    public static bool woodInFire;


//////////////////////////////////////
//            resetData             //
//////////////////////////////////////
    static void resetData() {
        inventoryCount = 0;
        inventoryList = new string[10];
        holdSpear = false;
        holdBowAndArrow = false;
        holdWood = false;
        woodInFire = false;
    }//end resetData()


//////////////////////////////////////
//              Main                //
//////////////////////////////////////
    public static void Main() {
        resetData();
        theIntro();
        theBoma();
    }//end Main()


//////////////////////////////////////
//            theIntro              //
//////////////////////////////////////
    static void theIntro() {
        Console.Clear();
        Console.WriteLine();
        Console.WriteLine("The Zulu Warrior Hunt ");
        Console.WriteLine("by Reiley Walther");
        Console.WriteLine("CSC 240");
        Console.WriteLine("Assignment #2");
        Console.WriteLine();
        Console.WriteLine("*********************************************************************************************************");
        Console.WriteLine("ABOUT THIS GAME:");
        Console.WriteLine("The noon sun's radiant rays shine down from above you as another day in the African Savanna goes by.");
        Console.WriteLine("Dinner time approaches quickly in the rural bushveld area, but what is there to eat in a small,");
        Console.WriteLine("off-the-grid village?");
        Console.WriteLine();
        Console.WriteLine("You need to go hunting to find something to bring back to the village so that you have food and do not");
        Console.WriteLine("starve. You need to prepare for the hunt, but be careful… the bushveld may be home to many antelope, but");
        Console.WriteLine("you are not the only hunter out there. You don't want to become the hunted!");
        Console.WriteLine();
        Console.WriteLine("POSSIBLE USAGE COMMANDS: directions (N,S,E,W,NE,NW,SE,SW), take <item>, drop <item>, i/inventory, throw,");
        Console.WriteLine("shoot, chase and others.");
        Console.WriteLine("*********************************************************************************************************");
        Console.WriteLine();

        //Warning of game and genre
        Console.WriteLine("WARNING:");
        Console.WriteLine("The game is an action genre game and may have some detailed and graphic descriptions (rated: PG).");
        Console.WriteLine("Therefore, parental guidance is strongly advised on all ages who seek to play this game!");
        Console.WriteLine();

        // Getting the name of the player
        Console.Write("Give your character a name: ");
        string characterName = Console.ReadLine();
        Console.WriteLine("\n\n\n");
	    Console.WriteLine($"'SAWUBONA,' {characterName}!\nThis means hello in Zulu!");
        Console.WriteLine("The fireplace 'boma'(an enclosed place with a fire pit to cook and eat in) is baron and ready to be");
        Console.WriteLine("prepped for a fire and something to cook. The sun will be setting soon and you need to use what daylight");
        Console.WriteLine("you have left to your advantage.");
        Console.WriteLine("Usually, the best wood for fires lie north of you at the bushveld edge. To prepare the boma, you need to");
        Console.WriteLine("get wood for the fire. If you can gather those pieces, you will be able to make a fire to cook on. Further");
        Console.WriteLine("north of the bushveld edge is the bushveld. This is a dense area of vegetation, trees, shrubs and bush.");
        Console.WriteLine("After you prep the fire, you will need to go deeper into the bushveld to find your prey.");
        Console.WriteLine();
        Console.WriteLine("Northwest of the boma is your hut. This is where you sleep and store all of your belongings. You are always");
        Console.WriteLine("protected when you are in your hut when you sleep, but you should never lead any kind of wild animals back");
        Console.WriteLine("to your village. “WOZA!” Time to get hunting!");
    }//end of theIntro()


//////////////////////////////////////
//            bomaViews             //
//////////////////////////////////////
    static void bomaViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The BOMA:");
        Console.WriteLine("********************");
        Console.WriteLine("You are in the boma. The enclosed area is completely surrounded by tall tree branches that you tied");
        Console.WriteLine("together and planted in the ground.");
        Console.Write("There is ");
        if (woodInFire == true) {
            Console.Write("a fireplace pit with wood and ");
        }//end if
        else {
            Console.Write("an empty fireplace pit with ");
        }//end else
        Console.WriteLine("small bits of wood ash from the last time you made a fire.");
        Console.WriteLine();
        Console.WriteLine("You can exit the boma by going NorthWest to your hut, or you can go North towards the bushveld edge.");
        Console.WriteLine();
    }//end bomeViews()


//////////////////////////////////////
//              theBoma             //
//////////////////////////////////////
    static async void theBoma() {
        bomaViews();

        while(true) {
            Console.WriteLine();
            Console.WriteLine("What would you like to do now? ");
    	    string action = Console.ReadLine();
    	    switch (action) {
    	        case "NW": case "nw": case "go Northwest": case "Go northwest": case "go northwest":
                    theHut();
    	            break;
    	        case "N": case "n": case "go North": case "Go north": case "go north":
    	            theBushveldEdge();
    	            break;
                case "Drop wood": case "drop wood": case "Drop Wood":
                    if (holdWood == false) {
                        Console.WriteLine("We need to go find wood first before we can make a fire.");
                    }//end if
                    else if (woodInFire == true) {
                        Console.WriteLine("\nThere is already wood in this fireplace.");
                    }//end if
                    else {
                        Console.WriteLine("Wood has been placed in the fireplace!");
                        for (int i = 0; i < inventoryCount; i++) {
                            if (inventoryList[i] == "wood") {
                                    inventoryList[i] = "";
                                    holdWood = false;
                                    woodInFire = true;
                            }//end if
                        }//end for
                        int newInvCount = inventoryCount;
                        for (int i = 0; i < inventoryCount; i++) {
                            if (inventoryList[i] == "") {
                                for (int j = i; j < (inventoryCount-1); j++) {
                                    inventoryList[j] = inventoryList[j+1];
                                }//end for
                                newInvCount--;
                            }//end if
                        }//end for
                        inventoryCount = newInvCount;
                    }//end else
                    break;
   	            case "look": case "Look":
    	   	        theBoma();
	                break;
  	            case "inventory": case "Inventory": case "I": case "i":
	                inventory();
	                break;
    	        default:
    	            Console.WriteLine();
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
    	    } // end Switch
        }//end While
    }//end of theBoma()


//////////////////////////////////////
//              hutViews            //
//////////////////////////////////////
    static void hutViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The HUT:");
        Console.WriteLine("********************");
        Console.WriteLine("You are inside your hut. You made this hut with your bare hands using mud and a marsh mix for the base");
        Console.WriteLine("and walls, and clumped straw for the roofing. There is a doorway with no door and a small window looking");
        Console.WriteLine("out towards the bushveld.");
        Console.WriteLine();
        if (holdSpear == false) {
            Console.WriteLine("Resting against the wall under the window is your spear, as sharp as ever.");
        }//end if
        if (holdBowAndArrow == false) {
            Console.WriteLine("Lying on the edge of your bed is your bow with 6 arrows.");
        }//end if
        Console.WriteLine("You can exit the hut by going Northeast towards the bushveld edge, or you can go SouthEast to the boma");
        Console.WriteLine();
    }//end hutViews()


//////////////////////////////////////
//              theHut              //
//////////////////////////////////////
    static void theHut() {
        hutViews();

        while (true) {
    	    Console.WriteLine();
    	    Console.WriteLine("What would you like to do now? ");
    	    string action = Console.ReadLine();
    	    switch (action) {
    	        case "SE": case "se": case "Go southeast": case "go Southeast": case "go southeast":
    	            theBoma();
    	            break;
    	        case "NE": case "ne": case "go Northeast": case "Go northeast": case "go northeast":
    	            theBushveldEdge();
    	            break;
    	        case "take spear": case "Take spear": case "Take Spear":
    	            if (holdSpear == true) {
    	                Console.WriteLine();
    	                Console.WriteLine("You already have your spear.  It is in your inventory!");
    	                Console.WriteLine();
    	            }//end if
                    else {
                        Console.WriteLine();
                        Console.WriteLine("You have grabbed your 6-ft spear and the notable weight of the weapon in your hand gives you");
                        Console.WriteLine("confidence that you will be able to strike down a great antelope for dinner. The spearhead is");  
                        Console.WriteLine("larger than both your hands together.");
                        inventoryList[inventoryCount] = "spear";
                        inventoryCount++;
                        holdSpear = true;
                    }//end else
    	            break;
                case "Take bow": case "take bow": case "take bow and arrow": case "take bow and arrows":
    	            if (holdBowAndArrow == true) {
    	                Console.WriteLine();
    	                Console.WriteLine("You already have your bow.  It is in your inventory!");
    	                Console.WriteLine();
    	            }//end if
                    else {
                        Console.WriteLine();
                        Console.WriteLine("You throw your bow and arrow over your shoulder after examining the tension in the bow. It's");
                        Console.WriteLine("still good for hunting! The 6 arrows will come in handy in hunting from a distance.");  
                        inventoryList[inventoryCount] = "bow with arrows";
                        inventoryCount++;
                        holdBowAndArrow = true;
                    }//end else
    	            break;
    	        case "look": case "Look":
    	            theHut();
	                break;
  	            case "Inventory": case "inventory": case "I": case "i":
	                inventory();
	                break;            
    	        default:
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
            }//end switch 
	} // End theKitchen

    }//end theHut()


//////////////////////////////////////
//        bushveldEdgeViews         //
//////////////////////////////////////
    static void bushveldEdgeViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The BUSHVELD EDGE:");
        Console.WriteLine("********************");
        Console.WriteLine("You are at the bushveld edge. You can see how the flatter, open ground slowly morphs into taller, thicker");
        Console.WriteLine("shrubbery and bushveld. You recognize the man-made path that you have unintentionally created from");
        Console.WriteLine("entering and leaving the bushveld at that point so many times before.");

        Console.WriteLine("Just off from the start of your path, you see your wood pile.");
        Console.WriteLine();
        Console.WriteLine("You can head north into the bushveld. You can go southwest to your hut, or you can go south towards to boma.");
        Console.WriteLine();
    }//end bushveldEdgeViews()


//////////////////////////////////////
//          theBushveldEdge         //
//////////////////////////////////////
    static void theBushveldEdge() {
        bushveldEdgeViews();

        while (true) {
    	    Console.WriteLine();
    	    Console.WriteLine("What would you like to do now?");
    	    string action = Console.ReadLine();
    	    switch (action) {
    	        case "N": case "n": case "Go north": case "go North": case "go north":
    	            theBushveld();
    	            break;
    	        case "SW": case "sw": case "go Southwest": case "Go southwest": case "go southwest":
    	            theHut();
    	            break;
    	        case "S": case "s": case "Go south": case "go South": case "go south":
    	            theBoma();
    	            break;
    	        case "take wood": case "Take wood": case "Take Wood":
    	            if (holdWood == true) {
    	                Console.WriteLine();
    	                Console.WriteLine("You already have the wood.  It is in your inventory!");
    	            }//end if
                    else if (woodInFire == true) {
                        Console.WriteLine("We don't need anymore wood in the fireplace right now.");
                    }//end if
                    else {
                        Console.WriteLine();
                        Console.WriteLine("You collect 5 decently-sized wood logs for your fire. Hmm… they are a little heavy.");
                        inventoryList[inventoryCount] = "wood";
                        inventoryCount++;
                        holdWood = true;
                    }//end else
    	            break;
    	        case "look": case "Look":
    	            theBushveldEdge();
	                break;
  	            case "Inventory": case "inventory": case "I": case "i":
	                inventory();
	                break;            
    	        default:
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
    	    }//end switch 
	    }//end while
    }//end theBushveldEdge()


//////////////////////////////////////
//           bushveldViews          //
//////////////////////////////////////
    static void bushveldViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The BUSHVELD:");
        Console.WriteLine("********************");
        Console.WriteLine("You are in the bushveld. This part of the bushveld is not as easy to walk in as the bushveld edge! The");
        Console.WriteLine("trees are getting taller, bushes are getting thicker and paths are starting to fade into overgrown");
        Console.WriteLine("vegetation.");
        Console.WriteLine();
        Console.WriteLine("To the northwest, there is a known watering hole where many wild animals go to quench their thirst in the");
        Console.WriteLine("African heat. To the northeast, there is a thicket where the vegetation is incredibly thick and difficult");
        Console.WriteLine("to travel through! It might have some interesting animals, though. To the south is the bushveld edge that");
        Console.WriteLine("that leads back to the village.");
        Console.WriteLine();
    }//end bushveldViews()


//////////////////////////////////////
//           theBushveld            //
//////////////////////////////////////
    static void theBushveld() {
        bushveldViews();

        while(true) {
            Console.WriteLine();
            Console.WriteLine("What would you like to do now?");
    	    string action = Console.ReadLine();
    	    switch (action) {
    	        case "S": case "s": case "Go south": case "go South": case "go south":
    	            theBushveldEdge();
    	            break;
                case "NW": case "nw": case "Go northwest": case "go NorthWest": case "go northwest":
    	            Console.WriteLine();
                    Console.WriteLine("You're entering an area where you may need to hunt. Are you ready?");
    	            string reply = Console.ReadLine();
    	            if ((reply == "Y") || (reply == "y") || (reply == "yes") || (reply == "YES"))
    	                theWateringHole();
    	            else 
    	                Console.WriteLine();
    	                Console.WriteLine("Come back when you are are confident to hunt!");
    	                Console.WriteLine();
    	            break;
    	        case "NE": case "ne": case "go Northeast": case "Go northeast": case "go northeast":
                    theThicket();
                    break;
    	        case "look": case "Look":
    	            theBushveld();
	                break;
  	            case "Inventory": case "inventory": case "I": case "i":
	                inventory();
	                break;            
    	        default:
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
            }//end switch 
        }//end while
    }//end theBushveld()


//////////////////////////////////////
//        wateringHoleViews         //
//////////////////////////////////////
    static void wateringHoleViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The WATERING HOLE:");
        Console.WriteLine("********************");
        Console.WriteLine("You are on the edge of a beautiful watering hole where a variety of animals are gathered to get a drink of");
        Console.WriteLine("water, or to simply pass through. There are hippos submerged in the water, zebra and wildebeest intermingled");
        Console.WriteLine("in a group across the body of water, and a family of elephants in the background leaving the watering hole.");
        Console.WriteLine();
        Console.WriteLine("Out of the corner of your eye, a heard of over 50 impala antelope are springing towards the water oasis.");
        Console.WriteLine("THIS IS IT! IT'S NOW OR NEVER! You cannot let such a wonderful opportunity get away from you. Although");
        Console.WriteLine("there are over 50 impala, you don't have many chances to get yourself a buck. You need to be quick!");
        Console.WriteLine();
    }//end wateringHoleViews()


//////////////////////////////////////
//         theWateringHole          //
//////////////////////////////////////
    static void theWateringHole() {
        wateringHoleViews();

        if (holdSpear == true) {
            Console.WriteLine();
            Console.WriteLine("You are also carrying a spear.");
            Console.WriteLine();
        }//end if
        if (holdBowAndArrow == true) {
            Console.WriteLine();
            Console.WriteLine("You are also carrying a bow with 6 arrows.");
            Console.WriteLine();
        }//end if
        if ((holdSpear == false) && (holdBowAndArrow == false)) {
            Console.WriteLine();
            Console.WriteLine("It looks like you will be hunting barehanded. Good luck!");
            Console.WriteLine();
        }//end if

        while(true) {
            Console.WriteLine();
            Console.WriteLine("What would you like to do now?");
    	    string action = Console.ReadLine();
    	    switch (action) {
                case "chase impala": case "Chase impala": case "Chase Impala": case "Chase": case "chase":
                    conclusionHands();
                    break;
                case "Shoot Bow": case "shoot bow": case "Shoot bow": case "Shoot arrow": case "shoot arrow": case "Shoot Arrow":
                    if (holdBowAndArrow == false) {
    	                Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
                    }//end if
                    else {
                        bowHunt();
                    }//end else
                    break;
    	        case "throw spear": case "Throw spear": case "Throw Spear":
                    if (holdSpear == false) {
    	                Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
                    }//end if
                    else {
                        spearHunt();
                    }//end else
                    break;
    	        case "look": case "Look":
    	            theWateringHole();
	                break;
  	            case "Inventory": case "inventory": case "I": case "i":
	                inventory();
	                break;            
    	        default:
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
            }//end switch 
        }//end while
    }//end theWateringHole()


    static void spearHunt() {
        Random rand = new Random();
        string response;
        int hitNum;
        int attempt = 3;
        bool endGame = false;
        
        hitNum = rand.Next(1,11);

        while (!endGame) {

            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("Enter the amount of strength from 1 to 10 (1,2,3,4,5,6,7,8,9,10) you want to use to take a chance");
            Console.WriteLine("at hitting the impala!");
            response = Console.ReadLine();

            if (response == hitNum.ToString()) {
                conclusionWin();
            }//end if
            else {
                attempt--;
                if (attempt == 0) {
                    endGame = true;
                    conclusionSpear();
                }//end if
                else if (Int32.Parse(response) < hitNum) {
                    Console.WriteLine($"'{response}' strength is too low!");
                }//end if
                else {
                    Console.WriteLine($"'{response}' strength is too high!");
                }//end else
                Console.WriteLine("That kind of strength will not work right now.");

                if (attempt > 0) {
                    Console.WriteLine("Try again!");
                }//end if
                if (attempt == 1) {
                    Console.WriteLine("You have 1 attempt left!");
                }//end if
                else {
                    Console.WriteLine($"You have {attempt} attempts left!");
                }//end else
                Console.WriteLine();
            }//end else
        }//end while
    }//end spearHunt



    static void bowHunt() {
        Random rand = new Random();
        string response;
        int hitNum;
        int attempt = 6;
        bool endGame = false;
        
        hitNum = rand.Next(1,21);

        while (!endGame) {

            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("Enter your accuracy number from 1 to 20 (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20) you want");
            Console.WriteLine("to use to take a chance at shooting down the impala!");
            response = Console.ReadLine();

            if (response == hitNum.ToString()) {
                conclusionWin();
            }//end if
            else {
                attempt--;
                if (attempt == 0) {
                    endGame = true;
                    conclusionArrow();
                }//end if
                else if (Int32.Parse(response) < hitNum) {
                    Console.WriteLine();
                    Console.WriteLine($"'{response}' accuracy is too low and will miss!");
                }//end if
                else {
                    Console.WriteLine($"'{response}' accuracy is too high and will miss!");
                }//end else
                Console.WriteLine("That accuracy will completely miss the impala now.");

                if (attempt > 0) {
                    Console.WriteLine("Try again!");
                }//end if
                if (attempt == 1) {
                    Console.WriteLine("You have 1 attempt left!");
                }//end if
                else {
                    Console.WriteLine($"You have {attempt} attempts left!");
                }//end else
                Console.WriteLine();
            }//end else            
        }//end while
    }//end bowHunt


//////////////////////////////////////
//           thicketViews           //
//////////////////////////////////////
    static void thicketViews() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("The THICKET:");
        Console.WriteLine("********************");
        Console.WriteLine("You are in the thicket. Trees are towering over you, bushes are wider than your hut and you have no idea");
        Console.WriteLine("where any kind of paths disappeared to. The thorns on the acacia trees are 5 inches long here! The longest");
        Console.WriteLine("you've ever seen! This is bad, and you know you won't find any kind of animal out here… to eat.");
        Console.WriteLine();
        Console.WriteLine("Before you finish your thought, you hear a loud, deep, bone-chilling grumble that you instantly recognize.");
        Console.WriteLine("It's close. It's big. It knows that you are here. You turn around to the crackling of the bushes and sticks");
        Console.WriteLine("making way for a fully-grown, male lion to appear! You know that lions are really fast, but you can either");
        Console.WriteLine("stand up against it and fight, or you could (and probably should) run from it and try slip away quickly.");
        Console.WriteLine();
    }//end thicketViews()

    static void theThicket() {
        thicketViews();

        while(true) {
            Console.WriteLine();
            Console.WriteLine("What would you like to do now?");
    	    string action = Console.ReadLine();
    	    switch (action) {
                case "run": case "Run": case "Run away": case "Run Away": 
                    conclusionKilled();
                    break;
    	        case "look": case "Look":
    	            theThicket();
	                break;
  	            case "Inventory": case "inventory": case "I": case "i":
	                inventory();
	                break;    
                case "fight": case "Fight":
                    Console.WriteLine("...ARE YOU CRAZY?!?!");
                    break;        
    	        default:
    	            Console.WriteLine($"Sorry, but I do not understand what '{action}' means.");
    	            break;
            }//end switch 
        }//end while
    }//end theThicket()


//////////////////////////////////////
//           CONCLUSIONS            //
//////////////////////////////////////
//First conclusion loss (killed)
    static void conclusionKilled() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("You were not faster than a lion and it caught you when you turned your back on it to run. The lion tackled");
        Console.WriteLine("you to the ground, took hold of your neck with its wide, powerful jaw and crushed your neck and airways.");
        Console.WriteLine("Barely clinging to life, the lion drags your body into tall grass and bushes. You feel the lion taking its");
        Console.WriteLine("deep breath before clamping down one last time on your neck and head. Your vision goes black, everything");
        Console.WriteLine("goes silent, and in the end it was not the lion who sleeps tonight.");
        Console.WriteLine();
        Console.WriteLine();
        Console.Write("Sorry, you have LOST.");
        Console.WriteLine();
        restartGame();
    }//end conclusionKilled()

//Second conclusion loss (Arrows)
    static void conclusionArrow() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("You fired your 6 arrows at the impala, but all 6 arrows missed the antelope and the rest of the heard");
        Console.WriteLine("sensed danger and ran off. The watering hole clears, you are without a prey, and you are forced back to the");
        Console.WriteLine("village empty-handed. The sun has gone down, you light a fire in the boma for warmth and light, but you");
        Console.WriteLine("accidentally fall asleep in the boma and not in your hut. Your hut is always safe when you sleep… but,");
        Console.WriteLine("tonight, the boma was not and you never woke up.");
        Console.WriteLine();
        Console.WriteLine();
        Console.Write("Sorry, you have LOST.");
        Console.WriteLine();
        restartGame();
    }//end conclusionArrow

//Third conclusion loss (Spear)
    static void conclusionSpear() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("Even with tremendous might, you threw your one and only spear at the closest impala, but did not make");
        Console.WriteLine("impact with it. The heard scurries away as you quickly try to regather your spear. It is no use. There");
        Console.WriteLine("was not enough time for a second throw. The watering hole clears, you are without a prey, and you are");
        Console.WriteLine("forced back to the village empty-handed. The sun has gone down, you light a fire in the boma for warmth and");
        Console.WriteLine("light, but you accidentally fall asleep in the boma and not in your hut. Your hut is always safe when you");
        Console.WriteLine("sleep… but, tonight, the boma was not and you never woke up.");
        Console.WriteLine();
        Console.WriteLine();
        Console.Write("Sorry, you have LOST.");
        Console.WriteLine();
        restartGame();
    }//end conclusionSpear()

//Forth conclusion loss (barehands)
    static void conclusionHands() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("Even after thousands of generations of hunting techniques and practices, there are very few hunters who");
        Console.WriteLine("have gone out and caught an impala with their barehands.");
        Console.WriteLine("Unfortunately, you are not one of those hunters today. The impala outran you with major ease. You couldn't");
        Console.WriteLine("even come close! The watering hole clears, you are without a prey, and you are");
        Console.WriteLine("forced back to the village empty-handed. The sun has gone down, you light a fire in the boma for warmth and");
        Console.WriteLine("light, but you accidentally fall asleep in the boma and not in your hut. Your hut is always safe when you");
        Console.WriteLine("sleep… but, tonight, the boma was not and you never woke up.");
        Console.WriteLine();
        Console.WriteLine();
        Console.Write("Sorry, you have LOST.");
        Console.WriteLine();
        restartGame();
    }//end conclusionHands()

    static void conclusionWin() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("YOU GOT HIM! You make contact with the impala and the mighty buck crashes to the ground. The rest of the");
        Console.WriteLine("the heard disperses and your target lays lifeless in a small opening. You heave the antelope back to your");
        Console.WriteLine("village.");
        Console.WriteLine();
        Console.WriteLine("The sun has now set, your fire has been started and you have prepped the antelope for cooking. Tonight,");
        Console.WriteLine("you go to bed with a full stomach of food and in a safe hut to sleep in. As you lay in bed, slowly drifting");
        Console.WriteLine("to sleep, you hear the nightlife buzz, and the faint growls and grumbles of a lion pride in the distance.");
        Console.WriteLine("It might not be the lion, but the Zulu Warrior sleeps tonight.");
        Console.WriteLine();
        Console.WriteLine();
        Console.Write("CONGRATULATIONS! YOU HAVE BEATEN THE GAME!");
        Console.WriteLine();
        restartGame();
    }//end conclusionWin()


//////////////////////////////////////
//           restartGame            //
//////////////////////////////////////
    static void restartGame() {
        string restarted;
        string response;
      
        Console.WriteLine();
        Console.WriteLine("Would you like to restart?");
        response = Console.ReadLine(); 
        if ((response == "Y") || (response == "y") || (response == "yes") || (response == "YES") || (response == "Yes")) {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("Please press the Enter key to restart the game!");
            restarted = Console.ReadLine();
            Main();
        }//end if
        else {
            Console.WriteLine();
            Console.WriteLine("Thank you for playing the Zulu Warrior Hunt!");
            gameCredits();
        }//end else
  }//end restartGame()


//////////////////////////////////////
//           gameCredits            //
//////////////////////////////////////
    static void gameCredits() {
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("*******************************************************************************");
        Console.WriteLine("                            The Zulu Warrior Hunt");
        Console.WriteLine("                     Designed and developed by Reiley Walther");
        Console.WriteLine("                 Student at Kutztown University of Pennsylvania"); 
        Console.WriteLine("                         for CSC 240, Assignment #2");  
        Console.WriteLine("                              Copyright © 2022");
        Console.WriteLine("*******************************************************************************");    
        Console.WriteLine();    
        Console.WriteLine();    
        Environment.Exit(1);
    }//end gameCredits()


//////////////////////////////////////
//           INVENTORY              //
//////////////////////////////////////
    static void inventory() {
        if (inventoryCount == 0) {
            Console.WriteLine();
            Console.WriteLine("You are carrying NO items right now.");
        }//end if
        else {
            Console.WriteLine();
            Console.WriteLine("Currently, you are carrying the following items:");
            Console.WriteLine();
            for (int i =0; i < inventoryCount; i++)
                Console.WriteLine(inventoryList[i]);
        } //end else
    } //end inventory()

}//end of ZuluWarriorHunt Class