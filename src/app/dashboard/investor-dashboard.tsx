"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InvestorDashboard() {
  const { data: session } = useSession();
  const [investor, setInvestor] = useState<any>(null);
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
            (i: any) => i.userId === session?.user._id
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
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Investor Actions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Investor Tools</DialogTitle>
                <DialogDescription>
                  Manage your investments and connections
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {investor ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/investors/${investor.id}/edit`}>
                        Edit Investor Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Startup Matches
                    </Button>
                    <Button variant="outline" className="w-full">
                      Update Investment Criteria
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Link href="/create-investor">Create Investor Profile</Link>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Logout
          </Button>
        </div>
      </div>

      {!investor ? (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Investor Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your investor profile to start matching with promising
              startups.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
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
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {match.startup.industry}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {match.startup.stage}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Match Score:{" "}
                          <span className="font-semibold">
                            {match.matchScore.toFixed(1)}%
                          </span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {match.startup.description}
                        </p>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" className="flex-1">
                            <Link href={`/startups/${match.startup.id}`}>
                              View Details
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href={`/investors/${investor.id}/edit`}>
                  Update Profile
                </Link>
              </Button>
              <Button variant="outline">Find More Startups</Button>
              <Button variant="outline">View Analytics</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
