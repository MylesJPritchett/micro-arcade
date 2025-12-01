title = "Flap";

description = `
[Tap] to Flap
`;

characters = [];

options = {};

let pipes;
let gapSize;

let pipeSpacing;

let player;
let velocity;


function update() {
  if (!ticks) {
    pipes = [vec(100, rnd(20, 80))];
    player = vec(20, 50);
    gapSize = 20;
    pipeSpacing = 50;
    velocity = 0;
  }
  let scr = 0.2 + (score / 1000);

  color("black")
  remove(pipes, (p) => {
    p.x -= scr;
    rect(p.x, 0, 10, p.y - gapSize / 2);
    rect(p.x, p.y + gapSize / 2, 10, 100 - p.y - gapSize / 2);
    if (p.x + 10 < 20 && !p.passed) {
      p.passed = true;
      addScore(1);
    }
    if (p.x < -10) {
      return true;
    }

  });
  pipeSpacing -= scr;
  while (pipeSpacing <= 0) {
    pipes.push(vec(100, rnd(30, 70)));
    pipeSpacing += 40;
  }

  color("cyan")
  if (box(player, 5).isColliding.rect.black || player.y < 0 || player.y > 100) {
    end();
  }

  velocity += 0.02;      // gravity
  player.y += velocity;

  if (input.isJustPressed) {
    velocity = -0.5;     // jump
  }

  if (velocity > 1) velocity = 1;


};
