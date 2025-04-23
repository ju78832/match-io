import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Hero() {
  return (
    <section className="relative py-20">
      <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Connect with the right investors for your startup
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
            AngelMatch uses AI to connect founders with the most relevant angel
            investors based on your industry, stage, and funding needs.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Find Investors Now
            </Button>
            <Button variant="outline">Learn How It Works</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-md overflow-hidden rounded-xl border bg-gradient-to-br from-purple-900/20 to-black/50 p-1">
            <div className="h-80 w-full rounded-lg bg-gradient-to-br from-purple-900/10 to-black/30 flex items-center justify-center">
              <span className="text-muted-foreground">Platform Preview</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
