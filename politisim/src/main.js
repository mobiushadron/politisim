function Main() {

  const statesData = require("./data/states-data.json");
  const states = statesData["states"];

  return(
    <div id="main-div">
      <div>Table should appear below</div>
      {generateStatesTable(states)}
    </div>
  );
}

function generateStatesTable(states) {
  var rows = [];
  states.forEach(state => rows.push(
    <tr id={state["name"] + "-row"}>
      <td id={state["name"] + "-name"}>{state["name"]}</td>
      <td id={state["name"] + "-EVs"}>{state["delegationSize"] + 2}</td>
    </tr>
  ));

  return(
    <table id="states-table">
      <tr id="states-header-row"><th id="states-name-header">State Name</th><th id="states-evs-header">EVs</th></tr>
      {rows}
    </table>
  )
}

export default Main;