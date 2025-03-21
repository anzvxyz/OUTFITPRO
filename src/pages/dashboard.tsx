import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Dashboard = () => {
  // Mock user data - in a real app, this would come from authentication context or API
  const userData = {
    username: "Jane Doe",
    wardrobeCount: 24,
    recentItems: [
      {
        id: "1",
        name: "Blue Oxford Shirt",
        category: "Tops",
        color: "Blue",
        image:
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
      },
      {
        id: "2",
        name: "Black Jeans",
        category: "Bottoms",
        color: "Black",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
      },
      {
        id: "3",
        name: "Brown Leather Shoes",
        category: "Footwear",
        color: "Brown",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
      },
      {
        id: "4",
        name: "Navy Blazer",
        category: "Outerwear",
        color: "Navy",
        image:
          "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&q=80",
      },
    ],
    styleScore: 78,
  };

  // Mock outfit suggestions
  const outfitSuggestions = [
    {
      id: "1",
      name: "Business Casual",
      occasion: "Work",
      items: [
        {
          id: "1",
          name: "Blue Oxford Shirt",
          category: "Tops",
          color: "Blue",
          image:
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
        },
        {
          id: "2",
          name: "Black Jeans",
          category: "Bottoms",
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&q=80",
    },
    {
      id: "2",
      name: "Weekend Casual",
      occasion: "Casual",
      items: [
        {
          id: "5",
          name: "White T-Shirt",
          category: "Tops",
          color: "White",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
        },
        {
          id: "2",
          name: "Black Jeans",
          category: "Bottoms",
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&q=80",
    },
    {
      id: "3",
      name: "Evening Out",
      occasion: "Night Out",
      items: [
        {
          id: "7",
          name: "Black Button-Up",
          category: "Tops",
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&q=80",
        },
        {
          id: "2",
          name: "Black Jeans",
          category: "Bottoms",
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=300&q=80",
    },
  ];

  // Mock saved outfits
  const savedOutfits = [
    {
      id: "1",
      name: "My Favorite Work Outfit",
      occasion: "Work",
      dateSaved: "2023-05-15",
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&q=80",
    },
    {
      id: "2",
      name: "Weekend Brunch",
      occasion: "Casual",
      dateSaved: "2023-06-02",
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&q=80",
    },
  ];

  // Handle logout function
  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would call an authentication service to log the user out
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <DashboardOverview
          username={userData.username}
          wardrobeCount={userData.wardrobeCount}
          recentItems={userData.recentItems}
          outfitSuggestions={outfitSuggestions}
          savedOutfits={savedOutfits}
          styleScore={userData.styleScore}
        />
      </div>
    </div>
  );
};

export default Dashboard;
