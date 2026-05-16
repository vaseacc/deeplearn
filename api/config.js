export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read from Vercel environment variables (set in dashboard)
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // Ensure all required fields are present
  const missing = Object.entries(config).filter(([key, val]) => !val).map(([key]) => key);
  if (missing.length > 0) {
    return res.status(500).json({ error: `Missing environment variables: ${missing.join(', ')}` });
  }

  res.status(200).json(config);
}
