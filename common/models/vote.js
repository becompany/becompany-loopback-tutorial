var loopback = require('loopback');

module.exports = function(Vote) {
  Vote.validatesUniquenessOf('ip', {scopedTo: ['resource']});
  Vote.validatesInclusionOf('value', {in: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]});
  Vote.validatesPresenceOf('surveyId');

  Vote.voteAverage = function(resource, cb) {
    loopback.getCurrentContext().set('skipVoteIpFilter', true);
    Vote.find({where: {resource: resource}}, function (err, votes) {
      loopback.getCurrentContext().set('skipVoteIpFilter', false);
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
  Vote.observe('before save', function (ctx, next) {
    ctx.instance.ip = loopback.getCurrentContext().get('remoteAddress');
    next();
  });
  Vote.observe('access', function (ctx, next) {
    if (!loopback.getCurrentContext().get('skipVoteIpFilter')) {
      if (!ctx.query.where) {
        ctx.query.where = {};
      }
      ctx.query.where.ip = loopback.getCurrentContext().get('remoteAddress');
      console.log('Accessing %s for IP %s', ctx.Model.modelName, ctx.query.where.ip);
    }
    next();
  });
};
