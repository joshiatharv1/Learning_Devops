const handleRouteErrors = (req, res, next) => {
  if (req.originalUrl.startsWith('/healthz')) {
    if (req.method === 'HEAD') {
      res.status(405).json();
    }
  } else {
    res.status(404).json();
  }
};
// const restrictMethods = (req, res, next) => {
//   if (req.method !== 'POST') {
//       res.status(405).json();
//   } else {
//       next();
//   }
// };

const checkDatabaseHealth = async (req, res, next) => {
  try {
    await db.sequelize.authenticate();
    next();
  } catch (error) {

    console.error("Database connection error:", error);
    return res.status(503).json({ error: "Database connection error" });
  }
};
export  {handleRouteErrors, checkDatabaseHealth};
