const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "You registered" });
  }
  const token = authorization.replace("Invest ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You are not registered" });
    }
    req.user = payload;
    next();
  });
};

const verifyTokenControl = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.rol === "Admin") {
      next();
    } else {
      res.status(403).json({ error: "You are not alowed to do that!" });
    }
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.rol === "Admin" || req.user.rol === "Operator") {
      next();
    } else {
      res.status(403).json({ error: "You are not alowed to do that!" });
    }
  });
};

const verifyTokenSuperAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.rol === "Admin") {
      next();
    } else {
      res.status(403).json({ error: "You are not alowed to do that!" });
    }
  });
};

const verifyTokenAndTeacher = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.rol === "O`qituvchi") {
      next();
    } else {
      res.status(403).json({ error: "You are not alowed to do that!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenControl,
  verifyTokenAdmin,
  verifyTokenSuperAdmin,
  verifyTokenAndTeacher
};
