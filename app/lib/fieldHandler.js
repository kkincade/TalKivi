
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
	
	var self = Ti.UI.createTableViewRow({
		title: fieldObject.prompt,
		fieldObject: fieldObject
	});
	
	self.add(Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		hintText: fieldObject.description,
		// Padding
		top: '10dp', 
		left: '30dp',
		right: '10dp',
		bottom: '10dp'
	}));

	return self;	
}
function CheckboxField(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'orange'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Integer(fieldObject) {
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		hintText: fieldObject.description,
		// Padding
		top: '10dp', 
		left: '30dp',
		right: '10dp',
		bottom: '10dp'
	});
	
	
	var self = Ti.UI.createTableViewRow({
		title: fieldObject.prompt,
		textField: textField,
		fieldObject: fieldObject
	});
	
	self.add(textField);
	
	textField.addEventListener('blur', function(event) {
		Ti.App.fireEvent('blurCheck', { 
			row: self
		});
	});

	return self;	
}
function Decimal(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'green'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Calculated(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'blue'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Incremental_Text(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'purple'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function DateField(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'red'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Time(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'orange'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Date_Time(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'yellow'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Message(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'green'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function LocationField(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'blue'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Photo(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'purple'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Recording(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'red'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Selection(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'orange'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Button_Selection(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'yellow'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}
function Structural_Attitude(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'green'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type ' + fieldObject.field_type + ' not yet implemented.'
	}));
	return self;	
}

function unknownField(fieldObject) {
	var self = Ti.UI.createView({
		height: '100dp',
		backgroundColor: 'gray'
	});
	self.add(Ti.UI.createLabel({
		text: 'Field type unknown: ' + fieldObject.field_type
	}));
	return self;	
}
