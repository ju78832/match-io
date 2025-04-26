import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StartupProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const startup = await prisma.startup.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!startup) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Startup not found</h1>
      </div>
    );
  }

  const isOwner = user._id === startup.userId;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          {startup.name}
        </h1>
        {isOwner && (
          <Button asChild variant="outline">
            <Link href={`/startups/${startup.id}/edit`}>Edit Profile</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {startup.description}
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Industry:</span>{" "}
                {startup.industry}
              </p>
              <p>
                <span className="font-medium">Stage:</span> {startup.stage}
              </p>
              <p>
                <span className="font-medium">Funding Goal:</span> $
                {startup.fundingGoal.toLocaleString()}
              </p>
              {startup.website && (
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  <Link
                    href={startup.website}
                    className="text-purple-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {startup.website}
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Founder:</span>{" "}
                {startup.user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {startup.user.email}
              </p>
            </div>
            {!isOwner && user.role === "INVESTOR" && (
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                Request Connection
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
