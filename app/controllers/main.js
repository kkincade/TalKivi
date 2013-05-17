$.main.open();

function sendClient() {
	
	var API_TEST = Ti.Network.createHTTPClient();

	API_TEST.onload = function() {
		Ti.API.info('Word.');
		alert('Response Received.');
		Ti.API.info(this.responseText);
	};

	var newAPI = 'http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON';
	API_TEST.open("POST", newAPI);

	Ti.API.info('Word?');

	API_TEST.send();
	
}
