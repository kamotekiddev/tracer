"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-elements/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  project_name: z.string().min(2, {
    message: "This must be at least 2 characters.",
  }),
  key: z.string().min(2, {
    message: "This must be at least 2 characters.",
  }),
});

type CreateProjectFormSchema = z.infer<typeof formSchema>;

const defaultValues: CreateProjectFormSchema = {
  project_name: "",
  key: "",
};

function CreateProjectForm() {
  const form = useForm<CreateProjectFormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="font-black">New Project</CardTitle>
          <CardDescription>
            Explore what&apos;s possible when you collaborate with your team.
            Edit project details anytime in project settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Project Name"
              control={form.control}
              name="project_name"
            />
            <FormInput
              label="Key"
              control={form.control}
              name="project_name"
              description="Add acronym of your project name ex. SSWI"
            />
            <div className="flex gap-4 justify-end">
              <Link
                href="/projects"
                className={buttonVariants({ variant: "outline" })}
              >
                Cancel
              </Link>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}

export default CreateProjectForm;
