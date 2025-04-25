"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Startup } from "@/generated/prisma";

export default function StartupsPage() {
  const { data: session } = useSession();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/startups");
        if (response.ok) {
          const data = await response.json();
          setStartups(data);
          setFilteredStartups(data);
        }
      } catch (error) {
        console.error("Error fetching startups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  useEffect(() => {
    let results = startups;

    if (searchTerm) {
      results = results.filter(
        (startup) =>
          startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (industryFilter) {
      results = results.filter(
        (startup) =>
          startup.industry.toLowerCase() === industryFilter.toLowerCase()
      );
    }

    setFilteredStartups(results);
  }, [searchTerm, industryFilter, startups]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const industries = Array.from(new Set(startups.map((s) => s.industry)));

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Startup Directory
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredStartups.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Startups Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || industryFilter
                ? "Try adjusting your search criteria"
                : "No startups are currently registered"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStartups.map((startup) => (
            <Card
              key={startup.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{startup.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {startup.industry}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {startup.stage}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {startup.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-medium">
                    ${startup.fundingGoal.toLocaleString()} Goal
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/startups/${startup.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {session?.user.role === "FOUNDER" && (
        <div className="mt-8 flex justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/create-startup">Add Your Startup</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
