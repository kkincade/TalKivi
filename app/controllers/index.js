// Ti.App.Properties.removeProperty("activeTemplates");
// Setup persistence for downloaded forms (The only time these are null is on the first launch of the application)
if (Ti.App.Properties.getList("activeTemplates") == null) {
	Ti.App.Properties.setList("activeTemplates", []);
}

if (Ti.App.Properties.getList("completedForms") == null) {
	Ti.App.Properties.setList("completedForms", []);
}

if (Ti.App.Properties.getList("settings") == null) {
	Ti.App.Properties.setList("settings", []);
}

if (Ti.App.Properties.getInt("TDP_INCREMENT") == null) {
	Ti.App.Properties.setInt("TDP_INCREMENT", 0);
}

// open index window
Ti.App.fireEvent('populateTemplates');
$.index.open();
