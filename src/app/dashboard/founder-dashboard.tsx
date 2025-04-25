"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Startup } from "@/generated/prisma";
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

export default function FounderDashboard() {
  const { data: session } = useSession();
  const [startup, setStartup] = useState<Startup | null>(null);
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
            (s: any) => s.userId === session?.user._id
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
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Founder Actions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Founder Tools</DialogTitle>
                <DialogDescription>
                  Manage your startup and connections
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {startup ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/startups/${startup.id}/edit`}>
                        Edit Startup Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Investor Matches
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request Introduction
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Link href="/create-startup">Create Startup Profile</Link>
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

      {!startup ? (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Startup Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your startup profile to start matching with investors.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
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
                        <div className="flex gap-2">
                          <Button asChild variant="outline" className="w-full">
                            <Link href={`/investors/${match.investor.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
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
                <Link href={`/startups/${startup.id}/edit`}>
                  Update Profile
                </Link>
              </Button>
              <Button variant="outline">Find More Investors</Button>
              <Button variant="outline">View Analytics</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
