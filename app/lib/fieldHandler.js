
// exports
exports.generateFieldView = generateFieldView;

function generateFieldView(fieldObject) {
	if (fieldObject.field_type == 'Text') { return TextField(fieldObject); }
	else if (fieldObject.field_type == 'Checkbox') { return CheckboxField(fieldObject); }
	else if (fieldObject.field_type == 'Integer') { return Integer(fieldObject); }
	else if (fieldObject.field_type == 'Decimal') { return Decimal(fieldObject); }
	else if (fieldObject.field_type == 'Calculated') { return Calculated(fieldObject); }
	else if (fieldObject.field_type == 'Incremental Text') { return Incremental_Text(fieldObject); }
	else if (fieldObject.field_type == 'Date') { return DateField(fieldObject); }
	else if (fieldObject.field_type == 'Time') { return Time(fieldObject); }
	else if (fieldObject.field_type == 'Date-Time') { return Date_Time(fieldObject); }
	else if (fieldObject.field_type == 'Message') { return Message(fieldObject); }
	else if (fieldObject.field_type == 'Location') { return LocationField(fieldObject); }
	else if (fieldObject.field_type == 'Photo') { return Photo(fieldObject); }
	else if (fieldObject.field_type == 'Recording') { return Recording(fieldObject); }
	else if (fieldObject.field_type == 'Selection') { return Selection(fieldObject); }
	else if (fieldObject.field_type == 'Button Selection') { return Button_Selection(fieldObject); }
	else if (fieldObject.field_type == 'Structural Attitude') { return Structural_Attitude(fieldObject);  }
	else { return unknownField(fieldObject); }
}


function TextField(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
		
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}

	return self;	
}


function CheckboxField(fieldObject) {
	

	var switcher = Ti.UI.createSwitch({
		value: fieldObject.default_value.toLowerCase(),
		// Padding
		height: Ti.UI.SIZE,
		top: '10dp', 
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		switcher: switcher,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Android side
	if (OS_ANDROID) {
		switcher.style = Ti.UI.Android.SWITCH_STYLE_CHECKBOX;
		switcher.left = '10dp';
		switcher.title = fieldObject.prompt;
		
		var view = Ti.UI.createView({});

		view.add(switcher);
		self.add(view);
		
	// iOS side
	} else {
		self.add(switcher);
		checkLabelLength(self);
	}


	return self;	
}


function Integer(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
			
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;	
}


function Decimal(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;	
}


function Calculated(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;	
}


function Incremental_Text(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;	
}


function DateField(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Time(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Date_Time(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Message(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function LocationField(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Photo(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);	
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Recording(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Selection(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Button_Selection(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function Structural_Attitude(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;	
}

function unknownField(fieldObject) {
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		value: fieldObject.default_value,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		hintText: fieldObject.description,
		
		// Padding
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: '10dp', 
		left: '150dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	var self = Ti.UI.createTableViewRow({
		fieldObject: fieldObject,
		textField: textField,
		title: fieldObject.prompt,
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
		// Create view if we are running Android
	if (OS_ANDROID) {
		textField.height = '40dp';
		textField.left = '10dp';
		textField.top = '0dp';
		textField.bottom = '5dp';
		
		var view = Ti.UI.createView({
			layout: 'vertical'
		});
		
		var label = Ti.UI.createLabel({
			text: fieldObject.prompt,
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: '15dp',
			top: '5dp',
			font: {
				fontSize: '12dp'
			}
		});
		
		view.add(label);
		view.add(textField);
		self.add(view);
		
	// iOS side
	} else {
		self.add(textField);
		checkLabelLength(self);
	}
	
	return self;		
}


function checkLabelLength(tableViewRow) {
	var length = tableViewRow.title.length;
	
	if (length > 25) {
		tableViewRow.font = { fontSize: '10dp', fontWeight: 'bold' };
	} else if (length > 15) {
		tableViewRow.font = { fontSize: '12dp', fontWeight: 'bold' };
	} else if (length > 10) {
		tableViewRow.font = { fontSize: '16dp', fontWeight: 'bold' };
	}
}
