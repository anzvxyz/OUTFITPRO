import React, { useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ClothingItem {
  id?: string;
  name: string;
  category: string;
  color: string;
  pattern: string;
  season: string;
  description: string;
  image: string;
  gender: string;
}

interface AddItemModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (item: ClothingItem) => void;
}

const AddItemModal = ({
  open = true,
  onOpenChange,
  onSave = () => {},
}: AddItemModalProps) => {
  const [item, setItem] = useState<ClothingItem>({
    name: "",
    category: "",
    color: "",
    pattern: "",
    season: "",
    description: "",
    image: "",
    gender: "neutral",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<{
    color: string;
    pattern: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        // Simulate ML analysis
        simulateMLAnalysis(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateMLAnalysis = (imageData: string) => {
    setIsAnalyzing(true);
    // Simulate ML processing delay
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        color: ["Black", "Navy", "White", "Red", "Green"][
          Math.floor(Math.random() * 5)
        ],
        pattern: ["Solid", "Striped", "Plaid", "Floral", "Polka Dot"][
          Math.floor(Math.random() * 5)
        ],
      };

      setAnalysisResults(mockResults);
      setItem((prev) => ({
        ...prev,
        color: mockResults.color,
        pattern: mockResults.pattern,
      }));
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleChange = (field: keyof ClothingItem, value: string) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(item);
    // Reset form
    setItem({
      name: "",
      category: "",
      color: "",
      pattern: "",
      season: "",
      description: "",
      image: imagePreview,
      gender: "neutral",
    });
    setImagePreview("");
    setAnalysisResults(null);
    if (onOpenChange) onOpenChange(false);
  };

  const clearImage = () => {
    setImagePreview("");
    setAnalysisResults(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Clothing Item
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center gap-4">
            {imagePreview ? (
              <div className="relative w-full max-w-[300px] h-[300px] mx-auto">
                <img
                  src={imagePreview}
                  alt="Clothing item preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </Button>

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Analyzing image...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full max-w-[300px] h-[300px] border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 transition-colors">
                <Camera className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center mb-4">
                  Upload a photo of your clothing item
                </p>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </div>
                </Label>
              </div>
            )}
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* ML Analysis Results */}
          {analysisResults && (
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">
                AI Analysis Results
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Detected Color:</p>
                  <p className="font-medium">{analysisResults.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Detected Pattern:</p>
                  <p className="font-medium">{analysisResults.pattern}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={item.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="E.g., Blue Denim Jacket"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={item.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="season">Season</Label>
                <Select
                  value={item.season}
                  onValueChange={(value) => handleChange("season", value)}
                >
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                    <SelectItem value="all">All Seasons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={item.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  placeholder="E.g., Navy Blue"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pattern">Pattern</Label>
                <Input
                  id="pattern"
                  value={item.pattern}
                  onChange={(e) => handleChange("pattern", e.target.value)}
                  placeholder="E.g., Solid, Striped"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender Category</Label>
              <Select
                value={item.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Men's</SelectItem>
                  <SelectItem value="female">Women's</SelectItem>
                  <SelectItem value="neutral">Gender Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={item.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add any additional notes about this item..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!item.name || !item.category || !imagePreview}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
