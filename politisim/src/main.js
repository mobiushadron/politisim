import { React, useState, useEffect } from 'react';

function Main() {
  const data = require("./data/data.json");
  const states = data["states"];
  const parties = data["parties"];

  const [presidentialElectionStatesTable, setPresidentialElectionStatesTable] = useState(<table id="blank-states-table"></table>);
  const [presidentialElectionNationalTable, setPresidentialElectionNationalTable] = useState(<table id="blank-national-table"></table>);
  const [nationalPartisanship, setNationalPartisanship] = useState(0);
  const [presidentialElectionResults, setPresidentialElectionResults] = useState(0);

  return(
    <div id="main-div">
      <div id="national-partisanship-div">National Partisanship: {nationalPartisanship >= 0 ? 
        <span style={{color: "blue"}}>D +{Math.abs(nationalPartisanship)}</span> : <span style={{color: "red"}}>R +{Math.abs(nationalPartisanship)}</span>}
      </div>
      <button id="run-election-button" onClick={() => runElection()}>Run Election</button>
      {presidentialElectionNationalTable}
      {presidentialElectionStatesTable}
    </div>
  );

  function runElection() {
    const nationalPartisanship = Math.round(((randn_bm() * 20) - 10) * 100)/100;
  
    var electionResults = {"parties": []}
    parties.forEach(party => electionResults["parties"].push({"partyId": party.id, "evs": 0}));

    var stateResults = [];
    states.forEach(state => {
      const statewideElectionResult = getStatewideElectionResult(state, nationalPartisanship);
      const marginStyle = {color: parties[statewideElectionResult["winner"]]["color"]};
      stateResults.push(statewideElectionResult)
      electionResults["parties"][statewideElectionResult["winner"]]["evs"] += state["delegationSize"] + 2;
    });
  
    setNationalPartisanship(nationalPartisanship);
    setPresidentialElectionResults(electionResults);
    
    setPresidentialElectionStatesTable(generateStatesTable(stateResults));
    setPresidentialElectionNationalTable(generatePresidentialElectionNationalTable(electionResults));
  }

  function generateStatesTable(stateResults) {
    var rows = [];
    states.forEach(state => {
      const marginStyle = {color: parties[stateResults[state.id]["winner"]]["color"]};
      rows.push(
        <tr key={state["id"]} id={state["name"] + "-row"}>
          <td id={state["name"] + "-name"}>{state["name"]}</td>
          <td id={state["name"] + "-EVs"}>{state["delegationSize"] + 2}</td>
          <td id={state["name"] + "-margin"} style={marginStyle}>{Math.abs(stateResults[state.id]["margin"])}</td>
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

  function generatePresidentialElectionNationalTable(electionResults) {
    var rows = []
    electionResults["parties"].forEach(party => rows.push(
      <tr key={party.partyId} id={parties[party.partyId].name + "-presidential-results-row"}>
        <td style={{color: parties[party.partyId].color}} id={parties[party.partyId].name + "-name"}>{parties[party.partyId].name}</td>
        <td id={parties[party.partyId].name + "-EVs"}>{party.evs}</td>
      </tr>
    ))

    return(
      <table id="presidential-national-table">
        <tr id="presidential-national-header-row"><th id="presidential-national-party-header"></th><th id="presidential-national-evs-header"></th></tr>
        {rows}
      </table>
    );
  }
  
  function getStatewideElectionResult(state, nationalPartisanship){
    const margin = Math.round((state["PVI"] + nationalPartisanship + ((randn_bm() * 4) - 2)) * 100)/100;
    return {"winner": margin >= 0 ? 0 : 1, "margin": margin};
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
}

export default Main;