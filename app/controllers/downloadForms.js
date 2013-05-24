$.downloadTemplatesWindow.modal = true;
$.downloadTemplatesWindow.open();

// Called immediately upon loading the view
loadTemplates();


//Callback method for done button
function doneButtonClicked() {
	$.downloadTemplatesWindow.close();
	Ti.App.fireEvent('populateTemplates');
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
			// Create Label
			var label = Ti.UI.createLabel({
				id: i,
				text: templatesFromJSON[i].name,
				color: 'black'
			});
			
			// Create template
			var singleTemplate = Ti.UI.createTableViewRow({
				id: i,
				label: label,
				height: '40dp',
				backgroundColor: 'white',
				rightImage: 'plus_icon.png',
				selectedBackgroundColor: 'gray',
				rowID: templatesFromJSON[i].rowid
			});

			// Checks if they already have downloaded the template
			if (Ti.App.Properties.getList("activeTemplates").indexOf(templatesFromJSON[i].name) != -1) {
				label.color = 'gray';
				singleTemplate.selectedColor = 'white';
				singleTemplate.selectedBackgroundColor = 'white';
			}
			
			singleTemplate.add(label);
			
			// Load singe template into array
			templates.push(singleTemplate);
		}
		// Load templates into TableView
		$.templatesForDownload.data = templates;
	};
	
	// Add eventListener for TableView
	$.templatesForDownload.addEventListener('click', function(event) {
		// If they haven't downloaded the form before
		if (Ti.App.Properties.getList("activeTemplates").indexOf(event.rowData.label.text) == -1) {
			event.rowData.label.color = 'gray';
			event.rowData.selectedColor = 'white';
			event.rowData.selectedBackgroundColor = 'white';
			downloadTemplate(event);
		}
	});

	var templatesAPI = 'http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON';
	HTTP_CLIENT.open("POST", templatesAPI);
	HTTP_CLIENT.send();
}


// When a template is selected,
function downloadTemplate(event) {
	
	var HTTP_CLIENT = Ti.Network.createHTTPClient();
	
	// Onload gets called once the client is opened
	HTTP_CLIENT.onload = function() { 
		//var templateFromJSON = JSON.parse(this.responseText);
		var templateFromJSON = JSON.parse('{ "rowid": 3, "name": "Single Text Field", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }');

		// Storing the template into properties for local persistence
		Ti.App.Properties.setObject(templateFromJSON.name, templateFromJSON);
		var tempTemplates = Ti.App.Properties.getList("activeTemplates");
		tempTemplates.push(templateFromJSON.name);
		Ti.App.Properties.setList("activeTemplates", tempTemplates);
		
		Ti.API.info(Ti.App.Properties.getList("activeTemplates"));
	}
	
	
	var templateAPI = 'http://www.talkivi.org/talkivi-server/ws/form?rowid=' + event.rowData.rowID + '&format=JSON';
	HTTP_CLIENT.open("POST", templateAPI);
	HTTP_CLIENT.send();
}
