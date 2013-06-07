// Ti.App.Properties.removeProperty("activeTemplates");
// Setup persistence for downloaded forms (The only time these are null is on the first launch of the application)
if (Ti.App.Properties.getList("activeTemplates") == null) {
	Ti.App.Properties.setList("activeTemplates", []);
}

if (Ti.App.Properties.getList("completedForms") == null) {
	Ti.App.Properties.setList("completedForms", []);
}

if (Ti.App.Properties.getList("settings") == null) {
	Ti.App.Properties.setList("settings", []);
}

if (Ti.App.Properties.getInt("TDP_INCREMENT") == null) {
	Ti.App.Properties.setInt("TDP_INCREMENT", 0);
}

// open index window
Ti.App.fireEvent('populateTemplates');
$.index.open();

// Hand written JSON's
//var data = '[{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"3","record_status_rowid_fk":"1","record_status":"Active","name":"Example Text Field","description":"Example public form with a single field for text data entry.  The world\'s simplest form.","timestamp_loaded_utc":"2013-05-13T17:07:17.443235+00:00","timestamp_modified_utc":"2013-05-13T17:07:17.443235+00:00"},{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"1","record_status_rowid_fk":"1","record_status":"Active","name":"Example Soil Sample Card","description":"Example public sample card to collect soil data.","timestamp_loaded_utc":"2013-04-13T02:27:21.837183+00:00","timestamp_modified_utc":"2013-04-13T02:27:21.837183+00:00"}]';
//var templateFromJSON = JSON.parse('{ "rowid": 3, "name": "Single Text Field", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }');
//var giantTemplate = '{ "rowid": 3, "name": "Test Form", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }'
	