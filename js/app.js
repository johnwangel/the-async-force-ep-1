const doc = document;

var oReq = new XMLHttpRequest("json");
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

function makeElemWithText(id, text){
  let elem = doc.getElementById(id);
  elem.innerHTML = text;
  return elem;
}

function makeElemWithClassAndText(id, classAttr, text){
  let elem = doc.getElementById(id);
  elem.setAttribute('class', classAttr);
  elem.innerHTML = text;
  return elem;
}

function reqListener() {
  obj = JSON.parse(this.response);
  const name = doc.getElementById("person4Name");
  const homeworld = doc.getElementById("person4HomeWorld");
  name.innerHTML = obj.name;
  var homeReq = new XMLHttpRequest();
  homeReq.addEventListener("load", homeReqListener);
  homeReq.open("GET", obj.homeworld);
  homeReq.send();

  function homeReqListener() {
    let homeworldObj = JSON.parse(this.response);
    homeworld.innerHTML = homeworldObj.name;
  }
}

function reqListener2() {
  obj = JSON.parse(this.response);
  const name2 = doc.getElementById("person14Name");
  const species = doc.getElementById("person14Species");
  name2.innerHTML = obj.name;

  var req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", obj.species);
  req.send();

  function reqListener() {
    let speciesObj = JSON.parse(this.response);
    species.innerHTML = speciesObj.name;
  }
}

function reqListener3() {
  obj = JSON.parse(this.response);
  const filmUL = doc.getElementById("filmList");
  let filmArray = obj.results;
  for (var i = 0; i < filmArray.length; i++) {

    let listItem = doc.createElement('li');
    listItem.setAttribute('class', 'film');
    let titleHead = doc.createElement('h2');
    titleHead.setAttribute('class', 'filmTitle');
    titleHead.innerHTML = filmArray[i].title;
    listItem.appendChild(titleHead);
    let planetHead = doc.createElement('h3');
    planetHead.innerHTML = "Planets";
    listItem.appendChild(planetHead);

    let ulist = doc.createElement('ul');
    ulist.setAttribute('class', 'filmPlanets');

    let planetList = filmArray[i].planets;

    for (var j = 0; j < planetList.length; j++) {

      let planetListItem = doc.createElement('li');
      planetListItem.setAttribute('class', 'planet');
      let planetName = doc.createElement('h4');
      planetName.setAttribute('class', 'planetName');

      var req = new XMLHttpRequest();
      req.addEventListener("load", reqListener);
      req.open("GET", planetList[j]);
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