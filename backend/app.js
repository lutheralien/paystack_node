const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const https = require("https")
require("dotenv").config()

const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.get("/api", (req, res) => {
  res.send("Hello World")
})
app.post("/api/paystack", (req, res) => {
  let { email, amount, firstname, lastname } = req.body
  amount = amount * 100
  const params = JSON.stringify({
    email,
    amount,
    firstname,
    lastname,
  })

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "https://api.paystack.co/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: process.env.TEST_KEY,
      "Content-Type": "application/json",
    },
  }

  const reqs = https
    .request(options, ress => {
      let data = ""

      ress.on("data", chunk => {
        data += chunk
      })

      ress.on("end", () => {
        console.log(JSON.parse(data))
        res.send(data)
      })
    })
    .on("error", error => {
      console.error(error)
    })

  reqs.write(params)
  reqs.end()
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
