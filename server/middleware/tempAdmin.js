const adminOnly = (req, res, next) => {
  // temporary admin check (frontend controlled)
  if (!req.headers["x-admin"]) {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

export default adminOnly;
