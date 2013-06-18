var fieldHandler = require('fieldHandler'); // Require library
var formName = arguments[0].formName; //Get form name from function (arguments[0] is alloy's way of passing arguments)
$.newFormWindow.title = formName; // Set title of window

// Needed to keep focus on text field within table view rows when they are clicked
if (OS_ANDROID) {
	$.newFormWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}


loadTemplate();

if (OS_ANDROID) {
	var spacer = Math.round(Ti.Platform.displayCaps.platformWidth);
	var height = Math.round(Ti.Platform.displayCaps.platformHeight*0.055);
	var width = spacer-4;
	
	// Custom Button
	var submitButtonView = Ti.UI.createView({
	    width: width,
	    height: height,
	    left: '2dp',
	    bottom: '2dp',
	    backgroundColor: '#333',
	    borderRadius: '2dp'
	});
	var submitButtonLabel = Ti.UI.createLabel({
	    text:'Submit Form',
	    font: {
	    	fontSize: '14dp'
	    },
	    color:'#FFF'
	});
	submitButtonView.add(submitButtonLabel);
	$.newFormWindow.add(submitButtonView);
	
	// ADD EVENT LISTENERS
	submitButtonView.addEventListener('click',function() {
		submitButtonClicked();
	});
	
	$.newFormWindow.backgroundColor = 'black';
	$.tableView.bottom = '50dp';
}


function submitButtonClicked() {
	var messageString = validateForm();

	if (messageString == "") {
		submitForm();
		var alertDialog = Ti.UI.createAlertDialog({ title: "Success!", message: "Form submitted successfully", buttonNames: ['OK'] });
		alertDialog.addEventListener('click', function(e) {
			$.newFormWindow.close();
		});
		alertDialog.show();

	} else {
		var alertDialog = Ti.UI.createAlertDialog({ title: "Invalid Input", message: messageString, buttonNames: ['OK'] });
		alertDialog.show();
	}
}


function submitForm() {
	var completedForms = Ti.App.Properties.getList("completedForms");
	var TDP_id = Ti.App.Properties.getInt("TDP_INCREMENT");
	
	// var originalForm = Ti.App.Properties.getObject(form.formName);
		// for (var i = 0; i < originalForm.talkiviFormItemSet.length; i++) {
			// if (talkiviFormItemSet[i].talkiviField.field_type == "Location") {
				// index = i;
				// break;
			// }
		// }
	var form = {
		TDP_id: "TDP_" + TDP_id,
		formName: formName,
		synced: false
	};
	
	++TDP_id;
	Ti.App.Properties.setInt("TDP_INCREMENT", TDP_id);
	var tableViewRows = $.tableView.data[0].rows; // Needs to be like this or Android freaks out (Don't put in for loop!)
	
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


// generateForm function, takes json data for form and a view to add views to
function loadTemplate() {
	var data = Ti.App.Properties.getObject(formName);
	
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
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			
			// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
			Ti.App.dateTextFieldParameter.value = month + "-" + day + "-" + year;
			view.animate({ bottom: -260, duration: 500 });
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
				var date = picker.getValue();
				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();
					
				// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
				Ti.App.dateTextFieldParameter.value = month + "-" + day + "-" + year;
			}	
		});
		dialog.show();
	}
		
	if (OS_IOS) {
		$.newFormWindow.add(view);
		view.animate({ bottom: 0, duration: 500 });
	}
	
});

Ti.App.addEventListener('createTimePicker', function(event) {
	var view = Ti.UI.createView({
		height: 260, 
		bottom: -260
	});
	
	var date = new Date();
	
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_TIME,
		value: date,
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
			var hours = date.getHours();
			var minutes = date.getMinutes();
			// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
			Ti.App.timeTextFieldParameter.value = hours + ":" + minutes + ":00";
			view.animate({ bottom: -260, duration: 500 });
		});
		
		cancelButton.addEventListener('click', function(e) {
			view.animate({ bottom: -260, duration: 500 });
		});
		
		view.add(toolbar);
		
	} else if (OS_ANDROID) {
		var dialog = Ti.UI.createAlertDialog({ androidView: view,  buttonNames: ['Cancel', 'Set'] });
			
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) { // Cancel
				Ti.API.info("Cancel");
			} else {
				var date = picker.getValue();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
				Ti.App.timeTextFieldParameter.value = hours + ":" + minutes + ":00";
			}	
		});
		dialog.show();
	}
		
	if (OS_IOS) {
		$.newFormWindow.add(view);
		view.animate({ bottom: 0, duration: 500 });
	}
	
});

Ti.App.addEventListener('createDateTimePicker', function(event) {
	var view = Ti.UI.createView({
		height: 260, 
		bottom: -260
	});
	
	var date = new Date();
	
	if (OS_IOS) {
		var picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
			value: date,
			selectionIndicator: true,
			bottom: 0
		});
		view.add(picker);
	// ANDROID
	} else if (OS_ANDROID) {
		var timeView = Ti.UI.createView({
			height: 260,
			bottom: -260
		});
		
		var datePicker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: date,
			selectionIndicator: true,
			bottom: 0
		});
		view.add(datePicker);
		
		var timePicker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_TIME,
			value: date,
			selectionIndicator: true,
			bottom: 0
		});
		
		timeView.add(timePicker);
	}
	
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
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			
			// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
			Ti.App.dateTimeTextFieldParameter.value = month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":00";
			view.animate({ bottom: -260, duration: 500 });
		});
		
		cancelButton.addEventListener('click', function(e) {
			view.animate({ bottom: -260, duration: 500 });
		});
		
		view.add(toolbar);
		
	} else if (OS_ANDROID) {
		var dateDialog = Ti.UI.createAlertDialog({ androidView: view,  buttonNames: ['Cancel', 'Set'] });
		var timeDialog = Ti.UI.createAlertDialog({ androidView: timeView, buttonNames: ['Cancel', 'Set'] });	
		var day, month, year, hours, minutes;
		
		timeDialog.addEventListener('click', function(e) {
			if (e.index == 0) { // Cancel
				Ti.API.info("Cancel");
			} else {
				var date = timePicker.getValue();
				hours = date.getHours();
				minutes = date.getMinutes();
				// Temporary property in order to fill out form with date from picker (instantiated in fieldHandler.js)
				Ti.App.dateTimeTextFieldParameter.value = month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":00";
			}	
		});
		
		dateDialog.addEventListener('click', function(e) {
			if (e.index == 0) { // Cancel
				Ti.API.info("Cancel");
			} else {
				var date = datePicker.getValue();
				day = date.getDate();
				month = date.getMonth() + 1;
				year = date.getFullYear();
				timeDialog.show();
			}	
		});
	
		dateDialog.show();
	}
		
	if (OS_IOS) {
		$.newFormWindow.add(view);
		view.animate({ bottom: 0, duration: 500 });
	}
	
});

// Loop over every row in table view and validate the contents
function validateForm() {
	var messageString = ""; // Start with blank error message
	var tableViewRows = $.tableView.data[0].rows; // Needs to be like this or Android freaks out (Don't put in for loop!)
	
	for (var i = 0; i < tableViewRows.length; i++) {
		fieldObject = tableViewRows[i].fieldObject;
		value = getFieldValue(tableViewRows[i]);
		
		// Checks if the field is blank and/or required (has to be === to compare booleans with "" and null)
		if (value === "" || value === null) {
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
	if (tableViewRow.fieldObject.field_type == 'Text') { return tableViewRow.textField.value; } 
	else if (tableViewRow.fieldObject.field_type == 'Checkbox') { return tableViewRow.switcher.value; }
	else if (tableViewRow.fieldObject.field_type == 'Integer') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Decimal') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Calculated') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Incremental Text') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Date') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Time') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Date-Time') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Message') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Location') { 
		// Assume location is in form "(39.7494925, -105.2217889) - 1572m"
		var textLocation = tableViewRow.textField.value;
		var commaIndex = textLocation.indexOf(',');
		var closingParenIndex = textLocation.indexOf(')');
		var latitude = textLocation.substring(1, commaIndex);
		var longitude = textLocation.substring(commaIndex + 2, closingParenIndex);
		var elevation = textLocation.substring(closingParenIndex + 3, -2);
		
		var location = {
			latitude: latitude,
			longitude: longitude,
			elevation: elevation
		};
		
		return location;
	} else if (tableViewRow.fieldObject.field_type == 'Photo') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Recording') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Selection') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Button Selection') { return tableViewRow.textField.value; }
	else if (tableViewRow.fieldObject.field_type == 'Structural Attitude') { return tableViewRow.textField.value; }
	else { return tableViewRow.fieldObject.textField }
}
