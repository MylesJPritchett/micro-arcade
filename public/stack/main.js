title = "Stack";

description = `
[Tap] to Drop
`;

characters = [];

options = {
};

let speed;
let size;
let blocks;
let distance;
let player;
let groundCentre;
let groundSize;

function update() {
  if (!ticks) {
    distance = 0
    size = 50
    speed = 0.2
    blocks = []
    player = 25
    groundCentre = 50
    groundSize = 100
  }
  color("black")
  rect(0, 52 + distance, 100, 50)
  blocks.forEach((b) => {
    rect(b.pos.x, b.pos.y, b.size, 5)
  })
  speed *= 1 + (difficulty / 10000)


  color("cyan")
  rect(player, 47, size, 5)

  if (player + size >= 100) {
    player = 100 - size
    speed = -speed;
  } else if (player <= 0) {
    player = 0
    speed = -speed;
  }
  player += speed;

  if (input.isJustPressed) {

    if (blocks.length != 0) {
      let prevBlock = blocks.at(-1);

      let prevLeft = Math.round(prevBlock.pos.x);
      let prevRight = Math.round(prevBlock.pos.x + prevBlock.size);
      let curLeft = Math.round(player);
      let curRight = Math.round(player + size);


      let overlapLeft = Math.max(prevLeft, curLeft);
      let overlapRight = Math.min(prevRight, curRight);
      let overlapWidth = overlapRight - overlapLeft;

      if (overlapWidth < 1) {
        end();
        return;
      }

      size = overlapWidth;
      player = overlapLeft;
    }

    blocks.push({ pos: vec(player, 47), size: size }); blocks.forEach((b) => {
      b.pos.y += 5;
    })

    distance += 5;

    player = rnd(0, 100 - size);
    if (rndi(0, 1) == 0) {
      speed = -speed
    }

    addScore(1);
  }


}
