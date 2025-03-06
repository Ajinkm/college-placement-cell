import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterProps {
  collegeName?: string;
  collegeAddress?: string;
  collegePhone?: string;
  collegeEmail?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const Footer = ({
  collegeName = "University Placement Cell",
  collegeAddress = "123 Education Street, Knowledge City, 400001",
  collegePhone = "+91 1234567890",
  collegeEmail = "placements@university.edu",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
}: FooterProps) => {
  return (
    <footer className="w-full bg-background border-t py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{collegeName}</h3>
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>{collegeAddress}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{collegePhone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${collegeEmail}`} className="hover:text-primary">
                {collegeEmail}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-muted-foreground hover:text-primary"
                >
                  Job Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-primary"
                >
                  Student Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-muted-foreground hover:text-primary"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-muted-foreground hover:text-primary"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">For Recruiters</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/recruiter/login"
                  className="text-muted-foreground hover:text-primary"
                >
                  Recruiter Login
                </Link>
              </li>
              <li>
                <Link
                  to="/recruiter/register"
                  className="text-muted-foreground hover:text-primary"
                >
                  Register Company
                </Link>
              </li>
              <li>
                <Link
                  to="/post-job"
                  className="text-muted-foreground hover:text-primary"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/brochure"
                  className="text-muted-foreground hover:text-primary"
                >
                  Placement Brochure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Newsletter */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="h-10 px-4 pr-20 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full md:w-64"
              />
              <Button size="sm" className="absolute right-0.5 top-0.5 h-9">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {collegeName}. All rights reserved.
          </p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="hover:text-primary ml-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
