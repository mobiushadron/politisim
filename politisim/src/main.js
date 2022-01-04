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
  var rows = [];
  states.forEach(state => rows.push(
    <tr key={state["id"]} id={state["name"] + "-row"}>
      <td id={state["name"] + "-name"}>{state["name"]}</td>
      <td id={state["name"] + "-EVs"}>{state["delegationSize"] + 2}</td>
    </tr>
  ));

  return(
    <table id="states-table">
      <tr id="states-header-row"><th id="states-name-header">State Name</th><th id="states-evs-header">EVs</th><th id="states-result-header">Result</th></tr>
      {rows}
    </table>
  )
}

export default Main;