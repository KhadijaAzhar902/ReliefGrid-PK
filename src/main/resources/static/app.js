const incidentList = document.getElementById("incidentList");
const activeCount = document.getElementById("activeCount");
const highCount = document.getElementById("highCount");
const confirmationCount = document.getElementById("confirmationCount");
const resolvedCount = document.getElementById("resolvedCount");


// ==========================
// LOAD INCIDENTS
// ==========================

async function loadIncidents() {

    try {

        const response = await fetch("/api/incidents");

        if (!response.ok) {
            throw new Error("Could not load incidents");
        }

        const incidents = await response.json();

        updateStats(incidents);
        displayIncidents(incidents);

    } catch (error) {

        incidentList.innerHTML = `
            <div class="empty-state">
                Unable to load incidents.
            </div>
        `;

        console.error(error);
    }
}


// ==========================
// DASHBOARD STATS
// ==========================

function updateStats(incidents) {

    const active = incidents.filter(
        incident => incident.status !== "RESOLVED"
    ).length;

    const high = incidents.filter(
        incident =>
            incident.severity === "HIGH" &&
            incident.status !== "RESOLVED"
    ).length;

    const resolved = incidents.filter(
        incident => incident.status === "RESOLVED"
    ).length;

    const confirmations = incidents.reduce(
        (total, incident) =>
            total + (incident.confirmations || 0),
        0
    );

    activeCount.textContent = active;
    highCount.textContent = high;
    resolvedCount.textContent = resolved;
    confirmationCount.textContent = confirmations;
}


// ==========================
// DISPLAY INCIDENT CARDS
// ==========================

function displayIncidents(incidents) {

    if (incidents.length === 0) {

        incidentList.innerHTML = `
            <div class="empty-state">
                No incidents have been reported yet.
            </div>
        `;

        return;
    }

    incidentList.innerHTML = incidents.map(incident => {

        const severity =
            (incident.severity || "LOW").toLowerCase();

        const date = incident.reportedAt
            ? new Date(incident.reportedAt).toLocaleString()
            : "Unknown time";

        return `
            <div class="incident-card">

                <div class="incident-top">

                    <div>

                        <div class="incident-type">
                            ${incident.type.replaceAll("_", " ")}
                        </div>

                        <div class="incident-area">
                            📍 ${incident.area}
                        </div>

                    </div>

                    <span class="badge ${severity}">
                        ${incident.severity}
                    </span>

                </div>


                <p class="incident-description">
                    ${incident.description}
                </p>


                <div class="incident-footer">

                    <div>

                        <strong>Status:</strong>
                        ${incident.status.replaceAll("_", " ")}

                        <br>

                        <span>
                            Reported: ${date}
                        </span>

                        <br>

                        <span>
                            Confirmations:
                            <strong>
                                ${incident.confirmations || 0}
                            </strong>
                        </span>

                    </div>


                    <div class="incident-actions">

                        <button
                            class="confirm-button"
                            onclick="confirmIncident(${incident.id})">

                            Confirm

                        </button>


                        ${
                            incident.status === "REPORTED"
                            ? `
                                <button
                                    class="progress-button"
                                    onclick="updateIncidentStatus(
                                        ${incident.id},
                                        'IN_PROGRESS'
                                    )">

                                    Start Response

                                </button>
                              `
                            : ""
                        }


                        ${
                            incident.status !== "RESOLVED"
                            ? `
                                <button
                                    class="resolve-button"
                                    onclick="updateIncidentStatus(
                                        ${incident.id},
                                        'RESOLVED'
                                    )">

                                    Resolve

                                </button>
                              `
                            : ""
                        }

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// ==========================
// COMMUNITY CONFIRMATION
// ==========================

async function confirmIncident(id) {

    try {

        const response = await fetch(
            `/api/incidents/${id}/confirm`,
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            throw new Error("Confirmation failed");
        }

        await loadIncidents();

    } catch (error) {

        alert("Unable to confirm this incident.");

        console.error(error);
    }
}


// ==========================
// UPDATE INCIDENT STATUS
// ==========================

async function updateIncidentStatus(id, status) {

    try {

        const response = await fetch(
            `/api/incidents/${id}/status?status=${status}`,
            {
                method: "PATCH"
            }
        );

        if (!response.ok) {
            throw new Error("Status update failed");
        }

        await loadIncidents();

    } catch (error) {

        alert("Unable to update incident status.");

        console.error(error);
    }
}


// ==========================
// REPORT INCIDENT MODAL
// ==========================

const reportModal =
    document.getElementById("reportModal");

const openReportModal =
    document.getElementById("openReportModal");

const closeReportModal =
    document.getElementById("closeReportModal");

const cancelReport =
    document.getElementById("cancelReport");

const incidentForm =
    document.getElementById("incidentForm");


openReportModal.addEventListener("click", () => {

    reportModal.classList.add("show");

});


closeReportModal.addEventListener("click", () => {

    reportModal.classList.remove("show");

});


cancelReport.addEventListener("click", () => {

    reportModal.classList.remove("show");

});


reportModal.addEventListener("click", (event) => {

    if (event.target === reportModal) {

        reportModal.classList.remove("show");

    }

});


// ==========================
// SUBMIT NEW INCIDENT
// ==========================

incidentForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const incident = {

        type:
            document.getElementById("incidentType").value,

        area:
            document.getElementById("incidentArea").value,

        severity:
            document.getElementById("incidentSeverity").value,

        description:
            document.getElementById("incidentDescription").value

    };


    try {

        const response = await fetch(
            "/api/incidents",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(incident)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Could not submit incident"
            );

        }


        incidentForm.reset();

        reportModal.classList.remove("show");

        await loadIncidents();


    } catch (error) {

        alert("Unable to submit incident.");

        console.error(error);

    }

});


// ==========================
// START DASHBOARD
// ==========================

loadIncidents();