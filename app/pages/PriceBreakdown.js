"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PriceBreakdown = () => {
  const [ingredients, setIngredients] = useState([
    { name: "1 tablespoon brown sugar", price: 0.04 },
    { name: "1 tablespoon brown sugar", price: 0.04 },
    { name: "2 carrots", price: 0.21 },
    { name: "2 cups cooked brown rice", price: 0.42 },
    { name: "1 cup crimini mushrooms", price: 0.4 },
    { name: "2 eggs", price: 0.48 },
    { name: "2 tablespoons fresh ginger", price: 0.08 },
    { name: "1 teaspoon garlic", price: 0.07 },
    { name: "1 cup green beans", price: 0.37 },
    { name: "½ cups scallions", price: 0.33 },
    { name: "1 tablespoon sesame oil", price: 0.34 },
    { name: "4 tablespoons soy sauce", price: 0.49 },
    { name: "1 zucchini squash", price: 0.56 },
  ]);

  const totalPrice = ingredients.reduce((sum, item) => sum + item.price, 0);

  const data = {
    labels: ingredients.map((ingredient) => ingredient.name),
    datasets: [
      {
        data: ingredients.map((ingredient) => ingredient.price),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#D4E157",
          "#F06292",
          "#64B5F6",
          "#81C784",
          "#BA68C8",
          "#FFD54F",
          "#A1887F",
        ],
        hoverBackgroundColor: [
          "#FF6384CC",
          "#36A2EBCC",
          "#FFCE56CC",
          "#4BC0C0CC",
          "#9966FFCC",
          "#FF9F40CC",
          "#D4E157CC",
          "#F06292CC",
          "#64B5F6CC",
          "#81C784CC",
          "#BA68C8CC",
          "#FFD54FCC",
          "#A1887FCC",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#E5970F] text-center mb-10">
          Price Breakdown
        </h1>

        {/* Cost per Serving Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#1a1c2b]">
            Cost per Serving: <span className="text-[#E5970F]">${totalPrice.toFixed(2)}</span>
          </h2>
        </div>

        {/* Ingredient Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#1a1c2b] mb-6">Ingredients</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-[#0E1628] text-lg">Ingredient</th>
                <th className="py-3 px-4 text-[#0E1628] text-lg">Price</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-gray-700">{ingredient.name}</td>
                  <td className="py-3 px-4 text-gray-700">${ingredient.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#1a1c2b] mb-6">Price Breakdown (Pie Chart)</h2>
          <div className="relative w-full h-96">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
