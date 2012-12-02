
var candidateDao = require('../dao/candidateDao.js');

exports.id = function(req, res) {
    res.render('candidate', {
    	candidate : candidateDao.getById(req.params.candidateId)
    	});
};