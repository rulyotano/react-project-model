const jsonServer = require("json-server");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.post("/auth", (req, res) => {
  res.jsonp({
    token: "12312dfasdsdfs"
  });
});

server.post("/auth/logout", (req, res) => {
  res.jsonp({});
});

server.get("/user/details/:username", (req, res) => {
  res.jsonp({
    id: "aasd123",
    userName: "good-time",
    name: "Good Time"
  });
});

// Use default router
server.listen(8081, () => {
  console.log("JSON Server is running");
});
