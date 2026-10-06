const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    
    console.log(
      `[${new Date().toISOString()}] ` +
      `${req.method} ${req.originalUrl} ` +
      `${statusColor}${res.statusCode} ` +
      `${duration}`
    );
  });

  next();
};

export default logger;