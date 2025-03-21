import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/layout/Sidebar";
import SavedOutfitGrid from "@/components/outfits/SavedOutfitGrid";
import { ArrowLeft } from "lucide-react";

interface SavedOutfitsPageProps {}

const SavedOutfitsPage: React.FC<SavedOutfitsPageProps> = () => {
  // Handlers for outfit actions
  const handleViewOutfit = (outfit: any) => {
    console.log("Viewing outfit:", outfit);
  };

  const handleEditOutfit = (outfit: any) => {
    console.log("Editing outfit:", outfit);
  };

  const handleDeleteOutfit = (outfitId: string) => {
    console.log("Deleting outfit:", outfitId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Saved Outfits</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">Filter</Button>
            <Button>Create New Outfit</Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">My Outfit Collection</h2>
              <p className="text-gray-500">
                Manage and browse your saved outfit combinations
              </p>
              <Separator className="my-4" />
            </div>

            <SavedOutfitGrid
              onViewOutfit={handleViewOutfit}
              onEditOutfit={handleEditOutfit}
              onDeleteOutfit={handleDeleteOutfit}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedOutfitsPage;
