const db = require('../db/connect');
const { calculateETCL } = require('../services/etclService');
const { getMarketRecommendation } = require('../services/marketService');

exports.createBatch = async (req, res) => {
  try {
    const { cropType, weight, storageType, district } = req.body;
    const farmerId = req.farmer.id;

    const result = await db.query(
      `INSERT INTO crop_batches (farmer_id, crop_type, weight, storage_type, district, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [farmerId, cropType, weight, storageType, district]
    );

    res.status(201).json({
      message: 'Batch created successfully',
      batch: result.rows[0]
    });
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json({ error: 'Failed to create batch' });
  }
};

exports.getBatches = async (req, res) => {
  try {
    const farmerId = req.farmer.id;

    const result = await db.query(
      `SELECT * FROM crop_batches WHERE farmer_id = $1 ORDER BY created_at DESC`,
      [farmerId]
    );

    res.json({ batches: result.rows });
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
};

exports.getBatchDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.farmer.id;

    // Get batch
    const batchResult = await db.query(
      `SELECT * FROM crop_batches WHERE id = $1 AND farmer_id = $2`,
      [id, farmerId]
    );

    if (batchResult.rows.length === 0) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    const batch = batchResult.rows[0];

    // Calculate ETCL
    const etclData = await calculateETCL(batch.district, batch.storage_type);

    // Get market recommendation
    const marketData = await getMarketRecommendation(batch.crop_type, batch.district);

    res.json({
      batch,
      etcl: etclData,
      market: marketData
    });
  } catch (error) {
    console.error('Get batch detail error:', error);
    res.status(500).json({ error: 'Failed to fetch batch details' });
  }
};