# UniFlow AI

An algorithmic academic planning and priority scheduling tool built to turn heavy university coursework and overlapping deadlines into a clear, ranked execution plan.

**Live Web App:** [balajidivyesh2308-crypto.github.io/uniflow-ai](https://balajidivyesh2308-crypto.github.io/uniflow-ai/)  
**Built by:** Divyesh Balaji

---

### Why I Built This

When you're juggling multiple university modules, coding labs, tutorials, and quiz prep at the same time, figuring out what to work on first takes up almost as much mental energy as doing the actual work. Standard to-do lists just stack tasks on top of each other without accounting for how much a task is worth, how hard it is, or how fast the deadline is approaching.

I built UniFlow AI to solve that problem. You can paste raw syllabus notes or assignment deadlines in plain English, and it automatically extracts the details, calculates a mathematical priority score for every task, generates a step-by-step preparation checklist, and lets you export the whole schedule to your calendar.

---

### Key Features

- **Plain-Text Syllabus Parser:** Paste natural-language task descriptions (including course codes like `SC1007` or `MH1810`, due dates, weights, and difficulty ratings) and parse them into structured task cards.
- **Algorithmic Priority Scoring:** Ranks every assignment from `#1` downward using a custom urgency-decay formula:
  `Priority = ((Weight * 1.5) + (Difficulty * 6)) / sqrt(Days Left)`
- **One-Click Sample NTU Syllabus:** Includes a built-in sample dataset so visitors can test the scheduler immediately without typing anything.
- **Action Plan Checklists:** Generates interactive preparation subtasks for each assignment, quiz, lab, or exam.
- **Calendar Export (`.ics`):** Exports your ranked schedule directly into an `.ics` file compatible with Google Calendar, Apple Calendar, and Outlook.
- **Offline Persistence:** Saves your current schedule in browser `localStorage` so your tasks stay intact when you refresh or reopen the page.

---

### Sample Input to Try

Click **Load Sample NTU Syllabus** on the live site, or copy and paste this into the text box:

    1. SC1007 Data Structures & Algorithms Lab (Merge Sort & complexity analysis) due in 3 days, weight 15%, difficulty 8.
    2. MH1810 Calculus Quiz Prep (Integration & limits practice sheet) due in 4 days, weight 25%, difficulty 9.
    3. MH1812 Discrete Mathematics Tutorial 4 (Graph theory & induction proofs) due in 6 days, weight 10%, difficulty 7.
    4. SC1003 Intro to Computational Thinking Python Mini-Project due in 10 days, weight 20%, difficulty 6.

---

### Tech Stack

- **Frontend & Client Engine:** HTML5, CSS3, Vanilla JavaScript (`index.html`)
- **Calendar Integration:** RFC-5545 `VCALENDAR` / `.ics` file generation via Browser `Blob` API
- **Backend (Optional Local Server):** Node.js & Express (`server.js`)

---

### Running It Locally

The web app runs directly in the browser via GitHub Pages with zero setup required. If you want to clone the repo and run it locally on your machine:

1. **Clone the repository:**

       git clone https://github.com/balajidivyesh2308-crypto/uniflow-ai.git
       cd uniflow-ai

2. **Open the frontend directly:**
   Double-click `index.html` to open it in any browser.

3. **Run the optional Node.js server:**

       npm install
       node server.js
