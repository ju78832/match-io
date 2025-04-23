import { Card, CardContent, CardHeader } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, TechStart",
    content:
      "AngelMatch helped us secure our seed round in half the time it took for our previous startup. The quality of investors was exceptional.",
    avatar: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "Founder, GreenAI",
    content:
      "I was skeptical at first, but the matches were spot-on. We closed our round with an investor who perfectly understood our space.",
    avatar: "👨‍💻",
  },
  {
    name: "David Rodriguez",
    role: "Angel Investor",
    content:
      "As an investor, I appreciate how AngelMatch surfaces high-quality deals that match my thesis. It saves me countless hours of filtering.",
    avatar: "👨‍💼",
  },
];

export function Testimonials() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Trusted by Founders & Investors
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
