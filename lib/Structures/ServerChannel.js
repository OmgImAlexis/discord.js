"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Channel = require("./Channel.js");
var Cache = require("../Util/Cache.js");
var PermissionOverwrite = require("./PermissionOverwrite.js");
var ChannelPermissions = require("./ChannelPermissions.js");
var reg = require("../Util/ArgumentRegulariser.js").reg;

var ServerChannel = (function (_Channel) {
	_inherits(ServerChannel, _Channel);

	function ServerChannel(data, client, server) {
		var _this = this;

		_classCallCheck(this, ServerChannel);

		_Channel.call(this, data, client);
		this.name = data.name;
		this.type = data.type;
		this.position = data.position;
		this.permissionOverwrites = new Cache();
		this.server = server;
		data.permission_overwrites.forEach(function (permission) {
			_this.permissionOverwrites.add(new PermissionOverwrite(permission));
		});
	}

	ServerChannel.prototype.permissionsOf = function permissionsOf(user) {
		user = this.client.internal.resolver.resolveUser(user);
		if (user) {
			if (this.server.owner.equals(user)) {
				return new ChannelPermissions(4294967295);
			}
			var everyoneRole = this.server.roles.get("name", "@everyone");

			var userRoles = [everyoneRole].concat(this.server.rolesOf(user) || []);
			var userRolesID = userRoles.map(function (v) {
				return v.id;
			});
			var roleOverwrites = [],
			    memberOverwrites = [];

			this.permissionOverwrites.forEach(function (overwrite) {
				if (overwrite.type === "member" && overwrite.id === user.id) {
					memberOverwrites.push(overwrite);
				} else if (overwrite.type === "role" && overwrite.id in userRolesID) {
					roleOverwrites.push(overwrite);
				}
			});

			var permissions = 0;

			for (var _iterator = userRoles, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref = _i.value;
				}

				var serverRole = _ref;

				permissions |= serverRole.permissions;
			}

			for (var _iterator2 = roleOverwrites.concat(memberOverwrites), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref2 = _i2.value;
				}

				var overwrite = _ref2;

				permissions = permissions & ~overwrite.deny;
				permissions = permissions | overwrite.allow;
			}

			return new ChannelPermissions(permissions);
		} else {
			return null;
		}
	};

	ServerChannel.prototype.permsOf = function permsOf(user) {
		return this.permissionsOf(user);
	};

	ServerChannel.prototype.toString = function toString() {
		return this.name;
	};

	ServerChannel.prototype.setName = function setName() {
		return this.client.setChannelName.apply(this.client, reg(this, arguments));
	};

	return ServerChannel;
})(Channel);

module.exports = ServerChannel;