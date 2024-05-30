// src/components/Interpretations.js
import React from "react";
import useInterpretations from '../hooks/useInterpretations';

const Interpretations = ({ noteId }) => {
  const { interpretations, loading, error } = useInterpretations(noteId);

  if (loading) {
    return <p>Loading interpretations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Interpretations</h3>
      {interpretations.length > 0 ? (
        <ul>
          {interpretations.map((interp, index) => (
            <li key={index}>
              <strong>{interp.word}:</strong> {interp.result}
            </li>
          ))}
        </ul>
      ) : (
        <p>No interpretations found.</p>
      )}
    </div>
  );
};

export default Interpretations;
