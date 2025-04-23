import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-900/10 to-black/5">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Ready to find your perfect investor match?
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Join hundreds of founders who've successfully raised through
            AngelMatch.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
              Get Started Free
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
