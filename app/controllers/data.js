var listView = Alloy.createController('dataList').getView();
var mapView = Alloy.createController('dataMap').getView();

$.dataWindow.add(listView);
$.dataWindow.add(mapView);

mapView.hide();

if (OS_IOS) {
	var tabbedBar = Ti.UI.iOS.createTabbedBar({
		labels: ['List', 'Map'],
		index: 0,
	    top: 50,
	    style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height: 25,
	    width: 150
	});
}

tabbedBar.addEventListener('click', function(event) {
	if (tabbedBar.index == 0) {
		listView.show();
		mapView.hide();
	} else {
		listView.hide();
		mapView.show();
	}
});

$.dataWindow.setTitleControl(tabbedBar);

function editFormsButtonClicked() {
	// Android is handled through long presses
	if (OS_IOS) {
		// If we are currently editing, change it to not editing
		if (listView.completedFormsTableView.editing) {
			$.editFormsButton.title = "Edit";
			listView.completedFormsTableView.editing = false;
		// If we aren't editing and there are forms to delete
		} else if (listView.completedFormsTableView.sections.length > 0) {
			$.editFormsButton.title = "Done";
			listView.completedFromsTableView.editing = true;
		}
	}
}