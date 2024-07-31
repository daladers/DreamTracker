import { useState } from 'react';

const useReactions = () => {
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
  };

  return {
    selectedReaction,
    handleReactionSelect,
  };
};

export default useReactions;
