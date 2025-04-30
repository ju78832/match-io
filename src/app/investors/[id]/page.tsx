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
      <div className="container py-8 bg-white">
        <h1 className="text-2xl font-bold text-black">Investor not found</h1>
      </div>
    );
  }

  const isOwner = user._id === investor.userId;

  return (
    <div className="container py-8 bg-white mx-auto px-2 md:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-500">
          {investor.name}
        </h1>
        {isOwner && (
          <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            <Link href={`/investors/${investor.id}/edit`}>Edit Profile</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-blue-50 border-b border-gray-200">
            <CardTitle className="text-black">About</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-gray-600 mb-6">
              {investor.bio}
            </p>
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <p>
                <span className="font-medium text-black">Focus Areas:</span>{" "}
                <div className="mt-1 flex flex-wrap gap-2">
                  {investor.focusAreas.map((area, index) => (
                    <span key={index} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-500">
                      {area}
                    </span>
                  ))}
                </div>
              </p>
              <p className="flex flex-wrap items-center gap-2 mt-3">
                <span className="font-medium text-black">Investment Range:</span>{" "}
                <span className="text-blue-500 font-semibold">{investor.investmentRange}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-blue-50 border-b border-gray-200">
            <CardTitle className="text-black">Contact</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3 mb-6">
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Name:</span>{" "}
                <span>{investor.user.name}</span>
              </p>
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Email:</span>{" "}
                <span>{investor.user.email}</span>
              </p>
            </div>
            {!isOwner && user.role === "FOUNDER" && (
              <div className="pt-4 border-t border-gray-200">
                <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                  Request Connection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}