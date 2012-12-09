var async = require('async');
var issueDao = require('../dao/issueDao');

exports.add = function(req, res) {
	if (req.method == "POST") {
		req.body.userId = req.session.user.user_id;
		issueDao.insert(req.body, function(rows) {
		    res.render('issue', {
		    	issue : req.body
		    	});
		})
	} else {
	    res.render('issue', {
	    	issue : {
	    		issue_id: 'new',
	    		title:'',
	    		description:''
	    	}
    	});
	}}