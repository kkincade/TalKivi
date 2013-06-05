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
		formsToDisplay.push(singleTemplate);		
	}

	// Load templates into TableView
	$.completedFormsTableView.data = formsToDisplay;
	$.completedFormsTableView.editable = true;
	$.completedFormsTableView.moveable = true;
}