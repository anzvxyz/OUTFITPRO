import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shirt, Filter, RefreshCw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import SuggestionFilters from "@/components/outfits/SuggestionFilters";
import OutfitSuggestionGrid from "@/components/outfits/OutfitSuggestionGrid";
import OutfitDetailModal from "@/components/outfits/OutfitDetailModal";

interface FilterOptions {
  occasion: string;
  season: string;
  style: string;
  colorScheme: string;
  searchTerm: string;
}

const OutfitSuggestionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    occasion: "",
    season: "",
    style: "",
    colorScheme: "",
    searchTerm: "",
  });
  const [selectedOutfit, setSelectedOutfit] = useState<any | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock function to handle generating new suggestions
  const handleGenerateNewSuggestions = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  // Mock functions for outfit interactions
  const handleLikeOutfit = (id: string) => {
    console.log(`Liked outfit: ${id}`);
  };

  const handleDislikeOutfit = (id: string) => {
    console.log(`Disliked outfit: ${id}`);
  };

  const handleSaveOutfit = (id: string) => {
    console.log(`Saved outfit: ${id}`);
    // Navigate to saved outfits page after saving
    // navigate("/saved-outfits");
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleViewOutfitDetail = (outfit: any) => {
    setSelectedOutfit(outfit);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shirt className="mr-2 h-6 w-6 text-primary" />
                Outfit Suggestions
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered outfit combinations based on your wardrobe
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button
                onClick={handleGenerateNewSuggestions}
                disabled={isGenerating}
                className="flex items-center"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/saved-outfits")}
                className="flex items-center"
              >
                <Heart className="mr-2 h-4 w-4" />
                Saved Outfits
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-6">
              <SuggestionFilters onFilterChange={handleFilterChange} />
            </div>
          )}

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="all">All Suggestions</TabsTrigger>
              <TabsTrigger value="recent">Recently Generated</TabsTrigger>
              <TabsTrigger value="liked">Liked Outfits</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal Picks</TabsTrigger>
            </TabsList>
          </Tabs>

          <OutfitSuggestionGrid
            onLike={handleLikeOutfit}
            onDislike={handleDislikeOutfit}
            onSave={handleSaveOutfit}
          />

          {selectedOutfit && (
            <OutfitDetailModal
              open={detailModalOpen}
              onOpenChange={setDetailModalOpen}
              outfit={{
                id: selectedOutfit.id,
                name: selectedOutfit.name,
                occasion: selectedOutfit.occasion,
                season: selectedOutfit.season,
                items: selectedOutfit.items.map((item: any) => ({
                  id: item.id,
                  name: item.name,
                  category: item.category,
                  color: item.color,
                  pattern: item.pattern || "Solid",
                  image: item.imageUrl,
                })),
                styleNotes: `This ${selectedOutfit.style.toLowerCase()} outfit is perfect for ${selectedOutfit.occasion.toLowerCase()} occasions during ${selectedOutfit.season.toLowerCase()} weather. The combination of colors and patterns creates a harmonious look that's both stylish and appropriate for the setting.`,
                aiScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-99
              }}
              onLike={() => handleLikeOutfit(selectedOutfit.id)}
              onDislike={() => handleDislikeOutfit(selectedOutfit.id)}
              onSave={() => handleSaveOutfit(selectedOutfit.id)}
              onModify={() => console.log("Modify outfit")}
              onDelete={() => console.log("Delete outfit")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitSuggestionsPage;
