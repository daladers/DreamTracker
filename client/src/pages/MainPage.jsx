// src/pages/MainPage.js
import React from "react";
import Calendar from "../components/Calendar";
import DreamInput from "../components/DreamInput";
import Interpretations from "../components/Interpretations";
import ReactionsInput from "../components/ReactionsInput";
import useCalendarSelection from "../hooks/useCalendarSelection";
import useReactions from "../hooks/useReactions";
import useDreamInput from "../hooks/useDreamInput"; // Import useDreamInput

const MainPage = () => {
  const { showInput, close, selectedDate, handleSelect } = useCalendarSelection();
  const { selectedReaction, handleReactionSelect } = useReactions();
  const { inputValue, handleChange, handleSaveDream, noteId } = useDreamInput(selectedDate, selectedReaction); // Destructure noteId from useDreamInput

  return (
    <div>
      <Calendar onSelect={handleSelect} style={{ borderRadius: "10px" }} />
      {showInput && (
        <div style={{ borderRadius: "10px" }}>
          <div style={{ display: "flex", marginTop: 10, borderRadius: "10px" }}>
            <DreamInput
              selectedDate={selectedDate}
              close={close}
              selectedReaction={selectedReaction}
              inputValue={inputValue} // Pass inputValue to DreamInput
              handleChange={handleChange} // Pass handleChange to DreamInput
              handleSaveDream={handleSaveDream} // Pass handleSaveDream to DreamInput
            />
            <div style={{ backgroundColor: "#7077A1", marginLeft: 10, borderRadius: "10px", padding: 5 }}>
              <Interpretations noteId={noteId} />
            </div>
          </div>
          <div style={{ marginTop: 10, borderRadius: "10px" }}>
          <h3 style={{color:"#F6B17A"}}>How was your dream?</h3>
            <ReactionsInput
              handleReactionSelect={handleReactionSelect}
              selectedReaction={selectedReaction}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
