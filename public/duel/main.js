title = "Duel";

description = `
[Tap] to Stab
[Hold] to Block
[Release] to Parry
`;

characters = [
  `
 l l 
l l l
 l l
  l 
`

];
options = {
};

let playerState;
let playerHealth;
let enemyState;
let enemyHealth;
let holdTime;

let startUpFrame;
let activeFrame;
let recoveryFrame;
let parryFrame;
let parryRecoveryFrame;
let stunnedFrame;

let EstartUpFrame;
let EactiveFrame;
let ErecoveryFrame;
let EparryFrame;
let EparryRecoveryFrame;
let EstunnedFrame;


let didHit;
let EdidHit;


function update() {
  if (!ticks) {
    playerState = "idle"
    enemyState = "idle"
    playerHealth = 5
    enemyHealth = 5;
    didHit = false;
    EdidHit = false;
  }

  if (playerHealth == 0) {
    end();
  }

  if (enemyHealth == 0) {
    addScore(1)
    playerHealth++;
    enemyHealth = 5;
    enemyState = "idle"
  }

  color("cyan")
  char("a".repeat(playerHealth), 5, 10)

  color("red")
  char("a".repeat(enemyHealth), 65, 10)


  color("cyan")
  box(20, 50, 20, 60)

  color("red")
  box(80, 50, 20, 60)

  switch (playerState) {
    case "idle":
      color("light_black")
      line(25, 50, 30, 70)

      if (input.isJustPressed) {
        holdTime = 0;
      }

      if (input.isPressed) {
        playerState = "block"
        holdTime++;
      }

      break;
    case "block":
      color("light_black")
      line(30, 50, 45, 20)

      if (input.isPressed) {
        playerState = "block"
        holdTime++;
      }

      if (input.isJustReleased) {
        if (holdTime < 30) {
          playerState = "startUp"
          startUpFrame = 0
        } else {
          playerState = "parry"
          parryFrame = 0
        }
      }


      break;
    case "startUp":
      color("light_black")
      line(25, 50, 45, 45)


      if (startUpFrame > 5) {
        didHit = false
        playerState = "active"
        activeFrame = 0
      }
      startUpFrame++;

      break;
    case "active":

      color("light_black")
      line(30, 48, 75, 42)



      if (activeFrame > 5) {
        playerState = "recovery"
        recoveryFrame = 0
      }
      activeFrame++;

      break;
    case "recovery":
      color("light_black")
      line(25, 50, 45, 50)





      if (recoveryFrame > 5) {
        playerState = "idle"
      }
      recoveryFrame++;

      break;
    case "parry":
      color("light_black")
      line(35, 45, 40, 15)





      if (parryFrame > 10) {
        playerState = "parryRecovery";
        parryRecoveryFrame = 0;
      }
      parryFrame++;

      break;
    case "parryRecovery":
      color("light_black")
      line(30, 47, 39, 13)





      if (parryRecoveryFrame > 15) {
        playerState = "idle"
      }
      parryRecoveryFrame++;

      break;
    case "stunned":
      color("cyan")
      text("Stunned!", 25, 90)

      if (stunnedFrame > 120) {
        playerState = "idle"
      }
      stunnedFrame++;
      break;





  }

  switch (enemyState) {
    case "idle":
      color("light_black")
      line(100 - 25, 50, 100 - 30, 70)

      let action = rndi(0, 30);
      switch (action) {
        case 0:
          enemyState = "block"
          break;
        case 1:
          enemyState = "block"
          break;
        case 2:
          enemyState = "block"
          break;
        case 3:
          enemyState = "idle"
          break;
        case 4:
          enemyState = "idle"
          break;

      }




      break;
    case "block":
      color("light_black")
      line(100 - 30, 50, 100 - 45, 20)

      let blockAction = rndi(0, 120);
      switch (blockAction) {
        case 0:
          enemyState = "startUp"
          EstartUpFrame = 0
          break;
        case 1:
          enemyState = "startUp"

          EstartUpFrame = 0
          break;
        case 2:
          enemyState = "parry"
          EparryFrame = 0
          break;

        default:
          enemyState = "block"
          break;

      }



      break;
    case "startUp":
      color("light_black")
      line(100 - 25, 50, 100 - 45, 45)



      if (EstartUpFrame > 15) {
        EdidHit = false
        enemyState = "active"
        EactiveFrame = 0
      }
      EstartUpFrame++;

      break;
    case "active":

      color("light_black")
      line(100 - 30, 48, 100 - 75, 42)



      if (EactiveFrame > 5) {
        enemyState = "recovery"
        ErecoveryFrame = 0
      }
      EactiveFrame++;

      break;
    case "recovery":
      color("light_black")
      line(100 - 25, 50, 100 - 45, 50)





      if (ErecoveryFrame > 10) {
        enemyState = "idle"
      }
      ErecoveryFrame++;

      break;
    case "parry":
      color("light_black")
      line(100 - 35, 45, 100 - 40, 15)





      if (EparryFrame > 5) {
        enemyState = "parryRecovery";
        EparryRecoveryFrame = 0;
      }
      EparryFrame++;

      break;
    case "parryRecovery":
      color("light_black")
      line(100 - 30, 47, 100 - 39, 13)





      if (EparryRecoveryFrame > 15) {
        enemyState = "idle"
      }
      EparryRecoveryFrame++;

      break;

    case "stunned":
      color("red")
      text("Stunned!", 100 - 25, 90)
      if (EstunnedFrame > 180) {
        enemyState = "idle"
      }
      EstunnedFrame++;
      break;


  }


  if (playerState == "active" && !didHit) {
    didHit = true
    color("cyan")
    switch (enemyState) {
      case "idle":
        enemyHealth--;
        break;
      case "block":
        break;

      case "startUp":
        enemyHealth--;
        enemyState = "recovery"
        ErecoveryFrame = 0
        break;

      case "active":
        break;

      case "recovery":
        enemyHealth--;
        break;

      case "parryRecovery":
        enemyHealth--;
        break;

      case "parry":
        playerState = "stunned"
        stunnedFrame = 0
        enemyState = "idle"
        break;

      case "stunned":
        enemyHealth--;
        break;
    }
  }

  if (enemyState == "active" && !EdidHit) {
    EdidHit = true;
    switch (playerState) {

      case "idle":
        playerHealth--;
        break;
      case "block":
        break;

      case "startUp":
        playerHealth--;
        playerState = "recovery"
        recoveryFrame = 0
        break;

      case "active":
        break;

      case "recovery":
        playerHealth--;
        break;

      case "parryRecovery":
        playerHealth--;
        break;

      case "parry":
        enemyState = "stunned"
        EstunnedFrame = 0
        playerState = "idle"
        break;

      case "stunned":
        playerHealth--;
        break;
    }
  }
}


