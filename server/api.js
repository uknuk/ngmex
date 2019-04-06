const fs = require('fs'),
      path = require('path'),
      router = require('express').Router(),
      media = path.join(__dirname, "..", "media"),
      ext = /\.mp3$|\.mp4a$|\.mpc$|\.ogg$/;

router.get('/artists', (req, res) => {
  var arts = {};

  fs.readdirSync(media).forEach((location) => {
    let dir = path.join(media, location);

    if (fs.statSync(dir).isFile())
      return;

    fs.readdirSync(dir).forEach((name) => {
      arts[name] = location;
    });
  });

 res.json(arts);
});

router.get('/artists/:path/:artist', (req, res) => {
  const artPath = path.join(req.params.path, req.params.artist),
    dir = path.join(media, artPath);

  var tracks = {}

  loadAlbums(dir).forEach((alb) => {
    let albDir = path.join(dir, alb);

    if (fs.statSync(albDir).isFile())
      return;  // problem serving mp3 archives

    tracks[alb] = fs.readdirSync(albDir)
      .filter(file => ext.test(file))
      .map((track) => {
        return {
          name: track,
          path: path.join(artPath, alb, track)
        };
      });
  });

  res.json(tracks);
});

router.get('/last', (req, res) => {
  try {
    res.json(fs.readFileSync(`${media}/last`, 'utf8').split(/\n/));
  }
  catch(e) {
    return [];
  }
});

router.get('*', (req, res) => {
  res.status(404).end();
});

function loadAlbums(dir) {
  const issued = function(alb) {
    var re = /^\d{2}[\s+|_|-]/;
    if (alb.substr(0,2) == 'M0')
      return alb.replace('M0', '200');

    var year = alb.match(re);
    return year ? year[0].substr(0,2) < 30 ? '20' + alb : '19' + alb : alb;
  }

  return fs.readdirSync(dir).sort((a, b) => {

    if (a.substr(0,2) == 'Op' && b.substr(0,2) == 'Op') {
      let re = /^\d{2,3}/,
          oa = a.replace(/^Op/,'').match(re),
          ob = b.replace(/^Op/,'').match(re);

      if (oa && ob)
        return oa -ob;
    }

    let re = /^\d{4}/,
        ia = issued(a),
        ib = issued(b),
        ya = ia.match(re),
        yb = ib.match(re);


    if (ya && yb)
      return ya - yb;

    return ia === ib ? 0 : ia > ib ? 1 : -1;
  });
}

module.exports = router;