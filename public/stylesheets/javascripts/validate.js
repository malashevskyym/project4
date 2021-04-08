// Get the albums to populate the dropdown menu

// Request the list of album titles
fetch("catalog/comment/5")
  .then(response => response.json())
  .then(data => populateCommentsSelect(data))
  .catch(function(err) {
      console.log('Fetch problem: ' + err.message);
  });

fetch("/catalog/group")
    .then(response => response.json())
    .then(data => populateGroupSelect(data))
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
      });


const groupElement = document.getElementById('group-select');
const albumElement = document.getElementById('album-select');
const commentSection = document.getElementById('comments');

//POPULATE FUNCTIONS
function populateGroupSelect(options) {
    // options is an array of Album objects that each have
    // three properties: group, title, and year
    // WE ASSUME ONLY ONE GROUP IN THE ARRAY
    let newOption = document.createElement('option');
    newOption.setAttribute('value', "");
    newOption.innerHTML = "Select a Group";
    groupElement.appendChild(newOption);
    for(let i = 0; i < options.length; ++i) {
        let newOption = document.createElement('option');
        let group = options[i];
        newOption.setAttribute('value', group._id);
        newOption.innerHTML = `${group.name}`;
        groupElement.appendChild(newOption);
    }
}

function populateAlbumSelect(options) {
    // options is an array of Album objects that each have
    // three properties: group, title, and year
    // WE ASSUME ONLY ONE GROUP IN THE ARRAY
    let newOption = document.createElement('option');
    newOption.setAttribute('value', "");
    newOption.innerHTML = "Select a Album";
    albumElement.appendChild(newOption);
    for(let i = 0; i < options.length; ++i) {
        let newOption = document.createElement('option');
        let album = options[i];
        newOption.setAttribute('value', album._id);
        newOption.innerHTML = `${album.title} (${album.year})`;
        albumElement.appendChild(newOption);
    }
}
function populateCommentsSelect(options) {
    // options is an array of Album objects that each have
    // three properties: group, title, and year
    // WE ASSUME ONLY ONE GROUP IN THE ARRAY

    for(let i = 0; i < options.length; ++i) {
        let div = document.createElement('div');
        let newOption = document.createElement('ARTICLE');
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let comments = options[i];
        newOption.setAttribute('value', comments._id);
        h2.innerHTML = `${comments.timedate.substring(0,10)}`;
        h3.innerHTML = `${comments.name} (${comments.email})`;
        newOption.innerHTML = `${comments.text}`;
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(newOption);
        commentSection.appendChild(div);
    }
}

//FETCH FUCNTIONS
function fetchAlbums(group_selected) {
  fetch("/catalog/album/group/" + group_selected)
    .then(response => response.json())
    .then(data => populateAlbumSelect(data))
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}
function fetchComments(album_selected) {
  fetch("catalog/album/"+ album_selected + "/comment/5")
    .then(response => response.json())
    .then(data => populateCommentsSelect(data))
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}

//GET SELECTED
function GetSelectedAlbumValue() {
  var albumSelection = albumElement.options[albumElement.selectedIndex].value;
  commentSection.replaceChildren();
  fetchComments(albumSelection);
  console.log("album id: " + albumSelection);
};

function GetSelectedValue() {
  var groupSelection = groupElement.options[groupElement.selectedIndex].value;
  albumElement.options.length = 0;
  fetchAlbums(groupSelection);
  albumElement.hidden = false;
  console.log("group id: " + groupSelection);
};

groupElement.addEventListener("input", GetSelectedValue);
albumElement.addEventListener("input", GetSelectedAlbumValue);
