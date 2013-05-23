$.downloadTemplatesWindow.modal = true;
$.downloadTemplatesWindow.open();

loadTemplates();

//Callback method for done button
function doneButtonClicked() {
	$.downloadTemplatesWindow.close();
}


// Creates an HTTP client, retrieves forms from JSON, and displays list of forms available for download
function loadTemplates() {

	var HTTP_CLIENT = Ti.Network.createHTTPClient();
	
	// Onload gets called once the client is opened
	HTTP_CLIENT.onload = function() { 

		// Store fetched data into parsed array
		//var data = '[{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"3","record_status_rowid_fk":"1","record_status":"Active","name":"Example Text Field","description":"Example public form with a single field for text data entry.  The world\'s simplest form.","timestamp_loaded_utc":"2013-05-13T17:07:17.443235+00:00","timestamp_modified_utc":"2013-05-13T17:07:17.443235+00:00"},{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"1","record_status_rowid_fk":"1","record_status":"Active","name":"Example Soil Sample Card","description":"Example public sample card to collect soil data.","timestamp_loaded_utc":"2013-04-13T02:27:21.837183+00:00","timestamp_modified_utc":"2013-04-13T02:27:21.837183+00:00"}]';
		var templatesFromJSON = JSON.parse(this.responseText);
		
		var templates = []
		// For each object (form) in JSON...
		for (var i = 0; i < templatesFromJSON.length; ++i) {
			// Create template
			var singleTemplate = Ti.UI.createTableViewRow({
				id: i,
				height: '40dp',
				backgroundColor: 'white',
				rightImage: 'plus_icon.png',
				selectedBackgroundColor: 'gray',
				rowID: templatesFromJSON[i].rowid
				//selectionStyle: 'none'
			});
			
			// Add label to the template
			var form = Ti.UI.createLabel({
				text: templatesFromJSON[i].name
			});
			
			singleTemplate.add(form);
			
			// Load singe template into array
			templates.push(singleTemplate);
		}
		
		// Load templates into TableView
		$.templatesForDownload.data = templates;
	};
	
	// Add eventListener for TableView
	$.templatesForDownload.addEventListener('click', function(e) {
	    downloadTemplate(e);
	});

	var formsAPI = 'http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON';
	HTTP_CLIENT.open("POST", formsAPI);
	HTTP_CLIENT.send();
}


// When a template is selected,
function downloadTemplate(event) {
	alert(event.rowData.rowID);
}
