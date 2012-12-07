
/**
 * Module dependencies.
 */

var express = require('express')
  , expressLayouts = require('express-ejs-layouts')
  , routes = require('./routes')
  , about = require('./routes/about')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , election = require('./routes/election')
  , candidate = require('./routes/candidate')
  , constituency = require('./routes/constituency')
  , http = require('http')
  , path = require('path')
  , domain = require('domain')
  , dateFormat = require('dateFormat')
  , RadisStore = require('connect-redis')(express)
  , electionDao = require('./dao/electionDao');

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
	  addCommonComponent(app);

	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'public')));

	  // helper and application settings
	  app.locals({
		title : 'The Vote',
		dateFormat: dateFormat
	  });
	  
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
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
	app.get('/login', login.login);
	app.get('/logout', login.logout);
	app.get('/candidate/:candidateId?', candidate.id)
	app.post('/candidate/:candidateId', candidate.update)
	app.get('/election/:electionId?', election.index)
	app.get('/election/:electionId/edit', election.detail)
	app.get('/election/:electionId/constituency/:constituencyId', constituency.index);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	});
});

d.on('error', function(e) {
	console.log('unexpected servere error', e.stack);
});

// 共通処理
function addCommonComponent(app) {
	app.use(function(req, res, next) {
		console.log("addCommonComponent");

		var isLogin = (req.session.isLogin != undefined && req.session.isLogin == true);
		var electionId = 1;
		if (req.param.id) {
			//最新を取得？
		}
		electionDao.getAllElections(function(rows) {
			res.locals({
				
				isLogin: isLogin,
		      	electionId: electionId,
				electionList : rows
				});
			next();
		});
	});
}
