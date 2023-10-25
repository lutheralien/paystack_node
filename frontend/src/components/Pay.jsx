import React, { useState } from "react"
import axios from "axios"
import "../App.css"

function Pay() {
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [payresult, setPayresult] = useState("")

  const url = "http://localhost:8000/api/paystack"

  const handleSubmit = async e => {
    e.preventDefault()

    const config = {
      headers: {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      },
    }

    const data = {
      email,
      amount,
      firstname,
      lastname,
    }
    console.log(data)

    axios
      .post(url, data, config)
      .then(res => {
        let data = res.data
        console.log("data response")
        console.log(data);
        console.log(data.data.authorization_url)
        setPayresult(data.data.authorization_url)
        window.location.href = data.data.authorization_url
      })
      .catch(e => console.log(e))
  }

  return (
    <div>
      <div className="w3-container w3-row">
        <div className="w3-container w3-green">
          <h3 className="w3-center">Payment</h3>

          
        </div>
        <div className="w3-container w3-quarter"></div>
        <div className="w3-container w3-half"></div>
        <w3-container className="w3-card-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                className="w3-input w3-border w3-round-large"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />

              <label htmlFor="amount">Amount</label>

              <input
                type="number"
                id="amount"
                className="w3-input w3-border w3-round-large"
                onChange={e => setAmount(e.target.value)}
                value={amount}
              />

              <label htmlFor="firstname">First Name</label>

              <input
                type="text"
                id="firstname"
                className="w3-input w3-border w3-round-large"
                onChange={e => setFirstname(e.target.value)}
                value={firstname}
              />

              <label htmlFor="lastname">Last Name</label>

              <input
                type="text"
                id="lastname"
                className="w3-input w3-border w3-round-large"
                onChange={e => {
                  setLastname(e.target.value)
                }}
                value={lastname}
              />
            </div>
            <div>
              <button type="submit" className="w3-btn w3-green w3-block">
                Pay With PayStack
              </button>
            </div>
          </form>
        </w3-container>
      </div>
    </div>
  )
}

export default Pay
