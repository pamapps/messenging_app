import {IChatMessage} from './chat-message.interface';

export interface IChat{
   chatTitle: string;
   chatId: string;
   creatorId: string;
   conversation: [IChatMessage];
}