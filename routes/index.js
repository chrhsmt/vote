
/*
 * GET home page.
 */
var async = require('async');
var electionDao = require('../dao/electionDao');
var candidateDao = require('../dao/candidateDao');

exports.index = function(req, res, next){
    res.render('index', {
  	});
};