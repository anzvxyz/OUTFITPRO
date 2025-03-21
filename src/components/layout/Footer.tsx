import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shirt,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const Footer = ({
  companyName = "Style AI",
  companyLogo = "",
  socialLinks = {
    github: "https://github.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  contactInfo = {
    email: "contact@styleai.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Ave, New York, NY 10001",
  },
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Style Guide", href: "/style-guide" },
        { label: "Tutorials", href: "/tutorials" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -top-20 right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 left-20 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  className="h-10 w-auto mr-3"
                />
              ) : (
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mr-3 shadow-md">
                  <Shirt className="h-5 w-5" />
                </div>
              )}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {companyName}
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Your personal AI-powered outfit recommendation engine. Discover
              perfect outfit combinations based on your wardrobe and style
              preferences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-pink-50"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-600">{contactInfo.address}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>

        {/* Scroll to top button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="icon"
            onClick={scrollToTop}
            className="rounded-full bg-primary/90 hover:bg-primary shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
