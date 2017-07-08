/*jshint esversion: 6 */
const doc = document;

let req1 = makeXHRReq(reqListener, 'http://swapi.co/api/people/4/');
let req2 = makeXHRReq(reqListener2, 'http://swapi.co/api/people/14/');
let req3 = makeXHRReq(reqListener3, 'http://swapi.co/api/films/');

function makeXHRReq( listener, url ) {
  let req = new XMLHttpRequest();
  req.addEventListener("load", listener);
  req.open("GET", url);
  req.send();
  return req;
}

function setNode(id, classAttr, text){
  let elem = doc.getElementById(id);
  if (classAttr !== null) elem.setAttribute('class', classAttr);
  if (text !== null) elem.innerHTML = text;
  return elem;
}

function makeNode(el, classAttr, text){
  let elem = doc.createElement(el);
  if (classAttr !== null) elem.setAttribute('class', classAttr);
  if (text !== null) elem.innerHTML = text;
  return elem;
}

function reqListener() {
  obj = JSON.parse(this.response);
  setNode("person4Name", null, obj.name);
  let homeReq = makeXHRReq(homeReqListener, obj.homeworld);

  function homeReqListener() {
    let homeworldObj = JSON.parse(this.response);
    setNode('person4HomeWorld', null, homeworldObj.name);
  }
}

function reqListener2() {
  obj = JSON.parse(this.response);
  setNode('person14Name', null, obj.name);
  let req2 = makeXHRReq(reqListener, obj.species);
  function reqListener() {
    let speciesObj = JSON.parse(this.response);
    setNode('person14Species', null, speciesObj.name);
  }
}

function reqListener3() {
  obj = JSON.parse(this.response);
  const filmUL = doc.getElementById("filmList");
  let filmArray = obj.results;
  for (var i = 0; i < filmArray.length; i++) {
    let listItem = makeNode('li', 'film', null);
    let titleHead = makeNode('h2', 'filmTitle', filmArray[i].title);
    listItem.appendChild(titleHead);
    let planetHead = makeNode('h3', null, "Planets");
    listItem.appendChild(planetHead);
    let ulist = doc.createElement('ul');
    ulist.setAttribute('class', 'filmPlanets');
    let planetArray = filmArray[i].planets;
    for (var j = 0; j < planetArray.length; j++) {
      let planetListItem = makeNode('li', 'planet', null);
      let planetName = makeNode('h4', 'planetName', null);
      var loopReq = makeXHRReq(reqListener, planetArray[j]);
      function reqListener() {
        let reqObj = JSON.parse(this.response);
        planetName.innerHTML = reqObj.name;
      }
      planetListItem.appendChild(planetName);
      ulist.appendChild(planetListItem);
    }
    listItem.appendChild(ulist);
    filmUL.appendChild(listItem);
  }

}