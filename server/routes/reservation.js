const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

// لاگ ساده
router.use((req,res,next)=>{
  console.log(`[RES] ${req.method} ${req.originalUrl}`);
  next();
});

// گرفتن همه
router.get('/', authMiddleware, async (req, res) => {
  try {
    const layout = await Reservation.findOne();
    if (!layout) return res.json([]);

    const pick = (colName, arr=[]) => arr
      .filter(it => it?.reservationDetail) // فقط آیتم‌های رزرو شده
      .map(it => {
        let detail = {};
        try { detail = JSON.parse(it.reservationDetail); } catch {}
        return {
          // یک ID مرکب تا در فرانت راحت صدا بزنیم
          id: `${layout._id}:${colName}:${it.id}`,
          layoutId: String(layout._id),
          collection: colName,         // "Tables" | "Rooms" | "Walls"
          itemId: it.id,               // شماره صندلی/اتاق/دیوار
          seat: it.id,
          type: it.type,
          status: it.status || '',     // pending/approved/rejected/''
          // فیلدهای داخل ایمیل/رزرو
          email: detail.email || '',
          bookingId: detail.bookingId || '',
          time: detail.time || '',
          note: detail.note || null,
        };
      });

    const list = [
      ...pick('Tables', layout.Tables || []),
      ...pick('Rooms',  layout.Rooms  || []),
      ...pick('Walls',  layout.Walls  || []),
    ].sort((a,b) => a.bookingId < b.bookingId ? 1 : -1); // دلخواه

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطا در دریافت رزروها' });
  }
});


const validCols = new Set(['Tables','Rooms','Walls']);

router.put('/:collection/:itemId/approve', authMiddleware, async (req, res) => {
  try {
    const { collection, itemId } = req.params;
    if (!validCols.has(collection)) return res.status(400).json({ msg: 'collection نامعتبر' });

    const r = await Reservation.updateOne(
      {}, // چون یک layout داریم؛ اگر چندتاست، layoutId هم بگیر
      { $set: { [`${collection}.$[elem].status`]: 'approved' } },
      { arrayFilters: [{ 'elem.id': Number(itemId) }] }
    );
    if (r.matchedCount === 0) return res.status(404).json({ msg: 'آیتم پیدا نشد' });
    res.json({ msg: 'درخواست تایید شد' });
  } catch (err) {
    res.status(500).json({ msg: 'خطا در تایید' });
  }
});

router.put('/:collection/:itemId/reject', authMiddleware, async (req, res) => {
  try {
    const { collection, itemId } = req.params;
    if (!validCols.has(collection)) return res.status(400).json({ msg: 'collection نامعتبر' });

    const r = await Reservation.updateOne(
      {},
      { $set: { [`${collection}.$[elem].status`]: 'rejected' } },
      { arrayFilters: [{ 'elem.id': Number(itemId) }] }
    );
    if (r.matchedCount === 0) return res.status(404).json({ msg: 'آیتم پیدا نشد' });
    res.json({ msg: 'درخواست رد شد' });
  } catch (err) {
    res.status(500).json({ msg: 'خطا در رد' });
  }
});


module.exports = router;
