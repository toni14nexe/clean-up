import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const showProducts = query.showProducts === 'true'
  const fromDate = query.fromDate
    ? new Date(query.fromDate as string)
    : undefined
  const toDate = query.toDate ? new Date(query.toDate as string) : undefined

  const where: any = { deletedAt: null }
  if (fromDate || toDate) {
    where.createdAt = {}
    if (fromDate) where.createdAt.gte = fromDate
    if (toDate) where.createdAt.lte = toDate
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  const escapeXml = (value: any) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const xmlItems = orders
    .map(order => {
      const list = Array.isArray(order.list) ? order.list : []

      if (showProducts && list.length > 0) {
        return list
          .map((item: any) => {
            return `
      <Narudzba>
        <BrojNarudzbe>${escapeXml(order.orderNumber)}</BrojNarudzbe>
        <Kupac>${escapeXml(order.buyerFullname)}</Kupac>
        <Adresa>${escapeXml(order.buyerAddress)}</Adresa>
        <Mjesto>${escapeXml(order.buyerPlace)}</Mjesto>
        <Postanski>${escapeXml(order.buyerZipCode)}</Postanski>
        <Drzava>${escapeXml(order.buyerCountry)}</Drzava>
        <Email>${escapeXml(order.buyerEmail)}</Email>
        <Tel>${escapeXml(order.buyerNumber ?? '')}</Tel>
        <Placanje>${escapeXml(order.payment)}</Placanje>
        <Dostava>${escapeXml(order.shipping)}</Dostava>
        <Ukupno>${escapeXml(order.totalPrice)}</Ukupno>
        <Opis>${escapeXml(order.description ?? '')}</Opis>
        <Vrijeme>${escapeXml(order.createdAt.toISOString())}</Vrijeme>
        <Proizvod>${escapeXml(item.name)}</Proizvod>
        <Kolicina>${escapeXml(item.quantity)}</Kolicina>
        <Cijena>${escapeXml(item.price)}</Cijena>
        <UkupnoProizvod>${escapeXml(item.totalPrice)}</UkupnoProizvod>
      </Narudzba>`
          })
          .join('\n')
      } else {
        return `
      <Narudzba>
        <BrojNarudzbe>${escapeXml(order.orderNumber)}</BrojNarudzbe>
        <Kupac>${escapeXml(order.buyerFullname)}</Kupac>
        <Adresa>${escapeXml(order.buyerAddress)}</Adresa>
        <Mjesto>${escapeXml(order.buyerPlace)}</Mjesto>
        <Postanski>${escapeXml(order.buyerZipCode)}</Postanski>
        <Drzava>${escapeXml(order.buyerCountry)}</Drzava>
        <Email>${escapeXml(order.buyerEmail)}</Email>
        <Tel>${escapeXml(order.buyerNumber ?? '')}</Tel>
        <Placanje>${escapeXml(order.payment)}</Placanje>
        <Dostava>${escapeXml(order.shipping)}</Dostava>
        <Ukupno>${escapeXml(order.totalPrice)}</Ukupno>
        <Opis>${escapeXml(order.description ?? '')}</Opis>
        <Vrijeme>${escapeXml(order.createdAt.toISOString())}</Vrijeme>
      </Narudzba>`
      }
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Narudzbe>
${xmlItems}
</Narudzbe>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Content-Disposition': 'attachment; filename="narudzbe-export.xml"'
    }
  })
})
