import React from "react";
import { Message, User } from "./types";

type ChatWindowProps = {
  messages: Message[];
  currentUser: User;
  typingUsers: User[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUser,
  typingUsers,
}) => (
  <section className="flex-1 flex flex-col bg-gray-50 h-full overflow-y-auto">
    <div className="flex-1 p-2 md:p-4 space-y-3 md:space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80vw] md:max-w-md rounded-2xl px-4 py-2 shadow-md border ${
              msg.isOwn
                ? "bg-blue-500 text-white border-blue-200 rounded-br-sm"
                : "bg-white text-gray-900 border-gray-200 rounded-bl-sm"
            }`}
          >
            <div className="text-base md:text-sm break-words">{msg.content}</div>
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.attachments.map((att, i) => (
                  <a
                    key={i}
                    href={att}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline text-blue-100 hover:text-blue-300"
                  >
                    Attachment {i + 1}
                  </a>
                ))}
              </div>
            )}
            <div className="text-xs text-right mt-1 opacity-70">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
      {typingUsers.length > 0 && (
        <div className="text-xs text-blue-400 italic pl-2">
          {typingUsers.map((u) => u.name).join(", ")} typing...
        </div>
      )}
    </div>
  </section>
);

export default ChatWindow;