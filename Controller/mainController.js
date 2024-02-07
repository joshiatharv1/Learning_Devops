import db  from "../Models/index.js"; 

const workingrequest = async (req, res) => {
  res.set("Cache-Control", "no-cache");

  try {
    await db.sequelize.authenticate();

    if (req.method === "GET" && Object.keys(req.query).length === 0 && Object.keys(req.body).length === 0) {
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
    res.status(503).json();
  }
};

const notallowedrequest = async (req, res) => {
  res.set("Cache-Control", "no-cache");
  try {
    if (req.body && Object.keys(req.body).length > 0) {
      return res.status(400).json();
    } else {
      return res.status(405).json();
    }
  } catch (error) {
    console.error(error);
    res.status(503).json();
  }
};

export default { workingrequest, notallowedrequest };
