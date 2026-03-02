"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { projectsService, Project } from "@/services/projects"

export function ProjectList() {
    const queryClient = useQueryClient()

    const { data: projects, isLoading } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: projectsService.getAll
    })

    const deleteMutation = useMutation({
        mutationFn: projectsService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] })
        }
    })

    if (isLoading) {
        return <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-lg bg-muted/50 animate-pulse" />
            ))}
        </div>
    }

    return (
        <div className="grid gap-4">
            {projects?.map((project: Project) => (
                <Card key={project.id} className="group flex justify-between items-center p-6 hover:border-primary/50 transition-colors">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteMutation.mutate(project.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </Card>
            ))}
            {projects?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    No projects yet. Add one above.
                </div>
            )}
        </div>
    )
}
