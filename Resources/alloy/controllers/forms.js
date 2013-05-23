function Controller() {
    function addFormsButtonClicked() {
        $.downloadForms = Alloy.createController("downloadForms");
        $.forms.add($.downloadForms.getView());
    }
    function editFormsButtonClicked() {
        if ($.formsTableView.editing) {
            $.formsTableView.editing = false;
            $.addFormButton.enabled = true;
        } else if ($.formsTableView.sections.length > 0) {
            $.formsTableView.editing = true;
            $.addFormButton.enabled = false;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.forms = Ti.UI.createWindow({
        id: "forms",
        title: "Forms"
    });
    $.__views.forms && $.addTopLevelView($.__views.forms);
    $.__views.addFormButton = Ti.UI.createButton({
        id: "addFormButton",
        title: "Add"
    });
    addFormsButtonClicked ? $.__views.addFormButton.addEventListener("click", addFormsButtonClicked) : __defers["$.__views.addFormButton!click!addFormsButtonClicked"] = true;
    $.__views.forms.rightNavButton = $.__views.addFormButton;
    $.__views.editFormsButton = Ti.UI.createButton({
        id: "editFormsButton",
        title: "Edit"
    });
    editFormsButtonClicked ? $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked) : __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] = true;
    $.__views.forms.leftNavButton = $.__views.editFormsButton;
    $.__views.formsTableView = Ti.UI.createTableView({
        id: "formsTableView"
    });
    $.__views.forms.add($.__views.formsTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.addFormButton!click!addFormsButtonClicked"] && $.__views.addFormButton.addEventListener("click", addFormsButtonClicked);
    __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] && $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;