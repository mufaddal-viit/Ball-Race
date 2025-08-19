# 🏀 Ball Race - React Game App (v1)

**Ball Race** is a fun and interactive single-player game built using **React** where users compete with themselves by clicking a bouncing ball inside a container. It focuses on core React concepts like Context API, Hooks, reusable components, and theme toggling using a custom theme context.

> ⚠️ This is **Version 1**. Multi-user support is coming in **Version 2** (see roadmap below).

---

## 🔗 Live Demo

(Coming soon — add your deployed link here)

---

## 📸 Preview

> _(Add screenshots or gameplay gif here if you have one)_

---

## 🧠 Technologies & Concepts Used

### ⚛️ Major React Concepts

| Concept                   | Usage                                                                             |
| ------------------------- | --------------------------------------------------------------------------------- |
| **React Hooks**           | `useState`, `useEffect`, `useRef`, and custom hooks for dynamic UI and game logic |
| **Context API**           | For managing global state (`AuthContext` for user and `ThemeContext` for theme)   |
| **Conditional Rendering** | To show/hide game components based on authentication                              |
| **Reusable Components**   | `Ball`, `Login`, `MessageBox`, and `Header` are modular and clean                 |
| **Custom Theme Handling** | A context-based theme switcher without Tailwind's dark mode                       |
| **Local Storage**         | Used to persist login sessions                                                    |
| **Tailwind CSS**          | Used extensively for styling, layout, and responsiveness                          |

---

## 🎮 Game Features

- 🧍‍♂️ **Username-based login**
- 🏀 **Animated bouncing ball**
- 🎯 **Click detection to increase score**
- 🔁 **Restart button** (saves previous round’s score)
- 🚀 **Difficulty toggle** (increases ball speed)
- 🌗 **Custom Light/Dark theme toggle**
- 🧾 **Score history panel** showing all past round scores
- 💫 **Smooth transitions and responsive design**

---

## 🔐 Authentication

A basic login system is implemented using `AuthContext`:

- Users enter a **username** to start playing.
- The username is stored in `localStorage`, so session remains across refreshes.
- On logout, local storage is cleared and the game is hidden.
- `BallGame` only renders if a user is logged in.

---

## 🎨 Custom Theme Support

Handled via `ThemeContext`:

- Toggle between `light` and `dark` modes
- Conditional Tailwind classes applied based on `theme === 'light'`
- No `dark:` utility from Tailwind is used
- Color palette and UI adjust instantly based on theme

---

## 🗂️ Project Structure
