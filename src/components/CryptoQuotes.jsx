import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CryptoQuotes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "/api/v1/cryptocurrency/listings/latest",
        {
          params: {
            start: 1,
            limit: 20,
            convert: "USD",
            sort: "market_cap",
            sort_dir: "desc",
            cryptocurrency_type: "coins",
            tag: "privacy",
            CMC_PRO_API_KEY: "<Your_API_Key>",
          },
          headers: {
            Accept: "application/json",
          },
        }
      );
      setData(response.data.data);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "5rem 0 0 5rem",
        width: "60%",
      }}
    >
      {data.map((crypto) => (
        <div
          key={crypto.id}
          style={{
            width: "300px",
            height: "300px",
            margin: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>{crypto.name}</h3>
            <p>Symbol: {crypto.symbol}</p>
            <p>Market Cap: {crypto.quote.USD.market_cap}</p>
          </div>
          <div>
            <p>Price: {crypto.quote.USD.price}</p>
            <p>Volume (24h): {crypto.quote.USD.volume_24h}</p>
            <p>Change (24h): {crypto.quote.USD.percent_change_24h}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}
