const errorHandler = (err, req, res, next) => {
  console.log("entree de errorHandler");
  // 0 - Message simple
  // 1 - Message sans error
  // 3 - Toutes les informations
  debugLevel = 0;
  message = {};

  //console.log(err)
// ********************************** Les cas autres que ceux relevés par le validator mongoose **********************************
  switch (debugLevel) {
    case 0:
      console.log("cas 0 errorHandler");

      message = { message: err.message };
      if (err.name == "SequelizeDatabaseError") {
        message = { message: "Database Error" };
      }
      break;
    case 1:
      console.log("cas 1 errorHandler");

      message = { message: err.message };
      break;
    case 2:
      console.log("cas 2 errorHandler");

      message = { message: err.message, error: err };
      break;
    default:
      console.log("bad debugLevel");
  }
// ********************************** Les cas de validation de schémas mongoose **********************************
  if (err.name === "ValidationError") {
    console.log('cest une validation error t en fais pas');
    const errorMessages = {};
    for (let field in err.errors) {
      if (err.errors.hasOwnProperty(field)) {
        errorMessages[field] = err.errors[field].message;
      }
    }
    message = { message: errorMessages };
    err.statusCode = 400;
  } else if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyPattern)[0];
    message = {
      message: `La valeur du champ '${duplicatedField}' existe déjà`,
    };
    err.statusCode = 400;
  }
// ********************************** L'erreur à retourner **********************************
console.log("avant le return errorHandler");

  return res.status(err.statusCode || 500).json(message);
};

module.exports = errorHandler;
