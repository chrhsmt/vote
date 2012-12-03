
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , candidate = require('./routes/candidate')
  , http = require('http')
  , path = require('path')
  , domain = require('domain')
  , expressLayouts = require('express-ejs-layouts')
  , RadisStore = require('connect-redis')(express)
  , electionDao = require('./dao/electionDao');

var d = domain.create();

d.run(function(){
	var app = express();

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
	app.get('/users', user.list);
	app.get('/user/:id', user.id);
	app.get('/candidate/:candidateId', candidate.id)

	http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	});
	
	var connection = require('./lib/connection');
	connection.select("select * from test.m_test where id = :id", {id:1}, function(rows) {
		for (i in rows) {
			console.log("test:" + rows[i]["id"]);
		}
	});
});

d.on('error', function(e) {
	console.log('unexpected servere error', e.stack);
});

// 共通処理
function addCommonComponent(app) {
	app.use(function(req, res, next) {
		console.log("addCommonComponent");

		var electionId = 0;
		if (req.param.id) {
			//最新を取得？
		}
		
		res.locals({
			title : 'The Vote',
	      	electionId: electionId,
			electionList : electionDao.getElectionList()
			});
		next();
	});
}