import './App.css';
import React, {useState} from 'react';
import {ControlInput} from './components/ControlInput';
import {ControlInputmap} from './components/ControlInputmap';
import LogicGate from './components/OperationBuilder.js';


function App() {

  const [args, setArgs] = useState<{name:string, value:string}[]>([])
  const [logicGates, setLogicGates] = useState<number[]>([])

  function handleSaveControlInput(name:string, value:string){
    let newObj:any = {}
    newObj[name]=value 
    setArgs(args => [...args, newObj])
  }

  function handleDeleteControlInput(prop:{name:string,value:string}){ setArgs(args.filter(arg => arg != prop))}

  function handleAddLogicGate(){ setLogicGates(logicGates => [...logicGates, logicGates.length+1])}


  return (
    <div className="App">
      <h1>Logic gate maker</h1>
      <div className="my-app">

        <div>
          <ControlInput handleSaveControlInput={handleSaveControlInput} setOperator={function (title: string): void {
            throw new Error('Function not implemented.');
          } }/>
          <ControlInputmap args={args} handleDeleteControlInput={handleDeleteControlInput}/>
        </div>

        <div>
          {logicGates.map(logicGate =>{
            return <LogicGate args={args} setArgs={setArgs} logicGateId={logicGate} handleSaveControlInput={handleSaveControlInput}/>
          })}
          <button onClick={()=>handleAddLogicGate()}>Add Logic Gate</button>
        </div>


      </div>

    </div>
  );
}

export default App;
