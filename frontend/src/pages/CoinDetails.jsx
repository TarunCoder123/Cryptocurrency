import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { Container, Title, Button } from "../styles";
import { safe } from "../helpers/CommonHelper";

export default function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoin() {
      setLoading(true);
      try {
        const res = await api.get(`/api/coins/${id}`);
        setCoin(res.data);
      } catch (err) {
        console.error("Error fetching coin:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoin();
  }, [id]);

  if (loading)
    return (
      <Container style={{ textAlign: "center", marginTop: "100px" }}>
        <div className="loader"></div>
        <p>Loading coin details...</p>
        <style>{`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Container>
    );

  if (!coin) return <Container>Coin not found</Container>;

  return (
    <Container style={{ position: "relative" }}>
      <Link to="/" style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button>⬅ Back to List</Button>
      </Link>

      <Title>{safe(coin?.name)}</Title>

      {coin?.image ? (
        <img
          src={coin.image}
          alt={coin.name}
          width="100"
          style={{ marginBottom: "20px" }}
        />
      ) : (
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#eee",
            margin: "0 auto 20px",
          }}
        />
      )}

      <p>
        <b>Symbol:</b> {coin?.symbol ? coin.symbol.toUpperCase() : "N/A"}
      </p>
      <p>
        <b>Current Price:</b> {safe(coin?.current_price, "$")}
      </p>
      <p>
        <b>Market Cap:</b> {safe(coin?.market_cap, "$")}
      </p>
      <p>
        <b>Total Volume:</b> {safe(coin?.total_volume, "$")}
      </p>
      <p>
        <b>High 24h:</b> {safe(coin?.high_24h, "$")}
      </p>
      <p>
        <b>Low 24h:</b> {safe(coin?.low_24h, "$")}
      </p>

      <h3>Price Changes:</h3>
      {coin?.price_changes && Object.keys(coin.price_changes).length > 0 ? (
        <ul>
          {Object.entries(coin.price_changes).map(([period, value]) => (
            <li key={period}>
              {period}:{" "}
              {value !== null && value !== undefined
                ? `${value.toFixed(2)}%`
                : "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>N/A</p>
      )}

      <h3>Description:</h3>
      {coin?.description ? (
        <div dangerouslySetInnerHTML={{ __html: coin.description }} />
      ) : (
        <p>N/A</p>
      )}
    </Container>
  );
}
