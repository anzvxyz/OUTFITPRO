import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Sparkles,
  Shirt,
  Brain,
  Palette,
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const HeroSection = ({
  onGetStarted = () => console.log("Get started clicked"),
  onLogin = () => console.log("Login clicked"),
}: HeroSectionProps) => {
  const features = [
    {
      title: "Smart Wardrobe Management",
      description:
        "Easily upload and categorize your clothing items with automatic color and pattern detection.",
      icon: <Shirt className="h-5 w-5 text-primary" />,
      color: "bg-blue-50 border-blue-100",
      iconBg: "bg-blue-100",
    },
    {
      title: "AI-Powered Outfit Suggestions",
      description:
        "Get personalized outfit recommendations based on color harmony, pattern compatibility, and current trends.",
      icon: <Brain className="h-5 w-5 text-primary" />,
      color: "bg-purple-50 border-purple-100",
      iconBg: "bg-purple-100",
    },
    {
      title: "Learn Your Style",
      description:
        "Our system learns from your preferences to improve suggestions over time.",
      icon: <Palette className="h-5 w-5 text-primary" />,
      color: "bg-green-50 border-green-100",
      iconBg: "bg-green-100",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-20 px-4 md:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Background decorative elements */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute -bottom-32 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-200 to-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        ></div>

        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm border border-primary/20 shadow-sm">
          <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
          AI-Powered Style Recommendations
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Your Personal Wardrobe Stylist
        </h1>

        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Upload your clothing items and let our AI create perfect outfit
          combinations based on color harmony, pattern compatibility, and your
          personal style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="text-base font-medium px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onLogin}
            className="text-base font-medium px-8 border-2 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Login
          </Button>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} p-6 rounded-xl shadow-md border backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div
                className={`h-12 w-12 rounded-full ${feature.iconBg} flex items-center justify-center mb-4 mx-auto shadow-inner`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Floating elements for visual interest */}
        <div
          className="absolute top-40 -left-16 w-12 h-12 rounded-full bg-yellow-200 opacity-60 animate-float"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-8 h-8 rounded-full bg-green-200 opacity-60 animate-float"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 right-0 w-10 h-10 rounded-full bg-pink-200 opacity-60 animate-float"
          style={{ animationDuration: "7s", animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default HeroSection;
