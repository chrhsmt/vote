var userDao = require('../dao/userDao');

exports.login = function(req, res) {
	userDao.get(
			userDao.OAUTH_TYPES.FACEBOOK,
			req.session.passport.user.id,
			function(user) {
				req.session.user = user;
				req.session.isLogin = true;
				if (req.session.authRedirect) {
					res.redirect(req.session.authRedirect);
				} else {
				    res.redirect('/');
				}
			});
}

exports.logout = function(req, res) {
	req.session.destroy();
    req.logout();
	res.redirect('/');
}