const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fileUpload = require("express-fileupload");
const port = 3002;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.post("/api/text/upload", async (req, res) => {
  try {
    if (!req.files) {
      res.status(400);
      res.end();
    }

    const pdfBuffer = req.files.pdfFile;

    pdfParse(pdfBuffer).then((result) => {
      // res.send(result.text);
      res.json({ text: result.text });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred during text extraction." });
  }
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
