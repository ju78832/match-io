import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShieldCheck, CheckCircle, Lock, BarChart } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Our algorithm analyzes thousands of data points to connect you with the most relevant investors.",
    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Verified Investors",
    description:
      "All investors are vetted to ensure they're active and serious about funding startups.",
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Secure Introductions",
    description:
      "Communicate safely through our platform until you're ready to share contact details.",
    icon: <Lock className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Detailed Profiles",
    description:
      "View investor preferences, past investments, and deal terms before connecting.",
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
  },
];

export function Features() {
  return (
    <section className="py-16 bg-[#111827] text-white">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Founders Love <span className="text-blue-500">AngelMatch</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            We've built the most efficient way to connect with angel investors
            who are a perfect fit for your startup.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-[#1F2937] border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="pb-2">
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}