const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'توکن ارائه نشده' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.id; // برای استفاده بعدی
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'توکن نامعتبر یا منقضی شده' });
  }
};
