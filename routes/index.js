var config = require('../config');
var uploadHelper = require('./uploadHelper');

exports.index = function(req, res){
	res.render('index', {title:'File Upload', message:''});
};

exports.doUpload = function(req,res){
	var result = uploadHelper.doUpload(req, config.uploadPath);
	
	if (result.success == true) {
		var message = "File uploaded: " + result.fileName;
	} else {
		var message = "Error in uploading file: " + result.fileName + ". Try again";
	}
	
	res.render('index', {title:'File Upload', message:message});
};
