"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");

var User = require("../../Structures/User.js"),
    Channel = require("../../Structures/Channel.js"),
    TextChannel = require("../../Structures/TextChannel.js"),
    VoiceChannel = require("../../Structures/VoiceChannel.js"),
    ServerChannel = require("../../Structures/ServerChannel.js"),
    PMChannel = require("../../Structures/PMChannel.js"),
    Server = require("../../Structures/Server.js"),
    Message = require("../../Structures/Message.js"),
    Invite = require("../../Structures/Invite.js");

var Resolver = (function () {
	function Resolver(internal) {
		_classCallCheck(this, Resolver);

		this.internal = internal;
	}

	Resolver.prototype.resolveInviteID = function resolveInviteID(resource) {
		if (resource instanceof Invite) {
			return resource.id;
		} else if (typeof resource == "string" || resource instanceof String) {

			if (resource.indexOf("http") === 0) {
				var split = resource.split("/");
				return split.pop();
			} else {
				return resource;
			}
		}
		return null;
	};

	Resolver.prototype.resolveServer = function resolveServer(resource) {
		if (resource instanceof Server) {
			return resource;
		} else if (resource instanceof ServerChannel) {
			return resource.server;
		} else if (resource instanceof String || typeof resource === "string") {
			return this.internal.servers.get("id", resource);
		} else if (resource instanceof Message) {
			if (resource.channel instanceof TextChannel) {
				return resource.server;
			}
		}
		return null;
	};

	Resolver.prototype.resolveFile = function resolveFile(resource) {
		if (typeof resource === "string" || resource instanceof String) {
			return fs.createReadStream(resource);
		} else {
			return resource;
		}
	};

	Resolver.prototype.resolveMentions = function resolveMentions(resource) {
		// resource is a string
		var _mentions = [];
		for (var _iterator = resource.match(/<@[^>]*>/g) || [], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var mention = _ref;

			_mentions.push(mention.substring(2, mention.length - 1));
		}
		return _mentions;
	};

	Resolver.prototype.resolveString = function resolveString(resource) {

		// accepts Array, Channel, Server, User, Message, String and anything
		// toString()-able

		var final = resource;
		if (resource instanceof Array) {
			final = resource.join("\n");
		}

		return final.toString();
	};

	Resolver.prototype.resolveUser = function resolveUser(resource) {
		/*
  	accepts a Message, Channel, Server, String ID, User, PMChannel
  */
		var found = null;
		if (resource instanceof User) {
			found = resource;
		} else if (resource instanceof Message) {
			found = resource.author;
		} else if (resource instanceof TextChannel) {
			var lmsg = resource.lastMessage;
			if (lmsg) {
				found = lmsg.author;
			}
		} else if (resource instanceof Server) {
			found = resource.owner;
		} else if (resource instanceof PMChannel) {
			found = resource.recipient;
		} else if (resource instanceof String || typeof resource === "string") {
			found = this.client.internal.users.get("id", resource);
		}

		return found;
	};

	Resolver.prototype.resolveMessage = function resolveMessage(resource) {
		// accepts a Message, PMChannel & TextChannel
		var found = null;

		if (resource instanceof TextChannel || resource instanceof PMChannel) {
			found = resource.lastMessage;
		} else if (resource instanceof Message) {
			found = resource;
		}

		return found;
	};

	Resolver.prototype.resolveVoiceChannel = function resolveVoiceChannel(resource) {
		// resolveChannel will also work but this is more apt
		if (resource instanceof VoiceChannel) {
			return resource;
		}
		return null;
	};

	Resolver.prototype.resolveChannel = function resolveChannel(resource) {
		/*
  	accepts a Message, Channel, Server, String ID, User
   */
		var self = this;

		return new Promise(function (resolve, reject) {
			var found = null;
			if (resource instanceof Message) {
				found = resource.channel;
			} else if (resource instanceof Channel) {
				found = resource;
			} else if (resource instanceof Server) {
				found = resource.channels.get("id", resource.id);
			} else if (resource instanceof String || typeof resource === "string") {
				found = self.internal.channels.get("id", resource);
			} else if (resource instanceof User) {
				// see if a PM exists
				var chatFound = false;
				for (var _iterator2 = self.internal.private_channels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var pmchat = _ref2;

					if (pmchat.recipient.equals(resource)) {
						chatFound = pmchat;
						break;
					}
				}
				if (chatFound) {
					// a PM already exists!
					found = chatFound;
				} else {
					// PM does not exist :\
					self.internal.startPM(resource).then(function (pmchannel) {
						return resolve(pmchannel);
					})["catch"](function (e) {
						return reject(e);
					});
					return;
				}
			}
			if (found) resolve(found);else reject();
		});
	};

	return Resolver;
})();

module.exports = Resolver;