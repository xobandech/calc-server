const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
// const { default: mongoose } = require("mongoose");
// const userSchema = new mongoose.Schema({
//   username: String,
//   key: String
// });

// let lastData = {
//   dht: {},
//   rfid: []
// }
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  perMessageDeflate: false,
  // path: "/socket",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors({
  origin: '*',
}));

io.on("connection", (socket) => { 
  console.log("User connected via WebSocket");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get('/api/message', async (req, res) => {
  const { str } = req.query
  io.emit("message", str);
  console.log(str)
})
// app.post('/api/project', async (req, res) => {
//   const { h, t, f, hic, hif } = req.body;
//   io.emit("project_data", { h, t, f, hic, hif });
//   lastData["dht"] = { h, t, f, hic, hif }
//   console.log('DHT')
//   res.json({ msg: "Data received" });
// });

// app.get('/api/project', async (req, res) => {
//   const { h, t, f, hic, hif } = req.query;
//   console.log(req.query)
//   console.log(req.url)
//   io.emit("project_data", { h, t, f, hic, hif });
//   lastData["dht"] = { h, t, f, hic, hif }
//   console.log('DHT')
//   res.json({ msg: "Data received" });
// });

// app.post('/api/project/last', async (req, res) => {
//   console.log({...lastData})
//   io.emit("last_data", { ...lastData });
//   res.json({ msg: "Data received" });
// });

// app.post('/api/project/light', async (req, res) => {
//   const { lightLevel } = req.body;
//   io.emit("project_lightLevel", lightLevel);
//   lastData.dht.lightLevel = lightLevel
//   console.log("lightLevel")
//   res.json({ msg: "Data received" });
// });

// app.get('/api/project/light', async (req, res) => {
//   console.log("GETTTT")
//   res.json({
//     msg: "Bla bla"
//   })
// })

// app.post('/api/project/rfid', async (req, res) => {
//   const { rfid } = req.body;
//   const user = await User.findOne({ key: rfid })
//   io.emit("project_rfid", user ? { status: true, rfid, user, at: new Date().toISOString().split('T')[0] } : { status: false, rfid, at:new Date().toISOString().split('T')[0] });
//   lastData.rfid.push(user ? { status: true, rfid, user, at: new Date().toISOString().split('T')[0] } : { status: false, rfid, at: new Date().toISOString().split('T')[0] })
//   console.log("rfid")
//   res.json({ accessGranted: user ? true : false });
// });

const port = process.env.PORT || 8080
// Start server
const start = async () => {
  // await mongoose.connect(`mongodb+srv://oleksandrshtefan:xPIeAy1zXoaxxbpn@cluster0.uowkmor.mongodb.net/?retryWrites=true&w=majority`)
  // User.create({
  //   name: "Oleksandr Shtefan",
  //   key: "01 9D 0C A1"
  // });
  try {
    server.listen(port, () => {
      console.log("Server is listening on port ", port);
    });
  } catch (e) {
    console.log(e);
  }
};

start();