import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles";
import { safe } from "../helpers/CommonHelper";

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  img {
    border-radius: 50%;
    margin-bottom: 10px;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 4px 0;
    font-size: 0.9rem;
  }
`;

export default function CoinCard({ coin }) {
  const navigate = useNavigate();

  return (
    <Card>
      <div>
        {coin?.image ? (
          <img src={coin.image} alt={coin.name || "coin"} width="50" height="50" />
        ) : (
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#eee",
              display: "inline-block",
              marginBottom: "10px",
            }}
          />
        )}

        <h3>
          {safe(coin?.name)} ({coin?.symbol ? coin.symbol.toUpperCase() : "N/A"})
        </h3>

        <p>💲 {safe(coin?.current_price)}</p>
        <p>High 24h: {safe(coin?.high_24h)}</p>
        <p>Low 24h: {safe(coin?.low_24h)}</p>

        <p
          style={{
            color:
              coin?.price_change_percentage_24h > 0
                ? "green"
                : coin?.price_change_percentage_24h < 0
                ? "red"
                : "#666",
            fontWeight: "bold",
          }}
        >
          {safe(
            coin?.price_change_percentage_24h?.toFixed(2),
            coin?.price_change_percentage_24h ? "%" : ""
          )}
        </p>
      </div>

      <Button
        onClick={() => coin?.id && navigate(`/coin/${coin.id}`)}
        style={{ marginTop: "10px", alignSelf: "center" }}
        disabled={!coin?.id}
      >
        View Details
      </Button>
    </Card>
  );
}
