const getDataMiddleware = async (req, res, next) => {
  console.log("Middle ware call");
  setTimeout(() => {
    console.log("Middle ware resolved");
    next();
  }, 2000);
};

export default getDataMiddleware;
