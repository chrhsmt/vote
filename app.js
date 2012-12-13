
/**
 * Module dependencies.
 */

var express = require('express')
  , expressLayouts = require('express-ejs-layouts')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , routes = require('./routes')
  , about = require('./routes/about')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , election = require('./routes/election')
  , issue = require('./routes/issue')
  , candidate = require('./routes/candidate')
  , constituency = require('./routes/constituency')
  , opinion = require('./routes/opinion')
  , http = require('http')
  , path = require('path')
  , domain = require('domain')
  , dateFormat = require('dateformat')
  , RadisStore = require('connect-redis')(express)
  , electionDao = require('./dao/electionDao')
  , userDao = require('./dao/userDao')
  , config = require('./config');

var d = domain.create();

d.run(function(){
	var app = module.exports = express();

	app.configure(function(){

	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'ejs');
	  app.set('layout', 'layout');
	  app.use(expressLayouts);
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.compress());
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser('your secret here'));
	  app.use(express.session({
		  store: new RadisStore({db: 1, prefix: 'session:'}) // add Object {host: host, port: port, pass: pass}
	  }));
	  app.use(passport.initialize());
	  app.use(passport.session());
	  addCommonComponent(app);

	  app.use(express.compress({
		  level:4
	  }));
	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'public')));

	  app.use(function(err, req, res, next){
		  console.error(err.stack);
		  res.render('error');
		});

	  // helper and application settings
	  app.locals({
		title : 'The Vote',
		dateFormat: dateFormat
	  });
	  
	});

	app.configure('development', function(){
		console.log('development mode init.');
	  app.use(express.errorHandler());
	});

	app.configure('production', function(){
		console.log('production mode init.');
	});

	// validation
	app.param('candidateId', function(req, res, next, id) {
		console.log("candidateId :" + id);
		next();
	});

	app.get('/', routes.index);
	app.get('/about', about.index);
	app.get('/users', user.list);
	app.get('/user/:id', user.id);
//	app.get('/login', login.login);
	app.get('/logout', login.logout);
	app.get('/issue/new', issue.add);
	app.post('/issue/new', issue.add);
	app.get('/candidate/new', candidate.add);
	app.post('/candidate/new', candidate.add);
	app.get('/candidate/:candidateId?', candidate.id);
	app.post('/candidate/:candidateId', candidate.update);
	app.get('/election/:electionId?', election.index);
	app.get('/election/:electionId/edit', election.detail);
	app.get('/election/:electionId/constituency/:constituencyId', constituency.index);
	app.post('/election/:electionId/constituency/:constituencyId/addCandidate', constituency.addCandidate);
	app.post('/election/:electionId/constituency/:constituencyId/addIssue', constituency.addIssue);
	app.post('/election/:electionId/constituency/:constituencyId/opinion', opinion.regist);
	app.get('/opinion/:opinionId', opinion.index);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	});
	
	// passport
	passport.serializeUser(function(user, done){
	  done(null, user);
	});
	passport.deserializeUser(function(obj, done){
	  done(null, obj);
	});

	//ここからFacebook認証の記述
	var FACEBOOK_APP_ID = "449416221783759"
	var FACEBOOK_APP_SECRET = "11f890fa5fc440281e92e18555f92ba6";
	passport.use(new FacebookStrategy({
	  clientID: FACEBOOK_APP_ID,
	  clientSecret: FACEBOOK_APP_SECRET,
	  callbackURL: config.oauth.redirectUrl
	  },
	  function(accessToken, refreshToken, profile, done){
//		  console.log('accessToken:' + accessToken);
		  passport.session.accessToken = accessToken;
		  process.nextTick(function(){
			  done(null ,profile);
	      });
	  }
	));

	//認証チェック
	app.get('/account/facebook', facebookEnsureAuthenticated, function(){
		console.log('account');
	});

	//facebookで認証
	app.get('/auth/facebook', passport.authenticate('facebook'));
	//認証後のcallback
	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/' }),
	  function(req, res) {
		userDao.exist(
				userDao.OAUTH_TYPES.FACEBOOK,
				req.session.passport.user.id,
				function(exist) {
					console.log("exist:" + exist);
					if (exist) {
						userDao.updateLastLoginDate(
								userDao.OAUTH_TYPES.FACEBOOK,
								req.session.passport.user.id,
								doLogin);
					} else {
						userDao.regist(
								userDao.OAUTH_TYPES.FACEBOOK,
								req.session.passport.user.id,
								doLogin);
					}
					function doLogin() {
						login.login(req, res);
					}
				});
	  }
	);

	app.get('/logout/facebook', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	function facebookEnsureAuthenticated(req, res, next) {
		console.log('facebookEnsureAuthenticated');
		if (req.isAuthenticated()) {
			console.log('auth done');
			return next();
		} else {
			console.log('auth not yet');
		}
		res.redirect('/login');
	};

});

d.on('error', function(e) {
	console.log('unexpected servere error', e.stack);
});

// 共通処理
function addCommonComponent(app) {
	app.use(function(req, res, next) {
		console.log("addCommonComponent");

		var isLogin = (req.session.passport.user != null);		
//		for (x in req.session.passport.user) {
//			console.log(x + ' : ' + req.session.passport.user[x]);
//		}
//		for (x in req.header) {
//			console.log("kkkkk:" + x);
//		}
		var electionId = 1;
		if (req.param.id) {
			//最新を取得？
		}
		electionDao.getAllElections(function(rows) {
			res.locals({
				isLogin: isLogin,
				user: req.session.passport.user,
		      	electionId: electionId,
				electionList : rows
				});
			next();
		});
	});
}
