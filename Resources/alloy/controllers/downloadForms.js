function Controller() {
    function doneButtonClicked() {
        $.downloadTemplatesWindow.close();
        Ti.App.fireEvent("populateTemplates");
    }
    function loadTemplates() {
        var HTTP_CLIENT = Ti.Network.createHTTPClient();
        HTTP_CLIENT.onload = function() {
            var templatesFromJSON = JSON.parse(this.responseText);
            var templates = [];
            for (var i = 0; templatesFromJSON.length > i; ++i) {
                var label = Ti.UI.createLabel({
                    id: i,
                    text: templatesFromJSON[i].name,
                    color: "black"
                });
                var singleTemplate = Ti.UI.createTableViewRow({
                    id: i,
                    label: label,
                    height: "40dp",
                    backgroundColor: "white",
                    rightImage: "plus_icon.png",
                    selectedBackgroundColor: "gray",
                    rowID: templatesFromJSON[i].rowid
                });
                if (-1 != Ti.App.Properties.getList("activeTemplates").indexOf(templatesFromJSON[i].name)) {
                    label.color = "gray";
                    singleTemplate.selectedColor = "white";
                    singleTemplate.selectedBackgroundColor = "white";
                }
                singleTemplate.add(label);
                templates.push(singleTemplate);
            }
            $.templatesForDownload.data = templates;
        };
        $.templatesForDownload.addEventListener("click", function(event) {
            if (-1 == Ti.App.Properties.getList("activeTemplates").indexOf(event.rowData.label.text)) {
                event.rowData.label.color = "gray";
                event.rowData.selectedColor = "white";
                event.rowData.selectedBackgroundColor = "white";
                downloadTemplate(event);
            }
        });
        var templatesAPI = "http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON";
        HTTP_CLIENT.open("POST", templatesAPI);
        HTTP_CLIENT.send();
    }
    function downloadTemplate(event) {
        var HTTP_CLIENT = Ti.Network.createHTTPClient();
        HTTP_CLIENT.onload = function() {
            var templateFromJSON = JSON.parse('{ "rowid": 3, "name": "Single Text Field", "form_type_rowid_fk": 1, "form_type": "Sample Card", "description": "A test form with examples of each currently supported field type.", "timestamp_loaded_utc": "2013-05-20T21:30:30.641221+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.641221+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public", "talkiviFields": [ {"rowid": 1, "name": "Name", "prompt": "Name", "field_type_rowid_fk": 1, "field_type": "Text", "required": "Yes", "length": 100, "num_decimals": 0, "default_value": "", "numeric_min": "", "numeric_max": "", "validation_set_rowid_fk": "", "help_text": "", "description": "The name of something.", "timestamp_loaded_utc": "2013-05-20T21:30:30.487471+00:00", "timestamp_modified_utc": "2013-05-20T21:30:30.487471+00:00", "owner_rowid_fk": 1, "owner_username": "talkivi", "access_rowid_fk": 2, "access_name": "Public" } ] }');
            Ti.App.Properties.setObject(templateFromJSON.name, templateFromJSON);
            var tempTemplates = Ti.App.Properties.getList("activeTemplates");
            tempTemplates.push(templateFromJSON.name);
            Ti.App.Properties.setList("activeTemplates", tempTemplates);
            Ti.API.info(Ti.App.Properties.getList("activeTemplates"));
        };
        var templateAPI = "http://www.talkivi.org/talkivi-server/ws/form?rowid=" + event.rowData.rowID + "&format=JSON";
        HTTP_CLIENT.open("POST", templateAPI);
        HTTP_CLIENT.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.downloadTemplatesWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "downloadTemplatesWindow",
        title: "Download Forms"
    });
    $.__views.downloadTemplatesWindow && $.addTopLevelView($.__views.downloadTemplatesWindow);
    $.__views.doneButton = Ti.UI.createButton({
        id: "doneButton",
        title: "Done"
    });
    doneButtonClicked ? $.__views.doneButton.addEventListener("click", doneButtonClicked) : __defers["$.__views.doneButton!click!doneButtonClicked"] = true;
    $.__views.downloadTemplatesWindow.rightNavButton = $.__views.doneButton;
    $.__views.templatesForDownload = Ti.UI.createTableView({
        id: "templatesForDownload"
    });
    $.__views.downloadTemplatesWindow.add($.__views.templatesForDownload);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.downloadTemplatesWindow.modal = true;
    $.downloadTemplatesWindow.open();
    loadTemplates();
    __defers["$.__views.doneButton!click!doneButtonClicked"] && $.__views.doneButton.addEventListener("click", doneButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;