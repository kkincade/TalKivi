function Controller() {
    function submitButtonClicked() {
        var messageString = validateForm();
        if ("" == messageString) {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Success!",
                message: "Form submitted successfully"
            });
            alertDialog.show();
            submitForm();
            $.newFormWindow.close();
        } else {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Invalid Input",
                message: messageString
            });
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
        for (var i = 0; $.tableView.data[0].rows.length > i; ++i) {
            var value = getFieldValue($.tableView.data[0].rows[i]);
            tempFields.push(value);
        }
        form.fields = tempFields;
        Ti.App.Properties.setObject(form.TDP_id, form);
        completedForms.push(form.TDP_id);
        Ti.App.Properties.setList("completedForms", completedForms);
    }
    function loadTemplate() {
        var template = Ti.App.Properties.getObject(formName);
        formHandler.generateTemplate(template, $.tableView);
    }
    function validateForm() {
        var messageString = "";
        for (var i = 0; $.tableView.data[0].rows.length > i; ++i) {
            var fieldObject = $.tableView.data[0].rows[i].fieldObject;
            var value = getFieldValue($.tableView.data[0].rows[i]);
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.newFormWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "newFormWindow"
    });
    $.__views.newFormWindow && $.addTopLevelView($.__views.newFormWindow);
    $.__views.submitButton = Ti.UI.createButton({
        id: "submitButton",
        title: "Submit",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    submitButtonClicked ? $.__views.submitButton.addEventListener("click", submitButtonClicked) : __defers["$.__views.submitButton!click!submitButtonClicked"] = true;
    $.__views.newFormWindow.rightNavButton = $.__views.submitButton;
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.newFormWindow.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var formHandler = require("formHandler");
    var formName = arguments[0].formName;
    $.newFormWindow.title = formName;
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
    __defers["$.__views.submitButton!click!submitButtonClicked"] && $.__views.submitButton.addEventListener("click", submitButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;