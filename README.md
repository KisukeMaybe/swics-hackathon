
# MealSwipe – AI-Powered Meal Discovery App

MealSwipe is a swipe-based web application that helps users discover meals based on the ingredients they choose. Inspired by modern swipe interfaces, users can quickly browse ingredients, select what they like, and generate meal ideas powered by the Google Gemini API.

---

## Features

### Swipe-Based Ingredient Selection

* Swipe right to select ingredients
* Swipe left to skip

### Category Filtering

Browse ingredients by:

* Fruits
* Vegetables
* Meat
* Dairy
* Carbs
* Protein

### AI-Powered Meal Generation

* Uses Google Gemini API to generate meals from selected ingredients

### Meal Details

Each generated meal includes:

* Title
* Description
* Estimated cooking time
* Ingredients used
* Optional missing ingredients

### Responsive UI

* Built with smooth animations using Framer Motion
* Fully responsive design

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Google Gemini API (`@google/genai`)

---

## Project Structure

```
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SwipeCard.jsx
│   │   │   ├── MealSummary.jsx
│   │   │   └── MealSuggestion.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── server/
│   ├── server.js
│   ├── meals.js
│   └── geminiClient.js
│
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/mealswipe.git
cd mealswipe
```

---

### 2. Install Dependencies

#### Frontend

```
cd frontend
npm install
```

#### Backend

```
cd ../server
npm install express cors dotenv @google/genai
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder:

```
GEMINI_API_KEY=your_api_key_here
```

---

### 4. Run the Application

#### Start Backend

```
node server.js
```

#### Start Frontend

```
cd ../frontend
npm run dev
```

---

## API Endpoint

### POST `/api/meals`

Generates meal suggestions based on selected ingredients.

### Request

```
{
  "ingredients": [
    { "name": "Tomatoes", "category": "Veg", "calories": 18 }
  ]
}
```

### Response

```
{
  "meals": [
    {
      "title": "Tomato Pasta",
      "description": "Simple pasta with tomato sauce",
      "time_minutes": 20,
      "ingredients_used": ["Tomatoes", "Pasta"],
      "missing_ingredients": ["Olive oil"]
    }
  ]
}
```

---

## How It Works

1. User selects a category
2. Ingredients are displayed as swipeable cards
3. Selected ingredients are stored locally
4. User clicks “Generate with Gemini”
5. Frontend sends selected ingredients to backend
6. Backend calls Gemini API
7. Response is processed and structured
8. Meals are displayed in the UI

---

## Notes

* Gemini API has rate limits on the free tier
* Ingredients are hardcoded to reduce unnecessary API calls
* AI is used only for meal generation

---

## Authors

Developed as part of a hackathon project.

* Moosa Manaal (Me)
* Musab Sudirman
* Firas Muzamir
* Aizat Yani

