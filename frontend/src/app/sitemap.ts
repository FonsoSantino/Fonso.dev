import { MetadataRoute } from 'next'
import { projectsService } from '@/services/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // In a real build, we might need a way to fetch this data server-side without full axios setup or use a direct DB call if it was same repo.
    // For now, we will just list static routes and assumes projects will be dynamically fetched if we had a detail page.

    const routes = [
        '',
        '/projects',
        '/login',
    ].map((route) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:3000'}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }))

    return [...routes]
}
