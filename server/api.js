const fs = require('fs'),
      path = require('path'),
      router = require('express').Router();

router.get('/artists', (req, res) => {
  var arts = {},
      root = path.join(__dirname, "..", "media");

  fs.readdirSync(root).forEach(function(el) {
    let dir = path.join(root, el);
    
    if (fs.statSync(dir).isFile())
      return;

    fs.readdirSync(dir).forEach(function(name) {
      arts[name] = el;
    });
  });

 res.json(arts);
});
																																																																																																																																																																																																																																																		
router.get('/', (req, res) => {
  res.status(404).end();
});

module.exports = router;