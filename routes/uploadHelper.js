var fs = require("fs");
var util = require('util');

/**
*  do upload
*/
function doUpload(req, uploadPath) {
	var result = {success:false, fileName:''};
	
	var uploadFile = req.files.uploadFile;
	req.setEncoding("binary");
	var serverPath = uploadPath + uploadFile.name;
	result.fileName = uploadFile.name;
	
	var is = fs.createReadStream(uploadFile.path)
	var os = fs.createWriteStream(serverPath);

	util.pump(is, os, function(error) {
		fs.unlinkSync(uploadFile.path);
		if(error) {
			console.log("ERROR: in file upload.");
			return;
		}
		console.log("File uploaded: %s", uploadFile.name);
		result.success = true;
	});
	
	return result;
}

// Export required methods
exports.doUpload = doUpload;
