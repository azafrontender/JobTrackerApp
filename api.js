const API_URL = "http://localhost:3000/applications";

export async function getJobs() {
    try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
    }
    catch (error) {
        console.error("Error! Vacancies can not be loaded");
        return [];
    }
}

export async function addJob(jobData) {
    try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(jobData)
    })
   return await response.json();
} catch (error) {
    console.error("Can not add the job");
    return null;
}
}


export async function deleteJob(id) {
    try {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
});
}catch (error){
    console.error("The job can not beeing deleted");
}
}

export async function updateJob(id, jobData) {
    try {
    const response = await fetch(`${API_URL}/${id}`, {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
    })    
    return await response.json();
} catch (error) {
    console.error("Can not update the job");
    return null;
}
}