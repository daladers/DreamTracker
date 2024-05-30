// src/components/DreamInput.js
import React from "react";
import { Input, Button } from "antd";

const DreamInput = ({ selectedDate, close, selectedReaction, inputValue, handleChange, handleSaveDream }) => {
  return (
    <div>
      <Input.TextArea
        value={inputValue}
        onChange={(e) => handleChange(e)}
        placeholder="Describe your dream..."
      />
      <Button
        type="primary"
        size="small"
        onClick={handleSaveDream}
        style={{ marginTop: "5px" }}
      >
        Save
      </Button>
      <Button 
        onClick={close} 
        type="default"
        size="small"
        style={{ marginLeft: "5px" }}
      >
        Close
      </Button>
    </div>
  );
};

export default DreamInput;
