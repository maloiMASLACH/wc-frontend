import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  Chains,
  ConnectWalletBtn,
  VitreusWalletConnectProvider,
  useWsConnection,
} from "vitreus-wallet-fe";
import "./App.css";
import { Socket, io } from "socket.io-client";
import { connect } from "socket.io-client";

const TestButton = () => {
  const { signMessage, signTx, signCall } = useWsConnection();

  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [value, setValue] = useState("");
  const [dataToSend, setData] = useState("");
  const [action, setAction] = useState("");

  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="message"
        />
        <button onClick={() => signMessage && signMessage({ message })}>
          MEssage
        </button>
      </div>

      <div>
        <input
          onChange={(e) => setReceiver(e.target.value)}
          value={receiver}
          placeholder="receiver"
        />
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="value"
        />
        <button onClick={() => signTx && signTx({ receiver, value })}>
          TX
        </button>
      </div>

      <div>
        <input
          onChange={(e) => setAction(e.target.value)}
          value={action}
          placeholder="action"
        />
        <input
          onChange={(e) => setData(e.target.value)}
          value={dataToSend}
          placeholder="data"
        />
        <button
          onClick={() =>
            signCall &&
            signCall({ callName: action, data: JSON.parse(dataToSend) })
          }
        >
          Action call
        </button>
        For data use next contruction <p>{`{"key1": "value", "key2": "value2", "key3": { "subKey1": "subValue1" } }`}</p>
      </div>
    </div>
  );
};
function App() {
  // const ws = io("wss://vitreus-wallet-dev.compliq.io:820", {
  //   // closeOnBeforeunload: true,
  //   // transports: ["polling"],
  //   // withCredentials: true,
  //   // reconnectionDelayMax: 2000,
  //   // reconnectionDelay: 500,
  //   // timestampRequests:false,
  //   // timeout: 3000,
  //   // ackTimeout: 1000,
  //   // autoConnect: true,
  //   // randomizationFactor: 1,
  // });
  // console.log("🚀 ~ file: App.tsx:60 ~ App ~ ws:", ws);

  // ws.connect();

  // ws.on("connect", () => console.log(1));
  // ws.on("disconnect", (event) => {
  //   console.log("dis", event);
  //   // ws.connect();
  // });
  // ws.on("error", (errror) =>
  //   console.log(3, errror, new Date().getUTCSeconds())
  // );
  // ws.on("message", (event) => console.log(4, event));

  // ws.io.engine.on("upgrade", () => {
  //   const upgradedTransport = ws.io.engine.transport.name; // in most cases, "websocket"
  //   console.log(
  //     "🚀 ~ file: App.tsx:61 ~ socket.io.engine.on ~ upgradedTransport:",
  //     upgradedTransport
  //   );
  // });

  // ws.connect();

  // ws.onmessage = (message) => {
  //   console.log(11, message);
  // };

  // ws.onerror = (message) => {
  //   console.log(12, message);
  // };
  // console.log("first", ws);
  // ws.emit(
  //   "initSession",
  //   JSON.stringify({
  //     chainInfo: [VitreusChain],
  //     webSessionInfo: {
  //       activeChain: "vitreus",
  //       supportedChains: [VitreusChain],
  //       autoSwitch: false,
  //       autoConnect: true,
  //     },
  //     dAppMeta: {
  //       name: "test",
  //       logoUrl: "https://portal.thirdweb.com/assets/languages/react.png",
  //       url: "localhost:3000",
  //       description: "no",
  //     },
  //   })
  // );
  // const handleSendMessage = async () => {
  //   if (ws) {
  //     console.log(1, ws.connected);
  //     // await ws.connect();
  //     console.log(2, ws.connected);

  //     //  ws.io.engine
  //     await ws.emit(
  //       "initSession",

  //       JSON.stringify({
  //         chainInfo: [VitreusChain],
  //         webSessionInfo: {
  //           activeChain: "vitreus",
  //           supportedChains: [VitreusChain],
  //           autoSwitch: false,
  //           autoConnect: true,
  //         },
  //         dAppMeta: {
  //           name: "test",
  //           logoUrl: "https://portal.thirdweb.com/assets/languages/react.png",
  //           url: "localhost:3000",
  //           description: "no",
  //         },
  //       })
  //     );
  //     console.log("result", ws);
  //   }
  // };

  // console.log("🚀 ~ file: App.tsx:9 ~ App ~ ws:", ws);
  return (
    <>
      <VitreusWalletConnectProvider address={""}>
        {/* <button onClick={handleSendMessage}> 321</button> */}
        <ConnectWalletBtn
          symbolsAfterDot={2}
          web3Settings={{
            chainInfo: [Chains.vitreus.chain],
            webSessionInfo: {
              activeChain: Chains.vitreus.chainName,
              supportedChains: [Chains.vitreus.chain],
              autoSwitch: false,
              autoConnect: true,
            },
            dAppMeta: {
              name: "test",
              logoUrl: "https://portal.thirdweb.com/assets/languages/react.png",
              url: "localhost:3000",
              description: "no",
            },
          }}
          fullConnectText={"connect wallet long text test"}
          shortConnectText={"short"}
          qrCodeSettings={{ size: 200 }}
          connectTexts={{
            title: "Connect Wallet",
            description: "Scan QR code to connect wallet",
            close: "close",
          }}
          iconUrl="./userHeader.svg"
        />
        <TestButton />
      </VitreusWalletConnectProvider>

      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </>
  );
}

export default App;
