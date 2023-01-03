# RealTime Stock Quote Demonstrations        
        
There are many ways to achieve real-time content updates on the web. Long-polling, web sockets and server-side events are popular ways for real-time updates. With long-polling an HTTP request is made to the server at a predefined interval. In server-side events, the browser’s event source API is used to open a channel of communication between the client and the server for updates to flow from the server to the client. The web socket protocol opens a two-way communication channel between the client and the server to allow updates to move in both ways.

This demonstration is to leverage **the browser EventSource API** to build a real-time React application.

1. This app is designed to demonstrate real-time stock quotes. Every 10 seconds a randomly selected stock quote be updated.
2. In this demonstration, the updated stock prices are the direct results of random number calculation, not related to the actual price quote.

### Docker: docker run -p 3000:3000 jglchen/realtime-stock-next
### [GitHub](https://github.com/jglchen/realtime-stock-next)

