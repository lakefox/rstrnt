// Start Screen
d.rect("tapper", 1,1, 450, 800, "rgba(0,0,0,0)");
d.move("tapper", 0,0,5);
d.text("title", "High Jump<br><span id='hero'>HERO</span>", 76, 120);
d.css("title", "color: #ffdc63; font-size: 100px; font-weight: bold; font-family: 'Poppins', sans-serif;");
d.text("ttp", ">Tap To Play!<", 86, 630);
d.css("ttp", "font-size: 20px; color: #fff; font-family: 'Press Start 2P', monospace;");
// Ground
d.rect("ground", 0,700, 450, 100, "#f76f8e");
d.rect("line1", 0,700, 450, 5, "#ffead0");
d.rect("line2", 0,725, 450, 5, "#ffead0");
d.rect("line3", 0,750, 450, 5, "#ffead0");
d.rect("line4", 0,775, 450, 5, "#ffead0");
// High Jump pit
// Jump score affects the height and speed
var score = 9000;
d.rect("pit", 234+Math.sqrt(score), 720, 30, 40, "#ffdc63");
d.css("pit", "border-radius: 3px;");

var removed = false;
var clicked = false;
d.listen("tapper", "click", () => {
  if (!clicked) {
    clicked = true;
    d.loop(80, 1, (i) => {
      d.move("title", 76, 120-(i*7), 1);
    });
    d.loop(81, 1, (i) => {
      d.move("ttp", 86, 630+(i*3), 1);
      if (i == 81) {
        d.remove("title");
        d.remove("ttp");
        removed = true;
        d.done("removedTitleScreen");
      }
    });
  }
});

d.done("removedTitleScreen", () => {
  d.dontListen("tapper","click");
  clicked = false;
  // Draw the score board
  d.text("score", "0ft", 0, 50);
  d.css("score", "width: 450px; text-align:center; font-size:30px; color:#fff; font-family: 'Press Start 2P', monospace;");
  // ############################################################ Main Listener
  d.listen("tapper", "click", () => {
    if (!clicked) {
      clicked = true;
      d.object("jumper-animation")(225-Math.sqrt(score),725);
    }
  });
});

d.object("write-score", (y) => {
  d.insertHTML("score", (Math.floor(-y/20)+37)+"ft");
});

d.object("init-jumper", (x,y) => {
  // Whole body = 50x60
  d.oval("head", x+20, y, 10, 10, "#312f2f");
  d.rect("body", x+22, y+5, 5, 17, "#312f2f");
  // Legs
    d.rect("rleg", x+26, y+19, 4, 10, "#312f2f");
    d.rotate("rleg", -45);
    d.rect("lleg", x+20, y+19, 4, 10, "#312f2f");
    d.rotate("lleg", 45);
  // Arms
    d.rect("rarm", x+26, y+9, 4, 10, "#312f2f");
    d.rotate("rarm", -45);
    d.rect("larm", x+20, y+9, 4, 10, "#312f2f");
    d.rotate("larm", 45);
});
d.object("init-jumper")((225-Math.sqrt(score)),725);

d.object("jumper-animation", (x, y) => {
  var goingUp = false;
  d.loop(20, 10, (e, dn) => {
    var i = 10-Math.abs(((e-20)+10));
    d.move("head", (x+20), (y)+i/2);
    d.move("body", (x+22), (y+5)+i/2);
    // Legs
    d.move("rleg", (x+26), (y+19)+i/2);
    d.move("lleg", (x+20), (y+19)+i/2);
    if (i == 10 || goingUp) {
      goingUp = true;
      d.rotate("rleg", -45+(10-(i*3)));
      d.rotate("lleg", 45-(10-(i*3)));
      d.rotate("rarm", -45+(10-(i*3)));
      d.rotate("larm", 45-(10-(i*3)));
    }
    // Arms
    d.move("rarm", (x+26), (y+9)+i/2);
    d.move("larm", (x+20), (y+9)+i/2);
    if (dn) {
      d.done("jump-animation");
    }
  });
});

d.object("move-jumper", (x,y) => {
  d.move("head", x+20, y);
  d.move("body", x+22, y+5);
  // Legs
  d.move("rleg", x+26, y+19);
  d.move("lleg", x+20, y+19);
  // Arms
  d.move("rarm", x+26, y+9);
  d.move("larm", x+20, y+9);
});

d.object("move-bg", (y) => {
  d.object("write-score")(y);
  // This works :( 2 days later
  if (y <= 200) {
    var a = -(Math.min(y,150)-150);
    d.move("pit", 234+Math.sqrt(score), pH+a);
    d.move("ground", 0, gH+a);
    d.move("line1", 0, l1+a);
    d.move("line2", 0, l2+a);
    d.move("line3", 0, l3+a);
    d.move("line4", 0, l4+a);
  } else {
    d.move("pit", 234+Math.sqrt(score), pH);
    d.move("ground", 0, gH);
    d.move("line1", 0, l1);
    d.move("line2", 0, l2);
    d.move("line3", 0, l3);
    d.move("line4", 0, l4);
  }
});

// Raise the scope of the objects y's lol this is dumb
var pH;
var gH;
var l1;
var l2;
var l3;
var l4;

d.done("jump-animation", () => {
  // Define them
  pH = d.move("pit").y;
  gH = d.move("ground").y;
  l1 = d.move("line1").y;
  l2 = d.move("line2").y;
  l3 = d.move("line3").y;
  l4 = d.move("line4").y;
  // (-x^2+height)/speed
  d.loop(Math.sqrt(score)*2, 50, (x, dn) => {
    var xs = (x-Math.sqrt(score))*(x-Math.sqrt(score));
    var y = 725-(-(xs)+score);
    var xM = (225-Math.sqrt(score))+x;
    d.object("move-jumper")(xM,Math.max(Math.min(y,725),150));
    d.object("move-bg")(Math.min(y,725));
    if (dn) {
      clicked = false;
    }
  });
});
