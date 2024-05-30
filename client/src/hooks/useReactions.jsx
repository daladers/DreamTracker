// src/hooks/useReactions.js
import { useState } from 'react';

const useReactions = () => {
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    console.log('Reaction selected:', reaction);
  };

  return {
    selectedReaction,
    handleReactionSelect,
  };
};

export default useReactions;
