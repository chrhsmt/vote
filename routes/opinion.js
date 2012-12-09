var opinionDao = require('../dao/opinionDao');

exports.index = function(req, res) {
	if (req.params.opinionId == "new") {
		render({
			opinion_id: 'new',
			election_id: req.query.electionId,
			constituency_id: req.query.constituencyId,
			candidate_id: req.query.candidateId,
			issue_id: req.query.issueId,
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
	if (req.body.opinionId == 'new') {
		opinionDao.insert(req.body, function(rows) {
			res.redirect('/election/' + req.params.electionId + '/constituency/' + req.params.constituencyId);
		});
	} else {
		opinionDao.update(req.body, function(rows) {
			res.redirect('/election/' + req.params.electionId + '/constituency/' + req.params.constituencyId);
		});
	}
};