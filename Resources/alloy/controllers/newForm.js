function Controller() {
    function submitButtonClicked() {
        var messageString = validateForm();
        if ("" == messageString) {
            submitForm();
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Success!",
                message: "Form submitted successfully",
                buttonNames: [ "OK" ]
            });
            alertDialog.addEventListener("click", function() {
                $.newFormWindow.close();
            });
            alertDialog.show();
        } else {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Invalid Input",
                message: messageString,
                buttonNames: [ "OK" ]
            });
            alertDialog.show();
        }
    }
    function submitForm() {
        var completedForms = Ti.App.Properties.getList("completedForms");
        var TDP_id = Ti.App.Properties.getInt("TDP_INCREMENT");
        var index = null;
        var originalForm = Ti.App.Properties.getObject(formName);
        for (var i = 0; originalForm.talkiviFormItemSet.length > i; i++) if ("Name" == talkiviFormItemSet[i].talkiviField.name) {
            index = i;
            break;
        }
        var form = {
            TDP_id: "TDP_" + TDP_id,
            formName: formName,
            synced: false
        };
        ++TDP_id;
        Ti.App.Properties.setInt("TDP_INCREMENT", TDP_id);
        var tableViewRows = $.tableView.data[0].rows;
        tempFields = [];
        for (var i = 0; tableViewRows.length > i; ++i) {
            var value = getFieldValue(tableViewRows[i]);
            tempFields.push(value);
        }
        form.fields = tempFields;
        form.displayName = null != index ? form.fields[index] : form.TDP_id;
        Ti.App.Properties.setObject(form.TDP_id, form);
        completedForms.push(form.TDP_id);
        Ti.App.Properties.setList("completedForms", completedForms);
        uploadHandler.uploadForm(form.TDP_id);
    }
    function loadTemplate() {
        var data = Ti.App.Properties.getObject(formName);
        talkiviFormItemSet = data.talkiviFormItemSet;
        tableViewRows = [];
        if (null != talkiviFormItemSet) {
            for (var i = 0; talkiviFormItemSet.length > i; ++i) {
                var tableViewRow = fieldHandler.generateFieldView(talkiviFormItemSet[i].talkiviField);
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
    function validateForm() {
        var messageString = "";
        var tableViewRows = $.tableView.data[0].rows;
        for (var i = 0; tableViewRows.length > i; i++) {
            fieldObject = tableViewRows[i].fieldObject;
            value = getFieldValue(tableViewRows[i]);
            if ("" === value || null === value) {
                if ("No" == fieldObject.required) continue;
                messageString += fieldObject.prompt + " is a required field.\n";
                continue;
            }
            "Text" == fieldObject.field_type || "Checkbox" == fieldObject.field_type || ("Integer" == fieldObject.field_type ? Number(value) > 0 && 0 == value % 1 ? (value > fieldObject.numeric_max || fieldObject.numeric_min > value) && (messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n") : messageString += fieldObject.prompt + " must be an integer.\n" : "Decimal" == fieldObject.field_type ? Number(value) > 0 ? (value > fieldObject.numeric_max || fieldObject.numeric_min > value) && (messageString += fieldObject.prompt + " must be in range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]\n") : messageString += fieldObject.prompt + " must be a number.\n" : "Calculated" == fieldObject.field_type || "Incremental Text" == fieldObject.field_type || "Date" == fieldObject.field_type || "Time" == fieldObject.field_type || "Date-Time" == fieldObject.field_type || "Message" == fieldObject.field_type || "Location" == fieldObject.field_type || "Photo" == fieldObject.field_type || "Recording" == fieldObject.field_type || "Selection" == fieldObject.field_type || "Button Selection" == fieldObject.field_type || "Structural Attitude" == fieldObject.field_type);
        }
        return messageString;
    }
    function getFieldValue(tableViewRow) {
        if ("Text" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Checkbox" == tableViewRow.fieldObject.field_type) return tableViewRow.switcher.value;
        if ("Integer" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Decimal" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Calculated" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Incremental Text" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Date" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Time" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Date-Time" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Message" == tableViewRow.fieldObject.field_type) return tableViewRow.textField.value;
        if ("Location" == tableViewRow.fieldObject.field_type) {
            var textLocation = tableViewRow.textField.value;
            var commaIndex = textLocation.indexOf(",");
            var closingParenIndex = textLocation.indexOf(")");
            var mIndex = textLocation.indexOf("m");
            var latitude = textLocation.substring(1, commaIndex);
            var longitude = textLocation.substring(commaIndex + 2, closingParenIndex);
            var elevation = textLocation.substring(closingParenIndex + 3, mIndex);
            var location = {
                latitude: latitude,
                longitude: longitude,
                elevation: elevation
            };
            return location;
        }
        return "Photo" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Recording" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Button Selection" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : "Structural Attitude" == tableViewRow.fieldObject.field_type ? tableViewRow.textField.value : tableViewRow.fieldObject.textField;
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
    var fieldHandler = require("fieldHandler");
    var uploadHandler = require("uploadHandler");
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
    $.tableView.addEventListener("androidback", function() {
        $.newFormWindow.close();
        Ti.App.fireEvent("populateTemplates");
    });
    Ti.App.addEventListener("createDatePicker", function() {
        var view = Ti.UI.createView({
            height: 260,
            bottom: -260
        });
        var minDate = new Date();
        var dateValue = new Date();
        minDate.setFullYear(1900);
        minDate.setMonth(0);
        minDate.setDate(1);
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
        var cancelButton = Titanium.UI.createButton({
            title: "Cancel",
            style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
        });
        var doneButton = Titanium.UI.createButton({
            title: "Done",
            style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        var spacer = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var toolbar = Titanium.UI.iOS.createToolbar({
            top: 0,
            items: [ cancelButton, spacer, doneButton ]
        });
        doneButton.addEventListener("click", function() {
            var date = picker.getValue();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            Ti.App.dateTextFieldParameter.value = month + "-" + day + "-" + year;
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        cancelButton.addEventListener("click", function() {
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        view.add(toolbar);
        $.newFormWindow.add(view);
        view.animate({
            bottom: 0,
            duration: 500
        });
    });
    Ti.App.addEventListener("createTimePicker", function() {
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
        var cancelButton = Titanium.UI.createButton({
            title: "Cancel",
            style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
        });
        var doneButton = Titanium.UI.createButton({
            title: "Done",
            style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        var spacer = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var toolbar = Titanium.UI.iOS.createToolbar({
            top: 0,
            items: [ cancelButton, spacer, doneButton ]
        });
        doneButton.addEventListener("click", function() {
            var date = picker.getValue();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            Ti.App.timeTextFieldParameter.value = hours + ":" + minutes + ":00";
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        cancelButton.addEventListener("click", function() {
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        view.add(toolbar);
        $.newFormWindow.add(view);
        view.animate({
            bottom: 0,
            duration: 500
        });
    });
    Ti.App.addEventListener("createDateTimePicker", function() {
        var view = Ti.UI.createView({
            height: 260,
            bottom: -260
        });
        var date = new Date();
        var picker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
            value: date,
            selectionIndicator: true,
            bottom: 0
        });
        view.add(picker);
        var cancelButton = Titanium.UI.createButton({
            title: "Cancel",
            style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
        });
        var doneButton = Titanium.UI.createButton({
            title: "Done",
            style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        var spacer = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var toolbar = Titanium.UI.iOS.createToolbar({
            top: 0,
            items: [ cancelButton, spacer, doneButton ]
        });
        doneButton.addEventListener("click", function() {
            var date = picker.getValue();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            Ti.App.dateTimeTextFieldParameter.value = month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":00";
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        cancelButton.addEventListener("click", function() {
            view.animate({
                bottom: -260,
                duration: 500
            });
        });
        view.add(toolbar);
        $.newFormWindow.add(view);
        view.animate({
            bottom: 0,
            duration: 500
        });
    });
    __defers["$.__views.submitButton!click!submitButtonClicked"] && $.__views.submitButton.addEventListener("click", submitButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;