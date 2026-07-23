const deviceInfo = (req, res, next) => {
  req.device = {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  };

  next();
};

export default deviceInfo;