# Memory Game

The app is built with React, TypeScript and Redux.

The game supports one player or n players.

## Logic

Multiplayer is supported by having a `number of players` (selected by the user) and an array of `scores` in the app's state, and from those values the progress of the game as a whole can be derived.

There is also a `turns` state that gets pushed to the `scores` array when each game is completed. The turns state tracks the turns/score within one round of a game.

When pulling the data in from the API, I've added some code in the thunk action creator to duplicate the cards, shuffle them, and add a matched property, with a value of false.

`choiceOne` and `choiceTwo` are held in state, and if they're the same the matched property of those choices is set to true.

A `matchedIdentifier` property uses the matched value of the card objects and keeps them flipped if true.

There is also state that sets current and previous cards using a `uniqueIdenitifer`, so that current and previous cards can remain flipped even when they are not matched.

## Improvements

The number of cats requested in the api request is currently hardcoded. Some additional logic could be written to allow the user to select the number of cards they want in their game. 

All it requires is an input where the user can select the number of cards, then that value halved can be used in the api request.













