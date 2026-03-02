"use client"

import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { experienceService, ExperienceCreate } from "@/services/experience"

export function ExperienceForm() {
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ExperienceCreate>()

    const createMutation = useMutation({
        mutationFn: experienceService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-experiences"] })
            reset()
        }
    })

    const onSubmit = (data: ExperienceCreate) => {
        createMutation.mutate(data)
    }

    return (
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Company" className="font-medium" {...register("company", { required: true })} />
                        <Input placeholder="Position" className="font-medium" {...register("position", { required: true })} />
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Start Date</label>
                            <Input type="date" {...register("start_date", { required: true })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">End Date (Leave empty for 'Present')</label>
                            <Input type="date" {...register("end_date")} />
                        </div>
                    </div>
                    <Textarea
                        placeholder="Description of responsibilities and achievements..."
                        className="min-h-[100px]"
                        {...register("description")}
                    />
                    <Button type="submit" disabled={isSubmitting || createMutation.isPending} className="w-full">
                        {(isSubmitting || createMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Experience
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
