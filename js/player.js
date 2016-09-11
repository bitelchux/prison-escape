var Player = function() {
  var _ = this;
  // Possible heights
  _.hs = [106, 246, 386];
  _.hi = 1; // Height index
  _.hp = 3;
  _.sd = 350; // Shooting Delay
  _.sc = 0; // Shooting Counter
  _.rs = 180; // Running speed
  _.iv = 0; // Invincible
  _.id = 1000; // Invincibility delay
  _.ic = 0; // Invincibility counter
  _.cf = 0; // Current frame
  _.inherits(Sprite);
  Sprite.call(_, 120, _.hs[_.hi], 40, 64);

  _.an = new Animator([$.svg.n(data.p[0], 40, 64), $.svg.n(data.p[1], 40, 64)], 100);
  _.ia = new Animator([0, 1], 100);

  _.esc = function() {
    return (_.x > $.vw);
  };

  _.u = function() {
    if (_.hp <= 0) return;
    if (_.sc > 0) _.sc -= $.e;

    _.an.u();

    // Step sounds
    if (_.an.g() !== _.cf && !_.esc()) {
      $.s.p('st2');
      _.cf = _.an.g();
    }

    if ($.dt > $.de) {
      if (_.x < $.vw) _.x += ($.e / 1000) * _.rs
      return;
    }

    if (_.iv) {
      _.ia.u();
      _.ic -= $.e;
      if (_.ic <= 0 || _.hp <= 0) _.iv = 0;
    }

    // Up
    if ($.i.d(38)) {
      _.hi = (_.hi - 1 < 0) ? 0 : _.hi - 1;
      _.y = _.hs[_.hi];
      $.s.p('j');
    } else if ($.i.d(40)) {
      _.hi = (_.hi + 1 > _.hs.length - 1) ? _.hs.length - 1 : _.hi + 1;
      _.y = _.hs[_.hi];
      $.s.p('j');
    } else if ($.i.d(32)) {
      if (_.sc <= 0) {
        _.sc = _.sd;
        $.g.pb.a(new Bullet(_.x + _.w, _.y + (_.h/ 2)));
      }
    }
    _.ur();

    // Collisions with coins
    $.g.c.c(_, function(p, c) {
      c.a = 0;
      $.cc += 1;
      $.s.p('c');
    });

    // Collisions with enemies
    if (!_.iv) {
      $.g.e.c(_, function(p, e) {
        _.hp -= 1;
        _.iv = 1;
        _.ic = _.id;
        e.a = 0;
        if (e.n === 'cop') $.s.p('hu');
        if (e.n === 'exp') {
          $.g.x.a(new Explosion(_.x + (_.w / 2), _.y + (_.h / 2)));
          $.s.p('xp');
        }
      });
    }
    $.i.c();
  };

  _.r = function() {
    $.x.s();
    if (_.iv && _.hp > 0) {
      if (_.ia.g()) $.x.di(_.an.g(), _.x, _.y);
    } else {
      $.x.di(_.an.g(), _.x, _.y);
    }
    $.x.r();
  };
};

var GameOverPlayer = function() {
  var _ = this;
  _.inherits(Sprite);
  Sprite.call(_, 280, 120, 80, 160);

  _.u = function() {
  };

  _.r = function() {
    $.x.s();
    $.x.fs("#ffd4aa");
    $.x.fr(_.x, _.y, _.w, 60);
    $.x.fs("#ff930f");
    $.x.fr(_.x, _.y + 60, _.w, 80);
    $.x.fr(_.x + 10, _.y + 140, 20, 20);
    $.x.fr(_.x + 50, _.y + 140, 20, 20);
    $.x.fs("#000");
    $.x.fr(_.x + 12, _.y + 27, 11, 11);
    $.x.fr(_.x + 57, _.y + 27, 11, 11);
    $.x.r();
  };
};

var IntroPlayer = function() {
  var _ = this;
  _.ox = 320;
  _.inherits(Sprite);
  Sprite.call(_, _.ox, 256, 40, 64);
  _.d = 0; // Direction
  _.sp = 60; // Walking speed
  _.rsp = 300; // Run away speed
  _.md = 40; // Max displacement
  _.wd = 500; // Waiting Delay
  _.c = 0; // Counter
  _.cf = 0; // Current frame

  _.an = new Animator([$.svg.n(data.p[0], 40, 64), $.svg.n(data.p[1], 40, 64)], 150);

  _.u = function() {
    if (_.c <= 0) {
      _.an.u();
      if (_.d === 1) {
        _.x += _.sp * ($.e / 1000);
        if (_.x >= _.ox + _.md) {
          _.d = 0;
          _.c = _.wd;
        }
      } else if (_.d === 0) {
        _.x -= _.sp * ($.e / 1000);
        if (_.x <= _.ox - _.md) {
          _.d = 1;
          _.c = _.wd;
        }
      }
    } else {
      _.c -= $.e;
    }

    if (_.an.g() !== _.cf) {
      $.s.p('st');
      _.cf = _.an.g();
    }
  };

  // Run away
  _.ra = function() {
    _.an.u();
    _.x += _.rsp * ($.e / 1000);
    if (_.an.g() !== _.cf) {
      $.s.p('st');
      _.cf = _.an.g();
    }
  };

  _.r = function() {
    $.x.s();
    if (!_.d) {
      //$.x.tn(_.w, 0)
      //$.x.sc(-1, 1);
      $.x.di(_.an.g(), _.x, _.y);
    } else {
      $.x.di(_.an.g(), _.x, _.y);
    }
    $.x.r();
  };
};
