import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import UserGuide from "@/components/help/UserGuide";

const HelpPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <UserGuide />
      </div>
    </div>
  );
};

export default HelpPage;
