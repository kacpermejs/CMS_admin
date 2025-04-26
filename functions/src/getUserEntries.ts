import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const db = admin.firestore();
const corsHandler = cors({origin: true});

export const getUserEntries = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      // Get API Key from headers
      const apiKey = req.headers['x-api-key'] as string | undefined;
      if (!apiKey) {
        res.status(401).send('API key missing');
        return;
      }

      // Validate API Key
      const apiKeyDoc = await db.collection('apiKeys').doc(apiKey).get();
      if (!apiKeyDoc.exists || !apiKeyDoc.data()?.enabled) {
        res.status(403).send('Invalid API key');
        return;
      }

      // Get userId from apiKey entry
      const userId: string = apiKeyDoc.data()?.userId;
      if (!userId) {
        res.status(404).send('User associated with this API key not found');
        return;
      }

      // Get modelId from request parameters
      const modelId = req.query.modelId as string | undefined;
      if (!modelId) {
        res.status(400).send('Model ID is required');
        return;
      }

      // Fetch entries from /users/:userId/entries of set modelId
      const entriesSnapshot = await db
        .collection('users')
        .doc(userId)
        .collection('entries')
        .where('sys.modelId', '==', modelId)
        .get();

      if (entriesSnapshot.empty) {
        res.status(404).send('No entries found for this user');
        return;
      }

      const entries = entriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Return entries
      res.status(200).json({entries});
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).send('Internal server error');
    }
  });
});
