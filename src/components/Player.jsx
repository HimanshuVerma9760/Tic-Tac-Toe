import { useState } from "react";

export default function Player({ initName, symbol, isActive, playerInfo }) {
  const [name, setName] = useState(initName);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonType, setButtonType] = useState("Edit");

  function handleEditClick() {
    setIsEditing((editing) => !editing); //best practice to update it like this
    if (buttonType === "Edit") {
      setButtonType("Save");
    } else {
      setButtonType("Edit");
      playerInfo(symbol, name);
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            className="player-name"
            type="text"
            value={name}
            onChange={handleChange}
          ></input>
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonType}</button>
    </li>
  );
}
