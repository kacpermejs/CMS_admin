import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();
const corsHandler = cors({ origin: true });

export const getUserEntries = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
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

      const modelId = req.query.modelId as string | undefined;
      // default: createdAt
      const sortBy = (req.query.sortBy as string | undefined) || 'createdAt';
      // default: descending
      const order = (req.query.order as string | undefined) || 'desc';

      if (!modelId) {
        res.status(400).send('Model ID is required');
        return;
      }

      // Validate sortBy field
      const validSortFields = ['modelId', 'createdAt'];
      if (!validSortFields.includes(sortBy)) {
        res.status(400).send('Invalid sort field');
        return;
      }

      // Validate order
      const validOrders = ['asc', 'desc'];
      if (!validOrders.includes(order)) {
        res.status(400).send('Invalid sort order');
        return;
      }

      const modelDoc = await db
        .collection(`users/${userId}/contentModels`)
        .doc(modelId)
        .get();
      if (!modelDoc.exists) {
        res.status(404).send('Model not found');
        return;
      }

      const modelData = modelDoc.data();
      const photoFields = (modelData?.fields || [])
        .filter((f: any) => f.type === 'Photo')
        .map((f: any) => f.id);

      // Fetch entries dynamically
      let query = db
        .collection('users')
        .doc(userId)
        .collection('entries')
        .where('sys.modelId', '==', modelId);

      // Add dynamic ordering
      if (sortBy === 'modelId') {
        query = query.orderBy(
          'sys.modelId',
          order as FirebaseFirestore.OrderByDirection
        );
      } else if (sortBy === 'createdAt') {
        query = query.orderBy(
          'sys.createdAt',
          order as FirebaseFirestore.OrderByDirection
        );
      }

      const entriesSnapshot = await query.get();

      if (entriesSnapshot.empty) {
        res.status(404).send('No entries found for this user');
        return;
      }

      const entries = await Promise.all(
        entriesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const fields = data.fields || {};

          for (const fieldId of photoFields) {
            const field = fields[fieldId];
            if (field) {
              try {
                const file = storage.bucket().file(field);
                const [url] = await file.getSignedUrl({
                  action: 'read',
                  expires: Date.now() + 60 * 60 * 1000, // 1 hour
                });
                // Update the field with the URL
                fields[fieldId] = url;
              } catch (err) {
                console.error(`Error generating URL for ${fieldId}:`, err);
                fields[fieldId] = null;
              }
            }
          }

          return { id: doc.id, ...data, fields };
        })
      );

      // Return entries
      res.status(200).json({ entries, sortBy, order, version: 'v2' });
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).send('Internal server error');
    }
  });
});
