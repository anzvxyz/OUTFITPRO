import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface GenderPreferenceProps {
  selectedGender?: string;
  onSave?: (gender: string) => void;
}

const GenderPreference = ({
  selectedGender = "neutral",
  onSave = () => {},
}: GenderPreferenceProps) => {
  const [gender, setGender] = React.useState<string>(selectedGender);

  const handleSave = () => {
    onSave(gender);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Gender Preference
        </CardTitle>
        <CardDescription>
          Select your gender preference for outfit recommendations
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <RadioGroup
            value={gender}
            onValueChange={setGender}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer w-full">
                Men's Clothing
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer w-full">
                Women's Clothing
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral" className="cursor-pointer w-full">
                Gender Neutral
              </Label>
            </div>
          </RadioGroup>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              This preference helps our AI generate outfit recommendations that
              align with your gender identity. You can change this setting at
              any time.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={handleSave}>Save Preference</Button>
      </CardFooter>
    </Card>
  );
};

export default GenderPreference;
