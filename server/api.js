const fs = require('fs'),
      path = require('path'),
      router = require('express').Router(),
      media = path.join(__dirname, "..", "media");

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

  fs.readdirSync(dir).forEach((alb) => {
    let albDir = path.join(dir, alb);

    if (fs.statSync(albDir).isFile())
      return;  // problem serving mp3 archives

    tracks[alb] = fs.readdirSync(albDir).map((track) => {
      return {
        name: track,
        path: path.join(artPath, alb, track)
      };
    });
  });

  res.json(tracks);
});

router.get('/', (req, res) => {
  res.status(404).end();
});

module.exports = router;