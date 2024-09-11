const getData = async (req, res) => {
  try {
    console.log("get data hit");
    res.send({ message: "Hello, World!" });
  } catch (error) {}
};

export default getData;
