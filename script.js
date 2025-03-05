document.addEventListener("DOMContentLoaded", function () {
    const completedButtons = document.querySelectorAll(".completed");
    const taskCount = document.querySelector(".task-box h2"); 
    const navTaskCount = document.querySelector(".task-count"); 
    const activityLog = document.querySelector(".activity-log"); 
    const clearHistoryButton = document.querySelector(".clear-history"); 
    const colorPalette = document.querySelector(".color-palette"); 
    const body = document.body;

    function checkAllTasksCompleted() {
        const allDisabled = Array.from(completedButtons).every(button => button.disabled);
        if (allDisabled) {
            setTimeout(() => {
                alert("🎉 Congrats! You have completed all the tasks! 🎉");
            }, 500);
        }
    }

    completedButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Board updated successfully!");
            this.disabled = true;
            this.style.background = "#ccc";
            this.innerText = "Completed ✅";

            let currentTaskCount = parseInt(taskCount.innerText);
            if (currentTaskCount > 0) {
                taskCount.innerText = currentTaskCount - 1;
            }

            let currentNavCount = parseInt(navTaskCount.innerText.replace("✅ ", ""));
            navTaskCount.innerText = `✅ ${currentNavCount + 1}`;

            const taskCard = this.parentElement;
            const taskTitle = taskCard.querySelector("h3").innerText;
            const currentTime = new Date().toLocaleTimeString();

            const logEntry = document.createElement("p");
            logEntry.innerText = `You have completed the task '${taskTitle}' at ${currentTime}`;
            logEntry.classList.add("log-entry");
            activityLog.appendChild(logEntry);

            checkAllTasksCompleted(); 
        });
    });

    clearHistoryButton.addEventListener("click", function () {
        document.querySelectorAll(".log-entry").forEach(log => log.remove());
    });

    function displayCurrentDate() {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = date.toLocaleDateString('en-US', options);
    }

    displayCurrentDate();

    colorPalette.addEventListener("click", function (event) {
        const colors = ["#ff7675", "#fdcb6e", "#55efc4", "#74b9ff", "#a29bfe", "#dfe6e9"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        body.style.backgroundColor = randomColor;
    });
});

