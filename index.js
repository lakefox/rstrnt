// // Draw background to blend in
// var bg = new draft(document.querySelector("#backgroundCanvas"));
// bg.canvas = {
//   width: window.innerWidth,
//   height: window.innerHeight
// }
// bg.init();
//
// var height = ((window.innerHeight-800)/2)+100;
// bg.rect("track", 0, window.innerHeight-height, window.innerWidth, height, "#f76f8e");
// for (var i = 0; i <= Math.floor(height/30)+1; i++) {
//   bg.rect("line"+i, 0,(window.innerHeight-height)+(25*i), window.innerWidth, 5, "#ffead0");
// }

// Draw the game canvas
var d = new draft(document.querySelector("#gameCanvas"));
d.canvas = {
  width: 450,
  height: 800
}
d.init();
