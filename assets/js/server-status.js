$.getJSON("https://api.mcsrvstat.us/2/sopixelmon.com", function(server) {
	// To test other functionalities of this function replace link above with
	// https://api.mcsrvstat.us/2/arcadiaeco.us.to
    // https://api.mcsrvstat.us/2/play.rexkraft.com
	var online = document.getElementById("online");
	var version = document.getElementById("version");
	var players = document.getElementById("players");
	var ip_address = document.getElementById("ip");
	var online_players = document.getElementById("online-players");

	if (server.online === true) { // If server is online
		online.innerHTML = "Online! <i class=\"fa fa-check\" style=\"color:#00FF00;\"></i>";
        version.textContent = server.version;
        players.textContent = server.players.online + "/" + server.players.max + " Online"; // Current Players / Max Players Online
    } else {  // If server is offline
    	online.innerHTML = "Offline <i class=\"fa fa-times\" style=\"color:#FF0000;\"></i>";
        version.textContent = "None";
        players.textContent = "0/0 Online";
    	
    }

    if (typeof server.hostname === "undefined") { // If server uses IP instead of a web address
    	ip_address.textContent = server.ip + ":" + server.port;  // IP:PORT
    } else {
    	ip_address.textContent = server.hostname;
    }

    if (typeof server.players.list === "undefined") { // If server doesn't allow listing online players
    	online_players.textContent = "N/A";
    } else {
    	online_players.innerHTML = "<br>";
    	var documentFragment = document.createDocumentFragment(); // Create a virtual node/tag
    	var total_players = server.players.list.length;
    	var player_list = server.players.list;

    	for (var i = 0; i < total_players; i += 1) {
    		var img_tag = document.createElement("img");
    		var l = document.createAttribute("title");
            l.value = player_list[i];
            img_tag.className = "player-head";
            img_tag.src = "http://cravatar.eu/helmavatar/" + player_list[i] + "/30.png";
            img_tag.setAttributeNode(l);
            documentFragment.appendChild(img_tag);
        }
        document.getElementById("online-players").appendChild(documentFragment);
    }
});

$(function() {
	$("#online-players").tooltip({
		show:false,
		hide:false,
		position: {
			my:"center bottom-5",
			at:"center top",
			using: function(position, feedback) {
				$(this).css(position);
				$("<div>").addClass("arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
			}
		}
	});
});
