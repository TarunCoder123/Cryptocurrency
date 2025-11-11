import React, { useEffect, useState } from "react";
import api from "../api";
import CoinCard from "../components/CoinCard";
import Pagination from "../components/Pagination";
import { Container, Title, Grid } from "../styles";

export default function CoinsList() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCoins() {
      setLoading(true);
      try {
        const res = await api.get(`/api/coins/markets`, {
          params: { page, limit },
        });
        setCoins(Array.isArray(res?.data?.data) ? res?.data?.data : []);
        setTotalPages(Math.ceil(res?.data?.total / limit));
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [page, limit]);

  return (
    <Container>
      <Title>Crypto Prices</Title>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <div className="loader"></div>
          <p>Loading coins...</p>
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
        </div>
      ) : (
        <>
          <Grid>
            {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </Grid>

          <Pagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPages={totalPages}
          />
        </>
      )}
    </Container>
  );
}
