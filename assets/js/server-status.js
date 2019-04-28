$.getJSON("https://api.mcsrvstat.us/2/play.rexkraft.com", function(server) {
	// To test other functionalities of this function replace link above with either
    // either one of the links below.
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
    	var documentFragment = document.createDocumentFragment(); // Create a virtual node
    	var total_players = server.players.list.length;
    	var player_list = server.players.list;

    	for (var i = 0; i < total_players; i += 1) {
    		var img_tag = document.createElement("img"); // Create an img tag
    		var title_attribute = document.createAttribute("title");  // Create a title attribute
            title_attribute.value = player_list[i]; // Set the title attribute to the i'th player name
            img_tag.className = "player-head"; // Apply 'player-head' class to img tag
            img_tag.src = "http://cravatar.eu/helmavatar/" + player_list[i] + "/30.png";  // Set img src to a 30px x 30px image of the player's head
            img_tag.setAttributeNode(title_attribute);  // Apply the title attribute to img tag
            documentFragment.appendChild(img_tag); // Add img tag to virtual node
        }
        document.getElementById("online-players").appendChild(documentFragment); // Append virtual node to online-players div
    }
});


// Taken and modified from https://jqueryui.com/tooltip/#custom-style
$(function() {
	$("#online-players").tooltip({
		show:false, // Disable fade-in transition
		hide:false, // Disable fade-out transition
		position: {
			my:"center bottom-5", // Align icon to bottom of tooltip
			at:"center top", // Place tooltip on top of icon
			using: function(position, feedback) {
				$(this).css(position);
				$("<div>")
                .addClass("arrow")
                .addClass(feedback.vertical)
                .addClass(feedback.horizontal)
                .appendTo(this);
			}
		}
	});
});
