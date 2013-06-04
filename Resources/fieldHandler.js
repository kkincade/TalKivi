function generateFieldView(fieldObject) {
    return "Text" == fieldObject.field_type ? TextField(fieldObject) : "Checkbox" == fieldObject.field_type ? CheckboxField(fieldObject) : "Integer" == fieldObject.field_type ? Integer(fieldObject) : "Decimal" == fieldObject.field_type ? Decimal(fieldObject) : "Calculated" == fieldObject.field_type ? Calculated(fieldObject) : "Incremental Text" == fieldObject.field_type ? Incremental_Text(fieldObject) : "Date" == fieldObject.field_type ? DateField(fieldObject) : "Time" == fieldObject.field_type ? Time(fieldObject) : "Date-Time" == fieldObject.field_type ? Date_Time(fieldObject) : "Message" == fieldObject.field_type ? Message(fieldObject) : "Location" == fieldObject.field_type ? LocationField(fieldObject) : "Photo" == fieldObject.field_type ? Photo(fieldObject) : "Recording" == fieldObject.field_type ? Recording(fieldObject) : "Selection" == fieldObject.field_type ? Selection(fieldObject) : "Button Selection" == fieldObject.field_type ? Button_Selection(fieldObject) : "Structural Attitude" == fieldObject.field_type ? Structural_Attitude(fieldObject) : unknownField(fieldObject);
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
        top: "10dp",
        left: "30dp",
        right: "10dp",
        bottom: "10dp"
    }));
    return self;
}

function CheckboxField(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "orange"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
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
        top: "10dp",
        left: "30dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        title: fieldObject.prompt,
        textField: textField,
        fieldObject: fieldObject
    });
    self.add(textField);
    textField.addEventListener("blur", function() {
        Ti.App.fireEvent("blurCheck", {
            row: self
        });
    });
    return self;
}

function Decimal(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "green"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Calculated(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "blue"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Incremental_Text(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "purple"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function DateField(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "red"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Time(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "orange"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Date_Time(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "yellow"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Message(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "green"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function LocationField(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "blue"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Photo(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "purple"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Recording(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "red"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Selection(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "orange"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Button_Selection(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "yellow"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function Structural_Attitude(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "green"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type " + fieldObject.field_type + " not yet implemented."
    }));
    return self;
}

function unknownField(fieldObject) {
    var self = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "gray"
    });
    self.add(Ti.UI.createLabel({
        text: "Field type unknown: " + fieldObject.field_type
    }));
    return self;
}

exports.generateFieldView = generateFieldView;