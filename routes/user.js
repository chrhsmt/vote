
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.id = function(req, res) {
	res.send("id:" + req.params.id);
	console.log("id:" + req.params.id);
}