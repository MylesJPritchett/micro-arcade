title = "Dodge";

description = `
[Tap] Change Direction
`;

characters = [];

options = {};

/** @type {Vector[]} */
let blocks;
let nextBlockDist;

let player = vec(50, 90);
let speed = 1;

function update() {
  if (!ticks) {
    blocks = [vec(50, 50)];
    nextBlockDist = 10;
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

  if (player.x < 5 || player.x > 95) {
    speed = -speed;
  }


}
