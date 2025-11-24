const express = require('express');
const cors = require('cors');
const {limiter} = require('./middlewares/rate-limiter')
const linkRoutes = require('./routes/link.routes');

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://trimurls.netlify.app'],
  methods: ['GET', 'POST', 'HEAD', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.use('/api', linkRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Type 'rs' to restart.");
});

process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  if (data.trim() === "rs") {
    console.log("Restarting...");
    process.exit(0);
  }
});