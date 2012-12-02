
/*
 * GET home page.
 */
var async = require('async');

var electionDao = require('../dao/electionDao');
var candidateDao = require('../dao/candidateDao');
var issueDao = require('../dao/issueDao');

exports.index = function(req, res, next){

	console.log("====0");
	async.parallel([
	              function(callback) {
	            	  console.log("----1")
	            	  callback();
	              },
	              function(callback) {
	            	  console.log("-----2")
	            	  callback();
	              }
	              ],
	              function(err, result) {
				  	  console.log("-----3")
				  	// 最終的なcallback内でレンダリング処理を。
				      res.render('index', {
				      	candidates: candidateDao.getCandidates(),
				      	issues: issueDao.getIssues()
				      	});
				    console.log("end sending response")
			    });
	console.log("====end");
};