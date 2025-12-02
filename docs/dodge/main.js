title = "Dodge";

description = `
[Tap] Change Direction
`;

characters = [];

options = {};

/** @type {Vector[]} */
let blocks;
let nextBlockDist;

let player;
let speed = 1;

function update() {
  if (!ticks) {
    blocks = [];
    for (let i = 0; i < 5; i++) {
      blocks.push(vec(rnd(5, 95), rnd(10, 70))); // y between 60–95
    }
    nextBlockDist = 10;
    player = vec(50, 90);
  }
  let scr = 0.1 + (score / 1000);

  color("black")
  remove(blocks, (b) => {
    b.y += scr;
    box(b, 5);
    if (b.y > 95) {
      addScore(1);
      return true;
    }
  });
  nextBlockDist -= scr;
  while (nextBlockDist <= 0) {
    blocks.push(vec(rnd(5, 95), -2 - nextBlockDist));
    nextBlockDist += rnd(5, 15);
  }

  color("cyan")
  if (box(player, 5).isColliding.rect.black) {
    end();
  }

  player.x += speed;
  if (input.isJustPressed) {
    speed = -speed;
  }

  if (player.x < 3 || player.x > 97) {
    end();
  }
  color("black")
  rect(0, 0, 1, 100)
  rect(100, 0, -1, 100)
  rect(0, 92, 100, 10)


}
