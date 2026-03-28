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
    let cancelled = false;
    const load = async () => {
      setLoadingStatus("Loading AI model...");
      for (let i = 0; i < 60; i++) {
        if (cancelled) return;
        try {
          await checkApiHealth();
          if (!cancelled) {
            setLoadingStatus("Ready!");
            setTimeout(() => { if (!cancelled) onLoaded(); }, 300);
          }
          return;
        } catch {}
        await new Promise(r => setTimeout(r, 1000));
      }
      if (!cancelled) setError("Could not connect to the score server. Make sure the dev server is running.");
    };

    load();
    return () => { cancelled = true; };
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
