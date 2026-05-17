import express from 'express';
const router = express.Router();

// Example route – replace with real user logic
router.get('/', (req, res) => {
  res.json({ message: 'User route works!' });
});

export default router;
