import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tag, Edit, Trash2, Heart, X, User } from "lucide-react";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  pattern: string;
  season: string[];
  occasion: string[];
  image: string;
  description: string;
  favorite: boolean;
  gender?: string;
}

interface ItemDetailModalProps {
  item?: ClothingItem;
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (item: ClothingItem) => void;
  onDelete?: (id: string) => void;
}

const defaultItem: ClothingItem = {
  id: "1",
  name: "Blue Denim Jacket",
  category: "Outerwear",
  color: "Blue",
  pattern: "Solid",
  season: ["Spring", "Fall"],
  occasion: ["Casual", "Everyday"],
  image:
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
  description:
    "Classic denim jacket with button closure and two front pockets.",
  favorite: true,
  gender: "neutral",
};

const ItemDetailModal = ({
  item = defaultItem,
  isOpen = true,
  onClose = () => {},
  onSave = () => {},
  onDelete = () => {},
}: ItemDetailModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState<ClothingItem>(item);

  const handleSave = () => {
    onSave(editedItem);
    setEditMode(false);
  };

  const handleChange = (field: keyof ClothingItem, value: any) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFavorite = () => {
    setEditedItem((prev) => ({ ...prev, favorite: !prev.favorite }));
  };

  const seasonOptions = ["Spring", "Summer", "Fall", "Winter"];
  const occasionOptions = [
    "Casual",
    "Formal",
    "Business",
    "Sporty",
    "Party",
    "Everyday",
  ];
  const categoryOptions = [
    "Tops",
    "Bottoms",
    "Outerwear",
    "Dresses",
    "Shoes",
    "Accessories",
  ];
  const patternOptions = [
    "Solid",
    "Striped",
    "Plaid",
    "Floral",
    "Polka Dot",
    "Graphic",
    "Other",
  ];
  const colorOptions = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Orange",
    "Multi",
  ];
  const genderOptions = [
    { value: "male", label: "Men's" },
    { value: "female", label: "Women's" },
    { value: "neutral", label: "Gender Neutral" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {editMode ? "Edit Item" : editedItem.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left column - Image */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
              <img
                src={editedItem.image}
                alt={editedItem.name}
                className="w-full h-full object-cover"
              />
              {!editMode && (
                <button
                  onClick={toggleFavorite}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <Heart
                    className={`h-5 w-5 ${editedItem.favorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              )}
            </div>

            {editMode && (
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editedItem.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
            )}
          </div>

          {/* Right column - Details */}
          <div className="space-y-4">
            {editMode ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedItem.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Item name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editedItem.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select
                      value={editedItem.color}
                      onValueChange={(value) => handleChange("color", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pattern">Pattern</Label>
                    <Select
                      value={editedItem.pattern}
                      onValueChange={(value) => handleChange("pattern", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        {patternOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender Category</Label>
                  <Select
                    value={editedItem.gender || "neutral"}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender category" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Seasons</Label>
                  <div className="flex flex-wrap gap-2">
                    {seasonOptions.map((season) => (
                      <Button
                        key={season}
                        type="button"
                        variant={
                          editedItem.season.includes(season)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newSeasons = editedItem.season.includes(season)
                            ? editedItem.season.filter((s) => s !== season)
                            : [...editedItem.season, season];
                          handleChange("season", newSeasons);
                        }}
                      >
                        {season}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Occasions</Label>
                  <div className="flex flex-wrap gap-2">
                    {occasionOptions.map((occasion) => (
                      <Button
                        key={occasion}
                        type="button"
                        variant={
                          editedItem.occasion.includes(occasion)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newOccasions = editedItem.occasion.includes(
                            occasion,
                          )
                            ? editedItem.occasion.filter((o) => o !== occasion)
                            : [...editedItem.occasion, occasion];
                          handleChange("occasion", newOccasions);
                        }}
                      >
                        {occasion}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedItem.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Item description"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">
                    {editedItem.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Color</h4>
                    <p>{editedItem.color}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Pattern
                    </h4>
                    <p>{editedItem.pattern}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Gender Category
                  </h4>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 text-gray-500 mr-1" />
                    <span>
                      {editedItem.gender === "male"
                        ? "Men's"
                        : editedItem.gender === "female"
                          ? "Women's"
                          : "Gender Neutral"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Seasons</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {editedItem.season.map((season) => (
                      <span
                        key={season}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Occasions
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {editedItem.occasion.map((occasion) => (
                      <span
                        key={occasion}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Description
                  </h4>
                  <p className="text-sm mt-1">{editedItem.description}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => onDelete(editedItem.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => onClose()}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
                <Button onClick={() => setEditMode(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
