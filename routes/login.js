var userDao = require('../dao/userDao');

exports.login = function(req, res) {
	userDao.get(
			userDao.OAUTH_TYPES.FACEBOOK,
			req.session.passport.user.id,
			function(user) {
				req.session.user = user;
				req.session.isLogin = true;
			    res.redirect('/');
			});
}

exports.logout = function(req, res) {
    req.logout();
	res.redirect('/');
}