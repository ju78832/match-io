"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FounderDashboard() {
  const { data: session } = useSession();
  const [startup, setStartup] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch startup profile
        const startupRes = await fetch("/api/startups");
        if (startupRes.ok) {
          const startups = await startupRes.json();
          const userStartup = startups.find(
            (s: any) => s.userId === session?.user.id
          );
          setStartup(userStartup);
        }

        // Fetch matches
        const matchesRes = await fetch("/api/matches?type=startup");
        if (matchesRes.ok) {
          const matchesData = await matchesRes.json();
          setMatches(matchesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Founder Dashboard
        </h1>
        {!startup ? (
          <Button asChild>
            <Link href="/create-startup">Create Startup Profile</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href={`/startups/${startup.id}`}>View Profile</Link>
          </Button>
        )}
      </div>

      {!startup ? (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Startup Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your startup profile to start matching with investors.
            </p>
            <Button asChild>
              <Link href="/create-startup">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Matches</CardTitle>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  You don't have any matches yet. We'll notify you when we find
                  compatible investors.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {matches.map((match: any) => (
                    <Card key={match.id} className="hover:shadow-lg">
                      <CardHeader>
                        <CardTitle>{match.investor.user.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Match Score:{" "}
                          <span className="font-semibold">
                            {match.matchScore.toFixed(1)}%
                          </span>
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full mt-2"
                        >
                          <Link href={`/investors/${match.investor.id}`}>
                            View Investor
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
