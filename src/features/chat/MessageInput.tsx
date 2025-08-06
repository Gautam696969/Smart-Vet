import React, { useState } from "react";
import { User } from "./types";

type MessageInputProps = {
  onSend: (text: string) => void;
  onAttach: () => void;
  onEmoji: (emoji: string) => void;
  isTyping: boolean;
  currentUser: User;
};

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onAttach,
  onEmoji,
  isTyping,
  currentUser,
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 md:p-3 border-t bg-white sticky bottom-0 z-10 shadow-inner">
      <button
        type="button"
        className="p-2 rounded-full hover:bg-blue-50 transition-colors"
        title="Attach file"
        onClick={onAttach}
      >
        <span role="img" aria-label="Attach" className="text-lg">
          📎
        </span>
      </button>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-blue-50 transition-colors"
        title="Emoji"
        onClick={() => onEmoji("😊")}
      >
        <span role="img" aria-label="Emoji" className="text-lg">
          😊
        </span>
      </button>
      <input
        className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        type="button"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-semibold shadow"
        onClick={handleSend}
      >
        Send
      </button>
      {isTyping && (
        <span className="ml-2 text-xs text-blue-400 italic">Typing…</span>
      )}
    </div>
  );
};

export default MessageInput;