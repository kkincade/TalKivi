var formHandler = require('formHandler'); // Require library
var formName = arguments[0].formName; //Get form name from function (arguments[0] is alloy's way of passing arguments)
$.newFormWindow.title = formName; // Set title of window

loadTemplate();

function submitButtonClicked() {
	var messageString = validateForm();
	
	if (messageString == "") {
		var alertDialog = Ti.UI.createAlertDialog({ title: "Success!", message: "Form submitted successfully" });
		alertDialog.show();
		submitForm();
		$.newFormWindow.close();
	} else {
		var alertDialog = Ti.UI.createAlertDialog({ title: "Invalid Input", message: messageString });
		alertDialog.show();
	}
}


function submitForm() {
	var completedForms = Ti.App.Properties.getList("completedForms");
	var TDP_id = Ti.App.Properties.getInt("TDP_INCREMENT");
	
	var form = {
		TDP_id: "TDP_" + TDP_id,
		formName: formName
	};
	
	++TDP_id;
	Ti.App.Properties.setInt("TDP_INCREMENT", TDP_id);
	
	tempFields = [];
	// Construct the form object we are going to save
	for (var i = 0; i < $.tableView.data[0].rows.length; ++i) {
		var value = getFieldValue($.tableView.data[0].rows[i]);
		tempFields.push(value);
	}
	
	form.fields = tempFields;
	Ti.App.Properties.setObject(form.TDP_id, form);
	completedForms.push(form.TDP_id);
	Ti.App.Properties.setList("completedForms", completedForms);
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

// Android uses the back button instead of the done button
$.tableView.addEventListener('androidback', function(event) { 
	//TODO: warn user before closing (also do this for iOS)
	$.newFormWindow.close();
	Ti.App.fireEvent('populateTemplates');
});


// Loop over every row in table view and validate the contents
function validateForm() {
	
	var messageString = ""; // Start with blank error message
	
	for (var i = 0; i < $.tableView.data[0].rows.length; ++i) {
		
		var fieldObject = $.tableView.data[0].rows[i].fieldObject;
		var value = getFieldValue($.tableView.data[0].rows[i]);
		
		// Checks if the field is blank and/or required
		if (value == "" || value == null) {
			if (fieldObject.required == "No") {
				continue;
			} else {
				messageString += fieldObject.prompt + " is a required field.\n";
				continue;
			}
		}

		// -------------- Text ----------------
 		if (fieldObject.field_type == 'Text') {
 			// Do Nothing
 			
 		// -------------- Checkbox ----------------
 		} else if (fieldObject.field_type == 'Checkbox') { 
 			// Do Nothing	
 		
 		
 		// ------------ Integer ----------------
 		} else if (fieldObject.field_type == 'Integer') { 
			// Is number? And is integer?
			if (Number(value) > 0 && value % 1 == 0) {
				// Is it in range?
				if (value > fieldObject.numeric_max || value < fieldObject.numeric_min) {
					messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n";
				}
			} else {
				messageString += fieldObject.prompt + " must be an integer.\n";
			}
		
		
		// ------------ Decimal ----------------
		} else if (fieldObject.field_type == 'Decimal') { 
		    // Is number?
			if (Number(value) > 0) {
				// Is it in range?
				if (value > fieldObject.numeric_max || value < fieldObject.numeric_min) {
					messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n";
				}
			} else {
				messageString += fieldObject.prompt + " must be a number.\n";
			}
			
			
		// ---------- Calculated ------------
		} else if (fieldObject.field_type == 'Calculated') { 
		
		
		// -------------- Incremental Text ----------------
		} else if (fieldObject.field_type == 'Incremental Text') { 
		
		
		// -------------- Date ----------------
		} else if (fieldObject.field_type == 'Date') { 
		
		
		// -------------- Time ----------------
		} else if (fieldObject.field_type == 'Time') { 
			
			
		// -------------- Date-Time ----------------
		} else if (fieldObject.field_type == 'Date-Time') { 
		
		} else if (fieldObject.field_type == 'Message') { 
		
		} else if (fieldObject.field_type == 'Location') { 
		
		} else if (fieldObject.field_type == 'Photo') { 
		
		} else if (fieldObject.field_type == 'Recording') { 
		
		} else if (fieldObject.field_type == 'Selection') { 
		
		} else if (fieldObject.field_type == 'Button Selection') { 
		
		} else if (fieldObject.field_type == 'Structural Attitude') { 
		
		} else { 
			
		}
		//------------------------------------------------------------------------------------------------------------------------------------------
	}
	return messageString;
}


// Returns the value from the corresponding textField, switchers, etc. (Not all fields have textFields)
function getFieldValue(tableViewRow) {
	if (tableViewRow.fieldObject.field_type == 'Text') { return tableViewRow.textField.value } 
	else if (tableViewRow.fieldObject.field_type == 'Checkbox') { return tableViewRow.switcher.value }
	else if (tableViewRow.fieldObject.field_type == 'Integer') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Decimal') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Calculated') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Incremental Text') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Date') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Time') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Date-Time') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Message') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Location') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Photo') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Recording') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Selection') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Button Selection') { return tableViewRow.textField.value }
	else if (tableViewRow.fieldObject.field_type == 'Structural Attitude') { return tableViewRow.textField.value }
	else { return tableViewRow.fieldObject.textField }
}
