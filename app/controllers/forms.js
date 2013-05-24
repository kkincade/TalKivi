

function initialize() {
	alert("opened forms tab");
	var giantTemplate = '{ "rowid": 3, "name": "Test Form", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }'
	
	$.templatesTableView.moveable = true; //Try this later once we can select forms

	populateTemplates();
}


Ti.App.addEventListener('populateTemplates', function(){
	alert("Fire Away!");
	var activeTemplates = Ti.App.Properties.getList("activeTemplates");
	var templates = [];
	
	for (var i = 0; i < activeTemplates.length; ++i) {
		// Create Label
		var label = Ti.UI.createLabel({
			id: i,
			text: activeTemplates[i],
			color: 'black'
		});
		
		// Create template
		var singleTemplate = Ti.UI.createTableViewRow({
			id: i,
			label: label,
			height: '40dp',
			backgroundColor: 'white',
			hasDetail: true,
			selectedBackgroundColor: 'gray'
		});
		
		singleTemplate.add(label);
		
		// Load singe template into array
		templates.push(singleTemplate);		
	}

	// Load templates into TableView
	$.templatesTableView.data = templates;
});


function addTemplatesButtonClicked() {
	$.downloadForms = Alloy.createController('downloadForms');
	alert("Done adding...");
	//populateTemplates();
}


function editTemplatesButtonClicked() {
	// If we aren't currently editing...
	if ($.templatesTableView.editing) {
		$.templatesTableView.editing = false;
		$.addTemplatesButton.enabled = true;
	// If we are editing and there are forms to delete
	} else if ($.templatesTableView.sections.length > 0) {
		$.templatesTableView.editing = true;
		$.addTemplatesButton.enabled = false;
	}
}