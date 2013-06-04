function Controller() {
    function submitButtonClicked() {
        alert("submit!");
    }
    function loadTemplate() {
        var template = Ti.App.Properties.getObject(formName);
        formHandler.generateTemplate(template, $.tableView);
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
    Ti.App.addEventListener("blurCheck", function(e) {
        alert("blur");
        Ti.API.info("here");
        Ti.API.info(e.row);
        Ti.API.info(e.row.fieldObject);
        Ti.API.info(e.row.fieldObject.numeric_max);
        var fieldObject = params.row.fieldObject;
        var textField = arguments[0].row.textField;
        if ("Integer" == fieldObject.field_type) if ("number" == typeof fieldObject.textField.value && 0 == fieldObject.textField.value % 1) {
            if (textField.value > fieldObject.numeric_max || textField.value < fieldObject.numeric_min) {
                var alertDialog = Ti.UI.createAlertDialog({
                    title: "Invalid input",
                    message: "The input must be in the range [" + fieldObject.numeric_min + ", " + fieldObject.numeric_max + "]"
                });
                alertDialog.show();
                textField.value = fieldObject.default_value;
            }
        } else {
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Invalid input",
                message: "The input must be an integer."
            });
            alertDialog.show();
            textField.value = fieldObject.default_value;
        }
    });
    __defers["$.__views.submitButton!click!submitButtonClicked"] && $.__views.submitButton.addEventListener("click", submitButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;