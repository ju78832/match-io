import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Our algorithm analyzes thousands of data points to connect you with the most relevant investors.",
    icon: "🤖",
  },
  {
    title: "Verified Investors",
    description:
      "All investors are vetted to ensure they're active and serious about funding startups.",
    icon: "✅",
  },
  {
    title: "Secure Introductions",
    description:
      "Communicate safely through our platform until you're ready to share contact details.",
    icon: "🔒",
  },
  {
    title: "Detailed Profiles",
    description:
      "View investor preferences, past investments, and deal terms before connecting.",
    icon: "📊",
  },
];

export function Features() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Why Founders Love AngelMatch
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            We've built the most efficient way to connect with angel investors
            who are a perfect fit for your startup.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
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
