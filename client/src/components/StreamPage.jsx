import { useState } from "react";

const StreamPage = () => {
  const [streamingText, setStreamingText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = async () => {
    setStreamingText("");
    setFinalText("");
    setIsStreaming(true);

    const response = await fetch("/api/stream-text");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setFinalText(streamingText);
        setIsStreaming(false);
        break;
      }
      const chunk = decoder.decode(value);
      setStreamingText((prevText) => prevText + chunk);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Task 2: Streamed Response</h2>
      <button onClick={startStream} disabled={isStreaming}>
        {isStreaming ? "Receiving Stream..." : "Start Stream"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Real-time Text:</h3>
        <p
          style={{
            whiteSpace: "pre-wrap",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {streamingText}
        </p>
      </div>

      {finalText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Complete Text (Stream Closed):</h3>
          <p
            style={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#f0f0f0",
            }}
          >
            {finalText}
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamPage;
