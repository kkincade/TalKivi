function Controller() {
    function doneButtonClicked() {
        $.downloadTemplatesWindow.close();
    }
    function loadTemplates() {
        var HTTP_CLIENT = Ti.Network.createHTTPClient();
        HTTP_CLIENT.onload = function() {
            var templatesFromJSON = JSON.parse(this.responseText);
            var templates = [];
            for (var i = 0; templatesFromJSON.length > i; ++i) {
                var singleTemplate = Ti.UI.createTableViewRow({
                    id: i,
                    height: "40dp",
                    backgroundColor: "white",
                    rightImage: "plus_icon.png",
                    selectedBackgroundColor: "gray",
                    rowID: templatesFromJSON[i].rowid
                });
                var form = Ti.UI.createLabel({
                    text: templatesFromJSON[i].name
                });
                singleTemplate.add(form);
                templates.push(singleTemplate);
            }
            $.templatesForDownload.data = templates;
        };
        $.templatesForDownload.addEventListener("click", function(e) {
            downloadTemplate(e);
        });
        var formsAPI = "http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON";
        HTTP_CLIENT.open("POST", formsAPI);
        HTTP_CLIENT.send();
    }
    function downloadTemplate(event) {
        alert("Row ID: " + event.rowData.rowID);
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