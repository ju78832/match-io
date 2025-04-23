"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateInvestorPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/investors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          bio,
          focusAreas: focusAreas.split(",").map((area) => area.trim()),
          investmentRange,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create investor profile");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please sign in to create an investor profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
        Create Investor Profile
      </h1>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            rows={5}
            placeholder="Tell us about your investment experience and philosophy..."
          />
        </div>

        <div>
          <Label htmlFor="focusAreas">Focus Areas (comma separated)</Label>
          <Input
            id="focusAreas"
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
            required
            placeholder="e.g., FinTech, HealthTech, AI"
          />
        </div>

        <div>
          <Label htmlFor="investmentRange">Investment Range</Label>
          <Input
            id="investmentRange"
            value={investmentRange}
            onChange={(e) => setInvestmentRange(e.target.value)}
            required
            placeholder="e.g., $50k - $500k"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
