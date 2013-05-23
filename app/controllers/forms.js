


function addFormsButtonClicked() {
	$.downloadForms = Alloy.createController('downloadForms');
	$.forms.add($.downloadForms.getView());
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

function testAPI() {

	var HTTP_CLIENT = Ti.Network.createHTTPClient();

	HTTP_CLIENT.onload = function() {

		// Store fetched data into parsed array
		//var data = '[{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"3","record_status_rowid_fk":"1","record_status":"Active","name":"Example Text Field","description":"Example public form with a single field for text data entry.  The world\'s simplest form.","timestamp_loaded_utc":"2013-05-13T17:07:17.443235+00:00","timestamp_modified_utc":"2013-05-13T17:07:17.443235+00:00"},{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"1","record_status_rowid_fk":"1","record_status":"Active","name":"Example Soil Sample Card","description":"Example public sample card to collect soil data.","timestamp_loaded_utc":"2013-04-13T02:27:21.837183+00:00","timestamp_modified_utc":"2013-04-13T02:27:21.837183+00:00"}]';
		var formTypes = JSON.parse(this.responseText);
		
		var tableViewData = []
		for (var i = 0; i < formTypes.length; ++i) {
			// create row
			var formsTableViewRow = Ti.UI.createTableViewRow({
				height: '40dp',
				backgroundColor: 'lime'
			});
			
			$.formsTableView.editable = true;
			
			var form = Ti.UI.createLabel({
				text: formTypes[i].name
			});
			
			formsTableViewRow.add(form);
			
			tableViewData.push(formsTableViewRow);
		}
		
		$.formsTableView.data = tableViewData;
	};

	var formsAPI = 'http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON';
	HTTP_CLIENT.open("POST", formsAPI);
	HTTP_CLIENT.send();
}


