const request = require("superagent");

function get_url(socket, path) {
	if (!path) {
		path = "";
	}
	const referer = socket.request.headers.referer;
	const portMatch = referer ? referer.match(/:(\d+)\//) : null;
	const port = portMatch ? (":" + portMatch[1]) : '';

	return socket.request.headers.origin + port + path;
}

// Authenticates a partial request created using superagent
function frappe_request(path, socket) {
	const partial_req = request.get(get_url(socket, path));
	if (socket.authorization_header) {
		return partial_req.set("Authorization", socket.authorization_header);
	} else if (socket.sid) {
		return partial_req.query({ sid: socket.sid });
	}
}

module.exports = {
	get_url,
	frappe_request,
};
