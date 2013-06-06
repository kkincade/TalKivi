//Ti.Network.online  boolean value (true means they have connection)
$.dataListWindow.open();
loadFormsIntoList();

function loadFormsIntoList() {
	var completedForms = Ti.App.Properties.getList("completedForms");
	var formsToDisplay = []
	
	for (var i = 0; i < completedForms.length; ++i) {
		// Create Label
		var label = Ti.UI.createLabel({
			id: i,
			text: completedForms[i],
			color: 'black'
		});
		
		// Create template
		var formTableViewRow = Ti.UI.createTableViewRow({
			id: i,
			label: label,
			height: '40dp',
			backgroundColor: 'white',
			hasDetail: true,
			backgroundSelectedColor: 'gray'
		});
		
		if (OS_ANDROID) {
			formTableViewRow.label.color = 'white';
			formTableViewRow.backgroundColor = 'black';
			formTableViewRow.hasChild = true;
		}
		// Load singe template into array
		formTableViewRow.add(label);
		formsToDisplay.push(formTableViewRow);		
	}
	// Load templates into TableView
	$.completedFormsTableView.data = formsToDisplay;
	$.completedFormsTableView.editable = true;
	$.completedFormsTableView.moveable = true;
}


// ANDROID event listener for deleting rows (forms)
$.completedFormsTableView.addEventListener('longpress', function(event) {
	if (OS_ANDROID) {
		// If they long press on a row, create an alert dialog asking if they want to delete the form
		if (event.rowData != null) {
			var dialog = Ti.UI.createAlertDialog({ message: "Delete " + event.rowData.label.text + "?", buttonNames: ['Delete', 'Cancel'] });
			
			dialog.addEventListener('click', function(e) {
				if (e.index == 0) { // Delete
					deleteForm(event);
					loadFormsIntoList();
				} else {
					// Do nothing
				}	
			});
			dialog.show();
		}
	}
});


// Deletes a completed form from local persistence
function deleteForm(event) {
	var forms = Ti.App.Properties.getList("completedForms");
	forms.splice(forms.indexOf(event.rowData.label.text), 1);
	Ti.App.Properties.setList("completedForms", forms);
}


function editFormsButtonClicked() {
	// Android is handled through long presses
	if (OS_IOS) {
		// If we are currently editing, change it to not editing
		if ($.completedFormsTableView.editing) {
			$.editFormsButton.title = "Edit";
			$.completedFormsTableView.editing = false;
		// If we aren't editing and there are forms to delete
		} else if ($.completedFormsTableView.sections.length > 0) {
			$.editFormsButton.title = "Done";
			$.completedFromsTableView.editing = true;
		}
	}
}