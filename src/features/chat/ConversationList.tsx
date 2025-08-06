import React from "react";
import { Conversation } from "./types";
import StatusIcon from "./StatusIcon";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => (
  <aside className="w-full md:w-72 bg-white border-r h-full overflow-y-auto rounded-r-2xl shadow-lg md:shadow-none">
    <div className="sticky top-0 z-10 p-4 font-bold text-lg border-b bg-white rounded-tr-2xl">
      Conversations
    </div>
    <ul>
      {conversations.map((conv) => (
        <li
          key={conv.id}
          className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-150 rounded-lg mx-2 my-1 ${
            selectedId === conv.id
              ? "bg-blue-100 border border-blue-200 shadow"
              : "hover:bg-blue-50"
          }`}
          onClick={() => onSelect(conv.id)}
        >
          <StatusIcon status={conv.participants[0].status} />
          <div className="ml-3 flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{conv.participants[0].name}</div>
            <div className="text-xs text-gray-500 truncate">
              {conv.lastMessage.content}
            </div>
          </div>
          {conv.unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white rounded-full px-2 text-xs shadow">
              {conv.unreadCount}
            </span>
          )}
        </li>
      ))}
    </ul>
  </aside>
);

export default ConversationList;