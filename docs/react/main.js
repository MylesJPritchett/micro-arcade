title = "React";

description = `
[Tap] when Red
`;

characters = [];

options = {
};

let cooldown = 0;
let colourSelection = 0;

let colours = {
  0: "black",
  1: "red",
  2: "green",
  3: "blue",
  4: "yellow",
  5: "purple",
  6: "cyan",
  7: "white"
}

function update() {
  if (!ticks) {

    cooldown = rnd(30, 60);
  }
  if (cooldown > 0) {
    cooldown--;
  } else {
    cooldown = rnd(clamp(30-score, 15, 30), clamp(60-score, 30, 60));
    colourSelection = rndi(0, 7);
    
  }
  color(colours[colourSelection]);
  box(50, 50, 50);
  if (input.isJustPressed) {
    if (colourSelection == 1) {
      addScore(1);
    } else {
      end();
    }
    colourSelection = rndi(0, 7);
  }
}
