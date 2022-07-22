import CardI from "../types/Card";

interface State {
  cards: Array<CardI>;
}

export interface SaveCardsAction {
  type: 'SAVE_CARDS';
  payload: Array<CardI>;
}

const INITIAL_STATE = {
  cards: [],
};

const cardsReducer = (
  state: State = INITIAL_STATE,
  action: SaveCardsAction
) => {
  switch (action.type) {
    case "SAVE_CARDS":
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};

export default cardsReducer;
