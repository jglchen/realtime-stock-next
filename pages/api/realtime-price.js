import { stocks } from '@/lib/stocks';

function getRandomStock() {
    const stocksLen = stocks?.length - 1;
    return Math.round(Math.random() * (stocksLen - 0) + 0);
}
  
function getRandomPrice() {
    return Math.random() * (300 - 50) + 50;
}

export default function handler(req, res) {
    // Set necessary headers to establish a stream of events
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };

    res.writeHead(200, headers);
      
    setInterval(() => {
        res.write(`data: ${JSON.stringify({ ...stocks[getRandomStock()], price: getRandomPrice() })}\n\n`);
        res.flush();
    }, 10000);
}