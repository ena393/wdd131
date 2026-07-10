
const form = document.querySelector("#fsyForm");
const eventType = document.querySelector("#eventType");
const studentContainer = document.querySelector("#studentContainer");
const guestContainer = document.querySelector("#guestContainer");
const studentId = document.querySelector("#studentId");
const accessCode = document.querySelector("#accessCode");
const output = document.querySelector("#output");

function updateNotesField() {
    const value = eventType.value;

    // Show the appropriate container based on the event type
    if (value === "student") {
        studentContainer.hidden = false;
        guestContainer.hidden = true;
        studentId.required = true;
        accessCode.required = false;
    } else if (value === "guest") {
        guestContainer.hidden = false;
        studentContainer.hidden = true;
        accessCode.required = true;
        studentId.required = false;
    } else {
        studentContainer.hidden = true;
        guestContainer.hidden = true;
        studentId.required = false;
        accessCode.required = false;
    }
}

eventType.addEventListener("change", updateNotesField);
updateNotesField();


// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    const chosen = new Date(value);
    return chosen < today;
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.eventType.value;
    const eventDate = form.eventDate.value;

    // Validate the input

    // Let the user know if they incorrectly filled out the student I# field
    if (type === "student") {
        if (!/^\d{9}$/.test(studentId.value.trim())) {
            output.textContent = "Student I# must be exactly 9 digits.";
            return;
        }
    }

    // Let the user know if they incorrectly filled out the access code field
    if (type === "guest") {
        if (accessCode.value.trim() !== "EVENT131") {
            output.textContent = "Access Code must be EVENT131.";
            return;
        }
    }

    if (isPastDate(eventDate)) {
        output.textContent = "Please choose a later date.";
        return;
    }

    output.innerHTML = `
  <h2>Ticket Created</h2>
  <p>${firstName} ${lastName}</p>
  <p>${type}</p>
  <p>${eventDate}</p>
    `;

    form.reset();
    updateNotesField();
});
