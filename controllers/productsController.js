const logger = require("../utils/logger");
const { Products } = require("../models/productsModel");
const Object = require("mongoose").Types.ObjectId;

exports.index = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 18;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const Ranking = parseInt(req.query.Ranking) || 1;

    const q = {};

    // filter Filter_Style
    if (req.query.gender) {
      q.Filter_Style = req.query.gender;
    }

    // filter Filter_Size
    if (req.query.size) {
      q.Filter_Size = req.query.size;
    }

    // filter Filter_Material
    if (req.query.material) {
      q.Filter_Material = req.query.material;
    }

    // filter Filter_Dial
    if (req.query.dial) {
      q.Filter_Dial = req.query.dial;
    }

    //console.log(req.query);

    const result = {};

    // Pagination
    if (endIndex < (await Products.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Query products
    result.results = await Products.find({ ...q }, null, {
      limit: limit,
      skip: skip,
      sort: { Ranking: 1 },
    })
      .then(function (models) {
        //console.log(models);
        result.data = models;
      })
      .catch(function (err) {
        //console.log(err);
        logger.error(
          `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        res.status(500).json(err);
      });

    res.status(200).json(result);
  } catch (err) {
    //console.log(err);
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(500).json(err);
  }
};

// http://localhost:3001/api/v1/products?limit=10&sku=000810AYCHX0
