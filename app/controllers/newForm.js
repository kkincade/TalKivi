function submitButtonClicked() {
	alert('submit!');
}

var label = Ti.UI.createLabel({ 
	text: Ti.App.Properties.getString("formNameParameter"),
	color: 'black'
});

$.newFormWindow.add(label);
