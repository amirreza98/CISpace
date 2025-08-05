const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // فرض بر اینه که فرانت میفرسته: "Bearer token"

  if (!token) return res.status(401).json({ msg: 'توکن وجود ندارد' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'توکن نامعتبر است' });
  }
}

module.exports = authMiddleware;
