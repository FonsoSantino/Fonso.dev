"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2, Building2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { experienceService, Experience } from "@/services/experience"

export function ExperienceList() {
    const queryClient = useQueryClient()

    const { data: experiences, isLoading } = useQuery({
        queryKey: ["admin-experiences"],
        queryFn: experienceService.getAll
    })

    const deleteMutation = useMutation({
        mutationFn: experienceService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-experiences"] })
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
            {experiences?.map((exp: Experience) => (
                <Card key={exp.id} className="group flex justify-between items-start p-6 hover:border-primary/50 transition-colors">
                    <div className="space-y-2">
                        <div>
                            <h3 className="font-semibold text-lg">{exp.position}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span className="font-medium">{exp.company}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md w-fit">
                            <Calendar className="h-3 w-3" />
                            <span>
                                {exp.start_date} — {exp.end_date || 'Present'}
                            </span>
                        </div>

                        {exp.description && (
                            <p className="text-sm text-muted-foreground mt-2 max-w-xl">{exp.description}</p>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteMutation.mutate(exp.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </Card>
            ))}
            {experiences?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    No work experience added yet.
                </div>
            )}
        </div>
    )
}
