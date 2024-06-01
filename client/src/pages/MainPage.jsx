import React, { useContext } from "react";
import Calendar from "../components/Calendar";
import DreamInput from "../components/DreamInput";
import Interpretations from "../components/Interpretations";
import ReactionsInput from "../components/ReactionsInput";
import useCalendarSelection from "../hooks/useCalendarSelection";
import useReactions from "../hooks/useReactions";
import useDreamInput from "../hooks/useDreamInput";
import { AuthContext } from "../contexts/AuthContext";

const MainPage = () => {
  const { user } = useContext(AuthContext);
  const { showInput, close, selectedDate, handleSelect } = useCalendarSelection();
  const { selectedReaction, handleReactionSelect } = useReactions();
  const { inputValue, handleChange, handleSaveDream, noteId } = useDreamInput(selectedDate, selectedReaction);

  if (!user) {
    return (
      <div style={{ padding: 24, margin: 0, minHeight: 280 }}>
        <h2 style={{ color: "#F6B17A" }}>Welcome to DreamTracker</h2>
        <p style={{ color: "#F6B17A" }}>
          Please <a href="/login">Login</a> or <a href="/register">Register</a> to continue.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: "#F6B17A" }}>Save your dreams!</h2>
      <Calendar onSelect={handleSelect} style={{ borderRadius: "10px" }} />
      {showInput && (
        <div style={{ borderRadius: "10px" }}>
          <div style={{ display: "flex", marginTop: 10, borderRadius: "10px" }}>
            <DreamInput
              selectedDate={selectedDate}
              close={close}
              selectedReaction={selectedReaction}
              inputValue={inputValue}
              handleChange={handleChange}
              handleSaveDream={handleSaveDream}
            />
            <div style={{ backgroundColor: "#7077A1", marginLeft: 10, borderRadius: "10px", padding: 5 }}>
              <Interpretations noteId={noteId} />
            </div>
          </div>
          <div style={{ marginTop: 10, borderRadius: "10px" }}>
            <h3 style={{ color: "#F6B17A" }}>How was your dream?</h3>
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
