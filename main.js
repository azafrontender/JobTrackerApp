import { getJobs, addJob, deleteJob, updateJob } from './api.js';
import { updateDashboard, addJobToTable, getUiElements, getJobFormData, fillJobForm } from './ui.js';



let myJobs = [];
const ui = getUiElements();

let currentEditId = null;






async function initApp() {
    ui.loader.classList.remove("hidden");
    myJobs = await getJobs();
    myJobs.forEach(job => addJobToTable(job));
    await updateDashboard(myJobs);
    ui.loader.classList.add("hidden");
}

initApp();



ui.filterStatus.addEventListener("change", (e) => {
    let selectedStatus = e.target.value;
    const filteredJobs = myJobs.filter(job => {
        if (selectedStatus === "All") {
            return true;
        }
        else {
            return job.status === selectedStatus;
        }
    })
    ui.appBody.replaceChildren();

    filteredJobs.forEach(job => addJobToTable(job));
})


ui.jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jobData = getJobFormData();

    if (currentEditId === null) {
        await addJob(jobData)
    }

    else {
        await updateJob(currentEditId, jobData);
        currentEditId = null;
        ui.addBtn.textContent = "Add Job";
    }

    ui.appBody.innerHTML = "";
    await initApp();

    ui.modalOverlay.classList.add("hidden");
    ui.jobForm.reset();
})





ui.appBody.addEventListener("click", async (e) => {

    if (e.target.classList.contains("btn-remove")){
        const row = e.target.closest("tr");
        const id = row.dataset.id;

        await deleteJob(id);
        ui.appBody.replaceChildren();
        await initApp();
        console.log(`The vacancy №${id} was removed from the table!`)
    }

    if (e.target.classList.contains("btn-edit")) {
        const row = e.target.closest("tr");
        const id = row.dataset.id;

        const jobToEdit = myJobs.find(job => job.id == id);

        if (!jobToEdit) {
            console.error(`Вакансия с ID ${id}, не была найдена в массиве`);
            return;
        }
        
        fillJobForm(jobToEdit);

        currentEditId = id;
        ui.addBtn.textContent = "Save Changes";
        ui.modalOverlay.classList.remove("hidden");
    }



})



ui.jobForm.addEventListener("click", async (e) => {
    e.stopPropagation();
})



ui.modalOverlay.addEventListener("click", () => {
    ui.modalOverlay.classList.add("hidden");
    ui.jobForm.reset();
})

ui.openModalBtn.addEventListener("click", () => {
    ui.modalOverlay.classList.remove("hidden");
} )


ui.closeModalBtn.addEventListener("click", () => {
    ui.modalOverlay.classList.add("hidden");
    ui.jobForm.reset();
    currentEditId = null;
    ui.addBtn.textContent = "Add Job";
})



ui.searchInput.addEventListener("input", (e) => {
    let userText = e.target.value.toLowerCase();
    const searchedJobs = myJobs.filter(job => {
        return job.company.toLowerCase().includes(userText);
    })
    ui.appBody.replaceChildren();
    searchedJobs.forEach(job => addJobToTable(job))
})

