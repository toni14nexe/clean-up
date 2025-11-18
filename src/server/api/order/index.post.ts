import nodemailer from 'nodemailer'
import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    if (
      !body.totalPrice ||
      !body.buyerFullname ||
      !body.buyerEmail ||
      !body.buyerNumber ||
      !body.buyerAddress ||
      !body.buyerPlace ||
      !body.objectType ||
      !body.date ||
      !body.time ||
      !body.datetime ||
      !body.persons ||
      !body.list ||
      !body.payment
    )
      throw createError({
        statusCode: 400,
        statusMessage: 'Body parameter is missing.'
      })

    const order = await prisma.order.create({
      data: {
        list: body.list,
        totalPrice: Number(body.totalPrice),
        buyerFullname: body.buyerFullname,
        buyerEmail: body.buyerEmail,
        buyerNumber: body.buyerNumber,
        buyerAddress: body.buyerAddress,
        buyerPlace: body.buyerPlace,
        objectType: body.objectType,
        date: body.date,
        time: body.time,
        datetime: body.datetime,
        persons: body.persons,
        additional: body.additional,
        description: body.description,
        payment: body.payment
      }
    })

    const transporter = nodemailer.createTransport({
      service:
        process.env.APP_EMAIL_HOST === 'smtp.zoho.eu' ? undefined : 'gmail',
      host: process.env.APP_EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD
      }
    })

    const orderItemsHtml = order.list
      // @ts-expect-error
      ?.map(
        (item: any) => `
      <div style="margin-bottom: 10px; padding: 8px; border-bottom: 1px solid #eee;">
        <p><b>${item.name}</b></p>
        ${item.image ? `<img src="${item.image}" alt="${item.name}" width="120" style="margin-top:5px;"/>` : ''}
        <p>Sati: ${item.quantity} h</p>
        <p>Cijena: ${item.price.toFixed(2)} €</p>
        <p>Ukupno: ${Number(item.totalPrice).toFixed(2)} €</p>
      </div>
    `
      )
      .join('')

    const mailOptions = {
      from: `"Agencija za Čišćenje Horizon" <${process.env.APP_EMAIL}>`,
      to: [body.buyerEmail, process.env.APP_EMAIL],
      subject: `Agencija za Čišćenje Horizon narudžba ${order.orderNumber}`,
      html: `
               <a href="${process.env.APP_BASE_URL}" style="text-decoration: none"><h1 style="background-color: #409eff; color: white; width: fit-content; padding: 0 15px 0 14px; border-radius: 4px">Agencija za Čišćenje Horizon</h1></a>
               <h3>Narudžba ${order.orderNumber} je zaprimljena u ${formatToDatetime(String(order.createdAt))}.</h3>
               <br/>
               <b><p>Kupac</p></b>
               <p>Ime i prezime: ${order.buyerFullname}</p>
               <p>Email: ${order.buyerEmail}</p>
               <p>Mobitel: ${order.buyerNumber || '-'}</p>
               <p>Adresa: ${order.buyerAddress}</p>
               <p>Mjesto: ${order.buyerPlace}</p>
               <br/>
               <p>Objekt: ${order.objectType || '-'}</p>
               <p>Datum/Vrijeme usluge: ${formatToDatetime(String(order.datetime)) || '-'}</p>
               <p>Broj djelatnika: ${order.persons || '-'}</p>
               <p>Dodatno: ${
                 Array.isArray(order.additional) && order.additional.length > 0
                   ? order.additional.join(', ')
                   : '-'
               }</p>
               <br/>
               <b><p>Prodavač</p></b>
               <p>Agencija za Čišćenje Horizon d.o.o.</p>
               <p>Email: info@horizon-escape.hr</p>
               <p>Mobitel: +385 99 7900 257</p>
               <p>Adresa: Baćina 2</p>
               <p>Mjesto: 51219 Čavle</p>
               <p>Država: Hrvatska</p>
               <br/>
               <b><p>Plaćanje: ${order.payment}</p></b>
               <br/>
               <b><p>Narudžba</p></b>
               ${orderItemsHtml}
               <b><p>Ukupna cijena: ${Number(body.totalPrice).toFixed(2)} €</p></b>
               <br/>
               <a href="${process.env.APP_BASE_URL}/narudzba/${order.id}">Narudžba dostupna ovdje</a>`
    }
    await transporter.sendMail(mailOptions)

    return order
  }
})
