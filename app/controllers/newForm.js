var formHandler = require('formHandler'); // Require library
var formName = arguments[0].formName; //Get form name from function (arguments[0] is alloy's way of passing arguments)
$.newFormWindow.title = formName; // Set title of window

loadTemplate();

function submitButtonClicked() {
	alert('submit!');
}

// When a template is selected,
function loadTemplate(event) {
	var template = Ti.App.Properties.getObject(formName);
	formHandler.generateTemplate(template, $.tableView);
}

// Displays the help text when a user long presses on a row
$.tableView.addEventListener('longpress', function(event) {
	if (event.rowData.fieldObject.help_text != "") {
		var alertDialog = Ti.UI.createAlertDialog({
			title: event.rowData.fieldObject.prompt,
			message: event.rowData.fieldObject.help_text
		});
	} else {
		var alertDialog = Ti.UI.createAlertDialog({
			title: event.rowData.fieldObject.prompt,
			message: "No help text available"
		});
	}
	
	alertDialog.show();
});

Ti.App.addEventListener('blurCheck', function(e) {
	alert("blur");
	Ti.API.info("here");
	Ti.API.info(e.row);
	Ti.API.info(e.row.fieldObject);
	Ti.API.info(e.row.fieldObject.numeric_max);
	var fieldObject = params.row.fieldObject;
	var textField = arguments[0].row.textField;
	
	if (fieldObject.field_type == "Integer") {
		if (typeof fieldObject.textField.value === 'number' && fieldObject.textField.value % 1 == 0) {
			if (textField.value > fieldObject.numeric_max || textField.value < fieldObject.numeric_min) {
				var alertDialog = Ti.UI.createAlertDialog({
				title: "Invalid input",
				message: "The input must be in the range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]"
			});
			alertDialog.show();
			textField.value = fieldObject.default_value;
			}
			
		} else {
			var alertDialog = Ti.UI.createAlertDialog({
				title: "Invalid input",
				message: "The input must be an integer."
			});
			alertDialog.show();
			textField.value = fieldObject.default_value;
		}
	}
});


function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}