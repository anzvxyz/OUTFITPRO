import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  pattern: string;
  season: string;
  imageUrl: string;
}

interface WardrobeGridProps {
  items?: ClothingItem[];
  onItemClick?: (item: ClothingItem) => void;
}

const WardrobeGrid = ({
  items = [
    {
      id: "1",
      name: "Blue Denim Jacket",
      category: "Outerwear",
      color: "Blue",
      pattern: "Solid",
      season: "Spring",
      imageUrl:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&q=80",
    },
    {
      id: "2",
      name: "White T-Shirt",
      category: "Tops",
      color: "White",
      pattern: "Solid",
      season: "Summer",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
    },
    {
      id: "3",
      name: "Black Jeans",
      category: "Bottoms",
      color: "Black",
      pattern: "Solid",
      season: "All",
      imageUrl:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
    },
    {
      id: "4",
      name: "Red Plaid Shirt",
      category: "Tops",
      color: "Red",
      pattern: "Plaid",
      season: "Fall",
      imageUrl:
        "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=300&q=80",
    },
    {
      id: "5",
      name: "Beige Sweater",
      category: "Tops",
      color: "Beige",
      pattern: "Knit",
      season: "Winter",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80",
    },
    {
      id: "6",
      name: "Navy Dress Pants",
      category: "Bottoms",
      color: "Navy",
      pattern: "Solid",
      season: "All",
      imageUrl:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&q=80",
    },
  ],
  onItemClick = () => {},
}: WardrobeGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    color: "",
    pattern: "",
    season: "",
  });

  // Filter items based on search term, category, and other filters
  const filteredItems = items.filter((item) => {
    // Search term filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    // Additional filters
    const matchesColor = !filters.color || item.color === filters.color;
    const matchesPattern = !filters.pattern || item.pattern === filters.pattern;
    const matchesSeason =
      !filters.season ||
      item.season === filters.season ||
      item.season === "All";

    return (
      matchesSearch &&
      matchesCategory &&
      matchesColor &&
      matchesPattern &&
      matchesSeason
    );
  });

  const categories = [
    "All",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Shoes",
    "Accessories",
  ];
  const colors = [
    "Blue",
    "White",
    "Black",
    "Red",
    "Beige",
    "Navy",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
  ];
  const patterns = [
    "Solid",
    "Plaid",
    "Striped",
    "Floral",
    "Polka Dot",
    "Knit",
    "Graphic",
  ];
  const seasons = ["All", "Spring", "Summer", "Fall", "Winter"];

  const resetFilters = () => {
    setFilters({
      color: "",
      pattern: "",
      season: "",
    });
  };

  return (
    <div className="w-full h-full bg-background p-6">
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your wardrobe..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {(filters.color || filters.pattern || filters.season) && (
              <Badge variant="secondary" className="ml-1">
                {Object.values(filters).filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {(filters.color || filters.pattern || filters.season) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <Tabs
        defaultValue="All"
        className="mb-6"
        onValueChange={setActiveCategory}
        value={activeCategory}
      >
        <TabsList className="w-full md:w-auto overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filter dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Wardrobe Items</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="color" className="text-sm font-medium">
                Color
              </label>
              <Select
                value={filters.color}
                onValueChange={(value) =>
                  setFilters({ ...filters, color: value })
                }
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any color</SelectItem>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="pattern" className="text-sm font-medium">
                Pattern
              </label>
              <Select
                value={filters.pattern}
                onValueChange={(value) =>
                  setFilters({ ...filters, pattern: value })
                }
              >
                <SelectTrigger id="pattern">
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any pattern</SelectItem>
                  {patterns.map((pattern) => (
                    <SelectItem key={pattern} value={pattern}>
                      {pattern}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="season" className="text-sm font-medium">
                Season
              </label>
              <Select
                value={filters.season}
                onValueChange={(value) =>
                  setFilters({ ...filters, season: value })
                }
              >
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any season</SelectItem>
                  {seasons.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Wardrobe grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onItemClick(item)}
            >
              <div className="aspect-square relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-base mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline">{item.color}</Badge>
                  {item.pattern !== "Solid" && (
                    <Badge variant="outline">{item.pattern}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          {(searchTerm ||
            filters.color ||
            filters.pattern ||
            filters.season ||
            activeCategory !== "All") && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                resetFilters();
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WardrobeGrid;
