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
		formName: formName,
		synced: false
	};
	
	++TDP_id;
	Ti.App.Properties.setInt("TDP_INCREMENT", TDP_id);
	var tableViewRows = $.tableView.data[0].rows; // Needs to be like this or Android freaks out
	
	tempFields = [];
	// Construct the form object we are going to save
	for (var i = 0; i < tableViewRows.length; ++i) {
		var value = getFieldValue(tableViewRows[i]);
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

Ti.App.addEventListener('createDatePicker', function(event) {
	var view = Ti.UI.createView({
		height: 260, 
		bottom: -260
	});
	
	var minDate = new Date();
	var dateValue = new Date();
	minDate.setFullYear(1900); minDate.setMonth(0); minDate.setDate(1);
	var maxDate = dateValue;
	
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		minDate: minDate,
		maxDate: maxDate, 
		value: dateValue, 
		selectionIndicator: true,
		bottom: 0
	});
	
	view.add(picker);
	
	if (OS_IOS) {
		var cancelButton =  Titanium.UI.createButton({
			title:'Cancel',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		 
		var doneButton =  Titanium.UI.createButton({
			title:'Done',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		 
		var spacer =  Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		 
		var toolbar = Titanium.UI.iOS.createToolbar({
			top: 0,
			items:[cancelButton, spacer, doneButton]
		});
		
		doneButton.addEventListener('click', function(e) {
			var date = picker.getValue();
			view.animate({ bottom: -260, duration: 500 });
			return date.toUTCString();
		});
		
		cancelButton.addEventListener('click', function(e) {
			view.animate({ bottom: -260, duration: 500 });
		});
		
		view.add(toolbar);
		
	} else if (OS_ANDROID) {
		Ti.API.info("Create Alert Dialog");
		var dialog = Ti.UI.createAlertDialog({ androidView: view,  buttonNames: ['Cancel', 'Set'] });
			
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) { // Cancel
				Ti.API.info("Cancel");
			} else {
				Ti.API.info("Set");
				// Do nothing
			}	
		});
		dialog.show();
	}
		
	if (OS_IOS) {
		$.newFormWindow.add(view);
		view.animate({ bottom: 0, duration: 500 });
	}
	
});

// Loop over every row in table view and validate the contents
function validateForm() {
	var messageString = ""; // Start with blank error message
	var tableViewRows = $.tableView.data[0].rows; // Needs to be like this or Android freaks out
	
	for (var i = 0; i < tableViewRows.length; i++) {
		fieldObject = tableViewRows[i].fieldObject;
		value = getFieldValue(tableViewRows[i]);
		
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
