const express = require('express'),
      path = require('path'),
      http = require('http'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      fs = require('fs'),
      api = require('./api'),
      port = process.env.PORT || '1926',
      app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(favicon(path.join(__dirname, '../public/speaker.ico')));
app.use(cors());
app.use('/api', api);
app.get('/media', function(req,res){
  let filePath = req.query.path,
      file = path.join(__dirname, "../media", filePath),
      stat = fs.statSync(file);

  fs.exists(file, function(exists){
    if(exists)
    {
      res.set('Content-Length', stat.size);
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
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.set('port', port);

const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => console.log(`API running on localhost:${port}`));
