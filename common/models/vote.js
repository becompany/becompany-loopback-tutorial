module.exports = function(Vote) {
  Vote.validatesUniquenessOf('ip', {scopedTo: ['resource']});
  Vote.validatesPresenceOf('surveyId');

  Vote.voteAverage = function(resource, cb) {
    Vote.find({where: {resource: resource}}, function (err, votes) {
      var response = 0;
      votes.forEach(function (vote) {
        response += vote.value;
      });
      if (response) {
        response = response / votes.length;
      }
      cb(null, response);
    });
  };
  Vote.remoteMethod(
    'voteAverage',
    {
      http: {path: '/voteAverage', verb: 'get'},
      accepts: {arg: 'resource', type: 'string', http: {source :'query'}},
      returns: {arg: 'voteAverage', type: 'numeric'}
    }
  );
};
