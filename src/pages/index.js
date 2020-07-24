import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SEO from "../components/seo"

const getQuote = async counter => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  try {
    counter += 1
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error fetching quote", error)
    if (counter <= 5) {
      getQuote()
    }
  }
}

const tweetQuote = data => {
  const quoteText = data.quoteText
  const quoteAuthor = data.quoteAuthor
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`
  window.open(twitterUrl, "_blank")
}

const IndexPage = () => {
  // Component States
  const [quoteData, setQuoteData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let reqCounter = 0
    getQuote(reqCounter).then(data => {
      setQuoteData(data)
      setIsLoading(false)
    })
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      {isLoading && (
        <div className="bouncingLoader">
          <div></div>
        </div>
      )}
      {!isLoading && (
        <div className="quote-container" id="quote-container">
          <div className="quote-text">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <span
              id="quote"
              className={
                quoteData && quoteData.quoteText.length > 120
                  ? "long-quote"
                  : null
              }
            >
              {quoteData && quoteData.quoteText}
            </span>
          </div>
          <div className="quote-author">
            <span id="author">
              {quoteData &&
                (quoteData.quoteAuthor === ""
                  ? "Unknown"
                  : quoteData.quoteAuthor)}
            </span>
          </div>
          <div className="button-container">
            <button
              className="twitter-button"
              id="twitter"
              title="Tweet This!"
              onClick={() => {
                tweetQuote(quoteData)
              }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <button
              id="new-quote"
              onClick={() => {
                setIsLoading(true)
                let reqCounter = 0
                getQuote(reqCounter).then(data => {
                  setQuoteData(data)
                  setIsLoading(false)
                })
              }}
            >
              New Quote
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
