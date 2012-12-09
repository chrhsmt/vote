var connection = require('../lib/connection');

exports.OAUTH_TYPES = {
		FACEBOOK: 1
}

exports.get = function(oautType, authId, callback) {
	var sql = "select * from m_user where oauth_type = :oauthType and auth_id = :authId";
	connection.select(sql, {oauthType: oautType, authId:authId}, function(rows) {
		if (callback) callback(rows[0]);
	});
};

exports.exist = function(oautType, authId, callback) {
	var sql = "select count(*) as count from m_user where oauth_type = :oauthType and auth_id = :authId";
	connection.select(sql, {oauthType: oautType, authId:authId}, function(rows) {
		if (callback) callback(rows[0].count > 0 );
	});
};

exports.regist = function(oautType, authId, callback) {
	var sql = "insert into m_user select ifnull(max(user_id), 0) + 1, :oauthType, :authId, now(), now() from m_user";
	connection.insert(sql, {oauthType: oautType, authId:authId}, function(rows) {
		if (callback) callback(rows);
	});
};

exports.updateLastLoginDate = function(oautType, authId, callback) {
	var sql = "update m_user set last_login_date = now() where oauth_type = :oauthType and auth_id = :authId";
	connection.update(sql, {oauthType: oautType, authId:authId}, function(rows) {
		if (callback) callback(rows);
	});
};
