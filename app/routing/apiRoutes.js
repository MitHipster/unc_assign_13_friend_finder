var friendsData = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  app.post('/api/friends', function (req, res) {
    friendsData.push(req.body);
    res.json(findFriend(friendsData));
  });
};

function findFriend (data) {
  var diffArr = [];
  var userScores = data[data.length - 1].scores;
  for (var i = 0; i < data.length - 1; i++) {
    var scores = data[i].scores;
    var diff = 0;
    for (var s = 0; s < scores.length; s++) {
      diff += Math.abs(parseInt(userScores[s]) - parseInt(scores[s]));
    }
    diffArr.push(diff);
  }
  var match = diffArr.indexOf(Math.min.apply(null, diffArr));
  var name = data[match].name;
  var photo = data[match].photo;
  return {"name": name, "photo": photo};
}
