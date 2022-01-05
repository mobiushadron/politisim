import { React, useState } from 'react';

function Main() {
  const statesData = require("./data/states-data.json");
  const states = statesData["states"];

  const [presidentialElectionTable, setPresidentialElectionTable] = useState(<table id="blank-states-table"></table>);

  return(
    <div id="main-div">
      <button onClick={() => setPresidentialElectionTable(generateStatesTable(states))}>Run Election</button>
      {presidentialElectionTable}
    </div>
  );
}

function generateStatesTable(states) {
  const nationalPartisanship = ((randn_bm() * 20) - 10) + 50;

  var rows = [];
  states.forEach(state => {
    const statewideElectionMargin = getStatewideElectionMargin(state, nationalPartisanship);
    const marginStyle = statewideElectionMargin > 0 ? {color: "blue"} : {color: "red"};
    rows.push(
      <tr key={state["id"]} id={state["name"] + "-row"}>
        <td id={state["name"] + "-name"}>{state["name"]}</td>
        <td id={state["name"] + "-EVs"}>{state["delegationSize"] + 2}</td>
        <td id={state["name"] + "-margin"} style={marginStyle}>{Math.abs(statewideElectionMargin)}</td>
      </tr>
    );
  });

  return(
    <table id="states-table">
      <tr id="states-header-row"><th id="states-name-header">State Name</th><th id="states-evs-header">EVs</th><th id="states-result-header">Result</th></tr>
      {rows}
    </table>
  );
}

function getStatewideElectionMargin(state, nationalPartisanship){
  return Math.round(((state["PVI"] + nationalPartisanship + ((randn_bm() * 4) - 2)) - 50) * 10)/10;
}

function randn_bm() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num
}

export default Main;