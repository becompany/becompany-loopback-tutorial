module.exports = function(Vote) {
  Vote.validatesUniquenessOf('ip', {scopedTo: ['resource']});
};
