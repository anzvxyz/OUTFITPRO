import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Palette, Shirt, Zap, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureShowcaseProps {
  features?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    imageUrl: string;
    color: string;
  }[];
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features = [
    {
      title: "Smart Wardrobe Management",
      description:
        "Upload and categorize your clothing items. Our AI analyzes colors, patterns, and styles to build your digital wardrobe.",
      icon: <Shirt className="h-10 w-10 text-white" />,
      imageUrl:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "AI-Powered Outfit Suggestions",
      description:
        "Get personalized outfit recommendations based on color harmony, pattern compatibility, and current fashion trends.",
      icon: <Brain className="h-10 w-10 text-white" />,
      imageUrl:
        "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&q=80",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Style Learning",
      description:
        "Our system learns from your preferences and feedback to continuously improve outfit suggestions tailored to your unique style.",
      icon: <Sparkles className="h-10 w-10 text-white" />,
      imageUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      color: "from-pink-500 to-pink-700",
    },
  ],
}) => {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
            <Zap className="w-4 h-4 mr-2 text-indigo-600" />
            Powered by Advanced AI
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Our outfit recommendation engine uses advanced machine learning to
            help you look your best every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl bg-white group",
                "flex flex-col h-full transform hover:-translate-y-2",
              )}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="text-white font-bold text-xl">
                    {feature.title}
                  </div>
                </div>
                <div
                  className={`absolute top-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}
                >
                  {feature.icon}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white to-gray-50">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-indigo-50 to-purple-50 p-10 rounded-2xl shadow-sm relative z-10">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md">
            <Palette className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-3xl font-bold mb-4 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Ready to transform your wardrobe?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who have revolutionized their
            style with our AI-powered recommendations.
          </p>
          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
