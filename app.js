const teamList = document.querySelector('#teams-list');
const form = document.querySelector('#add-team-form');

// create element and render teams
function renderTeams(doc){
    let li = document.createElement('li');
    let team_name = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    team_name.textContent = doc.data().team_name;
    cross.textContent = 'X'

    li.appendChild(team_name);
    li.appendChild(cross);

    teamList.appendChild(li);

    //deleteing data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('teams').doc(id).delete();
    })
}

//Async call to grab the data
/* db.collection('teams').where('team_name', '!=', 'null').orderBy('team_name').get().then((snapshot) => {
    //console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        //Logs data to the console
        console.log(doc.data());
        renderTeams(doc);
    })
}) */


//Saving Data
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('teams').add({
        team_name: form.team_name.value,
    });
    form.team_name.value = '';
});

//Real time listerner to get data
db.collection('teams').orderBy('team_name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    //console.log(changes);
    changes.forEach(change => {
        //console.log(change.doc.data())
        if(change.type == 'added'){
            renderTeams(change.doc)
        }
        else if (change.type == 'removed'){
            let li = teamList.querySelector('[data-id=' + change.doc.id + ']');
            teamList.removeChild(li);
        }
        else {

        }
    })
})