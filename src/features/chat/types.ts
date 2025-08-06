export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  status: 'online' | 'away' | 'offline';
};

export type Message = {
  id: string;
  conversationId: string;
  sender: User;
  content: string;
  timestamp: string;
  attachments?: string[]; // URLs or file names
  emojis?: string[];
  isOwn?: boolean;
};

export type Conversation = {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  status: 'active' | 'archived';
};