import express from "Express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createConnection } from "./connection/db.js";
import { vechicalRoute } from "./routes/vechicalRoutes.js";
import { notFound, errorhandler } from "./middleware/errorMiddleware.js";
import { userRoute } from "./routes/userRoutes.js";
import { orderRoute } from "./routes/orderRoutes.js";
import { uploadRoutes } from "./routes/uploadRoutes.js";

dotenv.config();
createConnection();
const app = express();

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/vechicals", vechicalRoute);
app.use("/cart/api/vechicals", vechicalRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend",'build','index.html'))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("Hello World!!!🌎");
//   });
// }

app.get("/", (req, res) => {
  res.send("Hello World!!!🌎")})

app.use(notFound);

app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`Server connected in ${process.env.NODE_ENV}`, PORT);
})
