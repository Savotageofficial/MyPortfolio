import { MetadataRoute } from 'next'

export const dynamic = 'force-static'   // 🔥 ADD THIS
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://safwat.duckdns.org'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
