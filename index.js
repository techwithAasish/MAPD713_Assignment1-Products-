let SERVER_NAME = "product-api";
let PORT = 5000;
let HOST = "127.0.0.1";

let errors = require("restify-errors");
let restify = require("restify"),
  // Get a persistence engine for the users
  productsSave = require("save")("products"),
  // Create the restify server
  server = restify.createServer({ name: SERVER_NAME });

server.listen(PORT, HOST, function () {
  console.log("Server %is listening at %s", server.name, server.url);
  console.log("**** Resources: ****");
  console.log("********************");
  console.log("Endpoints:", server.url, +"method: GET, POST, DELETE");
  console.log("/products");
  console.log("/products/:id");
});

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

// Get all products in the system
server.get("/products", function (req, res, next) {
  console.log("products GET: received request");
  console.log("GET /products params=>" + JSON.stringify(req.params));

  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {
    // Return all of the products in the system
    res.send(products);
  });
  console.log("products GET: sending response");
});
