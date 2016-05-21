module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var Survey = app.models.Survey;
  var Resource = app.models.Resource;
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

  Survey.create([
    {"topic": "fruit"},
    {"topic": "color"}
  ], function (err, surveys) {
    if (err) throw err;

    Resource.create([
      {"name": "apple", "surveyId": surveys[0].id},
      {"name": "watermelon", "surveyId": surveys[0].id},
      {"name": "banana", "surveyId": surveys[0].id},
      {"name": "kiwi", "surveyId": surveys[0].id}
    ], function (err, fruits) {
      if (err) throw err;
    });

    Resource.create([
      {"name": "green", "surveyId": surveys[1].id},
      {"name": "yellow", "surveyId": surveys[1].id},
      {"name": "purple", "surveyId": surveys[1].id},
      {"name": "red", "surveyId": surveys[1].id}
    ], function (err, fruits) {
      if (err) throw err;
    })
  })

};
