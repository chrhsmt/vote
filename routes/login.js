
exports.login = function(req, res) {
	req.session.isLogin = true;
	res.redirect('/');
}

exports.logout = function(req, res) {
	req.session.isLogin = false;
	res.redirect('/');
}