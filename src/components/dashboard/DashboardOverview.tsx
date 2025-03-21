import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import {
  Shirt,
  Palette,
  Calendar,
  TrendingUp,
  Heart,
  Plus,
  ArrowRight,
} from "lucide-react";

interface WardrobeItemSummary {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
}

interface OutfitSuggestion {
  id: string;
  name: string;
  occasion: string;
  items: WardrobeItemSummary[];
  image: string;
}

interface SavedOutfit {
  id: string;
  name: string;
  occasion: string;
  dateSaved: string;
  image: string;
}

interface DashboardOverviewProps {
  username?: string;
  wardrobeCount?: number;
  recentItems?: WardrobeItemSummary[];
  outfitSuggestions?: OutfitSuggestion[];
  savedOutfits?: SavedOutfit[];
  styleScore?: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  username = "User",
  wardrobeCount = 24,
  recentItems = [
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
  outfitSuggestions = [
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
  ],
  savedOutfits = [
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
  ],
  styleScore = 78,
}) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {username}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your wardrobe and outfit suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Shirt className="mr-2 h-5 w-5 text-indigo-500" />
              Wardrobe Items
            </CardTitle>
            <CardDescription>
              You have {wardrobeCount} items in your wardrobe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
              <Button variant="ghost" size="sm" className="mt-2">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-indigo-500" />
              Style Score
            </CardTitle>
            <CardDescription>Based on your wardrobe variety</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{styleScore}%</span>
                <span className="text-sm text-gray-500">Great!</span>
              </div>
              <Progress value={styleScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
              Seasonal Readiness
            </CardTitle>
            <CardDescription>Summer wardrobe status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">65%</span>
                <span className="text-sm text-gray-500">Needs attention</span>
              </div>
              <Progress value={65} className="h-2" />
              <Button variant="link" size="sm" className="p-0">
                See recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
              Recent Additions
            </CardTitle>
            <CardDescription>
              Latest items added to your wardrobe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {item.color}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-indigo-500" />
              Saved Outfits
            </CardTitle>
            <CardDescription>Your favorite outfit combinations</CardDescription>
          </CardHeader>
          <CardContent>
            {savedOutfits.length > 0 ? (
              <div className="space-y-4">
                {savedOutfits.map((outfit) => (
                  <div key={outfit.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{outfit.name}</h4>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="text-xs mr-2">
                          {outfit.occasion}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Saved on {outfit.dateSaved}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Saved Outfits
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">
                  You haven't saved any outfits yet
                </p>
                <Button variant="outline" size="sm">
                  Browse Suggestions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outfit Suggestions</CardTitle>
          <CardDescription>
            Personalized outfit ideas based on your wardrobe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="casual">Casual</TabsTrigger>
              <TabsTrigger value="formal">Formal</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {outfitSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="border rounded-lg overflow-hidden bg-white"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">
                        {suggestion.occasion}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{suggestion.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {suggestion.items.length} items
                      </p>
                      <Separator className="my-3" />
                      <div className="flex space-x-2 mb-3">
                        {suggestion.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="h-10 w-10 rounded-full overflow-hidden bg-gray-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {suggestion.items.length > 3 && (
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                            +{suggestion.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Suggestions</Button>
              </div>
            </TabsContent>
            <TabsContent value="work" className="mt-0">
              <div className="py-8 text-center text-gray-500">
                <p>Filtered work outfit suggestions will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="casual" className="mt-0">
              <div className="py-8 text-center text-gray-500">
                <p>Filtered casual outfit suggestions will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="formal" className="mt-0">
              <div className="py-8 text-center text-gray-500">
                <p>Filtered formal outfit suggestions will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
