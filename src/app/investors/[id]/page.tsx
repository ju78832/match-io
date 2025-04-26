import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InvestorProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const investor = await prisma.investor.findUnique({
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

  if (!investor) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Investor not found</h1>
      </div>
    );
  }

  const isOwner = user._id === investor.userId;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          {investor.name}
        </h1>
        {isOwner && (
          <Button asChild variant="outline">
            <Link href={`/investors/${investor.id}/edit`}>Edit Profile</Link>
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
              {investor.bio}
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Focus Areas:</span>{" "}
                {investor.focusAreas.join(", ")}
              </p>
              <p>
                <span className="font-medium">Investment Range:</span>{" "}
                {investor.investmentRange}
              </p>
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
                <span className="font-medium">Name:</span> {investor.user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {investor.user.email}
              </p>
            </div>
            {!isOwner && user.role === "FOUNDER" && (
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
