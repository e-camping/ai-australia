/**
 * ModelLoader component - displays loading screen while AI model loads
 */

import { useState, useEffect } from "react";
import { loadModel } from "../utils/gameLogic";

interface ModelLoaderProps {
  onLoaded: () => void;
}

export default function ModelLoader({ onLoaded }: ModelLoaderProps) {
  const [loadingStatus, setLoadingStatus] = useState<string>("Initializing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingStatus("Loading AI model...");
        await loadModel();
        setLoadingStatus("Model loaded successfully!");

        // Small delay before transitioning
        setTimeout(() => {
          onLoaded();
        }, 500);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Failed to load AI model. Please refresh the page.");
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
            <p className="loading-subtext">
              Loading Universal Sentence Encoder...
              <br />
              This may take a moment on first load.
            </p>
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
