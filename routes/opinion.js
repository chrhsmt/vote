var opinionDao = require('../dao/opinionDao');

exports.index = function(req, res) {
	if (req.params.opinionId == "new") {
		render({
			opinion_id: 'new',
			text: ''
				});
	} else {
		opinionDao.get(req.params.opinionId, function(rows) {
			render(rows[0]);
		});
	}
	function render(opinion) {
		module.parent.exports.set('layout', false);
		res.render(
				'opinion',
				{
					opinion: opinion
				},
				function(err, html) {
					module.parent.exports.set('layout', 'layout');
					if (!err) res.send(html);
				});
	}
}

exports.regist = function(req, res) {
	req.body.userId = req.session.user.user_id;
	if (req.body.opinion_id == 'new') {
		
	} else {
		
	}
	constituencyDao.addIssue(req.body, function() {
		res.redirect('/election/' + req.body.electionId + '/constituency/' + req.body.constituencyId);
	});
};