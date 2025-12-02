title = "Mash";

description = `
[Mash] to Mash
`;

characters = [];

options = {
};

let masher;

let potatos;
let squashed;
let nextPotato;
let state;
let masherTargetY = 35;
let masherSpeed = 0.25;
const potatoSmooth = 0.2;
let timer;

function update() {
  if (!ticks) {
    timer = 30 * 60
    potatos = []
    squashed = []
    nextPotato = 50;
    state = "idle";

    masher = vec(50, 35)

    for (let i = 0; i < 10; i++) {
      spawnPotato()

    }
  }

  if ((timer / 60) < 10) {
    color("red")
  } else {

    color("black")
  }

  timer -= 1

  let t = timer / 60;
  let s = t.toFixed(2);
  let [before, after] = s.split(".");
  before = before.padStart(2, "0");
  text(`${before}.${after}`, 37, 10);

  if (timer <= 0) {

    end();
  }



  potatos.forEach((p) => {
    p.pos.x += (p.targetX - p.pos.x) * potatoSmooth
    color("light_yellow")
    box(p.pos.x, p.pos.y, 10)
  })

  squashed.forEach((s) => {
    s.pos.x += (s.targetX - s.pos.x) * potatoSmooth
    color("light_yellow")
    box(s.pos.x, s.pos.y + 2.5, 15, 5)
  })

  color("light_black")
  box(masher.x, masher.y, 14, 40)

  if (input.isJustPressed) {
    state = "down"
    addScore(1)
    let current = potatos.shift();
    squashed.push(current)

    potatos.forEach((p) => {
      p.targetX -= 20
    })
    squashed.forEach((s) => {
      s.targetX -= 20
    })

    nextPotato -= 20
    spawnPotato()
  } else {
    state = "up"
  }


  switch (state) {
    case "idle":
      masherTargetY = 35;
      break;

    case "down":
      masherTargetY = 90;   // slam all the way down
      break;

    case "up":
      masherTargetY = 35;
      break;
  }

  // --- SMOOTH MOVEMENT TOWARD TARGET ---
  masher.y += (masherTargetY - masher.y) * masherSpeed;

  if (state === "down" && Math.abs(masher.y - masherTargetY) < 1) {
    masherTargetY = 52; // bounce up slightly
  }
}

function spawnPotato() {
  potatos.push({
    pos: vec(nextPotato, 70),
    targetX: nextPotato
  });
  nextPotato += 20

}

