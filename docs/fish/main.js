title = "Fish";

description = `
[Tap] to Cast
[Tap] to Reel In
`;

characters = [];


options = {
};

let float;
let direction;
let state;
let reelTime;
let targetX;
let fish;
let fishDimensions;

function update() {
  if (!ticks) {
    float = vec(60, -10);
    direction = "up";
    reelTime = 0;
    state = "idle";
    fish = vec(0, 0)
  }
  color("light_blue")
  rect(0, 0, 100, 60)
  color("blue")
  rect(0, 60, 100, 40)

  color("red")
  box(float, 5);
  color("white")
  line(float.x - 1, float.y, float.x + 1, float.y);
  color("black")
  line(50, 0, float.x, float.y - 2, 1)

  switch (state) {
    case "idle":
      if (input.isJustPressed) {

        float = vec(60, -10);

        targetX = rnd(20, 80);
        state = "casting"
      }
      break;

    case "casting":
      let speed = 0.5;

      let dx = targetX - float.x;
      let dy = 69 - float.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        float.x += (dx / distance) * speed;
        float.y += (dy / distance) * speed;
      }

      if (distance <= speed) {
        float.x = targetX;
        float.y = 69;
        state = "floating";
      }
      break;

    case "floating":
      if (direction === "up") {
        float.y -= 0.02;
      }

      if (direction === "down") {
        float.y += 0.02;
      }

      if (float.y <= 69) {
        direction = "down";
      } else if (float.y >= 71) {
        direction = "up";
      }
      let bite = rnd(0, 500);

      if (bite < 1) {
        float.y += 5;
        state = "bitten";
      }

      if (input.isJustPressed) {
        end();
      }
      break;

    case "bitten":
      color("blue")
      rect(0, 60, 100, 40)

      float.y = 75;
      reelTime++;
      if (reelTime > rnd(60, 120 - (difficulty / 1000))) {
        state = "floating";
        reelTime = 0;
      }
      if (input.isJustPressed) {
        state = "reeling"
        reelTime = 0;
        fishDimensions = { width: rnd(2, 8), height: rnd(3, 20) }
      }
      break;

    case "reeling":
      fish = float
      color("light_black")
      box(fish.x, fish.y + (fishDimensions.height / 2), fishDimensions.width, fishDimensions.height);

      let reel_speed = 0.5;

      let reel_dx = 50 - float.x;
      let reel_dy = -10 - float.y;
      let reel_distance = Math.sqrt(reel_dx * reel_dx + reel_dy * reel_dy);

      if (reel_distance > 0) {
        float.x += (reel_dx / reel_distance) * reel_speed;
        float.y += (reel_dy / reel_distance) * reel_speed;
      }

      if (reel_distance <= reel_speed) {
        float.x = 50;
        float.y = -10;
        state = "caught";
      }

      break;

    case "caught":
      addScore(1);
      state = "idle"
      break;
  }
}
