// Workout Logging
const workoutForm = document.getElementById('workoutForm');
const workoutLog = document.getElementById('workoutLog');
let workouts = [];

workoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const workoutType = document.getElementById('workoutType').value;
  const duration = document.getElementById('duration').value;

  const workout = { type: workoutType, duration: duration };
  workouts.push(workout);
  updateWorkoutLog();
  updateProgressChart();
  workoutForm.reset();
});

function updateWorkoutLog() {
  workoutLog.innerHTML = '<h3>Workout History</h3>';
  workouts.forEach((workout, index) => {
    workoutLog.innerHTML += `<p>${index + 1}. ${workout.type} - ${workout.duration} minutes</p>`;
  });
}

// Meal Suggestions
const fetchMealsButton = document.getElementById('fetchMeals');
const mealSuggestions = document.getElementById('mealSuggestions');

fetchMealsButton.addEventListener('click', async () => {
  const diet = 'low-carb'; // Example diet preference
  const meals = await fetchMealSuggestions(diet);
  displayMeals(meals);
});

async function fetchMealSuggestions(diet) {
  // Mock API call (replace with Nutritionix/Edamam API)
  const mockMeals = [
    { name: 'Grilled Chicken Salad', calories: 350 },
    { name: 'Avocado Toast', calories: 300 },
    { name: 'Quinoa Bowl', calories: 400 },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(mockMeals), 1000));
}

function displayMeals(meals) {
  mealSuggestions.innerHTML = '<h3>Suggested Meals</h3>';
  meals.forEach((meal) => {
    mealSuggestions.innerHTML += `<p>${meal.name} - ${meal.calories} calories</p>`;
  });
}

// Progress Visualization
const progressChartCanvas = document.getElementById('progressChart').getContext('2d');
let progressChart;

function updateProgressChart() {
  const labels = workouts.map((_, index) => `Day ${index + 1}`);
  const data = workouts.map((workout) => workout.duration);

  if (progressChart) {
    progressChart.destroy();
  }

  progressChart = new Chart(progressChartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Workout Duration (minutes)',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }]
    },
    options: { responsive: true }
  });
}