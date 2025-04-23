"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InvestorDashboard() {
  const { data: session } = useSession();
  const [investor, setInvestor] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch investor profile
        const investorRes = await fetch("/api/investors");
        if (investorRes.ok) {
          const investors = await investorRes.json();
          const userInvestor = investors.find(
            (i: any) => i.userId === session?.user.id
          );
          setInvestor(userInvestor);
        }

        // Fetch matches
        const matchesRes = await fetch("/api/matches?type=investor");
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
          Investor Dashboard
        </h1>
        {!investor ? (
          <Button asChild>
            <Link href="/create-investor">Create Investor Profile</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href={`/investors/${investor.id}`}>View Profile</Link>
          </Button>
        )}
      </div>

      {!investor ? (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Investor Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your investor profile to start matching with startups.
            </p>
            <Button asChild>
              <Link href="/create-investor">Get Started</Link>
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
                  compatible startups.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {matches.map((match: any) => (
                    <Card key={match.id} className="hover:shadow-lg">
                      <CardHeader>
                        <CardTitle>{match.startup.name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {match.startup.industry}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Match Score:{" "}
                          <span className="font-semibold">
                            {match.matchScore.toFixed(1)}%
                          </span>
                        </p>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" className="flex-1">
                            <Link href={`/startups/${match.startup.id}`}>
                              View Startup
                            </Link>
                          </Button>
                          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Startups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Based on your investment preferences, we'll recommend startups
                that match your criteria.
              </p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
