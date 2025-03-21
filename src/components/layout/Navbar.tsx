import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Search,
  User,
  LogIn,
  LogOut,
  Shirt,
  Heart,
  Settings,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  onLogin = () => {},
  onRegister = () => {},
  onLogout = () => {},
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle search functionality
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
      // In a real app, this would trigger a search action
      // and navigate to search results page
    },
    [searchQuery],
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Reset search when opening
      setSearchQuery("");
    }
  };

  // Handle hash navigation for homepage sections
  const handleHashNavigation = (hash: string) => {
    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with hash
      return;
    }

    // If already on homepage, scroll to section
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "w-full h-[70px] fixed top-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white border-b border-gray-200",
      )}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <Shirt className="h-8 w-8 text-primary mr-2 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md -z-10" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            StyleAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={cn(
              "text-gray-700 hover:text-primary transition-colors relative group",
              location.pathname === "/" && "text-primary font-medium",
            )}
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors relative group",
                  location.pathname === "/dashboard" &&
                    "text-primary font-medium",
                )}
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/wardrobe"
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors relative group",
                  location.pathname === "/wardrobe" &&
                    "text-primary font-medium",
                )}
              >
                My Wardrobe
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/outfit-suggestions"
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors relative group",
                  location.pathname === "/outfit-suggestions" &&
                    "text-primary font-medium",
                )}
              >
                Outfit Suggestions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/saved-outfits"
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors relative group",
                  location.pathname === "/saved-outfits" &&
                    "text-primary font-medium",
                )}
              >
                Saved Outfits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => handleHashNavigation("features")}
                className="text-gray-700 hover:text-primary transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => handleHashNavigation("how-it-works")}
                className="text-gray-700 hover:text-primary transition-colors relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          )}
        </div>

        {/* Right Side - Search, Auth, User Menu */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className="text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Auth Buttons or User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors"
                  aria-label="User menu"
                >
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-xl border border-gray-200 shadow-lg animate-in slide-in-from-top-5"
              >
                <div className="flex items-center justify-start gap-3 p-2 border-b border-gray-100 pb-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="w-[200px] truncate text-sm text-gray-500 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1 text-primary" />
                      Fashion Enthusiast
                    </p>
                  </div>
                </div>
                <div className="py-2">
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link to="/dashboard" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link to="/wardrobe" className="cursor-pointer w-full">
                      <Shirt className="mr-2 h-4 w-4" />
                      My Wardrobe
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link to="/saved-outfits" className="cursor-pointer w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Outfits
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link
                      to="/account-settings"
                      className="cursor-pointer w-full"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link to="/help" className="cursor-pointer w-full">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Guide
                    </Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onLogin}
                className="hover:bg-primary/10 transition-colors"
              >
                Log in
              </Button>
              <Button
                onClick={onRegister}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 shadow-lg">
          <div className="container mx-auto">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for clothing items, outfits..."
                  className="pl-10 border-primary/20 focus:border-primary/50 rounded-full h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="ml-2 bg-primary"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="ml-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg overflow-hidden">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                location.pathname === "/"
                  ? "border-primary"
                  : "border-transparent",
              )}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/dashboard"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/wardrobe"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/wardrobe"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  My Wardrobe
                </Link>
                <Link
                  to="/outfit-suggestions"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/outfit-suggestions"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  Outfit Suggestions
                </Link>
                <Link
                  to="/saved-outfits"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/saved-outfits"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  Saved Outfits
                </Link>
                <Link
                  to="/account-settings"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/account-settings"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  Account Settings
                </Link>
                <Link
                  to="/help"
                  className={cn(
                    "text-gray-700 hover:text-primary transition-colors py-2 border-l-4 pl-3",
                    location.pathname === "/help"
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={toggleMobileMenu}
                >
                  Help & Guide
                </Link>
                <div className="pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="justify-start px-3 hover:bg-red-50 hover:text-red-600 w-full text-left"
                    onClick={() => {
                      onLogout();
                      toggleMobileMenu();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleHashNavigation("features");
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-primary transition-colors py-2 border-l-4 border-transparent pl-3 text-left w-full"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    handleHashNavigation("how-it-works");
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-primary transition-colors py-2 border-l-4 border-transparent pl-3 text-left w-full"
                >
                  How It Works
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onLogin();
                      toggleMobileMenu();
                    }}
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      onRegister();
                      toggleMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    Sign up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
