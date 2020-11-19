const teamList = document.querySelector('#teams-list');
const form = document.querySelector('#add-team-form');

// create element and render teams
function renderTeams(doc){
    let li = document.createElement('li');
    let team_name = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().team_name;

    li.appendChild(team_name);

    teamList.appendChild(li);
}


//Geting Data

//Async call to grab the data
db.collection('teams').get().then((snapshot) => {
    //console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        //Logs data to the console
        console.log(doc.data);
        renderTeams(doc);
    })
})

//Saving Data
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('teams').add({
        team_name: form.team_name.value,
    });
    form.team_name.value = '';
})