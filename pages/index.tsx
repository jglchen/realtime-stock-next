import Head from 'next/head';
import { useState, useEffect } from "react";
import { QuoteData } from '@/lib/types';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [stockPrices, setStockPrices] = useState<QuoteData[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("us-EN", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(price);
  };

  const fetchStockPrice = () => {
    setStatus("idle");
    fetch('/api/stocks', { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => setStockPrices(result.data))
      .catch((err) => setStatus("rejected"));
  };

  const updateStockPrices = (data: string) => {
    const parsedData: QuoteData = JSON.parse(data);
    setStockPrices((stockPrices) =>
      [...stockPrices].map((stock) => {
        if (stock.ticker === parsedData.ticker) {
          return parsedData;
        }
        return stock;
      })
    );
  };

  useEffect(() => {
    fetchStockPrice();
    const eventSource = new EventSource('/api/realtime-price');
    eventSource.onmessage = (e) => {
      console.log(e.data);
      updateStockPrices(e.data);
    }  
    return () => {
      eventSource.close();
    };
  }, []);

  
  return (
    <div className={styles.container}>
      <Head>
        <title>RealTime Stock Quote Demonstrations</title>
        <meta name="description" content="RealTime Stock Quote Demonstrations" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The demonstration to leverage the browser EventSource API to build a real-time React application"
          />
        <meta name="og:title" content="RealTime Stock Quote Demonstrations" />
        <meta
          property="og:description"
          content="The demonstration to leverage the browser EventSource API to build a real-time React application"
          />
      </Head>
      <main className={styles.main}>
        <table>
          <caption>RealTime Stock Quote Demonstrations</caption>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Real Time Price</th>
            </tr>
          </thead>
          <tbody>
          {stockPrices.map(({ ticker, name, price }, index) => (
            <tr key={ticker}>
              <td>{ticker}</td>
              <td>{name}</td>
              <td>{formatPrice(price)}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className={styles.remarkContainer}>
        There are many ways to achieve real-time content updates on the web. Long-polling, web sockets and server-side events are popular ways for real-time updates.
        With long-polling an HTTP request is made to the server at a predefined interval. In server-side events, the browser’s event source API is used to open a channel of communication between the client and the server for updates to flow from the server to the client. The web socket protocol opens a two-way communication channel between the client and the server to allow updates to move in both ways.
        <p>
        This demonstration is to leverage <strong>the browser EventSource API</strong> to build a real-time React application.
        </p>
        <ol>
          <li>This app is designed to demonstrate real-time stock quotes. Every 10 seconds a randomly selected stock quote be updated.</li>
          <li>In this demonstration, the updated stock prices are the direct results of random number calculation, not related to the actual price quote.</li>
        </ol>
      </div>
      </main>
    </div>
  );  
  
}
