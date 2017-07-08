const doc = document;

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://swapi.co/api/people/4/");
oReq.send();

var oReq2 = new XMLHttpRequest();
oReq2.addEventListener("load", reqListener2);
oReq2.open("GET", "http://swapi.co/api/people/14/");
oReq2.send();

var oReq3 = new XMLHttpRequest();
oReq3.addEventListener("load", reqListener3);
oReq3.open("GET", "http://swapi.co/api/films/");
oReq3.send();

function makeXHRReq( ) {
  let req = new XMLHttpRequest();
}

function setNode(id, classAttr, text){
  let elem = doc.getElementById(id);
  if (classAttr !== null) elem.setAttribute('class', classAttr);
  if (text !== null) elem.innerHTML = text;
  return elem;
}

function reqListener() {
  obj = JSON.parse(this.response);
  setNode("person4Name", null, obj.name);

  var homeReq = new XMLHttpRequest();
  homeReq.addEventListener("load", homeReqListener);
  homeReq.open("GET", obj.homeworld);
  homeReq.send();

  function homeReqListener() {
    let homeworldObj = JSON.parse(this.response);
    setNode('person4HomeWorld', null, homeworldObj.name);
  }
}

function reqListener2() {
  obj = JSON.parse(this.response);
  setNode('person14Name', null, obj.name);

  var req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", obj.species);
  req.send();

  function reqListener() {
    let speciesObj = JSON.parse(this.response);
    setNode('person14Species', null, speciesObj.name)
  }
}

function makeNode(el, classAttr, text){
  let elem = doc.createElement(el);
  if (classAttr !== null) elem.setAttribute('class', classAttr);
  if (text !== null) elem.innerHTML = text;
  return elem;
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

      var req = new XMLHttpRequest();
      req.addEventListener("load", reqListener);
      req.open("GET", planetArray[j]);
      req.send();

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