const jobForm = document.getElementById("jobForm");
const appBody = document.getElementById("appBody");
const addJobBtn = document.getElementById("addJobBtn");
const openModalBtn = document.getElementById("openModalBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const addJobSection = document.getElementById("addJobSection");
const addBtn = document.querySelector("#addJobBtn");
const company = document.getElementById("company");
const position = document.getElementById("position");
const location = document.getElementById("location");
const salary = document.getElementById("salary");
const status = document.getElementById("status");
const jobdate = document.getElementById("jobdate");
const notes = document.getElementById("notes");
const totalJobsCount = document.getElementById("totalJobsCount");
const totalSalaryAmount = document.getElementById("totalSalaryAmount");
const filterStatus = document.getElementById("filterStatus");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");


export function getUiElements () {
    const uiElements = {
        jobForm,
        appBody,
        openModalBtn,
        closeModalBtn,
        modalOverlay,
        filterStatus,
        addBtn,
        searchInput,
        loader,
    }
    return uiElements;
}

export function fillJobForm (jobObjectData) {
        company.value = jobObjectData.company;
        position.value = jobObjectData.position;
        location.value = jobObjectData.location;
        salary.value = jobObjectData.salary;
        status.value = jobObjectData.status;
        jobdate.value = jobObjectData.date;
        notes.value = jobObjectData.notes;

}

export function getJobFormData () {
    const jobData = {
        company: company.value,
        position: position.value,
        location: location.value,
        salary: salary.value,
        status: status.value,
        date: jobdate.value,
        notes: notes.value,
    }
    return jobData;
}


export function updateDashboard (jobsArray) {
    totalJobsCount.textContent = jobsArray.length;
    let totalAmount = 0;

    jobsArray.forEach(item => {
        totalAmount += Number(item.salary);
    });

    totalSalaryAmount.textContent = totalAmount.toLocaleString('cs-CZ') + " CZK"
}



export function addJobToTable (job){
    const row = `
    <tr data-id="${job.id}">
        <td>${job.company}</td>
        <td>${job.position}</td>
        <td>${job.location}</td>
        <td>${Number(job.salary).toLocaleString('cs-CZ')} CZK</td>
        <td>
            <span class="statusBadge ${job.status}">
                <span class="dot"></span>
                ${job.status}
            </span></td>
        <td>${job.date}</td>
        <td>${job.notes}</td>
        <td>
            <button class="btn-edit">Edit</button>
            <button class="btn-remove">Remove</button>
        </td>
    </tr>
    `
    appBody.insertAdjacentHTML('beforeend', row)
}