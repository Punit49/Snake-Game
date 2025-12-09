# Snake Game (Desktop Only)

A classic Snake game built using **HTML**, **CSS**, and **vanilla JavaScript**, designed exclusively for **desktop and laptop** users.  
The game features smooth grid-based movement, scoring, a timer, persistent high score saving, modals for game flow, and device detection to block mobile/tablet users.

---

## 🎮 Features

### 🖥 Desktop-Only Gameplay
- The game auto-detects the user's device width.
- If the screen width is **<= 1024px**, a “Desktop Only” modal appears.
- The background becomes inactive using:
  - A blurred fullscreen modal
  - Disabled pointer events
  - Disabled scrolling

---

### 🐍 Snake Mechanics
- Snake starts at the **center of the grid**.
- Movement is controlled with the **arrow keys**.
- Automatic movement using `setInterval`.
- Prevents reversing direction (e.g., can't go from *up* → *down* immediately).
- Collision detection includes:
  - Wall collision
  - Self collision
- Smooth class-based rendering using CSS `.snakeClass`.

---

### 🍎 Food System
- Food spawns randomly **on any empty cell**.
- Before placing food, script checks if it's inside the snake.
- Eating food:
  - Increases snake length
  - Increases score by **10 points**
  - Triggers new food spawn

---

### 🧮 Score, High Score & Timer
- **Score** increases by 10 for each food item eaten.
- **High Score** saved using `localStorage`.
- **Timer** starts when gameplay begins:
  - Displays minutes and seconds (MM:SS)
  - Resets when the game restarts

---

### 🧊 UI Elements & Modals
The game uses three modals:

1. **Start Modal** — appears when game loads.
2. **Game Over Modal** — appears when the snake dies.
3. **Desktop-Only Modal** — prevents mobile/tablet users from playing.

All modals use:
- Fullscreen blur (`backdrop-filter: blur(4px)`)
- Fade-in effect with `.visible` class
- Disabled background interaction (scroll + clicks)

---

### 🧱 Dynamic Game Board
- The board is generated dynamically based on available size.
- Number of rows/columns is computed using:

## 🧾 Tech Stack
- **HTML** – UI layout, modals, game board container
- **CSS** – grid layout, theme variables, blur effects, modals
- **JavaScript** – core game engine (movement, collision, food, scoring, timer)

---

## 🚀 How to Run the Game
1. Place the files:
 - `index.html`
 - `style.css`
 - `game.js`
2. Open **index.html** in any modern desktop browser:
 - Chrome
 - Firefox
 - Edge

No server or frameworks required — works 100% locally.

---

## 🔁 Game Flow Summary
1. **Page loads → Start Modal shows**
2. **Device check**:
 - Mobile/tablet → Desktop Modal shown
 - Desktop → Can start game
3. **Player clicks Start**
4. **Snake + Food + Timer start**
5. **Player plays**
6. **On collision → Game Over Modal**
7. **Click Restart → everything resets**

---

## 🔮 Possible Enhancements
- Add sound effects
- Add difficulty levels (speed increase)
- Add pause/resume
- Smooth animations using requestAnimationFrame
- Make a mobile version with swipe controls

---

## 📄 License 
© 2025 Punit Sahu. All Rights Reserved.

You may modify this project for personal learning purposes.
Redistribution, copying, or commercial use is prohibited.
