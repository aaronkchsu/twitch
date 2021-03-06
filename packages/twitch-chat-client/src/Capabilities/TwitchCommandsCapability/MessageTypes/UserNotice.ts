import { Message, MessageParam, MessageParamDefinition, MessageType } from 'ircv3';
import ChatUser from '../../../ChatUser';
import { parseEmotes } from '../../../Toolkit/ChatTools';

/** @private */
@MessageType('USERNOTICE')
export default class UserNotice extends Message<UserNotice, 'userInfo' | 'emoteOffsets'> {
	@MessageParamDefinition({
		type: 'channel'
	})
	channel!: MessageParam;

	@MessageParamDefinition({
		trailing: true,
		optional: true
	})
	message!: MessageParam;

	get userInfo() {
		return new ChatUser(this._tags.get('login')!, this._tags);
	}

	get channelId() {
		return this._tags.get('room-id') || null;
	}

	get emoteOffsets() {
		if (!this._tags) {
			return new Map();
		}

		return parseEmotes(this._tags.get('emotes'));
	}
}
