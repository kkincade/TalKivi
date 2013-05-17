function Controller() {
    function testAPI() {
        var HTTP_CLIENT = Ti.Network.createHTTPClient();
        HTTP_CLIENT.onload = function() {
            var data = '[{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"3","record_status_rowid_fk":"1","record_status":"Active","name":"Example Text Field","description":"Example public form with a single field for text data entry.  The world\'s simplest form.","timestamp_loaded_utc":"2013-05-13T17:07:17.443235+00:00","timestamp_modified_utc":"2013-05-13T17:07:17.443235+00:00"},{"owner_rowid_fk":"1","owner_username":"talkivi","access_rowid_fk":"2","access_name":"Public","form_type_rowid_fk":"1","form_type":"Sample Card","null_rowid":-99,"rowid":"1","record_status_rowid_fk":"1","record_status":"Active","name":"Example Soil Sample Card","description":"Example public sample card to collect soil data.","timestamp_loaded_utc":"2013-04-13T02:27:21.837183+00:00","timestamp_modified_utc":"2013-04-13T02:27:21.837183+00:00"}]';
            var parsedData = JSON.parse(data);
            var tableViewData = [];
            for (var i = 0; parsedData.length > i; ++i) {
                var formsTableViewRow = Ti.UI.createTableViewRow({
                    height: "40dp",
                    backgroundColor: "lime"
                });
                var form = Ti.UI.createLabel({
                    text: parsedData[i].name
                });
                formsTableViewRow.add(form);
                tableViewData.push(formsTableViewRow);
            }
            $.formsTableView.data = tableViewData;
        };
        var talkiviAPI = "http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON";
        HTTP_CLIENT.open("POST", talkiviAPI);
        HTTP_CLIENT.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.forms = Ti.UI.createWindow({
        title: "Forms",
        id: "forms"
    });
    $.__views.forms && $.addTopLevelView($.__views.forms);
    $.__views.addFormButton = Ti.UI.createButton({
        id: "addFormButton",
        title: "+"
    });
    testAPI ? $.__views.addFormButton.addEventListener("click", testAPI) : __defers["$.__views.addFormButton!click!testAPI"] = true;
    $.__views.forms.rightNavButton = $.__views.addFormButton;
    $.__views.formsTableView = Ti.UI.createTableView({
        id: "formsTableView"
    });
    $.__views.forms.add($.__views.formsTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.addFormButton!click!testAPI"] && $.__views.addFormButton.addEventListener("click", testAPI);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;