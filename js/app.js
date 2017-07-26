/*jshint esversion: 6 */

//Vader request
fetch('http://swapi.co/api/people/4/').then( response => { return response.json(); } )
.then( data => {
  setNode("person4Name", data.name);
  return fetch(data.homeworld);
})
.then( response => {return response.json(); })
.then( data => {
    setNode('person4HomeWorld', data.name);
});

//Solo request
fetch('http://swapi.co/api/people/14/').then( response => { return response.json(); } )
.then( data => {
  setNode("person14Name", data.name);
  return fetch(data.homeworld);
})
.then( response => {return response.json(); })
.then( data => {
    setNode('person14Species', data.name);
});

//Films Request
fetch('http://swapi.co/api/films/').then( response => { return response.json(); } )
.then( data => {
    const filmUL = document.getElementById("filmList");
    let filmArray = data.results;
    for (var i = 0; i < filmArray.length; i++) {
      let listItem = makeNode('li', 'film', null);
      let titleHead = makeNode('h2', 'filmTitle', filmArray[i].title);
      listItem.appendChild(titleHead);
      let planetHead = makeNode('h3', null, "Planets");
      listItem.appendChild(planetHead);
      let ulist = document.createElement('ul');
      ulist.setAttribute('class', 'filmPlanets');
      let planetArray = filmArray[i].planets;
      for (var j = 0; j < planetArray.length; j++) {
        let planetListItem = makeNode('li', 'planet', null);
        let planetName = makeNode('h4', 'planetName', null);

        fetch(planetArray[j]).then( response => { return response.json(); })
        .then( data => { planetListItem.innerHTML = data.name; });

        planetListItem.appendChild(planetName);
        ulist.appendChild(planetListItem);
      }
      listItem.appendChild(ulist);
      filmUL.appendChild(listItem);
    }
});

function setNode(id, text){
  let elem = document.getElementById(id);
  if (text !== null) elem.innerHTML = text;
  return elem;
}

function makeNode(el, classAttr, text){
  let elem = document.createElement(el);
  if (classAttr !== null) elem.setAttribute('class', classAttr);
  if (text !== null) elem.innerHTML = text;
  return elem;
}