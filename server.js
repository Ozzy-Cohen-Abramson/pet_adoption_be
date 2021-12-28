require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const PORT = 3001;

const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    key: "user_id",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 48,
    },
  })
);

app.use("/", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/searchPetList"));
app.use("/", require("./routes/advanced"));
app.use("/", require("./routes/petPage"));
app.use("/", require("./routes/myPets"));
app.use("/api", require("./routes/petAdd"));
app.use("/api", require("./routes/petList"));
app.use("/api", require("./routes/usersList"));
app.use("/api", require("./routes/likePet"));
app.use("/api", require("./routes/adoptedBy"));
app.use("/api", require("./routes/fosteredBy"));
app.use("/update", require("./routes/userUpdate"));
app.use("/update", require("./routes/userUpdatePass"));
app.use("/update", require("./routes/updatePet"));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
