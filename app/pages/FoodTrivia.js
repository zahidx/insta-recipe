import { useState, useEffect } from "react";

const FoodTriviaAndJokes = () => {
  const [trivia, setTrivia] = useState(""); // Holds food trivia
  const [joke, setJoke] = useState(""); // Holds food joke
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch trivia and jokes on component mount
  useEffect(() => {
    fetchTriviaAndJoke();
  }, []);

  const fetchTriviaAndJoke = async () => {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const triviaUrl = `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`;
    const jokeUrl = `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`;

    setIsLoading(true);

    try {
      // Fetch Trivia
      const triviaResponse = await fetch(triviaUrl);
      const triviaData = await triviaResponse.json();
      setTrivia(triviaData.text);

      // Fetch Joke
      const jokeResponse = await fetch(jokeUrl);
      const jokeData = await jokeResponse.json();
      setJoke(jokeData.text);
    } catch (error) {
      console.error("Error fetching trivia and jokes:", error);
      setTrivia("Unable to fetch trivia at the moment. Please try again later.");
      setJoke("Unable to fetch jokes at the moment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-5xl font-bold text-[#E5970F] text-center mb-12 leading-tight">
          Food Trivia & Jokes: A Fun Feast for Your Mind
        </h1>

        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl mx-auto text-center transform transition-all duration-500 hover:scale-105">
          {/* Trivia Section */}
          <div className="mb-12 bg-gradient-to-r from-[#F6D02F] via-[#E69A10] to-[#F9C945] rounded-2xl p-6 shadow-lg transition-transform duration-300 ease-in-out">
            <h2 className="text-3xl font-semibold text-[#1a1c2b] mb-4 tracking-wide">
              🌟 Fun Food Trivia 🌟
            </h2>
            {isLoading ? (
              <p className="text-lg text-gray-500 animate-pulse">Loading trivia...</p>
            ) : (
              <p className="text-xl text-gray-700 italic">{trivia}</p>
            )}
          </div>

          {/* Joke Section */}
          <div className="bg-gradient-to-r from-[#FF7F50] via-[#FF6347] to-[#FF4500] rounded-2xl p-6 shadow-lg transition-transform duration-300 ease-in-out">
            <h2 className="text-3xl font-semibold text-[#1a1c2b] mb-4 tracking-wide">
              😂 Funny Food Joke 😂
            </h2>
            {isLoading ? (
              <p className="text-lg text-gray-500 animate-pulse">Loading joke...</p>
            ) : (
              <p className="text-xl text-gray-700 italic">{joke}</p>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchTriviaAndJoke}
            className="mt-8 bg-[#E5970F] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#E69A10] transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Refresh Trivia & Joke
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodTriviaAndJokes;
