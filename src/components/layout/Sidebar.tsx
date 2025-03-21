import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingBag,
  Shirt,
  Heart,
  Settings,
  LogOut,
  User,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Sidebar = ({
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  onLogout = () => console.log("Logout clicked"),
}: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      path: "/wardrobe",
      label: "My Wardrobe",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      path: "/outfit-suggestions",
      label: "Outfit Suggestions",
      icon: <Shirt className="mr-2 h-4 w-4" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      path: "/saved-outfits",
      label: "Saved Outfits",
      icon: <Heart className="mr-2 h-4 w-4" />,
      color: "from-pink-500 to-pink-600",
    },
    {
      path: "/account-settings",
      label: "Account Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      color: "from-gray-500 to-gray-600",
    },
    {
      path: "/help",
      label: "Help & Guide",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="w-[250px] h-full bg-white border-r border-gray-200 flex flex-col shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -inset-1 bg-primary/10 rounded-full blur-md -z-10" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{userName}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-primary" />
              Fashion Enthusiast
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, i) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm rounded-lg w-full transition-all duration-300",
                  location.pathname === item.path
                    ? `bg-gradient-to-r ${item.color} text-white font-medium shadow-md`
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                )}
              >
                {item.icon}
                {item.label}
                {location.pathname === item.path && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Separator className="my-4" />
        <div>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-300"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
