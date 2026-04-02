'use server'

export type ContactState = {
  success?: boolean
  error?: string
} | null

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = (formData.get('name')    as string | null)?.trim()
  const email   = (formData.get('email')   as string | null)?.trim()
  const phone   = (formData.get('phone')   as string | null)?.trim()
  const message = (formData.get('message') as string | null)?.trim()

  if (!name || !email || !message) {
    return { error: 'fields' }
  }

  // TODO: brancher un service d'envoi d'e-mail (ex. Resend, Nodemailer)
  // Exemple Resend :
  // await resend.emails.send({
  //   from: 'site@compano.ca',
  //   to: 'info@compano.ca',
  //   subject: 'Message venant du site web',
  //   html: `<p><b>Nom :</b> ${name}</p><p><b>Courriel :</b> ${email}</p><p><b>Téléphone :</b> ${phone}</p><p><b>Message :</b> ${message}</p>`,
  // })

  console.log('[contact form]', { name, email, phone, message })
  return { success: true }
}
