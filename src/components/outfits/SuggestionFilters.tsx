import React, { useState } from "react";
import { Filter, Calendar, Palette, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SuggestionFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  occasion: string;
  season: string;
  style: string;
  colorScheme: string;
  searchTerm: string;
  gender: string;
}

const SuggestionFilters = ({
  onFilterChange = () => {},
}: SuggestionFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    occasion: "",
    season: "",
    style: "",
    colorScheme: "",
    searchTerm: "",
    gender: "",
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (value && !activeFilters.includes(key)) {
      setActiveFilters([...activeFilters, key]);
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== key));
    }
  };

  const clearFilters = () => {
    setFilters({
      occasion: "",
      season: "",
      style: "",
      colorScheme: "",
      searchTerm: "",
      gender: "",
    });
    setActiveFilters([]);
    onFilterChange({
      occasion: "",
      season: "",
      style: "",
      colorScheme: "",
      searchTerm: "",
      gender: "",
    });
  };

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium">Filter Suggestions</h3>
        </div>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Occasion</span>
          </div>
          <Select
            value={filters.occasion}
            onValueChange={(value) => handleFilterChange("occasion", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="date">Date Night</SelectItem>
              <SelectItem value="workout">Workout</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Season</span>
          </div>
          <Select
            value={filters.season}
            onValueChange={(value) => handleFilterChange("season", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
              <SelectItem value="all-season">All Season</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Style</span>
          </div>
          <Select
            value={filters.style}
            onValueChange={(value) => handleFilterChange("style", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="bohemian">Bohemian</SelectItem>
              <SelectItem value="streetwear">Streetwear</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="vintage">Vintage</SelectItem>
              <SelectItem value="athleisure">Athleisure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Color Scheme</span>
          </div>
          <Select
            value={filters.colorScheme}
            onValueChange={(value) => handleFilterChange("colorScheme", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select colors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monochrome">Monochrome</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="pastel">Pastel</SelectItem>
              <SelectItem value="bright">Bright</SelectItem>
              <SelectItem value="earth">Earth Tones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Gender</span>
          </div>
          <Select
            value={filters.gender}
            onValueChange={(value) => handleFilterChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="male">Men's</SelectItem>
              <SelectItem value="female">Women's</SelectItem>
              <SelectItem value="neutral">Gender Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Search</span>
          </div>
          <Input
            type="text"
            placeholder="Search outfits..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.includes("occasion") && (
            <Badge variant="secondary" className="capitalize">
              {filters.occasion}
            </Badge>
          )}
          {activeFilters.includes("season") && (
            <Badge variant="secondary" className="capitalize">
              {filters.season}
            </Badge>
          )}
          {activeFilters.includes("style") && (
            <Badge variant="secondary" className="capitalize">
              {filters.style}
            </Badge>
          )}
          {activeFilters.includes("colorScheme") && (
            <Badge variant="secondary" className="capitalize">
              {filters.colorScheme}
            </Badge>
          )}
          {activeFilters.includes("gender") && (
            <Badge variant="secondary" className="capitalize">
              {filters.gender === "male"
                ? "Men's"
                : filters.gender === "female"
                  ? "Women's"
                  : "Gender Neutral"}
            </Badge>
          )}
          {activeFilters.includes("searchTerm") && (
            <Badge variant="secondary">Search: {filters.searchTerm}</Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionFilters;
