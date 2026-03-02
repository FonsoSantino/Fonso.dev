"use client"

import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { projectsService, ProjectCreate } from "@/services/projects"
import api from "@/lib/axios"

export function ProjectForm() {
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<ProjectCreate>()

    const createMutation = useMutation({
        mutationFn: projectsService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] })
            reset()
        }
    })

    const generateDescription = async (title: string) => {
        if (!title) return;
        try {
            // Optimistic UX: Could show loading state here specifically for AI
            const res = await api.post('/ai/generate-description', {
                title,
                keywords: "fullstack, responsive, modern"
            });
            setValue("description", res.data.response);
        } catch (e) {
            console.error(e);
        }
    }

    const onSubmit = (data: ProjectCreate) => {
        createMutation.mutate(data)
    }

    const { title } = watch();

    return (
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid w-full gap-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Project Title"
                                className="font-medium"
                                {...register("title", { required: true })}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => generateDescription(title)}
                                title="Auto-generate description with AI"
                                className="shrink-0"
                            >
                                <Sparkles className="h-4 w-4 text-primary" />
                            </Button>
                        </div>
                        <Input placeholder="Description" {...register("description")} />
                        <Input placeholder="Project Link (e.g. GitHub or Live Demo)" {...register("link")} />
                    </div>
                    <Button type="submit" disabled={isSubmitting || createMutation.isPending} className="w-full">
                        {(isSubmitting || createMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Project
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
