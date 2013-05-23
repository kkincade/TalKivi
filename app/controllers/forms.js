
var giantTemplate = '{ "rowid": 3, "name": "Test Form", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }'

$.formsTableView.moveable = true; //Try this later once we can select forms


function addFormsButtonClicked() {
	$.downloadForms = Alloy.createController('downloadForms');
}


function editFormsButtonClicked() {
	// If we aren't currently editing...
	if ($.formsTableView.editing) {
		$.formsTableView.editing = false;
		$.addFormButton.enabled = true;
	// If we are editing and there are forms to delete
	} else if ($.formsTableView.sections.length > 0) {
		$.formsTableView.editing = true;
		$.addFormButton.enabled = false;
	}
}