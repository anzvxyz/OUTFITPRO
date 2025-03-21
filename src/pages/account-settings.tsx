import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/layout/Sidebar";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import StylePreferences from "@/components/settings/StylePreferences";
import GenderPreference from "@/components/settings/GenderPreference";

const AccountSettings = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your profile, security, and style preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 bg-white border">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="style">Style Preferences</TabsTrigger>
            <TabsTrigger value="gender">Gender Preference</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <ProfileSettings
              user={{
                name: "Jane Smith",
                email: "jane.smith@example.com",
                bio: "Fashion enthusiast and style blogger with a passion for sustainable clothing.",
                avatarUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
              }}
              onSave={(data) => console.log("Profile updated:", data)}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecuritySettings
              onPasswordChange={(data) =>
                console.log("Password updated:", data)
              }
              isLoading={false}
              error={null}
            />
          </TabsContent>

          <TabsContent value="style" className="mt-0">
            <StylePreferences
              onSave={(data) => console.log("Style preferences updated:", data)}
            />
          </TabsContent>

          <TabsContent value="gender" className="mt-0">
            <GenderPreference
              selectedGender="female"
              onSave={(gender) =>
                console.log("Gender preference updated:", gender)
              }
            />
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="text-sm text-gray-500 text-center">
          <p>
            Need help with your account? Contact our support team at
            support@styleai.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
