// Query selectors
const themeBtn = document.querySelector('#theme');

const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];

// Function for theme toggling
const ui = {
  theme(){
    themeBtn.classList.toggle('dark');
    const root = document.querySelector(':root');
    root.classList.toggle('dark');
  }
}
    
// adding a habit
function addHabit(e) {
    e.preventDefault();
    const text = this.querySelector("[name=habit]").value;
    const totalCounts = +this.querySelector("[name=reps]").value;
    const timeframe = this.querySelector("[name=timeframe]").value;
    const habit = {
        text: text,
        reps: 0,
        totalCounts: totalCounts,
        timeframe: timeframe,
        completed: false,
      };
      habits.push(habit);
      listHabits(habits, habitsList);
      localStorage.setItem("habits", JSON.stringify(habits));
      this.reset();
      console.log(habit);
    }

// listing a habit
function listHabits(habit = [], habitsList){
    habitsList.innerHTML = habits.map((habit, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="habit${i}" ${
    habit.completed ? "checked" : ""
  } />
        <label for="habit${i}"><span>${habit.reps}/${habit.totalCounts} ${
    habit.timeframe
  }</span> ${habit.text}</label>
    <button class="delete" data-index=${i} id="delete${i}">Delete</button>
    </li>
    `;
})
.join("");
}


// toggle if complete
function toggleCompleted(e) {
    if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  habits[index].reps += 1;

  if (habits[index].reps === habits[index].totalCounts) {
    habits[index].completed = true;
  } else if (habits[index].reps > habits[index].totalCounts) {
    habits[index].reps = 0;
    habits[index].completed = false;
  }

listHabits(habits, habitsList);
// saving it in the same browser
localStorage.setItem("habits", JSON.stringify(habits));
}

// delete habit
function deleteHabit(e) {
    if (!e.target.matches("button")) return;
    const el = e.target;
    const index = el.dataset.index;
  
    habits.splice(index, 1);
  
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
  }

// Event listeners
themeBtn.addEventListener('click', ui.theme);

addHabits.addEventListener("submit", addHabit);
habitsList.addEventListener("click", toggleCompleted);
habitsList.addEventListener("click", deleteHabit);

listHabits(habits, habitsList);
