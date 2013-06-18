// exports
exports.uploadForm = uploadForm;

// Set interval completes a function call ever so often (specified in the second parameter in ms)
setInterval(function() {
	// Loop over the completed forms, check their synced value, sync if false
	var completedForms = Ti.App.Properties.getList("completedForms");
	
	for (var i = 0; i < completedForms.length; i++) {
		var completedForm = Ti.App.Properties.getObject(completedForms[i]);
		if (completedForm.synced === false) {
			uploadForm(completedForm.TDP_id);
		}
	}
}, 20000);



var uploadClient = Ti.Network.createHTTPClient();

function uploadForm(formID) { 
	var form = Ti.App.Properties.getObject(formID);
	var originalForm = Ti.App.Properties.getObject(form.formName);
	var data = [];
	
	var formToUpload = {
		username: "bkrzys",
		password: "4bf48943fe5822e46e709d2dfdeeb8ed",
		record_uuid: "8A5921AA-C12B-4EA7-A737-4AA1121542E1",
		form_rowid: originalForm.rowid
	}
	
	talkiviFormItemSet = originalForm.talkiviFormItemSet;
	
	for (var i = 0; i < talkiviFormItemSet.length; i++) {
		var newField = {
			field_rowid: talkiviFormItemSet[i].talkiviField.rowid,
			field_type_rowid: talkiviFormItemSet[i].talkiviField.field_type_rowid_fk,
			name: talkiviFormItemSet[i].talkiviField.name
		}
		
		if (talkiviFormItemSet[i].field_type == "Location") {
			newField.latitude = form.fields[i].latitude;
			newField.longitude = form.fields[i].longitude;
			newField.elevation = form.fields[i].elevation;
		} else {
			newField.value = form.fields[i];
		}
		
		data.push(newField);
	}
	
	formToUpload.data = data;
	
	Ti.API.info(JSON.stringify(formToUpload));
	 
    uploadClient.open("POST", "http://www.talkivi.org/talkivi-server/upload.php");
    uploadClient.send(formToUpload); // Calls the onload function
    
    uploadClient.onload = function() {
		if (JSON.parse(this.responseText).status == "Success") {
			Ti.API.info("Synced data");
			form.synced = true;
			Ti.App.Properties.setObject(formID, form);
		}
	};
}