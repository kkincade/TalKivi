function generateFieldView(fieldObject) {
    return "Text" == fieldObject.field_type ? TextField(fieldObject) : "Checkbox" == fieldObject.field_type ? CheckboxField(fieldObject) : "Integer" == fieldObject.field_type ? Integer(fieldObject) : "Decimal" == fieldObject.field_type ? Decimal(fieldObject) : "Calculated" == fieldObject.field_type ? Calculated(fieldObject) : "Incremental Text" == fieldObject.field_type ? Incremental_Text(fieldObject) : "Date" == fieldObject.field_type ? DateField(fieldObject) : "Time" == fieldObject.field_type ? Time(fieldObject) : "Date-Time" == fieldObject.field_type ? Date_Time(fieldObject) : "Message" == fieldObject.field_type ? Message(fieldObject) : "Location" == fieldObject.field_type ? LocationField(fieldObject) : "Photo" == fieldObject.field_type ? Photo(fieldObject) : "Recording" == fieldObject.field_type ? Recording(fieldObject) : "Selection" == fieldObject.field_type ? Selection(fieldObject) : "Button Selection" == fieldObject.field_type ? Button_Selection(fieldObject) : "Structural Attitude" == fieldObject.field_type ? Structural_Attitude(fieldObject) : unknownField(fieldObject);
}

function TextField(fieldObject) {
    var textField = Ti.UI.createTextField({});
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function CheckboxField(fieldObject) {
    var switcher = Ti.UI.createSwitch({
        value: fieldObject.default_value.toLowerCase(),
        height: Ti.UI.SIZE,
        top: "10dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        switcher: switcher,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(switcher);
    checkLabelLength(self);
    return self;
}

function Integer(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Decimal(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Calculated(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Incremental_Text(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function DateField(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Time(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Date_Time(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Message(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function LocationField(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Photo(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Recording(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Selection(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Button_Selection(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function Structural_Attitude(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function unknownField(fieldObject) {
    var textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        value: fieldObject.default_value,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: fieldObject.description,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "150dp",
        right: "10dp",
        bottom: "10dp"
    });
    var self = Ti.UI.createTableViewRow({
        fieldObject: fieldObject,
        textField: textField,
        title: fieldObject.prompt,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        }
    });
    self.add(textField);
    checkLabelLength(self);
    return self;
}

function checkLabelLength(tableViewRow) {
    var length = tableViewRow.title.length;
    length > 25 ? tableViewRow.font = {
        fontSize: "10dp",
        fontWeight: "bold"
    } : length > 15 ? tableViewRow.font = {
        fontSize: "12dp",
        fontWeight: "bold"
    } : length > 10 && (tableViewRow.font = {
        fontSize: "16dp",
        fontWeight: "bold"
    });
}

exports.generateFieldView = generateFieldView;