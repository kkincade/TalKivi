// Require library
var fieldHandler = require('fieldHandler');

// generateForm function, takes json data for form and a view to add views to
exports.generateTemplate = function(data, tableView) {
	talkiviFormItemSet = data.talkiviFormItemSet;
	tableViewRows = [];
	if (talkiviFormItemSet != null) {
		for (var i = 0; i < talkiviFormItemSet.length; ++i) {
			var tableViewRow = fieldHandler.generateFieldView(talkiviFormItemSet[i].talkiviField);
			tableViewRows.push(tableViewRow);
		}
		tableView.data = tableViewRows;
	} else {
		view.add(Ti.UI.createLabel({text: "Form could not be loaded"}));
	}
}
