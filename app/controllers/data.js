loadFormsIntoList();
$.mapView.visible = false;

// iOS
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
	
// Android
} else {
	var spacer = Math.round(Ti.Platform.displayCaps.platformWidth*0.5);
	var width = spacer-4;
	var height = 36;
	 
	var win = Ti.UI.createWindow({
	    backgroundColor:'#FFF'
	});
 
	// TAB BAR
	var tabBar = Ti.UI.createView({
	    width:Ti.Platform.displayCaps.platformWidth,
	    height:40,
	    left:0,
	    bottom:0,
	    backgroundColor:'transparent'
	});
	$.dataWindow.add(tabBar);
	// TAB 1
	var tab1 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:2,
	    bottom:2,
	    backgroundColor:'#333',
	    borderRadius:2
	});
	var tab1Label = Ti.UI.createLabel({
	    text:'List View',
	    color:'#FFF'
	});
	tab1.add(tab1Label);
	$.dataWindow.add(tab1);
	// TAB 2
	var tab2 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:spacer,
	    bottom:2,
	    backgroundColor:'#000'
	});
	var tab2Label = Ti.UI.createLabel({
	    text:'Map View',
	    color:'#777'
	});
	tab2.add(tab2Label);
	$.dataWindow.add(tab2);
	 
	var currTab = tab1;
	 
	// ADD EVENT LISTENERS
	tab1.addEventListener('click',function() {
		if (currTab != this) {
		    currTab.backgroundColor = '#000';
		    currTab.children[0].color = '#777';
		    this.backgroundColor = '#333';
		    this.children[0].color = '#FFF';
		    currTab = this;
		    toggleView();
	    }
	});
	tab2.addEventListener('click',function() {
		if (currTab != this) {
		    currTab.backgroundColor = '#000';
		    currTab.children[0].color = '#777';
		    this.backgroundColor = '#333';
		    this.children[0].color = '#FFF';
		    currTab = this;
		    toggleView();
	    }
	});
}


function toggleView() {
	if ($.mapView.visible) {
		$.completedFormsTableView.visible = true;
		$.mapView.visible = false;
	} else {
		$.completedFormsTableView.visible = false;
		$.mapView.visible = true;
	}
}


// Creates an editForm window when a form is clicked
$.completedFormsTableView.addEventListener('click', function(event) {
	var controller = Alloy.createController('editForm', { formID: event.rowData.label.text }).getView();
	$.dataTab.open(controller);
});


function loadFormsIntoList() {
	Ti.API.info("INNNNNN");
	var completedForms = Ti.App.Properties.getList("completedForms");
	Ti.API.info(completedForms);
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
			backgroundSelectedColor: 'gray',
			className: "someTableViewRow"
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


// IOS event listener for delete button on iOS when deleting forms
$.completedFormsTableView.addEventListener('delete', function(event) {
	deleteForm(event);
	loadFormsIntoList();
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