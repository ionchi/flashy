# Flashy

Card memory is a game where you have to click on a card to see what image is underneath it and try to find the matching image underneath the other cards.

## Purpose

This project was completed as part of a group learning exercise.

## Demo

[https://flashy-flash.netlify.app/](https://flashy-flash.netlify.app/)

## Main Features

### Game setting
- User can select game difficulty between EASY (4x4 grid), MEDIUM (6x6 grid) or HARD (8x8 grid)
- User can select the symbol type between LETTERS or ICONS.

![Game Setting](https://raw.githubusercontent.com/ionchi/flashy/master/public/demo/start-game.png)

### Play the game
- User can see a grid with n x n cards based on the selected difficulty and can play the memory card game (finding matching cards).
- A timer starts after the first click on a card and stops when the game is completed.
- A moves counter increments every time a user reveals two cards.
- In any moment, the user can start a new game from the settings selection.

![Play the game 1](https://raw.githubusercontent.com/ionchi/flashy/master/public/demo/game-init.png)
![Play the game](https://raw.githubusercontent.com/ionchi/flashy/master/public/demo/game-completed.png)

### Player stats
- Once the game is completed, the stats (time, moves, difficulty, etc.) about the current game are saved in local storage.
- User can see all the past stats, clicking on the Stats button. A dialog with a table will be shown.
- User can remove all the past stats.

![Game stats](https://raw.githubusercontent.com/ionchi/flashy/master/public/demo/stats.png)

## Dependencies

- typescript
- vue.js (ver. 3)
- tailwindcss

## TODO
- responsive improvements
- add "Timer" feature
  - user can select a "Play against time" setting that will start a timer (time amount based on the difficulty).
  - user will lose when time ends.

### Credits

Icons from [Icons8](https://icons8.it/)
