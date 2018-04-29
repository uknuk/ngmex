const express = require('express'),
      path = require('path'),
      http = require('http'),
      fs = require('fs'),
      api = require('./server/api'),
      port = process.env.PORT || '3000',
      app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.get('/media', function(req,res){
  var filePath = req.query.path,
      file = path.join(__dirname, "media", filePath);

  fs.exists(file, function(exists){
    if(exists)
    {
      var rstream = fs.createReadStream(file);
      rstream.pipe(res);
    }
    else
    {
      res.send("File not found");
      res.end();
    }

  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.set('port', port);

const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => console.log(`API running on localhost:${port}`));
