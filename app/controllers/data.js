//Ti.App.fireEvent('loadFormsIntoList');
loadFormsIntoList();

$.mapView.hide();
$.completedFormsTableView.show();

if (OS_IOS) {
	var tabbedBar = Ti.UI.iOS.createTabbedBar({
		labels: ['List', 'Map'],
		index: 0,
	    top: 50,
	    style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height: 25,
	    width: 150
	});

	tabbedBar.addEventListener('click', function(event) {
		toggleView();
	});
	
	$.dataWindow.setTitleControl(tabbedBar);
}


function toggleView() {
	if ($.mapView.visible) {
		$.completedFormsTableView.show();
		$.mapView.hide();
	} else {
		$.completedFormsTableView.hide();
		$.mapView.show();
	}
}


// Creates an editForm window when a form is clicked
$.completedFormsTableView.addEventListener('click', function(event) {
	Ti.API.info("Parameter " + event.rowData.label.text);
	var controller = Alloy.createController('editForm', { formID: event.rowData.label.text }).getView();
	$.dataTab.open(controller);
});


//Ti.App.addEventListener('loadFormsIntoList', function() {
function loadFormsIntoList() {
	Ti.API.info("INNNNNN");
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
//});


// IOS event listener for delete button on iOS when deleting forms
$.completedFormsTableView.addEventListener('delete', function(event) {
	deleteForm(event);
	loadFormsIntoList();
	//Ti.App.fireEvent('loadFormsIntoList');
});


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
					//Ti.App.fireEvent('loadFormsIntoList');
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
			$.completedFormsTableView.editing = true;
		}
	}
}