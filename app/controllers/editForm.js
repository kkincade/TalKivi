var fieldHandler = require('fieldHandler'); // Require library
var formID = arguments[0].formID; //Get form id from function (arguments[0] is alloy's way of passing arguments)
$.editFormWindow.title = Ti.App.Properties.getObject(formID).displayName; // Set title of window

// Needed to keep focus on text field within table view rows when they are clicked
if (OS_ANDROID) {
	$.editFormWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}

loadTemplate();

if (OS_ANDROID) {
	var spacer = Math.round(Ti.Platform.displayCaps.platformWidth);
	var height = Math.round(Ti.Platform.displayCaps.platformHeight*0.055);
	var width = spacer-4;

	// Custom Button
	var saveButtonView = Ti.UI.createView({
	    width: width,
	    height: height,
	    left: '2dp',
	    bottom: '2dp',
	    backgroundColor: '#333',
	    borderRadius: '2dp'
	});
	var saveButtonLabel = Ti.UI.createLabel({
	    text:'Save Form',
	    font: {
	    	fontSize: '14dp'
	    },
	    color:'#FFF'
	});
	saveButtonView.add(saveButtonLabel);
	$.editFormWindow.add(saveButtonView);
	
	// ADD EVENT LISTENERS
	saveButtonView.addEventListener('click',function() {
		saveButtonClicked();
	});
	
	$.editFormWindow.backgroundColor = 'black';
	$.tableView.bottom = '50dp';
}


function saveButtonClicked() {
	var messageString = validateForm();
	
	if (messageString == "") {
		saveForm();
		var alertDialog = Ti.UI.createAlertDialog({ title: "Success!", message: "Form saved successfully", buttonNames: ['OK'] });
		alertDialog.addEventListener('click', function(e) {
			$.editFormWindow.close();
		});
		alertDialog.show();
	} else {
		var alertDialog = Ti.UI.createAlertDialog({ title: "Invalid Input", message: messageString, buttonNames: ['OK'] });
		alertDialog.show();
	}
}


function saveForm() {
	var completedForms = Ti.App.Properties.getList("completedForms");
	var form = Ti.App.Properties.getObject(formID);
	var tableViewRows = $.tableView.data[0].rows; // Needs to be like this or Android freaks out (Don't put in for loop!)
	
	tempFields = [];
	// Construct the form object we are going to save
	for (var i = 0; i < tableViewRows.length; ++i) {
		var value = getFieldValue(tableViewRows[i]);
		tempFields.push(value);
	}
	
	form.fields = tempFields;
	Ti.App.Properties.setObject(form.TDP_id, form);
	if (completedForms.indexOf(formID) == -1) {
		completedForms.push(form.TDP_id);
	}
	Ti.App.Properties.setList("completedForms", completedForms);
}


// When a form is selected for editing, this loads the field values
function loadTemplate() {
	var form = Ti.App.Properties.getObject(formID);
	var data = Ti.App.Properties.getObject(form.formName);
	talkiviFormItemSet = data.talkiviFormItemSet;
	tableViewRows = [];
	
	if (talkiviFormItemSet != null) {
		for (var i = 0; i < talkiviFormItemSet.length; ++i) {
			var tableViewRow = fieldHandler.generateFieldView(talkiviFormItemSet[i].talkiviField);
			if (OS_ANDROID) {
				tableViewRow.backgroundColor = 'black';
				tableViewRow.color = 'white';
			}
			tableViewRows.push(tableViewRow);
		}
		$.tableView.data = tableViewRows;
	} else {
		var alertDialog = Ti.UI.createAlertDialog({
			message: "Invalid form! Form doesn't contain a TalKivi form item set!"
		});
		alertDialog.show();
	}
	
	var tableViewRows = $.tableView.data[0].rows;
	
	// Set the values to display
	for (var i = 0; i < tableViewRows.length; ++i) {
		var value = form.fields[i];
		setFieldValue(tableViewRows[i], value);
	}
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
	$.editFormWindow.close();
	Ti.App.fireEvent('populateTemplates');
});


// Loop over every row in table view and validate the contents
function validateForm() {
	
	var messageString = ""; // Start with blank error message
	var tableViewRows = $.tableView.data[0].rows;
	
	for (var i = 0; i < tableViewRows.length; ++i) {
		
		var fieldObject = tableViewRows[i].fieldObject;
		var value = getFieldValue(tableViewRows[i]);
		
		if (fieldObject.field_type == 'Checkbox') {
			continue;
		}
		
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


function setFieldValue(tableViewRow, value) {
	if (tableViewRow.fieldObject.field_type == 'Text') { tableViewRow.textField.value = value } 
	else if (tableViewRow.fieldObject.field_type == 'Checkbox') { tableViewRow.switcher.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Integer') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Decimal') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Calculated') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Incremental Text') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Date') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Time') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Date-Time') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Message') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Location') { tableViewRow.textField.value = "(" + value.latitude + ", " + value.longitude + ") - " + value.elevation + "m" }
	else if (tableViewRow.fieldObject.field_type == 'Photo') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Recording') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Selection') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Button Selection') { tableViewRow.textField.value = value }
	else if (tableViewRow.fieldObject.field_type == 'Structural Attitude') { tableViewRow.textField.value = value }
	else { tableViewRow.fieldObject.textField = value }
}
