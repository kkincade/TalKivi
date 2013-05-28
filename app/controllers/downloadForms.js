$.downloadTemplatesWindow.modal = true;
$.downloadTemplatesWindow.open();

var path = Titanium.Filesystem.resourcesDirectory;

// Loads templates for download immediately upon loading the view
loadTemplates();


//Callback method for done button
function doneButtonClicked() {
	$.downloadTemplatesWindow.close();
	Ti.App.fireEvent('populateTemplates');
}

// Android uses the back button instead of the done button
$.downloadTemplatesWindow.addEventListener('androidback', function(event) { 
	$.downloadTemplatesWindow.close();
	Ti.App.fireEvent('populateTemplates');
});


// Creates an HTTP client, retrieves templates from JSON, and displays list of forms available for download
function loadTemplates() {

	var HTTP_CLIENT = Ti.Network.createHTTPClient();
	
	// Onload gets called once the client is opened
	HTTP_CLIENT.onload = function() { 
		// Store fetched data into parsed array
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
				backgroundSelectedColor: 'gray',
				rowID: templatesFromJSON[i].rowid
			});
			
			if (OS_ANDROID) {
				$.downloadTemplatesWindow.backgroundColor = 'black';
				singleTemplate.label.color = 'white';
				singleTemplate.backgroundColor = 'black';
				singleTemplate.rightImage = path + 'plus_icon_android.png';
			}

			// Checks if they already have downloaded the template
			if (Ti.App.Properties.getList("activeTemplates").indexOf(templatesFromJSON[i].name) != -1) {
				label.color = 'gray';
				singleTemplate.selectedColor = 'white';
				singleTemplate.backgroundSelectedColor = 'white';
			}
			
			// Load singe template into array
			singleTemplate.add(label);
			templates.push(singleTemplate);
		}
		// Load templates into TableView
		$.templatesForDownload.data = templates;
	};
	
	// Add eventListener for TableView
	$.templatesForDownload.addEventListener('click', function(event) {
		// If they haven't downloaded the form before
		if (Ti.App.Properties.getList("activeTemplates").indexOf(event.rowData.label.text) == -1) {
			downloadTemplate(event);
			event.rowData.label.color = 'gray';
		} else {
			event.rowData.selectedColor = 'white';
			event.rowData.backgroundSelectedColor = 'white';
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
		var templateFromJSON = JSON.parse(this.responseText);
		
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
