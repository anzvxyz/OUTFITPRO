import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import WardrobeGrid from "@/components/wardrobe/WardrobeGrid";
import AddItemModal from "@/components/wardrobe/AddItemModal";
import ItemDetailModal from "@/components/wardrobe/ItemDetailModal";

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
}

const WardrobePage = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Sample wardrobe items
  const [wardrobeItems, setWardrobeItems] = useState([
    {
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
    },
    {
      id: "2",
      name: "White T-Shirt",
      category: "Tops",
      color: "White",
      pattern: "Solid",
      season: ["Summer", "Spring"],
      occasion: ["Casual", "Everyday"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      description:
        "Basic white cotton t-shirt, perfect for layering or wearing alone.",
      favorite: false,
    },
    {
      id: "3",
      name: "Black Jeans",
      category: "Bottoms",
      color: "Black",
      pattern: "Solid",
      season: ["All"],
      occasion: ["Casual", "Everyday", "Night Out"],
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
      description: "Slim fit black jeans with slight stretch for comfort.",
      favorite: true,
    },
    {
      id: "4",
      name: "Red Plaid Shirt",
      category: "Tops",
      color: "Red",
      pattern: "Plaid",
      season: ["Fall", "Winter"],
      occasion: ["Casual"],
      image:
        "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&q=80",
      description: "Warm flannel plaid shirt in red and black pattern.",
      favorite: false,
    },
    {
      id: "5",
      name: "Beige Sweater",
      category: "Tops",
      color: "Beige",
      pattern: "Knit",
      season: ["Winter", "Fall"],
      occasion: ["Casual", "Work"],
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      description:
        "Soft knit sweater in neutral beige tone, perfect for layering.",
      favorite: false,
    },
    {
      id: "6",
      name: "Navy Dress Pants",
      category: "Bottoms",
      color: "Navy",
      pattern: "Solid",
      season: ["All"],
      occasion: ["Business", "Formal"],
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
      description: "Tailored navy dress pants with straight leg fit.",
      favorite: false,
    },
  ]);

  const handleItemClick = (item: any) => {
    // Convert the WardrobeGrid item format to the ItemDetailModal format
    const detailItem: ClothingItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      color: item.color,
      pattern: item.pattern,
      season: Array.isArray(item.season) ? item.season : [item.season],
      occasion: item.occasion || ["Casual"],
      image: item.imageUrl || item.image,
      description: item.description || "",
      favorite: item.favorite || false,
    };

    setSelectedItem(detailItem);
    setDetailModalOpen(true);
  };

  const handleAddItem = (newItem: any) => {
    const itemWithId = {
      ...newItem,
      id: `${wardrobeItems.length + 1}`,
      season: [newItem.season],
      occasion: ["Casual"],
      favorite: false,
    };
    setWardrobeItems([...wardrobeItems, itemWithId]);
    setAddItemModalOpen(false);
  };

  const handleSaveItem = (updatedItem: ClothingItem) => {
    setWardrobeItems(
      wardrobeItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
    setDetailModalOpen(false);
  };

  const handleDeleteItem = (itemId: string) => {
    setWardrobeItems(wardrobeItems.filter((item) => item.id !== itemId));
    setDetailModalOpen(false);
  };

  // Convert items to the format expected by WardrobeGrid
  const gridItems = wardrobeItems.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    color: item.color,
    pattern: item.pattern,
    season: Array.isArray(item.season) ? item.season[0] : item.season,
    imageUrl: item.image,
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">My Wardrobe</h1>
            <p className="text-gray-500">
              Manage and organize your clothing items
            </p>
          </div>
          <Button
            onClick={() => setAddItemModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <WardrobeGrid items={gridItems} onItemClick={handleItemClick} />
        </div>
      </div>

      <AddItemModal
        open={addItemModalOpen}
        onOpenChange={setAddItemModalOpen}
        onSave={handleAddItem}
      />

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
};

export default WardrobePage;
