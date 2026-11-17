import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { createContactHandler } from '../server/contact.js'

export default createContactHandler(async (id, fields) => {
  const name = 'tagalong-contact'
  const app = getApps().find(app => app.name === name) ?? initializeApp({
    projectId: 'tagalong-0519',
    credential: process.env.CONTACT_LOCAL_PREVIEW === 'true'
      ? applicationDefault()
      : cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}')),
  }, name)
  await getFirestore(app).collection('contactMessages').doc(id).create({
    ...fields,
    createdAt: FieldValue.serverTimestamp(),
    source: 'landing-page',
  })
})
