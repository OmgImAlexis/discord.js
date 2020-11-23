'use strict';

// "Root" classes (starting points)
import Client from './client/Client';
import BaseClient from './client/BaseClient';
import Shard from './sharding/Shard';
import ShardClientUtil from './sharding/ShardClientUtil';
import ShardingManager from './sharding/ShardingManager';
import WebhookClient from './client/WebhookClient';

// Managers
import BaseManager from './managers/BaseManager';
import BaseGuildEmojiManager from './managers/BaseGuildEmojiManager';
import ChannelManager from './managers/ChannelManager';
import GuildChannelManager from './managers/GuildChannelManager';
import GuildEmojiManager from './managers/GuildEmojiManager';
import GuildEmojiRoleManager from './managers/GuildEmojiRoleManager';
import GuildManager from './managers/GuildManager';
import GuildMemberManager from './managers/GuildMemberManager';
import GuildMemberRoleManager from './managers/GuildMemberRoleManager';
import MessageManager from './managers/MessageManager';
import PresenceManager from './managers/PresenceManager';
import ReactionManager from './managers/ReactionManager';
import ReactionUserManager from './managers/ReactionUserManager';
import RoleManager from './managers/RoleManager';
import UserManager from './managers/UserManager';
import VoiceStateManager from './managers/VoiceStateManager';

// Shortcuts to Util methods
import ActivityFlags from './util/ActivityFlags';
import BitField from './util/BitField';
import Collection from './util/Collection';
import * as Constants from './util/Constants';
import DataResolver from './util/DataResolver';
import Intents from './util/Intents';
import MessageFlags from './util/MessageFlags';
import Permissions from './util/Permissions';
import Snowflake from './util/Snowflake';
import Speaking from './util/Speaking';
import Structures from './util/Structures';
import SystemChannelFlags from './util/SystemChannelFlags';
import UserFlags from './util/UserFlags';
import Util from './util/Util';

// Errors
import DiscordAPIError from './rest/DiscordAPIError';
import HTTPError from './rest/HTTPError';

// Structures
import Application from './structures/interfaces/Application';
import Collector from './structures/interfaces/Collector';
import APIMessage from './structures/APIMessage';
import Base from './structures/Base';
import BaseGuildEmoji from './structures/BaseGuildEmoji';
import CategoryChannel from './structures/CategoryChannel';
import ClientPresence from './structures/ClientPresence';
import Channel from './structures/Channel';
import ClientUser from './structures/ClientUser';
import ClientApplication from './structures/ClientApplication';
import DMChannel from './structures/DMChannel';
import Emoji from './structures/Emoji';
import Guild from './structures/Guild';
import GuildChannel from './structures/GuildChannel';
import GuildAuditLogs from './structures/GuildAuditLogs';
import GuildEmoji from './structures/GuildEmoji';
import GuildMember from './structures/GuildMember';
import GuildPreview from './structures/GuildPreview';
import GuildTemplate from './structures/GuildTemplate';
import Integration from './structures/Integration';
import Invite from './structures/Invite';
import Message from './structures/Message';
import MessageAttachment from './structures/MessageAttachment';
import MessageCollector from './structures/MessageCollector';
import MessageEmbed from './structures/MessageEmbed';
import MessageMentions from './structures/MessageMentions';
import MessageReaction from './structures/MessageReaction';
import NewsChannel from './structures/NewsChannel';
import PermissionOverwrites from './structures/PermissionOverwrites';
import { Activity, Presence, RichPresenceAssets } from './structures/Presence';
import ReactionCollector from './structures/ReactionCollector';
import ReactionEmoji from './structures/ReactionEmoji';
import Role from './structures/Role';
import StoreChannel from './structures/StoreChannel';
import Team from './structures/Team';
import TeamMember from './structures/TeamMember';
import TextChannel from './structures/TextChannel';
import User from './structures/User';
import VoiceChannel from './structures/VoiceChannel';
import VoiceRegion from './structures/VoiceRegion';
import VoiceState from './structures/VoiceState';
import Webhook from './structures/Webhook';

import * as WebSocket from './WebSocket';

export {
  // "Root" classes (starting points)
  BaseClient,
  Client,
  Shard,
  ShardClientUtil,
  ShardingManager,
  WebhookClient,

  // Managers
  BaseManager,
  BaseGuildEmojiManager,
  ChannelManager,
  GuildChannelManager,
  GuildEmojiManager,
  GuildEmojiRoleManager,
  GuildManager,
  GuildMemberManager,
  GuildMemberRoleManager,
  MessageManager,
  PresenceManager,
  ReactionManager,
  ReactionUserManager,
  RoleManager,
  UserManager,
  VoiceStateManager,

  // Structures
  APIMessage,
  Application,
  Base,
  BaseGuildEmoji,
  CategoryChannel,
  Channel,
  ClientApplication,
  ClientPresence,
  Collector,
  DMChannel,
  Emoji,
  ClientUser,
  Guild,
  GuildAuditLogs,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  GuildPreview,
  GuildTemplate,
  Integration,
  Invite,
  Message,
  MessageAttachment,
  MessageCollector,
  MessageEmbed,
  MessageMentions,
  MessageReaction,
  NewsChannel,
  PermissionOverwrites,
  Presence,
  ReactionCollector,
  ReactionEmoji,
  RichPresenceAssets,
  Role,
  StoreChannel,
  Team,
  TeamMember,
  TextChannel,
  User,
  VoiceChannel,
  VoiceRegion,
  VoiceState,
  Webhook,

  WebSocket
};

const Discord = {
  // "Root" classes (starting points)
  BaseClient,
  Client,
  Shard,
  ShardClientUtil,
  ShardingManager,
  WebhookClient,

  // Utilities
  ActivityFlags,
  BitField,
  Collection,
  Constants,
  DataResolver,
  BaseManager,
  DiscordAPIError,
  HTTPError,
  MessageFlags,
  Intents,
  Permissions,
  Speaking,
  Snowflake,
  SnowflakeUtil: Snowflake,
  Structures,
  SystemChannelFlags,
  UserFlags,
  Util,
  version: Constants.Package.version,

  // Managers
  BaseGuildEmojiManager,
  ChannelManager,
  GuildChannelManager,
  GuildEmojiManager,
  GuildEmojiRoleManager,
  GuildMemberManager,
  GuildMemberRoleManager,
  GuildManager,
  ReactionManager,
  ReactionUserManager,
  MessageManager,
  PresenceManager,
  RoleManager,
  UserManager,

  // Shortcuts to Util methods
  discordSort: Util.discordSort,
  escapeMarkdown: Util.escapeMarkdown,
  fetchRecommendedShards: Util.fetchRecommendedShards,
  resolveColor: Util.resolveColor,
  resolveString: Util.resolveString,
  splitMessage: Util.splitMessage,

  // Structures
  Activity,
  APIMessage,
  Application,
  Base,
  BaseGuildEmoji,
  CategoryChannel,
  Channel,
  ClientApplication,
  ClientPresence,
  Collector,
  DMChannel,
  Emoji,
  get ClientUser() {
    // This is a getter so that it properly extends any custom User class
    return ClientUser;
  },
  Guild,
  GuildAuditLogs,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  GuildPreview,
  GuildTemplate,
  Integration,
  Invite,
  Message,
  MessageAttachment,
  MessageCollector,
  MessageEmbed,
  MessageMentions,
  MessageReaction,
  NewsChannel,
  PermissionOverwrites,
  Presence,
  ReactionCollector,
  ReactionEmoji,
  RichPresenceAssets,
  Role,
  StoreChannel,
  Team,
  TeamMember,
  TextChannel,
  User,
  VoiceChannel,
  VoiceRegion,
  VoiceState,
  Webhook,

  WebSocket,
};

export default Discord;