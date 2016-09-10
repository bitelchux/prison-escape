var HUD = function(p) {
  var _ = this;
  _.p = p; // Player instance
  _.h = 60;
  _.h1 = $.svg.n(data.h);
  _.h2 = $.svg.n(data.h.replace('e22222', '999'));
  _.co = new Coin(168, 0);
  _.co.y = 18;

  _.u = function() {
  };

  // Render
  _.r = function() {
    $.x.s();
    $.x.fs('rgba(30,30,30,0.9)');
    $.x.fr(0, 0, $.vw, _.h);
    $.x.di(_.h1, 20, 18);
    $.x.di(_.h1, 54, 18);
    $.x.di(_.h1, 88, 18);
    $.x.ft('x', 20, 200, 35, 'white', 'sans-serif');
    $.x.ft($.cc.toString(), 28, 220, 37, 'white', 'courier');
    $.x.ft(floor($.dt / 10).toString() + ' mts', 28, 600, 37, 'white', 'courier', '', 'r');
    $.x.r();

    _.co.r();
  };
};
