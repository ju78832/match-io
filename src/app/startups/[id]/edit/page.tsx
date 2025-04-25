"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().min(2),
  stage: z.string().min(2),
  fundingGoal: z.string().min(1),
});

export default function EditStartupPage({
  params,
}: {
  params: { id: string };
}) {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const response = await fetch(`/api/startups/${params.id}`);
      const data = await response.json();
      return {
        name: data.name,
        description: data.description,
        website: data.website || "",
        industry: data.industry,
        stage: data.stage,
        fundingGoal: data.fundingGoal.toString(),
      };
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/startups/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          fundingGoal: parseFloat(values.fundingGoal),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update startup profile");
      }

      router.push(`/startups/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please sign in to edit this startup profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
        Edit Startup Profile
      </h1>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Startup" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your startup in detail..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input
                    placeholder="FinTech, HealthTech, SaaS, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pre-seed, Seed, Series A, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fundingGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Goal ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="500000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/startups/${params.id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
