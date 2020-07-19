import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SEO from "../components/seo"

const getQuote = async () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    getQuote()
    console.log("Error fetching quote", error)
  }
}

const IndexPage = () => {
  // Component States
  const [quoteData, setQuoteData] = useState(null)

  useEffect(() => {
    getQuote().then(data => setQuoteData(data))
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <div className="quote-container" id="quote-container">
        <div className="quote-text">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <span id="quote">{quoteData && quoteData.quoteText}</span>
        </div>
        <div className="quote-author">
          <span id="author">{quoteData && quoteData.quoteAuthor}</span>
        </div>
        <div className="button-container">
          <button className="twitter-button" id="twitter" title="Tweet This!">
            <FontAwesomeIcon icon={faTwitter} />
          </button>
          <button id="new-quote">New Quote</button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
