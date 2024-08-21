import { useState } from "react";

const FieldStates = {
  START: "start",
  PLAY: "play",
  LOSE: "lose",
  WIN: "win",
};

const [fieldState, setFieldState] = useState(FieldStates.START);
const [playerField, setPlayerField] = useState([]);
const [checkLeft, setCheckLeft] = useState(cardsToMemorize);

function generateField(width, height, cardsToMemorize) {
  const field = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, column) => ({
      isChecked: false,
      isFlipped: false,
      x: HTMLTableRowElement,
      y: column,
    }))
  );

  for (let i = 0; i < cardsToMemorize; i++) {
    const randomX = Math.floor(Math.random() * height);
    const randomY = Math.floor(Math.random() * width);

    if (field[randomX][randomY].isChecked) {
      i--;
      continue;
    }
    field[randomX][randomY].isChecked = true;
  }

  return field;
}

function DisplayField({ playerField, onCardClick, isFlipped }) {
  return playerField.map((field) => {
    return (
      <div className="field__row">
        {field.map((card) => {
          return (
            <Card
              key={`${card.x}-${card.y}`}
              isChecked={card.isChecked}
              isFlipped={isFlipped ? true : card.isFlipped}
              onClick={() => (isFlipped ? null : onCardClick(card.x, card.y))}
              isWrong={card.isWrong}
            />
          );
        })}
      </div>
    );
  });
}

useEffect(() => {
  const newField = generateField(width, height, cardsToMemorize);
  setPlayerField(newField);
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setFieldState(FieldStates.PLAY);
  }, MEMORY_TIMEOUT);

  return () => clearTimeout(timer);
}, []);
