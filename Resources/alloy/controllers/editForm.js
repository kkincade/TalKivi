function Controller() {
    function saveButtonClicked() {
        var messageString = validateForm();
        if ("" == messageString) {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Success!",
                message: "Form saved successfully"
            });
            alertDialog.show();
            saveForm();
            $.editFormWindow.close();
        } else {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Invalid Input",
                message: messageString
            });
            alertDialog.show();
        }
    }
    function saveForm() {
        var completedForms = Ti.App.Properties.getList("completedForms");
        var form = Ti.App.Properties.getObject(formID);
        tempFields = [];
        for (var i = 0; $.tableView.data[0].rows.length > i; ++i) {
            var value = getFieldValue($.tableView.data[0].rows[i]);
            tempFields.push(value);
        }
        form.fields = tempFields;
        Ti.App.Properties.setObject(form.TDP_id, form);
        -1 == completedForms.indexOf(formID) && completedForms.push(form.TDP_id);
        Ti.App.Properties.setList("completedForms", completedForms);
    }
    function loadTemplate() {
        var form = Ti.App.Properties.getObject(formID);
        var template = Ti.App.Properties.getObject(form.formName);
        formHandler.generateTemplate(template, $.tableView);
        for (var i = 0; $.tableView.data[0].rows.length > i; ++i) {
            var value = form.fields[i];
            setFieldValue($.tableView.data[0].rows[i], value);
        }
    }
    function validateForm() {
        var messageString = "";
        for (var i = 0; $.tableView.data[0].rows.length > i; ++i) {
            var fieldObject = $.tableView.data[0].rows[i].fieldObject;
            var value = getFieldValue($.tableView.data[0].rows[i]);
            if ("Checkbox" == fieldObject.field_type) continue;
            if ("" == value || null == value) {
                if ("No" == fieldObject.required) continue;
                messageString += fieldObject.prompt + " is a required field.\n";
                continue;
            }
            "Text" == fieldObject.field_type || "Checkbox" == fieldObject.field_type || ("Integer" == fieldObject.field_type ? Number(value) > 0 && 0 == value % 1 ? (value > fieldObject.numeric_max || fieldObject.numeric_min > value) && (messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n") : messageString += fieldObject.prompt + " must be an integer.\n" : "Decimal" == fieldObject.field_type ? Number(value) > 0 ? (value > fieldObject.numeric_max || fieldObject.numeric_min > value) && (messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n") : messageString += fieldObject.prompt + " must be a number.\n" : "Calculated" == fieldObject.field_type || "Incremental Text" == fieldObject.field_type || "Date" == fieldObject.field_type || "Time" == fieldObject.field_type || "Date-Time" == fieldObject.field_type || "Message" == fieldObject.field_type || "Location" == fieldObject.field_type || "Photo" == fieldObject.field_type || "Recording" == fieldObject.field_type || "Selection" == fieldObject.field_type || "Button Selection" == fieldObject.field_type || "Structural Attitude" == fieldObject.field_type);
        }
        return messageString;
    }
    function getFieldValue(tableViewRow) {
        return "Text" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Checkbox" == tableViewRow.fieldObject.field_type ? tableViewRow.switcher.value : "Integer" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Decimal" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Calculated" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Incremental Text" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Date" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Time" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Date-Time" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Message" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Location" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Photo" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Recording" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Button Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Structural Attitude" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : tableViewRow.fieldObject.textField;
    }
    function setFieldValue(tableViewRow, value) {
        "Text" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Checkbox" == tableViewRow.fieldObject.field_type ? tableViewRow.switcher.value = value : "Integer" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Decimal" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Calculated" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Incremental Text" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Date" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Time" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Date-Time" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Message" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Location" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Photo" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Recording" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Button Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : "Structural Attitude" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value = value : tableViewRow.fieldObject.textField = value;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editFormWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "editFormWindow"
    });
    $.__views.editFormWindow && $.addTopLevelView($.__views.editFormWindow);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.editFormWindow.add($.__views.tableView);
    $.__views.editFormWindow.activity.onCreateOptionsMenu = function(e) {
        var __alloyId7 = {
            title: "Save Form",
            id: "__alloyId6"
        };
        $.__views.__alloyId6 = e.menu.add(_.pick(__alloyId7, Alloy.Android.menuItemCreateArgs));
        $.__views.__alloyId6.applyProperties(_.omit(__alloyId7, Alloy.Android.menuItemCreateArgs));
        submitFormButtonClicked ? $.__views.__alloyId6.addEventListener("click", submitFormButtonClicked) : __defers["$.__views.__alloyId6!click!submitFormButtonClicked"] = true;
    };
    exports.destroy = function() {};
    _.extend($, $.__views);
    var formHandler = require("formHandler");
    var formID = arguments[0].formID;
    $.editFormWindow.title = formID;
    loadTemplate();
    $.tableView.addEventListener("longpress", function(event) {
        if ("" != event.rowData.fieldObject.help_text) var alertDialog = Ti.UI.createAlertDialog({
            title: event.rowData.fieldObject.prompt,
            message: event.rowData.fieldObject.help_text
        }); else var alertDialog = Ti.UI.createAlertDialog({
            title: event.rowData.fieldObject.prompt,
            message: "No help text available"
        });
        alertDialog.show();
    });
    $.tableView.addEventListener("androidback", function() {
        $.editFormWindow.close();
        Ti.App.fireEvent("populateTemplates");
    });
    __defers["$.__views.saveButton!click!saveButtonClicked"] && $.__views.saveButton.addEventListener("click", saveButtonClicked);
    __defers["$.__views.__alloyId6!click!submitFormButtonClicked"] && $.__views.__alloyId6.addEventListener("click", submitFormButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;