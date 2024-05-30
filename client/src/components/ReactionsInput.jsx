// src/components/ReactionsInput.js
import React from "react";
import { ReactionBarSelector } from "@charkour/react-reactions";

const ReactionsInput = ({ handleReactionSelect, selectedReaction }) => {
  return (
    <div style={{marginTop: 10}}>
      <ReactionBarSelector iconSize={"25px"} onSelect={handleReactionSelect}/>
      {selectedReaction && <p style={{color:"#F6B17A"}}>Selected Reaction: {selectedReaction}</p>}
    </div>
  );
};

export default ReactionsInput;
