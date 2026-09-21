import React from "react";

export const Card = ({ children, className = "", hover = false, ...props }) => (
  <div className={`bg-[#161B22] border border-[#374151] rounded-2xl p-5 ${hover ? "hover:border-[#00E6A5]/50 hover:shadow-lg transition-all" : ""} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
