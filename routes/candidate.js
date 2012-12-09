
var candidateDao = require('../dao/candidateDao.js');

exports.add = function(req, res) {
	if (req.method == "POST") {
		req.body.userId = req.session.user.user_id;
		candidateDao.insert(req.body, function(rows) {
		    res.render('candidate', {
		    	candidate : req.body
		    	});
		})
	} else {
	    res.render('candidate', {
	    	candidate : {
	    		candidate_id: 'new',
	    		name:'',
	    		thumbUrl:'',
	    		description:''
	    	}
    	});
	}
};

exports.id = function(req, res) {
	var showAll = !req.params.candidateId;
	if (showAll) {
		candidateDao.list(null, function(rows) {
		    res.render('candidateList', {
		    	candidates : rows
		    	});
		})
	} else {
		candidateDao.getById(req.params.candidateId, function(rows) {
		    res.render('candidate', {
		    	candidate : rows[0]
		    	});
		})
	}
};

exports.update = function(req, res) {
	req.body.candidate_id = req.params.candidateId;
	req.body.updateUserId = req.session.userId;
	candidateDao.update(req.body, function(rows) {
	    res.render('candidate', {
	    	candidate : req.body
	    	});
	})
};