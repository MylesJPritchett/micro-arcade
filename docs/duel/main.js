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

let playerFrame;

let enemyFrame;


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
    playerFrame = 0;
    enemyFrame = 0;
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
          playerFrame = 0
        } else {
          playerState = "parry"
          playerFrame = 0
        }
      }


      break;
    case "startUp":
      color("light_black")
      line(25, 50, 45, 45)


      if (playerFrame > 5) {
        didHit = false
        playerState = "active"
        playerFrame = 0
      }
      playerFrame++;

      break;
    case "active":

      color("light_black")
      line(30, 48, 75, 42)



      if (playerFrame > 5) {
        playerState = "recovery"
        playerFrame = 0
      }
      playerFrame++;

      break;
    case "recovery":
      color("light_black")
      line(25, 50, 45, 50)





      if (playerFrame > 5) {
        playerState = "idle"
      }
      playerFrame++;

      break;
    case "parry":
      color("light_black")
      line(35, 45, 40, 15)





      if (playerFrame > 10) {
        playerState = "parryRecovery";
        playerFrame = 0;
      }
      playerFrame++;

      break;
    case "parryRecovery":
      color("light_black")
      line(30, 47, 39, 13)





      if (playerFrame > 15) {
        playerState = "idle"
      }
      playerFrame++;

      break;
    case "stunned":
      color("cyan")
      text("Stunned!", 25, 90)

      if (playerFrame > 120) {
        playerState = "idle"
      }
      playerFrame++;
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
          enemyFrame = 0
          break;
        case 1:
          enemyState = "startUp"

          enemyFrame = 0
          break;
        case 2:
          enemyState = "parry"
          enemyFrame = 0
          break;

        default:
          enemyState = "block"
          break;

      }



      break;
    case "startUp":
      color("light_black")
      line(100 - 25, 50, 100 - 45, 45)



      if (enemyFrame > 15) {
        EdidHit = false
        enemyState = "active"
        enemyFrame = 0
      }
      enemyFrame++;

      break;
    case "active":

      color("light_black")
      line(100 - 30, 48, 100 - 75, 42)



      if (enemyFrame > 5) {
        enemyState = "recovery"
        enemyFrame = 0
      }
      enemyFrame++;

      break;
    case "recovery":
      color("light_black")
      line(100 - 25, 50, 100 - 45, 50)





      if (enemyFrame > 10) {
        enemyState = "idle"
      }
      enemyFrame++;

      break;
    case "parry":
      color("light_black")
      line(100 - 35, 45, 100 - 40, 15)





      if (enemyFrame > 5) {
        enemyState = "parryRecovery";
        enemyFrame = 0;
      }
      enemyFrame++;

      break;
    case "parryRecovery":
      color("light_black")
      line(100 - 30, 47, 100 - 39, 13)





      if (enemyFrame > 15) {
        enemyState = "idle"
      }
      enemyFrame++;

      break;

    case "stunned":
      color("red")
      text("Stunned!", 100 - 25, 90)
      if (enemyFrame > 180) {
        enemyState = "idle"
      }
      enemyFrame++;
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
        enemyFrame = 0
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
        enemyFrame = 0
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
        enemyFrame = 0
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
        enemyFrame = 0
        playerState = "idle"
        break;

      case "stunned":
        playerHealth--;
        break;
    }
  }
}


