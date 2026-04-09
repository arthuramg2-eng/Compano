'use server'

export type RegistrationState = {
  success?: boolean
  error?: string
} | null

export async function submitRegistration(
  _prev: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const firstName    = (formData.get('first_name')    as string | null)?.trim()
  const lastName     = (formData.get('last_name')     as string | null)?.trim()
  const email        = (formData.get('email')         as string | null)?.trim()
  const model        = (formData.get('model')         as string | null)?.trim()
  const serial       = (formData.get('serial')        as string | null)?.trim()
  const purchaseDate = (formData.get('purchase_date') as string | null)?.trim()
  const dealer       = (formData.get('dealer')        as string | null)?.trim()
  const warranty     = formData.get('warranty_accept')

  if (!firstName || !lastName || !email || !model || !serial || !purchaseDate || !warranty) {
    return { error: 'fields' }
  }

  // TODO: brancher un service d'envoi d'e-mail ou une base de données
  console.log('[registration form]', { firstName, lastName, email, model, serial, purchaseDate, dealer })
  return { success: true }
}
