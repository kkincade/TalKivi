$.mapView.visible = false;

// Moving map upwards to make space for zoom in out buttons
if (OS_ANDROID) {
	$.mapView.bottom = '55dp';
	$.dataTab.icon = "globe_android.png";
}


$.dataTab.addEventListener('focus', function(event) {
	loadFormsIntoList();
	plotPointsOnMap();
});


// iOS
if (OS_IOS) {
	var tabbedBar = Ti.UI.iOS.createTabbedBar({
		labels: ['List', 'Map'],
		index: '0dp',
	    top: '50dp',
	    style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height: '25dp',
	    width: '150dp'
	});

	tabbedBar.addEventListener('click', function(event) {
		toggleView();
	});
	
	$.dataWindow.setTitleControl(tabbedBar);
	
// Android
} else {
	var spacer = Math.round(Ti.Platform.displayCaps.platformWidth*0.5);
	var height = Math.round(Ti.Platform.displayCaps.platformHeight*0.055); // 1/20th-ish the height of the screen
	var width = spacer-4;
	
 
	// TAB BAR
	var tabBar = Ti.UI.createView({
	    width: Ti.Platform.displayCaps.platformWidth,
	    height: height,
	    left: '0dp',
	    bottom: '0dp',
	    backgroundColor: 'transparent'
	});
	$.dataWindow.add(tabBar);
	
	// List View Tab
	var listViewTab = Ti.UI.createView({
	    width: width,
	    height: height,
	    left: '2dp',
	    bottom: '2dp',
	    backgroundColor:'#333',
	    borderRadius: '2dp'
	});
	var listViewTabLabel = Ti.UI.createLabel({
	    text:'List View',
	    color:'#FFF'
	});
	listViewTab.add(listViewTabLabel);
	$.dataWindow.add(listViewTab);
	
	// Map View Tab
	var mapViewTab = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:spacer,
	    bottom: '2dp',
	    backgroundColor:'#000'
	});
	var mapViewTabLabel = Ti.UI.createLabel({
	    text:'Map View',
	    color:'#777'
	});
	mapViewTab.add(mapViewTabLabel);
	$.dataWindow.add(mapViewTab);
	 
	var currTab = listViewTab;
	 
	// ADD EVENT LISTENERS
	listViewTab.addEventListener('click',function() {
		if (currTab != this) {
		    currTab.backgroundColor = '#000';
		    currTab.children[0].color = '#777';
		    this.backgroundColor = '#333';
		    this.children[0].color = '#FFF';
		    currTab = this;
		    toggleView();
	    }
	});
	mapViewTab.addEventListener('click',function() {
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
	var completedForms = Ti.App.Properties.getList("completedForms");
	var formsToDisplay = [];
	
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

function plotPointsOnMap() {
	var completedForms = Ti.App.Properties.getList("completedForms");
	
	var annotations = [];
	
	for (var i = 0; i < completedForms.length; ++i) {
		var completedForm = Ti.App.Properties.getObject(completedForms[i]);
		
		// Need to figure out what index the location field is at
		var index = null;
		var originalForm = Ti.App.Properties.getObject(completedForm.formName);
		for (var i = 0; i < originalForm.talkiviFormItemSet.length; i++) {
			if (originalForm.talkiviFormItemSet[i].talkiviField.field_type == "Location") {
				index = i;
				break;
			}
		}
		
		if (index != null) {
			var newAnnotation = Ti.Map.createAnnotation({
				latitude: completedForm.fields[index].latitude,
				longitude: completedForm.fields[index].longitude,
				title: completedForm.TDP_id,
				// subTitle: maybe,
				pincolor: Ti.Map.ANNOTATION_RED,
				animate: true
			});
			
			annotations.push(newAnnotation);
		}
	}
	
	$.mapView.annotations = annotations;
}


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