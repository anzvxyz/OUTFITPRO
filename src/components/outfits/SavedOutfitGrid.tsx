import React, { useState } from "react";
import { Heart, Edit, Trash2, Calendar, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface SavedOutfit {
  id: string;
  name: string;
  items: OutfitItem[];
  occasion: string;
  season: string;
  dateSaved: string;
  imageUrl: string;
}

interface SavedOutfitGridProps {
  outfits?: SavedOutfit[];
  onViewOutfit?: (outfit: SavedOutfit) => void;
  onEditOutfit?: (outfit: SavedOutfit) => void;
  onDeleteOutfit?: (outfitId: string) => void;
}

const SavedOutfitGrid: React.FC<SavedOutfitGridProps> = ({
  outfits = [
    {
      id: "1",
      name: "Summer Casual",
      items: [
        {
          id: "item1",
          name: "White T-Shirt",
          category: "Tops",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
        },
        {
          id: "item2",
          name: "Blue Jeans",
          category: "Bottoms",
          color: "Blue",
          imageUrl:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
        },
      ],
      occasion: "Casual",
      season: "Summer",
      dateSaved: "2023-06-15",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    },
    {
      id: "2",
      name: "Office Meeting",
      items: [
        {
          id: "item3",
          name: "Blue Blazer",
          category: "Outerwear",
          color: "Blue",
          imageUrl:
            "https://images.unsplash.com/photo-1598808503746-f34cfbb3f1f5?w=300&q=80",
        },
        {
          id: "item4",
          name: "White Shirt",
          category: "Tops",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1598808503746-f34cfbb3f1f5?w=300&q=80",
        },
      ],
      occasion: "Business",
      season: "All Seasons",
      dateSaved: "2023-07-20",
      imageUrl:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80",
    },
    {
      id: "3",
      name: "Weekend Brunch",
      items: [
        {
          id: "item5",
          name: "Floral Dress",
          category: "Dresses",
          color: "Multicolor",
          imageUrl:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
        },
      ],
      occasion: "Casual",
      season: "Spring",
      dateSaved: "2023-08-05",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    },
    {
      id: "4",
      name: "Evening Dinner",
      items: [
        {
          id: "item6",
          name: "Black Dress",
          category: "Dresses",
          color: "Black",
          imageUrl:
            "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=300&q=80",
        },
      ],
      occasion: "Formal",
      season: "All Seasons",
      dateSaved: "2023-09-10",
      imageUrl:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80",
    },
    {
      id: "5",
      name: "Workout Outfit",
      items: [
        {
          id: "item7",
          name: "Sports Bra",
          category: "Activewear",
          color: "Black",
          imageUrl:
            "https://images.unsplash.com/photo-1518310383802-640c2de311b6?w=300&q=80",
        },
        {
          id: "item8",
          name: "Leggings",
          category: "Activewear",
          color: "Gray",
          imageUrl:
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&q=80",
        },
      ],
      occasion: "Sports",
      season: "All Seasons",
      dateSaved: "2023-10-01",
      imageUrl:
        "https://images.unsplash.com/photo-1518310383802-640c2de311b6?w=400&q=80",
    },
    {
      id: "6",
      name: "Beach Day",
      items: [
        {
          id: "item9",
          name: "Swimsuit",
          category: "Swimwear",
          color: "Blue",
          imageUrl:
            "https://images.unsplash.com/photo-1570976447640-ac859a247f01?w=300&q=80",
        },
        {
          id: "item10",
          name: "Cover-up",
          category: "Swimwear",
          color: "White",
          imageUrl:
            "https://images.unsplash.com/photo-1570976447640-ac859a247f01?w=300&q=80",
        },
      ],
      occasion: "Beach",
      season: "Summer",
      dateSaved: "2023-11-15",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    },
  ],
  onViewOutfit = () => {},
  onEditOutfit = () => {},
  onDeleteOutfit = () => {},
}) => {
  const [selectedOutfit, setSelectedOutfit] = useState<SavedOutfit | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewOutfit = (outfit: SavedOutfit) => {
    setSelectedOutfit(outfit);
    setIsDetailOpen(true);
    onViewOutfit(outfit);
  };

  const handleEditOutfit = (outfit: SavedOutfit) => {
    onEditOutfit(outfit);
  };

  const handleDeleteOutfit = (outfitId: string) => {
    onDeleteOutfit(outfitId);
  };

  return (
    <div className="bg-white w-full h-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Saved Outfits</h1>
        <p className="text-gray-500">
          Browse and manage your saved outfit combinations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <Card
            key={outfit.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="h-48 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${outfit.imageUrl})` }}
              onClick={() => handleViewOutfit(outfit)}
            />
            <CardHeader className="pb-2">
              <CardTitle>{outfit.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{outfit.occasion}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{outfit.season}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-2">
              <p className="text-sm text-gray-500">
                {outfit.items.length} items • Saved on{" "}
                {new Date(outfit.dateSaved).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteOutfit(outfit.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-500"
                onClick={() => handleEditOutfit(outfit)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedOutfit && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedOutfit.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div
                  className="h-80 bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${selectedOutfit.imageUrl})` }}
                />
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      Occasion: {selectedOutfit.occasion}
                    </p>
                    <p className="text-sm font-medium">
                      Season: {selectedOutfit.season}
                    </p>
                    <p className="text-sm text-gray-500">
                      Saved on{" "}
                      {new Date(selectedOutfit.dateSaved).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Favorite
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Items in this outfit
                </h3>
                <div className="space-y-3">
                  {selectedOutfit.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-2 border rounded-md"
                    >
                      <div
                        className="h-16 w-16 bg-cover bg-center rounded-md mr-3"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.category} • {item.color}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handleEditOutfit(selectedOutfit)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Outfit
              </Button>
              <Button onClick={() => setIsDetailOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SavedOutfitGrid;
