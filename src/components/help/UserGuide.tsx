import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Book,
  Home,
  ShoppingBag,
  Shirt,
  Heart,
  Settings,
  User,
  HelpCircle,
  Mail,
} from "lucide-react";

const UserGuide = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Book className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">StyleAI User Guide</h1>
      </div>

      <p className="text-gray-600 mb-8">
        Welcome to StyleAI, your personal AI-powered wardrobe stylist! This
        guide will help you navigate through all the features of our
        application.
      </p>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="wardrobe">My Wardrobe</TabsTrigger>
          <TabsTrigger value="suggestions">Outfit Suggestions</TabsTrigger>
          <TabsTrigger value="saved">Saved Outfits</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="gender">Gender Preferences</TabsTrigger>
          <TabsTrigger value="help">Troubleshooting</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-6">
            <ScrollArea className="h-[60vh]">
              <TabsContent value="getting-started" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Getting Started</h2>
                  </div>
                  <Separator />

                  <h3 className="text-xl font-semibold mt-4">
                    Registration and Login
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <strong>Sign Up</strong>: Click the "Sign Up" button on
                      the homepage and fill in your details.
                    </li>
                    <li>
                      <strong>Login</strong>: If you already have an account,
                      click "Login" and enter your credentials.
                    </li>
                    <li>
                      <strong>Profile Setup</strong>: After your first login,
                      you'll be prompted to set up your profile, including
                      gender preferences for clothing recommendations.
                    </li>
                  </ol>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Complete your profile with accurate information to
                      get the most personalized outfit recommendations.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dashboard" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                  </div>
                  <Separator />

                  <p>
                    The Dashboard is your central hub for all StyleAI
                    activities:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Wardrobe Summary</strong>: See a quick overview of
                      your clothing items.
                    </li>
                    <li>
                      <strong>Style Score</strong>: Your personalized style
                      rating based on wardrobe variety.
                    </li>
                    <li>
                      <strong>Seasonal Readiness</strong>: Check if your
                      wardrobe is ready for the current season.
                    </li>
                    <li>
                      <strong>Recent Additions</strong>: View the latest items
                      you've added to your wardrobe.
                    </li>
                    <li>
                      <strong>Saved Outfits</strong>: Quick access to your
                      favorite outfit combinations.
                    </li>
                    <li>
                      <strong>Outfit Suggestions</strong>: AI-generated outfit
                      ideas based on your wardrobe.
                    </li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Check your Dashboard regularly for new outfit
                      suggestions and seasonal recommendations.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="wardrobe" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">My Wardrobe</h2>
                  </div>
                  <Separator />

                  <p>Manage all your clothing items in one place:</p>

                  <h3 className="text-xl font-semibold mt-4">Adding Items</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click "Add New Item" button.</li>
                    <li>Upload a photo of your clothing item.</li>
                    <li>
                      Our AI will analyze the image and detect color and
                      pattern.
                    </li>
                    <li>
                      Fill in additional details like category, season, and
                      gender category.
                    </li>
                    <li>Click "Save Item" to add it to your wardrobe.</li>
                  </ol>

                  <h3 className="text-xl font-semibold mt-4">Managing Items</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Browse</strong>: View all your items in a grid
                      layout.
                    </li>
                    <li>
                      <strong>Filter</strong>: Use filters to find specific
                      items by category, color, pattern, season, or gender
                      category.
                    </li>
                    <li>
                      <strong>Search</strong>: Use the search bar to find items
                      by name or description.
                    </li>
                    <li>
                      <strong>Edit/Delete</strong>: Click on any item to view
                      details, edit information, or remove it from your
                      wardrobe.
                    </li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Add as many items as possible from your real wardrobe
                      for the best outfit recommendations.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="suggestions" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Outfit Suggestions</h2>
                  </div>
                  <Separator />

                  <p>
                    Get AI-powered outfit recommendations based on your
                    wardrobe:
                  </p>

                  <h3 className="text-xl font-semibold mt-4">
                    Generating Suggestions
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the "Outfit Suggestions" page.</li>
                    <li>Click "Generate New" to get fresh outfit ideas.</li>
                    <li>
                      The AI considers your style preferences, gender
                      preference, color harmony, pattern compatibility, and
                      current trends.
                    </li>
                  </ol>

                  <h3 className="text-xl font-semibold mt-4">
                    Filtering Suggestions
                  </h3>
                  <p>Use the filters to refine suggestions by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Occasion (casual, formal, business, etc.)</li>
                    <li>Season (spring, summer, fall, winter)</li>
                    <li>Style (casual, classic, bohemian, etc.)</li>
                    <li>Color Scheme (monochrome, neutral, warm, etc.)</li>
                    <li>Gender Category (men's, women's, gender neutral)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-4">
                    Interacting with Suggestions
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Like/Dislike</strong>: Provide feedback to improve
                      future recommendations.
                    </li>
                    <li>
                      <strong>Save</strong>: Add an outfit to your saved
                      collection.
                    </li>
                    <li>
                      <strong>Modify</strong>: Adjust the suggested outfit by
                      swapping items.
                    </li>
                    <li>
                      <strong>View Details</strong>: See more information about
                      each item in the outfit.
                    </li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: The more you interact with suggestions
                      (like/dislike), the better the AI becomes at understanding
                      your style preferences.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Saved Outfits</h2>
                  </div>
                  <Separator />

                  <p>Manage your favorite outfit combinations:</p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Browse</strong>: View all your saved outfits.
                    </li>
                    <li>
                      <strong>Edit</strong>: Make changes to saved outfits.
                    </li>
                    <li>
                      <strong>Delete</strong>: Remove outfits you no longer
                      want.
                    </li>
                    <li>
                      <strong>View Details</strong>: See all items included in
                      an outfit.
                    </li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Create collections of saved outfits for different
                      occasions or seasons to quickly find the perfect outfit
                      when needed.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Account Settings</h2>
                  </div>
                  <Separator />

                  <p>Manage your personal information and preferences:</p>

                  <h3 className="text-xl font-semibold mt-4">
                    Profile Settings
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Update your name, email, and profile picture.</li>
                    <li>Edit your bio and personal information.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-4">
                    Security Settings
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Change your password.</li>
                    <li>Manage account security options.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-4">
                    Style Preferences
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Set your favorite colors, patterns, and styles.</li>
                    <li>Adjust casual-formal balance preference.</li>
                    <li>Select seasonal preferences.</li>
                    <li>Choose occasion preferences.</li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Keep your style preferences updated as your fashion
                      taste evolves for more accurate recommendations.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gender" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Gender Preferences</h2>
                  </div>
                  <Separator />

                  <p>
                    StyleAI uses your gender preference to ensure outfit
                    recommendations match your identity:
                  </p>

                  <ol className="list-decimal pl-6 space-y-2 mt-4">
                    <li>
                      Navigate to Account Settings &rarr; Gender Preference.
                    </li>
                    <li>
                      Select from:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Men's Clothing</li>
                        <li>Women's Clothing</li>
                        <li>Gender Neutral</li>
                      </ul>
                    </li>
                    <li>Save your preference.</li>
                  </ol>

                  <p className="mt-4">
                    This setting ensures you'll only receive outfit suggestions
                    appropriate for your selected gender category. You can
                    change this setting at any time.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    How Gender Preferences Work
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      When adding items to your wardrobe, you can specify the
                      gender category for each item.
                    </li>
                    <li>
                      The outfit recommendation engine uses your gender
                      preference to filter suggestions.
                    </li>
                    <li>
                      If you select "Gender Neutral," you'll receive a mix of
                      versatile items that work across gender expressions.
                    </li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: You can have clothing items from different gender
                      categories in your wardrobe, but the AI will prioritize
                      recommendations that match your gender preference.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="help" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Troubleshooting</h2>
                  </div>
                  <Separator />

                  <h3 className="text-xl font-semibold mt-4">Common Issues</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Image Upload Problems</strong>: Ensure your image
                      is in JPG, PNG, or WEBP format and under 5MB.
                    </li>
                    <li>
                      <strong>Outfit Generation Issues</strong>: Make sure you
                      have enough items in your wardrobe (at least 5-10) for
                      better suggestions.
                    </li>
                    <li>
                      <strong>Filter Not Working</strong>: Try clearing all
                      filters and applying them one by one.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">
                    Contact Support
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <p>
                      If you encounter any issues or have questions, contact our
                      support team at{" "}
                      <a
                        href="mailto:support@styleai.com"
                        className="text-primary hover:underline"
                      >
                        support@styleai.com
                      </a>
                      .
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-700">
                      Tip: Check our FAQ section for answers to common questions
                      before contacting support.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default UserGuide;
