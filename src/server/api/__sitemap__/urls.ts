import type { SitemapUrlInput } from '#sitemap/types'

export default defineEventHandler(async () => {
  const baseUrl = process.env.APP_BASE_URL

  // Fetchanje podataka paralelno
  const [productsRes] = await Promise.all([fetch(`${baseUrl}/api/product`)])

  if (!productsRes.ok) {
    throw new Error('Failed to fetch one of the sitemap sources.')
  }

  const [productsData] = await Promise.all([productsRes.json()])

  const products = productsData.products ?? []

  const productUrls = products.map((item: any) => ({
    loc: `/webshop/${item.id}`
  }))

  const staticUrls: SitemapUrlInput[] = [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/o-nama', changefreq: 'daily', priority: 1.0 },
    { loc: '/kontakt', changefreq: 'daily', priority: 1.0 },
    { loc: '/webshop', changefreq: 'daily', priority: 1.0 },
    { loc: '/pretrazivanje', changefreq: 'daily', priority: 1.0 },
    { loc: '/kosarica', changefreq: 'daily', priority: 1.0 },
    { loc: '/kolacici', changefreq: 'daily', priority: 1.0 },
    { loc: '/zastita-privatnosti', changefreq: 'daily', priority: 1.0 },
    { loc: '/uvjeti-koristenja', changefreq: 'daily', priority: 1.0 },
    { loc: '/uvjeti-prodaje', changefreq: 'daily', priority: 1.0 },
    { loc: '/online-placanje', changefreq: 'daily', priority: 1.0 }
  ]

  return [...staticUrls, ...productUrls] satisfies SitemapUrlInput[]
})
