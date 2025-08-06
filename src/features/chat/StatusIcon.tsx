import React from "react";
import { User } from "./types";

type StatusIconProps = {
  status: User["status"];
};

const statusColors: Record<User["status"], string> = {
  online: "bg-green-400",
  away: "bg-yellow-400",
  offline: "bg-gray-400",
};

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => (
  <span
    className={`inline-block w-3 h-3 rounded-full border border-white shadow ${statusColors[status]}`}
    title={status}
  />
);

export default StatusIcon;