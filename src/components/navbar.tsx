"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111827] text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 32L20 20L28 28L40 16"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32 16H40V24"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 font-bold text-xl text-white">
                AngelMatch
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/startups"
            className="hover:text-blue-400 transition-colors"
          >
            For Startups
          </Link>
          <Link
            href="/investors"
            className="hover:text-blue-400 transition-colors"
          >
            For Investors
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-blue-400 transition-colors"
          >
            How It Works
          </Link>
          <div className="flex items-center space-x-3 ml-4">
            <Link
              href="/login"
              className="px-5 py-1.5 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-1.5 border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F2937] py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/startups"
              className="hover:text-blue-400 transition-colors"
            >
              For Startups
            </Link>
            <Link
              href="/investors"
              className="hover:text-blue-400 transition-colors"
            >
              For Investors
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-blue-400 transition-colors"
            >
              How It Works
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/login"
                className="px-4 py-2 text-center border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
