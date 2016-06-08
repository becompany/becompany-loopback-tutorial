module.exports = function(app) {
  app.get('/browser-sync/browser-sync-client.2.12.10.js', function(req, res) {
    res.redirect('/node_modules/browser-sync-client/dist/index.js')
  });
}
