/**
 * ModelLoader component - checks API server is reachable before starting
 */

import { useState, useEffect } from "react";
import { checkApiHealth } from "../utils/gameLogic";

interface ModelLoaderProps {
  onLoaded: () => void;
}

export default function ModelLoader({ onLoaded }: ModelLoaderProps) {
  const [loadingStatus, setLoadingStatus] = useState<string>("Connecting to server...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingStatus("Connecting to server...");
        await checkApiHealth();
        setLoadingStatus("Connected!");

        setTimeout(() => {
          onLoaded();
        }, 300);
      } catch (err) {
        console.error("Error connecting to server:", err);
        setError("Cannot reach the API server. Make sure embeddings_50k.bin exists (run: python3 precompute_embeddings.py)");
      }
    };

    load();
  }, [onLoaded]);

  return (
    <div className="model-loader">
      <div className="loader-content">
        <h1>🧠 HOT OR COLD</h1>
        <h2>Semantic Similarity Edition</h2>

        {!error ? (
          <>
            <div className="loading-spinner">
              <div className="spinner-large"></div>
            </div>
            <p className="loading-text">{loadingStatus}</p>
          </>
        ) : (
          <>
            <div className="error-icon">❌</div>
            <p className="error-text">{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
