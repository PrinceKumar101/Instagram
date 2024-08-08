import React from "react";
import { Search, Instagram, FavoriteBorderOutlined } from "@mui/icons-material";

const Topbar = () => {
  return (
    <div className="w-full h-fit bg-slate-200 rounded flex flex-row gap-4 justify-between items-center p-2 pt-4">
      <div className="flex-shrink-0">
        <Instagram />
      </div>
      <div className="flex flex-grow gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-1 border rounded"
        />
        <FavoriteBorderOutlined />
      </div>
    </div>
  );
};

export default Topbar;
