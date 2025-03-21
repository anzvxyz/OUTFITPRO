import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  Save,
  Edit,
  ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import OutfitDetailModal from "./OutfitDetailModal";

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface OutfitSuggestion {
  id: string;
  name: string;
  occasion: string;
  season: string;
  style: string;
  items: OutfitItem[];
  imageUrl: string;
}

interface OutfitSuggestionGridProps {
  suggestions?: OutfitSuggestion[];
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onSave?: (id: string) => void;
}

const OutfitSuggestionGrid: React.FC<OutfitSuggestionGridProps> = ({
  suggestions = [
    {
      id: "1",
      name: "Casual Friday",
      occasion: "Casual",
      season: "Spring",
      style: "Casual",
      imageUrl:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
      items: [
        {
          id: "101",
          name: "Blue Jeans",
          category: "Bottoms",
          color: "Blue",
          imageUrl:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
        },
        {
          id: "102",
          name: "White T-shirt",
          category: "Tops",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
        },
        {
          id: "103",
          name: "Sneakers",
          category: "Footwear",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
        },
      ],
    },
    {
      id: "2",
      name: "Business Meeting",
      occasion: "Formal",
      season: "All Season",
      style: "Business",
      imageUrl:
        "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=500&q=80",
      items: [
        {
          id: "201",
          name: "Navy Suit",
          category: "Outerwear",
          color: "Navy",
          imageUrl:
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80",
        },
        {
          id: "202",
          name: "White Dress Shirt",
          category: "Tops",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&q=80",
        },
        {
          id: "203",
          name: "Oxford Shoes",
          category: "Footwear",
          color: "Brown",
          imageUrl:
            "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=300&q=80",
        },
      ],
    },
    {
      id: "3",
      name: "Weekend Brunch",
      occasion: "Casual",
      season: "Summer",
      style: "Trendy",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
      items: [
        {
          id: "301",
          name: "Floral Dress",
          category: "Dresses",
          color: "Multi",
          imageUrl:
            "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?w=300&q=80",
        },
        {
          id: "302",
          name: "Straw Hat",
          category: "Accessories",
          color: "Beige",
          imageUrl:
            "https://images.unsplash.com/photo-1565839584688-e23bd8e3c988?w=300&q=80",
        },
        {
          id: "303",
          name: "Sandals",
          category: "Footwear",
          color: "Tan",
          imageUrl:
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&q=80",
        },
      ],
    },
    {
      id: "4",
      name: "Evening Out",
      occasion: "Night Out",
      season: "All Season",
      style: "Elegant",
      imageUrl:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&q=80",
      items: [
        {
          id: "401",
          name: "Black Dress",
          category: "Dresses",
          color: "Black",
          imageUrl:
            "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=300&q=80",
        },
        {
          id: "402",
          name: "Statement Necklace",
          category: "Accessories",
          color: "Gold",
          imageUrl:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
        },
        {
          id: "403",
          name: "Heels",
          category: "Footwear",
          color: "Black",
          imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80",
        },
      ],
    },
    {
      id: "5",
      name: "Workout Ready",
      occasion: "Athletic",
      season: "All Season",
      style: "Sporty",
      imageUrl:
        "https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&q=80",
      items: [
        {
          id: "501",
          name: "Leggings",
          category: "Bottoms",
          color: "Black",
          imageUrl:
            "https://images.unsplash.com/photo-1556068791-9d8eb3dcc2a3?w=300&q=80",
        },
        {
          id: "502",
          name: "Sports Bra",
          category: "Tops",
          color: "Pink",
          imageUrl:
            "https://images.unsplash.com/photo-1571078580292-115a7486e368?w=300&q=80",
        },
        {
          id: "503",
          name: "Running Shoes",
          category: "Footwear",
          color: "Multi",
          imageUrl:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        },
      ],
    },
    {
      id: "6",
      name: "Beach Day",
      occasion: "Vacation",
      season: "Summer",
      style: "Casual",
      imageUrl:
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=500&q=80",
      items: [
        {
          id: "601",
          name: "Swimsuit",
          category: "Swimwear",
          color: "Blue",
          imageUrl:
            "https://images.unsplash.com/photo-1570976447640-ac859a247f04?w=300&q=80",
        },
        {
          id: "602",
          name: "Cover-up",
          category: "Outerwear",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1571172964276-91faaa704e1f?w=300&q=80",
        },
        {
          id: "603",
          name: "Flip Flops",
          category: "Footwear",
          color: "Teal",
          imageUrl:
            "https://images.unsplash.com/photo-1575486234849-5d9f31c2ebf7?w=300&q=80",
        },
      ],
    },
  ],
  onLike = () => {},
  onDislike = () => {},
  onSave = () => {},
}) => {
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOutfitClick = (outfit: OutfitSuggestion) => {
    setSelectedOutfit(outfit);
    setDialogOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((outfit) => (
          <Card
            key={outfit.id}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => handleOutfitClick(outfit)}
          >
            <div className="relative h-64 w-full">
              <img
                src={outfit.imageUrl}
                alt={outfit.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant="secondary" className="bg-white/80 text-black">
                  {outfit.occasion}
                </Badge>
                <Badge variant="secondary" className="bg-white/80 text-black">
                  {outfit.season}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{outfit.name}</h3>
                <Badge variant="outline">{outfit.style}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {outfit.items.length} items
              </p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {outfit.items.slice(0, 3).map((item, index) => (
                    <div
                      key={item.id}
                      className="h-8 w-8 rounded-full border-2 border-white overflow-hidden"
                      style={{ zIndex: 3 - index }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {outfit.items.length > 3 && (
                    <div
                      className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                      style={{ zIndex: 0 }}
                    >
                      +{outfit.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(outfit.id);
                    }}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDislike(outfit.id);
                    }}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave(outfit.id);
                    }}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          {selectedOutfit && (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedOutfit.name}</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge>{selectedOutfit.occasion}</Badge>
                    <Badge>{selectedOutfit.season}</Badge>
                    <Badge variant="outline">{selectedOutfit.style}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLike(selectedOutfit.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDislike(selectedOutfit.id)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dislike
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onSave(selectedOutfit.id)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={selectedOutfit.imageUrl}
                    alt={selectedOutfit.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Outfit Items</h3>
                  <div className="space-y-3">
                    {selectedOutfit.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 rounded-lg border"
                      >
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.color}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Style Notes</h3>
                <p className="text-gray-600">
                  This {selectedOutfit.style.toLowerCase()} outfit is perfect
                  for {selectedOutfit.occasion.toLowerCase()} occasions during{" "}
                  {selectedOutfit.season.toLowerCase()} weather. The combination
                  of colors and patterns creates a harmonious look that's both
                  stylish and appropriate for the setting.
                </p>
                <div className="mt-4">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Modify Outfit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutfitSuggestionGrid;
