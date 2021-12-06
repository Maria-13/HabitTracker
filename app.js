const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];

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
    <input type="checkbox" data-index=${i} id="habit${i}" ${habit.completed ? "checked" : ""
} />
    <label for = "habit${i}"><span>${habit.reps}/${habit.totalCount} ${habit.timeframe
    } </span> ${habit.text}</label>
    <button class="delete" data-index=${i} id="delete${i}">Delete</button>
</li>
`;
})
.join("");
}


// toggle if complete


// delete habit


addHabits.addEventListener("submit", addHabit);