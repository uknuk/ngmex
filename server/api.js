const fs = require('fs'),
      path = require('path'),
      router = require('express').Router();

router.get('/artists', (req, res) => {
  var arts = {},
      root = path.join(__dirname, "..", "media");

  fs.readdirSync(root).forEach(function(dir) {
    fs.readdirSync(path.join(root, dir)).forEach(function(name) {
      arts[name] = path.join(dir, name);
    });
  });

 res.json(arts);
});

router.get('/', (req, res) => {
  res.status(404).end();
});

module.exports = router;
