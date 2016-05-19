module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {username: 'demo', email: 'demo@becompany.ch', password: 'demo'},
    {username: 'admin', email: 'admin@becompany.ch', password: 'admin'}
  ], function (err, users) {
    if (err) throw err;

    Role.create({
      name: 'admin'
    }, function (err, role) {
      if (err) throw err;

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function (err, principal) {
        if (err) throw err;
      });
    });
  });
};
