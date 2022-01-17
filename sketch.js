function preload() {
  sLappy = loadImage('assets/sLappy.png');
  sBack1 = loadImage('assets/sBack1.png');
  sKey = loadImage('assets/sKey.png');
  sDoor = loadImage('assets/sDoor.png');
  sDoorUnlocked = loadImage('assets/sDoorUnlocked.png');
  sBack2 = loadImage('assets/sBack2.png');
  sTv = loadImage('assets/sTv.png');
  sButtonR = loadImage('assets/sButtonR.png');
  sButtonG = loadImage('assets/sButtonG.png');
  sButtonB = loadImage('assets/sButtonB.png');
  sButtonOffRB = loadImage('assets/sButtonOffRB.png');
  sButtonOffG = loadImage('assets/sButtonOffG.png');
  sButtonReset = loadImage('assets/sButtonReset.png');
  sBigScreen = loadImage('assets/sBigScreen.png');
  sPrinter = loadImage('assets/sPrinter.png');
  sPrinterPaper = loadImage ('assets/sPrinterPaper.png');
  sDummyExist = loadImage ('assets/sPlrSpin0003.png');
  fontPixel = loadFont ('assets/Pixeled.ttf');
  sClueIcon = loadImage('assets/sClueIcon.png')
}

//Global variable setup ---
  var player;
  var promptTest;
  var promptActive = false;
  var prompt1On;
  var globalCorrect;
  var currentRoom;
  var currentPrompt;
  var shuffledPrompt;
  var globalPrompt;
  var firstPrompt;
  var printRGB;
  var escaped = false;
  var dummyToBePosed = true;
  var dummyMetVortex = false;
  var t = 0;
  var timerOn = false;
  var gone = false;
  var headsUpHolder;
  var currentHeadsUp;
  var pushBorder = 0;
  var clueActive = false;
  let killTimer = 120;
  let killRect = 0;
  let t2 = 0;


  


  let killRoom = false;
  let keyGot = false;
  //vars for objects
    var promptLaptop;
  //vars for prompts
    var prompt1;
    var prompt2;
  //var for score
    var score;


  //var for hints 
    var hints;



    var R = 0;
    var G = 0;
    var B = 0;
    var RGB = "";


//-------------------------

function setup() {
  createCanvas(800, 800);

  collidabale = new Group();

  //sprite stuff



    player = createSprite(400, 400, 96, 96);
    // playerFutureX = createSprite(player.position.x + player.velocity.x,player.position.y, 96, 96);
    // playerFutureY = createSprite(player.position.x,player.position.y + player.velocity.y, 96, 96);

    var animDown = player.addAnimation('walkDown', 'assets/sPlrWalkDown0001.png', 'assets/sPlrWalkDown0004.png');

    animDown.frameDelay = 8;

    var animUp = player.addAnimation('walkUp', 'assets/sPlrWalkUp0001.png', 'assets/sPlrWalkUp0004.png');

    animUp.frameDelay = 8;

    var animRight = player.addAnimation('walkRight', 'assets/sPlrWalkRight0001.png', 'assets/sPlrWalkRight0004.png');

    animRight.frameDelay = 8;

    var animSpin = player.addAnimation('stand', 'assets/sPlrSpin0001.png', 'assets/sPlrSpin0004.png');

    animSpin.playing = false;
  //------------------------------------------------------------------------------


  createRoom1();
  //currentPrompt = firstPrompt;
  //print(currentPrompt);

    //scaling cause I'm lazy


    player.scale = 1.5;
    player.depth = 2;

    

    
    
    
      //promptsArray
    // responseArray
    //responses = [["Hyper Transfer Markup Language","Hypertext Markup Language","Hyper Technology Mailing Language"], ["//","/* */","<!-- -->"]];

    responses = ["Hyper Technology Markup Language","Hypertext Markup Language","Hyper Transfer Mailing language"];
    promptTest = new Prompt(20,20,"What does HTML stand for",null,responses,1,20);


    responsesSecond = ["#RGB","red(),green(),blue()","#RRGGBB"];
    promptSecond = new Prompt(20,20,"What is the proper format"," for HEX colors in HTML/CSS?",responsesSecond,2,20);


    responsesTv = ["Inspect Element", "-sudo", "Ask nicely"];
    promptTv = new Prompt(20,20,"How can you check a website's","source code while visiting it?",responsesTv, 0,20);

    responsesPrinter = ["...", "...", "..."];
    promptPrinter = new Prompt(20,20,"Find the KEY to ESCAPE :)",null,responsesPrinter,0,20);
  

    //

    clueClick = new Interactable(sClueIcon,96,96,730,650,null,true,null,5);
    clueClick.makeClue();
    clueClick.createSprite();
    clueButton = new Clue();
}

function draw() {
  background(0,0,0);

  if(RGB != ''){

    background(R,G,B);
    //print("sweet");
  }


  //print(currentPrompt);
  //if mouse is to the left
  if(mouseX < player.position.x - 50) {
    player.changeAnimation('walkRight');
    //flip horizontally
    player.mirrorX(-1);
    //negative x velocity: move left
    player.velocity.x = -2;
  }
  else if(mouseX > player.position.x + 50) {
    player.changeAnimation('walkRight');
    //unflip
    player.mirrorX(1);
    player.velocity.x = 2;
  } else {

    player.velocity.x = 0;

  //y movement
    }

    if(mouseY < player.position.y - 75)  {
      player.velocity.y = -2;

      if(mouseY < player.position.y - 100) {
        player.changeAnimation('walkUp')
      }

    } else if(mouseY > player.position.y + 75) {

      player.velocity.y = 2;


      if(mouseY > player.position.y + 100) {

        player.changeAnimation('walkDown')

      }

    } else {

      player.velocity.y = 0;
    
    }

    if(player.velocity.x == 0 && player.velocity.y == 0) {

      player.mirrorX(1);  
      player.changeAnimation('stand');
   
      if(mouseX < player.position.x) {

      player.animation.changeFrame(1);

      } else if(mouseX > player.position.x) {
    
      player.animation.changeFrame(3);

      } 
      if(mouseY < player.position.y + 15) {

      player.animation.changeFrame(2);

      } else if(mouseY > player.position.y + 15) {
    
      player.animation.changeFrame(0);   
      } 

    }

    if(player.position.x + player.velocity.x >= 800 || player.position.x + player.velocity.x <= 0) {

      player.velocity.x = 0

    }

    if(player.position.y + player.velocity.y >= 800 || player.position.y + player.velocity.y <= 0 + pushBorder) {

      player.velocity.y = 0

    }

    // if (playerFutureX.collide(collidabale)){

    //   player.velocity.x = 0;

    // }

    // if (playerFutureY.collide(collidabale)){

    //   player.velocity.y = 0;

    // }

  drawSprites();


  //THIS DRAWS THE CLICKABLES (maybe make a function?)
  if(currentRoom == 1){
  updateRoom1();
  } else if (currentRoom == 2){
  updateRoom2();
  }
  //------------------------------------------------

  //check if prompt is supposed to on
  if(promptActive && currentPrompt == "prompt1" && currentRoom == 1){

      promptTest.drawBack();
      promptTest.createAnswers();
      promptTest.drawQuestion();
      
    
  } else if(promptActive && currentPrompt == "prompt2" && currentRoom == 1){

      promptSecond.drawBack();
      promptSecond.createAnswers();
      promptSecond.drawQuestion();
      
      
  } else if(promptActive && currentPrompt == "prompt1" && currentRoom == 2){

      promptTv.drawBack();
      promptTv.createAnswers();
      promptTv.drawQuestion();

  } else if(promptActive && currentPrompt == "prompt2" && currentRoom == 2){

      promptPrinter.drawBack();
      promptPrinter.createDismiss();
      promptPrinter.drawQuestion();

  }






  //print(promptActive);
  //print(currentPrompt);
  //print(keyGot);
  //print(promptActive);
  updateTimer();
  updateKillTimer();
  if(!escaped){
    drawKillTimer();
    checkIfDie();
  };
  if(gone){


    if(t == 180){
      location.replace("/win.html");
    }


  }
  
  clueButton.updateClue();
  if(clueActive){

    print("a")
    clueButton.drawBack();
    clueButton.drawClue();
    clueButton.createDismiss();

  }
  clueClick.drawPrompt();


}

function updateKillTimer(){

  if (frameCount % 60 == 0 && killTimer > 0) { 
    killTimer--;
  }
  // if (time == 0) {
  //   text("GAME OVER", width/2, height*0.7);
  // }
}

function drawKillTimer(){

  textAlign(CENTER, CENTER);
  textSize(100);
  textFont(fontPixel);
  fill(255,255,255);
  text(killTimer, width/2, height/1.2);

}

function gameOver(){

  if(currentRoom == 1){

    destroyRoom1();
    currentRoom = 0;

  }else if (currentRoom == 2){

    destroyRoom2();
    currentRoom = 0;

  }

  clueClick.remove();
  fill(0,0,0,killRect)
  rect(0,0,800,800);


  if(frameCount % 60 == 0){

    t2++;

  }

  if(t2 == 1){

    killRect += 33;
    t2 = 0;

  }

}  

function checkIfDie(){
  if(killTimer == 0){
    gameOver();
  }
}





//Room 1 Functions -----
  function destroyRoom1(){

      promptLaptop.remove();
      background1.remove();
      doorExit.remove();
      promptLaptop2.remove();
      currentRoom = 0;


    }
  
  function transitionToRoom2(){

      promptLaptop.remove();
      background1.remove();
      doorExit.remove();
      promptLaptop2.remove();
      currentRoom = 2;

      createRoom2();

    }
    
  function createRoom1(){

      currentRoom = 1;
      background1 = new Interactable(sBack1, 800, 800, 400, 400, null, false)
      background1.createSprite();
      background1.destroyCollider();
      //currentRoom = 
      promptLaptop = new Interactable(sLappy, 96, 96, 400, 70, "prompt1", true)
      promptLaptop.makeClickable();
      //promptLaptop.assignPrompt();
      promptLaptop.createSprite();

      promptLaptop2 = new Interactable(sKey, 96, 96, 400, 70, null, true)
      //promptLaptop2.assignPrompt();
      promptLaptop2.createSprite();
      promptLaptop2.makeKey();

      currentPrompt = "prompt1"
      //secondPrompt = "prompt2"

      doorExit = new Interactable(sDoor, 96, 114, 725, 75, null, true)
      doorExit.createSprite();
      doorExit.sprite.addImage('sDoorUnlocked', sDoorUnlocked);
      doorExit.makeLock();
      //doorExit.makeKillRoom1();

    } 

  function updateRoom1(){

    //promptLaptop = currentPrompt;
    if(currentPrompt == "prompt1"){
      promptLaptop.drawPrompt();
      promptLaptop2.sprite.visible = false;
    } else {
      promptLaptop.remove();
    }


    if(currentPrompt == "prompt2"){
      promptLaptop2.sprite.visible = true;
      promptLaptop2.active = true;
      promptLaptop2.drawKey();
    } else promptLaptop2.active = false;

    if(keyGot){
      doorExit.drawPrompt();

    }

    if(killRoom){

      killRoom = false;
      doorExit.sprite.changeImage('sDoorUnlocked');
      doorExit.makeKillRoom1();

    }


  }
//----------------------

//Room 2 Functions -----
  function createRoom2(){

      pushBorder = 200;
      // background2 = new Interactable(sBack2, 800, 800, 400, 400, null, false);
      // background2.createSprite();
      // background2.destroyCollider();

      objectBigScreen = new Interactable(sBigScreen, 194, 62, 400, 100, null, true);
      objectBigScreen.createSprite();

      //currentRoom = 
      objectTv = new Interactable(sTv, 96, 96, 600, 375, "prompt1", true);
      objectTv.makeClickable();
      //promptLaptop.assignPrompt();
      objectTv.createSprite();

      // promptLaptop2 = new Interactable(sKey, 96, 96, 400, 70, null, true)
      // //promptLaptop2.assignPrompt();
      // promptLaptop2.createSprite();
      // promptLaptop2.makeKey();

      currentPrompt = "prompt1";
      currentRoom = 2;
      //secondPrompt = "prompt2"

      objectButtonR = new Interactable(sButtonOffRB, 96, 96, 100, 365, null, true);
      objectButtonR.createSprite();
      objectButtonR.makeClickable();

      objectButtonG = new Interactable(sButtonOffG, 96, 96, 196, 365, null, true);
      objectButtonG.createSprite();
      objectButtonG.makeClickable();

      objectButtonB = new Interactable(sButtonOffRB, 96, 96, 292, 365, null, true);
      objectButtonB.createSprite();
      objectButtonB.makeClickable();

      objectButtonReset = new Interactable(sButtonReset, 96, 96, 196, 475, null, true);
      objectButtonReset.createSprite();
      objectButtonReset.makeClickable();

      objectPrinter = new Interactable(sPrinter, 96, 96, 196, 250, "prompt2", true);
      objectPrinter.createSprite();
      objectPrinter.makeClickable();

      objectHinter = new Clue(sClueIcon, 96, 96, 800, 200)

      dummy = createSprite(player.position.x, player.position.y, 96, 96);
      dummy.addImage('exist', sDummyExist);
      dummy.scale = 1.5;
      dummy.visible = false;
      
      rHeadsUp = new HeadsUp("R", 94, 350);
      gHeadsUp = new HeadsUp("G", 190, 350);
      bHeadsUp = new HeadsUp("B", 286, 350);

      //doorExit.makeKillRoom1();

      objectButtonR.sprite.addImage('sOn', sButtonR);
      objectButtonG.sprite.addImage('sOn', sButtonG);
      objectButtonB.sprite.addImage('sOn', sButtonB);
      objectPrinter.sprite.addImage('paper', sPrinterPaper);
      objectPrinter.sprite.addImage('noPaper', sPrinter);

      var animVortex = objectBigScreen.sprite.addAnimation('animVortex', 'assets/sBigScreenVortex0001.png', 'assets/sBigScreenVortex0004.png');
      animVortex.frameDelay = 4;


    } 

  function updateRoom2(){


    RGB = str(R) + str(G) + str(B);
    rHeadsUp.drawHeadsUp();
    gHeadsUp.drawHeadsUp();
    bHeadsUp.drawHeadsUp();


    objectButtonR.updateSprite();
    objectButtonG.updateSprite();
    objectButtonB.updateSprite();
    objectTv.updateSprite();
    objectButtonReset.updateSprite();
    objectPrinter.updateSprite();
    

    //promptLaptop = currentPrompt;
    if(currentPrompt == "prompt1"){
      objectTv.drawPrompt();
      //promptLaptop2.sprite.visible = false;
    } else {
      //promptLaptop.remove();
    }


    if(currentPrompt == "prompt2"){
      objectButtonR.makeAddR();
      objectButtonR.drawPrompt();
      objectButtonR.sprite.changeImage('sOn');

      objectButtonG.makeAddG();
      objectButtonG.drawPrompt();
      objectButtonG.sprite.changeImage('sOn');

      objectButtonB.makeAddB();
      objectButtonB.drawPrompt();
      objectButtonB.sprite.changeImage('sOn');

      objectButtonReset.makeClearRGB();
      if(RGB != "929"){
      objectButtonReset.drawPrompt();
      }
    }
    //#090209
    if(RGB == "929"){

      objectPrinter.drawPrompt();
      objectPrinter.sprite.changeImage('paper');

    } else objectPrinter.sprite.changeImage('noPaper');

    if(printRGB){

      printRGB = false;
      print(RGB);

    }

    if(escaped){

      objectBigScreen.sprite.changeAnimation('animVortex');
      dummy.visible = true;
      setDummyPos();
      player.remove();
      timerOn = true;
      if(t == 180) {destroyRoom2();}

    // DUMMY MOVEMENT
      //125,400
      // if(dummy.position.y > 125 - 20) {

      //   dummy.velocity.y = -5

      // } else if(dummy.position.y < 125 + 20) {

      //   dummy.velocity.y = 5

      // } else dummy.velocity.y = 0;

      // if(dummy.position.x > 400 - 20){

      //   dummy.velocity.x = -5

      // } else if(dummy.position.x < 400 + 20) {

      //   dummy.velocity.x = 5

      // } else dummy.velocity.x = 0

      // if(dummy.position.x < 400 + 20 && dummy.position.x > 400 - 20 && dummy.position.y < 125 + 20 && dummy.position.y > 125 - 20){

      //   dummyMetVortex = true;

      // }
    //------


    }

    // if(dummyMetVortex){

    //   destroyRoom2();

    // }


  }

  function destroyRoom2() {

    //, objectBigScreen, objectTv,currentPrompt,objectButtonR,objectButtonG,objectButtonB,objectButtonReset,objectPrinter,dummy

    //background2.remove();
    objectTv.remove();
    objectButtonR.remove();
    objectButtonG.remove();
    objectButtonB.remove();
    objectButtonReset.remove();
    objectPrinter.remove();
    dummy.remove();
    objectBigScreen.remove();
    rHeadsUp.draw = false;
    gHeadsUp.draw = false;
    bHeadsUp.draw = false;
    clueClick.remove();
    R = "";
    G = "";
    B = "";

    gone = true;


  }

  function keyPressed(){

    if(keyCode == ESCAPE && currentPrompt == "prompt2" && currentRoom == 2 && RGB == "929") {
      escaped = true;   
    }

    if(key == 'k' || key == 'K'){

      killTimer -= 10;

    }

    if(key == 'j' || key == 'J'){

      killTimer += 10;

    }


    //print(escaped);
    return false;
  }

  function setDummyPos(){

    if(dummyToBePosed){
      dummy.position.x = player.position.x;
      dummy.position.y = player.position.y;
      dummyToBePosed = false;
    }

  }

  function updateTimer(){

    if(t < 180 && timerOn){
      t++
    } else t = 0;

  }



//------------------------------------------------- CLASSES -----------------------------------------------------

  class HeadsUp{

    constructor(_input, _xpos, _ypos){
      
      this.input = _input;
      this.xpos = _xpos;
      this.ypos = _ypos;
      this.val = null;

      let draw;
      //let timer = 0;

    }

    drawHeadsUp(){
      
      if(this.input == "R"){
        this.val = R
      } else if(this.input == "G"){
        this.val = G
      }else if(this.input == "B"){
        this.val = B
      }

      if(draw){
        
        textSize(16);
        textFont(fontPixel);
        fill(255, 255, 255);
        text(str(this.val), this.xpos, this.ypos);

        //this.timer++

      }


    }

    // checkState(){

    //   if(this.timer = 30){

    //     this.draw = false;
    //     this.timer = 0;

    //   }

    // }

    switchState(){

      this.draw = !this.draw;

    }

  }


  class Interactable{

    //let promptToActivate;

    constructor(_img,_spriteWidth,_spriteHeight,_x,_y,_promptToActivate,_scaled,_headsUp, _depth){

      this.img = _img;
      this.spriteWidth = _spriteWidth;
      this.spriteHeight = _spriteHeight;
      this.x = _x;
      this.y = _y;
      this.promptToActivate = _promptToActivate;
      this.click = null;
      this.active = true;
      this.scaled = _scaled;
      //let key = false;
      //storeItem('assignPrompt', this.assignPrompt())
      this.headsUp = _headsUp;
      this.depth = _depth;

    }

    makeClickable(){

      //headsUpHolder = this.headsUp;

      this.click = new Clickable();     //Create button
      this.click.locate(this.x-50, this.y-30);        //Position Button
      this.click.color = "#00000000";
      this.click.text = "";
      this.click.strokeWeight = 0;
      this.click.width = this.spriteWidth;
      this.click.height = this.spriteHeight;
      this.click.headsUp = this.headsUp;
      //print(this.promptToActivate);
      this.click.onPress = function(){
        currentHeadsUp = this.headsUp;
        promptActive = true;
        if(this.headsUp != null)
        this.headsUp.switchState();
        //interact();
      }
          ;
      

    }

    makeClue(){

      //headsUpHolder = this.headsUp;

      this.click = new Clickable();     //Create button
      this.click.locate(this.x - 10, this.y - 50);        //Position Button
      this.click.color = "#00000000";
      this.click.text = "";
      this.click.strokeWeight = 0;
      this.click.width = this.spriteWidth;
      this.click.height = this.spriteHeight;
      this.click.headsUp = this.headsUp;
      //print(this.promptToActivate);
      this.click.onPress = function(){
        //currentHeadsUp = this.headsUp;
        clueActive = true;
        // if(this.headsUp != null)
        // this.headsUp.switchState();
        //interact();
      }
          ;
      

    }    

    makeLock(){

      this.click = new Clickable();     //Create button
      this.click.locate(this.x-50, this.y-30);        //Position Button
      this.click.color = "#00000000";
      this.click.text = "";
      this.click.strokeWeight = 0;
      this.click.width = this.spriteWidth;
      this.click.height = this.spriteHeight;
      //print(this.promptToActivate);
      this.click.onPress = function(){
        promptActive = true;
        killRoom = true;
        
        //interact();
      }
          ;
      

    }

    makeKey(){

      this.click = new Clickable();     //Create button
      this.click.locate(this.x-50, this.y-30);        //Position Button
      this.click.color = "#00000000";
      this.click.text = "";
      this.click.strokeWeight = 0;
      this.click.width = this.spriteWidth;
      this.click.height = this.spriteHeight;
      //print(this.promptToActivate);
      this.click.onPress = function(){
        keyGot = true;
      }
          ;
      

    }

    drawPrompt(){

      if(this.active == true){
        this.click.draw();
      } 

    }

    drawKey(){

      if(keyGot != true){
        this.click.draw();
      } else this.remove();

    }

    createSprite(){

      this.sprite = createSprite(this.x, this.y, this.spriteWidth, this.spriteHeight);
      //70, 40 (x+50,y+30)
      this.sprite.addImage(this.img);
      if(this.scaled){
      this.sprite.scale = 1.5
      }
      this.sprite.depth = 1;
      if (this.depth != null){

        this.sprite.depth = this.depth; 

      }
      this.sprite.addToGroup(collidabale);
      //this.sprite.debug = true;
      //this.sprite.setCollider("rectangle",0,0,this.originalHeight,this.orignalWidth);



    } 

    updateSprite(){

        if(player.position.y < this.y){
          this.sprite.depth = 3;
        } else this.sprite.depth = 1;


    }


    destroyCollider(){

      this.sprite.setCollider("rectangle",0,0,0,0);

    }



    remove(){

      this.active = false;
      this.sprite.remove();

    }

    makeKillRoom1(){

      this.click.onPress = function(){
        transitionToRoom2();
        player.position.x = 450;
        player.position.y = 450;
        currentPrompt = "prompt1";
      }
  
    }

    makeAddR(){
      this.click.onPress = function(){
        R++;
        printRGB = true;
      }
    }
    makeAddG(){
      this.click.onPress = function(){
        G++;
        printRGB = true;
      }
    }
    makeAddB(){
      this.click.onPress = function(){
        B++;
        printRGB = true;
      }
    }
    makeClearRGB(){

      this.click.onPress = function(){
        R = 0;
        G = 0;
        B = 0;
        printRGB = true;
      }


    } 

  }

  class Prompt {

    constructor(_x, _y, _questionL1, _questionL2, _answers, _correct,_questionSize){
      //int, int, string, array of strings, int
      this.x = _x;
      this.y = _y;
      this.questionL1 = _questionL1;
      this.questionL2 = _questionL2;
      this.answers = _answers;
      this.correct = _correct;
      this.questionSize = _questionSize;

      

    }

    drawBack(){

      fill(255,255,255);
      rect(this.x, this.y, 750, 500);
      

    }

    drawQuestion(){

      textSize(this.questionSize);
      textFont(fontPixel);
      text(this.questionL1, this.x + 375, this.y + 150);
      if(this.questionL2 != null){
        text(this.questionL2, this.x + 375, this.y + 175);
      }
    }



    createAnswers(){
      
      let answerButton = [];
      globalCorrect = this.correct;


      for (let i = 0, j = 1; i != 3; i++, j++) {
        answerButton[i] = new Clickable();     //Create button
        answerButton[i].locate(this.x + 60, this.y + (150+75*j));        //Position Button
        answerButton[i].color = "#FFFFFF";
        answerButton[i].textFont = fontPixel;
        answerButton[i].text = this.answers[i];
        answerButton[i].strokeWeight = 5;
        answerButton[i].textSize = 16;
        answerButton[i].resize(625,60);
        answerButton[i].textScaled = true;
        answerButton[i].onPress = function(){
          //print(globalCorrect);
          //print(i);
          if (i == globalCorrect){ 
            alert("Right!");
            promptActive = false;
            if (currentPrompt = "prompt1"){
              currentPrompt = "prompt2";
            } else if(currentPrompt="prompt2"){
              currentPrompt = "prompt3";
            }
          }else alert("Wrong...")   
        }  
        answerButton[i].draw();   
        }


        
      }
    createDismiss(){


      let dismissButton;

      dismissButton = new Clickable();     //Create button
      dismissButton.locate(this.x + (375-113), this.y + 275 );        //Position Button
      dismissButton.color = "#FFFFFF";
      dismissButton.text = "...";
      dismissButton.strokeWeight = 5;
      dismissButton.textSize = 25;
      dismissButton.resize(225,50);
      dismissButton.textScaled = true;
      dismissButton.onPress = function(){
        promptActive = false;
      }      

      dismissButton.draw();


    }
      
      



  }


  class Clue {

    constructor(){

      this.clue = "";
      this.x = 20;
      this.y = 20;

    }

    drawBack(){

      fill(255,255,255);
      rect(this.x, this.y, 750, 500);
      

    }

    updateClue(){

      if(currentPrompt == "prompt1" && currentRoom == 1){

        this.clue = "Try, try again";
        this.clueL2 = "(theres no hint)";
        this.clueL3 = null;

      } else if(currentPrompt == "prompt2" && currentRoom == 1){

        this.clue = "Make sure to";
        this.clueL2 = "close the door behind you";
        this.clueL3 = null;

      } else if(currentPrompt == "prompt1" && currentRoom == 2) {

        this.clue = "What's on TV?";
        this.clueL2 = null;
        this.clueL3 = null;

      } else if(currentPrompt == "prompt2" && currentRoom == 2) {

        this.clue = "Did you know: The background color's";
        this.clueL2 = "RGB values can be stored"; 
        this.clueL3 = "in the BODY of a page's HTML?";

      }




    }

    drawClue(){

      fill(0,0,0)
      textSize(20);
      textFont(fontPixel);
      text(this.clue, this.x + 375, this.y + 150);
      if(this.clueL2 != null){
        text(this.clueL2, this.x + 375, this.y + 175);
      }
      if(this.clueL3 != null){
        text(this.clueL3, this.x + 375, this.y + 200);
      }
    }    

    createDismiss(){


      let dismissButton;

      dismissButton = new Clickable();     //Create button
      dismissButton.locate(this.x + (375-113), this.y + 275 );        //Position Button
      dismissButton.color = "#FFFFFF";
      dismissButton.text = "...";
      dismissButton.strokeWeight = 5;
      dismissButton.textFont = fontPixel;
      dismissButton.textSize = 25;
      dismissButton.resize(225,50);
      dismissButton.textScaled = true;
      dismissButton.onPress = function(){
        clueActive = false;
      }      

      dismissButton.draw();


    }

    checkDrawn(){



    }

  }

//---------------------------------------------------------------------------------------------------------------

