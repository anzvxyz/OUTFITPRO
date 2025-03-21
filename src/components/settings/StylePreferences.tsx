import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Palette, Sparkles, Zap, Heart, Shirt, Umbrella } from "lucide-react";

interface StylePreferencesProps {
  onSave?: (preferences: StylePreferenceData) => void;
  initialPreferences?: StylePreferenceData;
}

interface StylePreferenceData {
  favoriteColors: string[];
  preferredPatterns: string[];
  stylePreference: string;
  casualFormalBalance: number;
  seasonalPreferences: {
    spring: boolean;
    summer: boolean;
    fall: boolean;
    winter: boolean;
  };
  occasionPreferences: string[];
  sustainabilityFocus: boolean;
}

const defaultPreferences: StylePreferenceData = {
  favoriteColors: ["blue", "black"],
  preferredPatterns: ["solid", "minimal"],
  stylePreference: "casual",
  casualFormalBalance: 40,
  seasonalPreferences: {
    spring: true,
    summer: true,
    fall: true,
    winter: false,
  },
  occasionPreferences: ["everyday", "work"],
  sustainabilityFocus: false,
};

const StylePreferences: React.FC<StylePreferencesProps> = ({
  onSave = () => {},
  initialPreferences = defaultPreferences,
}) => {
  const [preferences, setPreferences] =
    React.useState<StylePreferenceData>(initialPreferences);

  const handleColorToggle = (color: string) => {
    setPreferences((prev) => {
      const newColors = prev.favoriteColors.includes(color)
        ? prev.favoriteColors.filter((c) => c !== color)
        : [...prev.favoriteColors, color];
      return { ...prev, favoriteColors: newColors };
    });
  };

  const handlePatternToggle = (pattern: string) => {
    setPreferences((prev) => {
      const newPatterns = prev.preferredPatterns.includes(pattern)
        ? prev.preferredPatterns.filter((p) => p !== pattern)
        : [...prev.preferredPatterns, pattern];
      return { ...prev, preferredPatterns: newPatterns };
    });
  };

  const handleOccasionToggle = (occasion: string) => {
    setPreferences((prev) => {
      const newOccasions = prev.occasionPreferences.includes(occasion)
        ? prev.occasionPreferences.filter((o) => o !== occasion)
        : [...prev.occasionPreferences, occasion];
      return { ...prev, occasionPreferences: newOccasions };
    });
  };

  const handleSeasonToggle = (
    season: keyof typeof preferences.seasonalPreferences,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      seasonalPreferences: {
        ...prev.seasonalPreferences,
        [season]: !prev.seasonalPreferences[season],
      },
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary" />
          Style Preferences
        </CardTitle>
        <CardDescription>
          Customize your style preferences to get better outfit recommendations
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Color Preferences */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Favorite Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Black", value: "black", color: "bg-black" },
              {
                label: "White",
                value: "white",
                color: "bg-white border border-gray-200",
              },
              { label: "Gray", value: "gray", color: "bg-gray-500" },
              { label: "Blue", value: "blue", color: "bg-blue-500" },
              { label: "Red", value: "red", color: "bg-red-500" },
              { label: "Green", value: "green", color: "bg-green-500" },
              { label: "Yellow", value: "yellow", color: "bg-yellow-400" },
              { label: "Purple", value: "purple", color: "bg-purple-500" },
            ].map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color.value}`}
                  checked={preferences.favoriteColors.includes(color.value)}
                  onCheckedChange={() => handleColorToggle(color.value)}
                />
                <label
                  htmlFor={`color-${color.value}`}
                  className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className={`w-4 h-4 rounded-full mr-2 ${color.color}`} />
                  {color.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Preferences */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Preferred Patterns
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Solid", value: "solid" },
              { label: "Stripes", value: "stripes" },
              { label: "Plaid", value: "plaid" },
              { label: "Floral", value: "floral" },
              { label: "Polka Dots", value: "polka-dots" },
              { label: "Minimal", value: "minimal" },
            ].map((pattern) => (
              <div key={pattern.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`pattern-${pattern.value}`}
                  checked={preferences.preferredPatterns.includes(
                    pattern.value,
                  )}
                  onCheckedChange={() => handlePatternToggle(pattern.value)}
                />
                <label
                  htmlFor={`pattern-${pattern.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {pattern.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Style Preference */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Shirt className="h-5 w-5 text-primary" />
            Style Preference
          </h3>
          <RadioGroup
            value={preferences.stylePreference}
            onValueChange={(value) =>
              setPreferences((prev) => ({ ...prev, stylePreference: value }))
            }
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { label: "Casual", value: "casual" },
              { label: "Formal", value: "formal" },
              { label: "Sporty", value: "sporty" },
              { label: "Vintage", value: "vintage" },
              { label: "Minimalist", value: "minimalist" },
              { label: "Bohemian", value: "bohemian" },
              { label: "Streetwear", value: "streetwear" },
              { label: "Business", value: "business" },
            ].map((style) => (
              <div key={style.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={style.value}
                  id={`style-${style.value}`}
                />
                <label
                  htmlFor={`style-${style.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Casual-Formal Balance */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Casual to Formal Balance</h3>
          <div className="px-1">
            <Slider
              value={[preferences.casualFormalBalance]}
              min={0}
              max={100}
              step={10}
              onValueChange={(value) =>
                setPreferences((prev) => ({
                  ...prev,
                  casualFormalBalance: value[0],
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Very Casual</span>
              <span>Balanced</span>
              <span>Very Formal</span>
            </div>
          </div>
        </div>

        {/* Seasonal Preferences */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Umbrella className="h-5 w-5 text-primary" />
            Seasonal Preferences
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Spring", value: "spring" },
              { label: "Summer", value: "summer" },
              { label: "Fall", value: "fall" },
              { label: "Winter", value: "winter" },
            ].map((season) => (
              <div key={season.value} className="flex items-center space-x-2">
                <Switch
                  id={`season-${season.value}`}
                  checked={
                    preferences.seasonalPreferences[
                      season.value as keyof typeof preferences.seasonalPreferences
                    ]
                  }
                  onCheckedChange={() =>
                    handleSeasonToggle(
                      season.value as keyof typeof preferences.seasonalPreferences,
                    )
                  }
                />
                <label
                  htmlFor={`season-${season.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {season.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Occasion Preferences */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Occasion Preferences
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Everyday", value: "everyday" },
              { label: "Work", value: "work" },
              { label: "Formal Events", value: "formal-events" },
              { label: "Casual Outings", value: "casual-outings" },
              { label: "Date Night", value: "date-night" },
              { label: "Workout", value: "workout" },
            ].map((occasion) => (
              <div key={occasion.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`occasion-${occasion.value}`}
                  checked={preferences.occasionPreferences.includes(
                    occasion.value,
                  )}
                  onCheckedChange={() => handleOccasionToggle(occasion.value)}
                />
                <label
                  htmlFor={`occasion-${occasion.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {occasion.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Focus */}
        <div className="flex items-center space-x-2">
          <Switch
            id="sustainability"
            checked={preferences.sustainabilityFocus}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                sustainabilityFocus: checked,
              }))
            }
          />
          <label
            htmlFor="sustainability"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Prioritize sustainable and eco-friendly clothing recommendations
          </label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setPreferences(defaultPreferences)}
        >
          Reset to Default
        </Button>
        <Button onClick={handleSave}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default StylePreferences;
