import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  Save,
  Edit,
  Share,
  Trash2,
} from "lucide-react";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  pattern: string;
  image: string;
}

interface OutfitDetailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  outfit?: {
    id: string;
    name: string;
    occasion: string;
    season: string;
    items: ClothingItem[];
    styleNotes: string;
    aiScore: number;
  };
  onLike?: () => void;
  onDislike?: () => void;
  onSave?: () => void;
  onModify?: () => void;
  onDelete?: () => void;
}

const OutfitDetailModal = ({
  open = true,
  onOpenChange,
  outfit = {
    id: "1",
    name: "Casual Summer Outfit",
    occasion: "Casual",
    season: "Summer",
    items: [
      {
        id: "101",
        name: "White T-Shirt",
        category: "Tops",
        color: "White",
        pattern: "Solid",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      },
      {
        id: "102",
        name: "Blue Jeans",
        category: "Bottoms",
        color: "Blue",
        pattern: "Solid",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
      },
      {
        id: "103",
        name: "White Sneakers",
        category: "Footwear",
        color: "White",
        pattern: "Solid",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
      },
    ],
    styleNotes:
      "A simple, clean casual outfit perfect for summer days. The white t-shirt pairs well with classic blue jeans, and white sneakers complete the look with a cohesive color scheme.",
    aiScore: 92,
  },
  onLike = () => {},
  onDislike = () => {},
  onSave = () => {},
  onModify = () => {},
  onDelete = () => {},
}: OutfitDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("items");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {outfit.name}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{outfit.occasion}</Badge>
              <Badge variant="secondary">{outfit.season}</Badge>
              <Badge variant="default" className="bg-green-600">
                AI Score: {outfit.aiScore}%
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {outfit.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-md shadow-sm overflow-hidden"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.color}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="notes">Style Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="items" className="mt-4">
                  <div className="space-y-3">
                    {outfit.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-md"
                      >
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.color}
                            </Badge>
                            {item.pattern && (
                              <Badge variant="outline" className="text-xs">
                                {item.pattern}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">AI Style Analysis</h3>
                    <p className="text-gray-700">{outfit.styleNotes}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={
                liked ? "bg-pink-50 text-pink-600 border-pink-200" : ""
              }
            >
              <Heart
                className={`h-4 w-4 mr-1 ${liked ? "fill-pink-600 text-pink-600" : ""}`}
              />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button variant="outline" size="sm" onClick={onDislike}>
              <ThumbsDown className="h-4 w-4 mr-1" />
              Dislike
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className={
                saved ? "bg-blue-50 text-blue-600 border-blue-200" : ""
              }
            >
              <Save
                className={`h-4 w-4 mr-1 ${saved ? "text-blue-600" : ""}`}
              />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onModify}>
              <Edit className="h-4 w-4 mr-1" />
              Modify
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutfitDetailModal;
