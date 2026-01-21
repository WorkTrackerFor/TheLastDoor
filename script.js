const storyEl = document.getElementById("story");
const choicesEl = document.getElementById("choices");
const restartBtn = document.getElementById("restart");

const clickSound = document.getElementById("clickSound");
const ambientSound = document.getElementById("ambientSound");

// Sound setup
clickSound.volume = 0.6;
ambientSound.volume = 0.35;

// Start ambient AFTER first user interaction
let ambientStarted = false;
function startAmbient() {
  if (!ambientStarted) {
    ambientStarted = true;
    ambientSound.play().catch(() => {});
  }
}

const pages = {
  start: {
    text: `
You stay late at school to finish an assignment.
The building is quiet—too quiet.

At the end of the hallway stands a door
you have never seen before.

It is slightly open.
    `,
    choices: [
      { text: "Open the door", next: "openDoor" },
      { text: "Walk away", next: "leave" }
    ]
  },

  openDoor: {
    text: `
The door creaks open.

A dark staircase descends into silence.
Cold air brushes your ankles.

Something moves below.
    `,
    choices: [
      { text: "Go down", next: "stairs" },
      { text: "Shut the door", next: "safe" }
    ]
  },

  leave: {
    text: `
You turn away.

Footsteps echo behind you.
They stop when you stop.
    `,
    choices: [
      { text: "Run", next: "run" },
      { text: "Turn around", next: "shadow" }
    ]
  },

  stairs: {
    text: `
At the bottom is a door
with your name carved into it.
    `,
    choices: [
      { text: "Open it", next: "expected" },
      { text: "Go back", next: "trapped" }
    ]
  },

  safe: {
    text: `
You slam the door shut.

The hallway feels normal again.
    `,
    ending: "GOOD ENDING\n\nSome doors should never be opened."
  },

  run: {
    text: `
You run home.

That night, you hear breathing beside your bed.
    `,
    ending: "BAD ENDING\n\nIt followed you."
  },

  shadow: {
    text: `
No one is there.

Your shadow waves at you.
    `,
    ending: "CREEPY ENDING\n\nYour shadow stayed behind."
  },

  expected: {
    text: `
Inside is a classroom.

Every desk has your name on it.
    `,
    ending: "WORST ENDING\n\nYou were always expected."
  },

  trapped: {
    text: `
The stairs vanish.

The door locks behind you.
    `,
    ending: "ENDING\n\nYou are not alone."
  }
};

function loadPage(id) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const page = pages[id];
  storyEl.innerHTML = page.text.replace(/\n/g, "<br><br>");
  choicesEl.innerHTML = "";

  if (page.ending) {
    storyEl.innerHTML += `<br><br><strong>${page.ending.replace(/\n/g, "<br>")}</strong>`;
    restartBtn.hidden = false;
    return;
  }

  page.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      startAmbient();
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
      loadPage(choice.next);
    };

    choicesEl.appendChild(btn);
  });
}

restartBtn.onclick = () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  restartBtn.hidden = true;
  loadPage("start");
};

// Init
loadPage("start");
