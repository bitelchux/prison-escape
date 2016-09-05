/* Start game on load */
window.addEventListener('load', function() {
  $.init();
  // Input
  $.i = new Input();
  // Collisions system
  //$.o = new Collisions();
  // Sound manager
  //$.s = new Sounds();
  // Bind keyboard
  $.i.b([13, 38, 40]);

  // Sounds
  //$.s.a('s', [0,,0.0989,0.3295,0.2402,0.4314,,,,,,0.4986,0.5758,,,,,,1,,,,,0.5]);

  // Loading Scenes
  $.scn.menu = new MenuScene();
  $.scn.game = new GameScene();

  $.scn.menu.loop();
});
