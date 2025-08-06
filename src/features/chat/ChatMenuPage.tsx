import React, { useState, useEffect } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import { Conversation, Message, User } from "./types";

// Mock users
const mockUsers: User[] = [
  { id: "1", name: "Dr. Alice", status: "online", avatarUrl: "" },
  { id: "2", name: "Nurse Bob", status: "away", avatarUrl: "" },
  { id: "me", name: "You", status: "online", avatarUrl: "" },
];

// Mock messages per conversation
const mockMessagesByConv: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      conversationId: "c1",
      sender: mockUsers[0],
      content: "How are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isOwn: false,
    },
    {
      id: "m2",
      conversationId: "c1",
      sender: mockUsers[2],
      content: "Much better, thank you! 😊",
      timestamp: new Date(Date.now() - 1000 * 60 * 59).toISOString(),
      isOwn: true,
      emojis: ["😊"],
    },
    {
      id: "m3",
      conversationId: "c1",
      sender: mockUsers[0],
      content: "Glad to hear! Please see the attached prescription.",
      timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString(),
      isOwn: false,
      attachments: ["https://example.com/prescription.pdf"],
    },
  ],
  c2: [
    {
      id: "m4",
      conversationId: "c2",
      sender: mockUsers[1],
      content: "Lab results are ready.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isOwn: false,
    },
    {
      id: "m5",
      conversationId: "c2",
      sender: mockUsers[2],
      content: "Thank you! 📎",
      timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
      isOwn: true,
      emojis: ["📎"],
      attachments: ["https://example.com/lab.pdf"],
    },
  ],
};

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: "c1",
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: mockMessagesByConv.c1[mockMessagesByConv.c1.length - 1],
    unreadCount: 2,
    status: "active",
  },
  {
    id: "c2",
    participants: [mockUsers[1], mockUsers[2]],
    lastMessage: mockMessagesByConv.c2[mockMessagesByConv.c2.length - 1],
    unreadCount: 1,
    status: "active",
  },
];

const ChatMenuPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("c1");
  const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>(mockMessagesByConv);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const currentUser = mockUsers[2];

  // Simulate typing indicator when switching conversations
  useEffect(() => {
    const conv = conversations.find((c) => c.id === selectedId);
    if (conv && conv.participants[0].id !== currentUser.id) {
      setTypingUsers([conv.participants[0]]);
      const timeout = setTimeout(() => setTypingUsers([]), 2000);
      return () => clearTimeout(timeout);
    }
    setTypingUsers([]);
  }, [selectedId, conversations, currentUser.id]);

  // Mark conversation as read when selected
  useEffect(() => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId ? { ...c, unreadCount: 0 } : c
      )
    );
  }, [selectedId]);

  const handleSend = (text: string) => {
    setMessagesByConv((prev) => {
      const newMsg: Message = {
        id: `m${Object.values(prev).flat().length + 1}`,
        conversationId: selectedId,
        sender: currentUser,
        content: text,
        timestamp: new Date().toISOString(),
        isOwn: true,
      };
      return {
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), newMsg],
      };
    });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              lastMessage: {
                id: `m${Object.values(messagesByConv).flat().length + 1}`,
                conversationId: selectedId,
                sender: currentUser,
                content: text,
                timestamp: new Date().toISOString(),
                isOwn: true,
              },
            }
          : c
      )
    );
  };

  const handleAttach = () => {
    alert("Attach file (mock)");
  };

  const handleEmoji = (emoji: string) => {
    alert(`Emoji: ${emoji} (mock)`);
  };

  return (
    <SidebarLayout>
      <div className="flex h-full">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <div className="flex flex-col flex-1 h-full">
          <ChatWindow
            messages={messagesByConv[selectedId] || []}
            currentUser={currentUser}
            typingUsers={typingUsers}
          />
          <MessageInput
            onSend={handleSend}
            onAttach={handleAttach}
            onEmoji={handleEmoji}
            isTyping={typingUsers.length > 0}
            currentUser={currentUser}
          />
        </div>
      </div>
    </SidebarLayout>
  );
};

/**
 * TODO: Real-time integration plan:
 * - Replace mock data with API/WebSocket data.
 * - On mount, connect to WebSocket (e.g., socket.io, native WS, or a service).
 * - Listen for events: new message, typing, status, new conversation.
 * - Update state accordingly (setMessagesByConv, setConversations, setTypingUsers).
 * - On send, emit message event to server.
 * - On typing, emit typing event to server.
 * - Handle reconnection and error states.
 */
export default ChatMenuPage;