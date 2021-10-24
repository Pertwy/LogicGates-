import React, { useState } from 'react'

interface Props {
  handleSaveControlInput: (constrolInputName:string, controlInputValue:string) => void;
  setOperator: (title:string) => void;
}


export const ControlInput = ({handleSaveControlInput}:Props) => {
    
    const inputs:string[] = ["True", "False", "x"]
    const [constrolInputName, setControlInputName] = useState<string>("")
    const [controlInputValue, setControlInputValue] = useState<string>("True")

    function handleSave(){
        handleSaveControlInput( constrolInputName, controlInputValue)
        setControlInputName("")
    }
    
    return (
        <div>
            <h4>Enter control inputs</h4>

            <div>
                <input placeholder="name" value={constrolInputName} onChange={(e)=>setControlInputName(e.target.value)}/>
                
                <select value={controlInputValue} onChange={e => setControlInputValue(e.target.value)} >
                    {inputs.map((input) => <option value={input}>{input}</option>)}
                </select >

                <button onClick={()=>handleSave()}>Save</button>
            </div>  

        </div>
    )
}
