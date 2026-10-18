import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { createWaitlistHandler } from '../server/waitlist.js'

export default createWaitlistHandler(async (id, email) => {
  const name = 'tagalong-waitlist'
  const projectId = 'tagalong-495211'
  const app = getApps().find(app => app.name === name) ?? initializeApp({
    projectId,
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}')),
  }, name)
  await getFirestore(app, 'usa-1').collection('waitlist').doc(id).create({
    email,
    createdAt: FieldValue.serverTimestamp(),
    source: 'landing-page',
  })
})
