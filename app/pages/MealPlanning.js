import { useState } from "react";

const MealPlanning = () => {
  const [calorieGoal, setCalorieGoal] = useState("2000"); // Default calorie goal
  const [dietPreference, setDietPreference] = useState("vegetarian"); // Default dietary preference
  const [duration, setDuration] = useState("day"); // Default duration
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMealPlan = async () => {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${duration}&targetCalories=${calorieGoal}&diet=${dietPreference}`;

    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        setMealPlans(data.meals);
      } else {
        setMealPlans([]); // Clear meal plans if no data is found
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      setMealPlans([]); // Clear meal plans on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMealPlan();
  };

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#E5970F] text-center mb-10">
          Meal Planning
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          {/* Calorie Goal Selection */}
          <div className="mb-6">
            <label
              htmlFor="calorieGoal"
              className="block text-lg font-semibold text-[#1a1c2b] mb-2"
            >
              Calorie Goal
            </label>
            <select
              id="calorieGoal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
            >
              <option value="1200">1200 Calories</option>
              <option value="1500">1500 Calories</option>
              <option value="2000">2000 Calories</option>
              <option value="2500">2500 Calories</option>
              <option value="3000">3000 Calories</option>
            </select>
          </div>

          {/* Dietary Preference Selection */}
          <div className="mb-6">
            <label
              htmlFor="dietPreference"
              className="block text-lg font-semibold text-[#1a1c2b] mb-2"
            >
              Dietary Preference
            </label>
            <select
              id="dietPreference"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
              value={dietPreference}
              onChange={(e) => setDietPreference(e.target.value)}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleo">Paleo</option>
              <option value="keto">Keto</option>
              <option value="gluten free">Gluten-Free</option>
            </select>
          </div>

          {/* Duration Selection */}
          <div className="mb-6">
            <label
              htmlFor="duration"
              className="block text-lg font-semibold text-[#1a1c2b] mb-2"
            >
              Duration
            </label>
            <select
              id="duration"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E5970F] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#E69A10] transition-all duration-300"
          >
            Generate Meal Plan
          </button>
        </form>

        {/* Meal Plan Section */}
        {isLoading ? (
          <div className="text-center text-gray-500 mt-10 text-lg">
            Generating meal plan...
          </div>
        ) : mealPlans.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#E5970F] text-center mb-6">
              Your Meal Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealPlans.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                    alt={meal.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1a1c2b] mb-2">
                      {meal.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Ready in {meal.readyInMinutes} minutes
                    </p>
                    <a
                      href={meal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-[#E5970F] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#E69A10] transition-all duration-300"
                    >
                      View Recipe
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 mt-10 text-lg">
              No data found. Try another combination.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MealPlanning;
