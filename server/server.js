var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

//http://stackoverflow.com/questions/35660857/loopback-get-ip-address-from-operation-hook
app.remotes().before('*.*', function(ctx,next) {
  loopback.getCurrentContext().set('remoteAddress',ctx.req.connection.remoteAddress);
  next();
});

app.remotes().before('*.prototype.*', function(ctx,instance,next) {
  loopback.getCurrentContext().set('remoteAddress',ctx.req.connection.remoteAddress);
  next();
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
