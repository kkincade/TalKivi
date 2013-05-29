function initialize() {
	
}


Ti.App.addEventListener('populateTemplates', function() {
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
			backgroundSelectedColor: 'gray'
		});
		
		if (OS_ANDROID) {
			singleTemplate.label.color = 'white';
			singleTemplate.backgroundColor = 'black';
			singleTemplate.hasChild = true;
		}
		
		// Load singe template into array
		singleTemplate.add(label);
		templates.push(singleTemplate);		
	}

	// Load templates into TableView
	$.templatesTableView.data = templates;
	$.templatesTableView.editable = true;
	$.templatesTableView.moveable = true;
});


// Creates a newForm window when a form is clicked
$.templatesTableView.addEventListener('click', function(event) {
	Ti.App.Properties.setString("formNameParameter", event.rowData.label.text);
	var controller = Alloy.createController('newForm').getView();
	$.formsTab.open(controller);
});


// IOS event listener for delete button on iOS when deleting forms
$.templatesTableView.addEventListener('delete', function(event) {
	deleteTemplate(event);
});


// ANDROID event listener for deleting rows (forms)
$.templatesTableView.addEventListener('longpress', function(event) {
	if (OS_ANDROID) {
		// If they long press on a row, create an alert dialog asking if they want to delete the form
		if (event.rowData != null) {
			var dialog = Ti.UI.createAlertDialog({ message: "Delete " + event.rowData.label.text + "?", buttonNames: ['Delete', 'Cancel'] });
			
			dialog.addEventListener('click', function(e) {
				if (e.index == 0) { // Delete
					deleteTemplate(event);
					Ti.App.fireEvent('populateTemplates');
				} else {
					// Do nothing
				}	
			});
			
			dialog.show();
		}
	}
});


function deleteTemplate(event) {
	var templates = Ti.App.Properties.getList("activeTemplates");
	templates.splice(templates.indexOf(event.rowData.label.text), 1);
	Ti.App.Properties.setList("activeTemplates", templates);
	Ti.API.info(Ti.App.Properties.getList("activeTemplates"));
	
}


function addTemplatesButtonClicked() {
	$.downloadForms = Alloy.createController('downloadForms');
}


function editTemplatesButtonClicked() {
	// Android is handled through long presses
	if (OS_IOS) {
		// If we are currently editing, change it to not editing
		if ($.templatesTableView.editing) {
			$.editTemplatesButton.title = "Edit";
			$.addTemplatesButton.enabled = true;
			$.templatesTableView.editing = false;
		// If we aren't editing and there are forms to delete
		} else if ($.templatesTableView.sections.length > 0) {
			$.editTemplatesButton.title = "Done";
			$.addTemplatesButton.enabled = false;
			$.templatesTableView.editing = true;
		}
	}
}