title = "Bridge";

description = `
[Hold] to Build
`;

characters = [];

options = {};

let platforms;

let prevPlatformX;

/** @type {{angle: number, length: number}} */
let bridge;


let scrollRemaining = 0;
let scrollSpeed = 1.5;

let target;

let falling;

let startInputLockout;

function update() {
  if (!ticks) {
    startInputLockout = 30; // half second lockout to prevent accidental bridge
    platforms = [vec(10, 55)];
    prevPlatformX = platforms[0].x;
    bridge = { angle: -PI / 2, length: 0 };
    for (let i = 0; i < 5; i++) {
      spawnPlatform()
    }

    target = platforms[1];
    falling = false;

  }
  if (startInputLockout > 0) {
    startInputLockout--;
  }


  if (scrollRemaining > 0) {
    let delta = Math.min(scrollSpeed, scrollRemaining);
    scrollRemaining -= delta;
    platforms.forEach((p) => p.x -= delta);
  }

  if (input.isJustPressed && !falling && startInputLockout <= 0) {
    bridge.length = 0;
  }


  if (input.isPressed && !falling && startInputLockout <= 0) {
    bridge.angle = -PI / 2;
    bridge.length += 0.5;
  }

  if (bridge.length > 0 && (!input.isPressed || falling)) {
    bridge.angle += 0.05;
    falling = true
  }



  platforms.forEach((p, i) => {
    color(p == target ? "red" : "black");
    rect(p.x, p.y, 10, 100);

  });

  color("cyan")


  let bridgeEnd = vec(platforms[0].x + 10, platforms[0].y)
    .addWithAngle(bridge.angle, bridge.length);

  let left = target.x;
  let right = target.x + 10;
  let top = target.y;

  let success =
    bridgeEnd.x >= left &&
    bridgeEnd.x <= right &&
    abs(bridgeEnd.y - top) < 2;

  if (success) {
    bridge.length = 0;
    falling = false;
    addScore(1);
    target = platforms[2];
    scrollRemaining = platforms[1].x - platforms[0].x;
    prevPlatformX -= scrollRemaining;
  }

  let miss = bridge.angle > PI / 2;
  let overshoot = bridgeEnd.x > right && bridgeEnd.y > top;



  if (miss || overshoot) {
    end();
  }


  line(platforms[0].x + 10, platforms[0].y, bridgeEnd);




  if (scrollRemaining <= 0) {
    remove(platforms, (p) => p.x < 0);
    if (platforms.length < 6) {
      spawnPlatform();
    }
  }

}

function spawnPlatform() {
  let newPlatformX = prevPlatformX + rnd(20, 50);
  platforms.push(vec(newPlatformX, rnd(clamp(50 - score, 30, 50), clamp(60 + score, 60, 99))));
  prevPlatformX = newPlatformX;
}
