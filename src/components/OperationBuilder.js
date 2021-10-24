import React, {useState, useEffect} from 'react'
import {OperatorButton} from './OperatorButton.tsx'

export default function OperationBuilder({args, setArgs, logicGateId, handleSaveControlInput}) {

    const [input1, setInput1] = useState({})
    const [input2, setInput2] = useState({})
    const [operator, setOperator] = useState("")
    const [LGOutput, setLGOutput] = useState("")
    const inputTransfer = {"True":true, "False":false, "x":"x"}

    useEffect(() => {
       
        if(Object.keys(input1).length !== 0 && Object.keys(input2).length !== 0  && operator !==""){

            let inputArray = [inputTransfer[Object.values(input1)[0]], inputTransfer[Object.values(input2)[0]]]

            SaveOperation(solveOperation(operator, inputArray))

            if (args.filter(arg => Object.keys(arg)[0] === "logicgate"+logicGateId+"output").length > 0){
                let newArgs = args.filter(arg => Object.keys(arg)[0] !== "logicgate"+logicGateId+"output")
                let tempObj = {}
                tempObj["logicgate"+logicGateId+"output"] = TransformOperation(solveOperation(operator, inputArray))
                newArgs.push(tempObj)
                setArgs(newArgs)
            }
            else {
                let objKey = "logicgate"+logicGateId.toString()+"output"
                handleSaveControlInput(objKey, TransformOperation(solveOperation(operator, inputArray)))
            }
        }
            
    }, [input1, input2, operator])

    const not = a => !a;
    const and = (a, b) => a && b;
    const nand = (a, b) => not(a && b);
    const or = (a, b) => a || b;
    const nor = (a, b) => not(a || b);
    const xor = (a, b) => a ^ b;
    const xnor = (a, b) => not(a ^ b);


    function solveOperation(operation, args){
        console.log(args)
  
        if (operation === 'and') return evaluateOperation(and, args);
        if (operation === 'nand') return evaluateOperation(nand, args);
        if (operation === 'or') return evaluateOperation(or, args);
        if (operation === 'nor') return evaluateOperation(nor, args);
        if (operation === 'xor') return evaluateOperation(xor, args);
        if (operation === 'xnor') return evaluateOperation(xnor, args);
        if (operation === 'not') {
            let in1 = args[0]
            return (in1 === 'x') ? 'x' : not(in1);
        }
    }

    const evaluateOperation = (logicFn, args) => {
        const in1 = args[0];
        const in2 = args[1];
        let output = (in1 === 'x' || in2 === 'x') ? 'x' : logicFn(in1, in2);
        return output;
    }

    function TransformOperation(logicGateOutput){
        console.log("transform")
        if (logicGateOutput === false) return("False")
        if (logicGateOutput === true) return("True")
        if (logicGateOutput === "x") return("x")
    }
    function SaveOperation(logicGateOutput){
        console.log("save")
        if (logicGateOutput === false) setLGOutput("False")
        if (logicGateOutput === true) setLGOutput("True")
        if (logicGateOutput === "x") setLGOutput("x")
    }

    return (
        <div className="logic-gate">
            <h4>Logic Gate {logicGateId}</h4>

            <section>
                <h5>Select Operation</h5>
                
                <OperatorButton title="and" setOperator={setOperator} setInput2={setInput2}/>
                <OperatorButton title="or" setOperator={setOperator} setInput2={setInput2}/>
                <OperatorButton title="nand" setOperator={setOperator} setInput2={setInput2}/>
                <OperatorButton title="nor" setOperator={setOperator} setInput2={setInput2}/>
                {/* <OperatorButton title="xor" setOperator={setOperator} setInput2={setInput2}/> */}
                <OperatorButton title="xnor" setOperator={setOperator} setInput2={setInput2}/>
                <OperatorButton title="not" setOperator={setOperator} setInput2={setInput2}/>
            </section>

            <section>
                <h5>Select inputs</h5>
                <div>
                    <label>Input 1</label>
                    <select value={Object.values(input1)[0]} onChange={e => setInput1(args[e.target.value])} >
                        <option value={""}></option>
                        {args.map((address, key) => <option value={key}>{Object.keys(address)}</option>)}
                    </select >

                    {(operator != "not") &&(
                        <>
                            <label>Input 2</label>
                            <select value={Object.keys(input2)[0]} onChange={e => setInput2(args[e.target.value])} >
                                <option value={""}></option>
                                {args.map((address, key) => <option value={key}>{Object.keys(address)}</option>)}
                            </select >
                        </>
                    )}
                </div>
            </section>
            
            <section>
                <div className="row">
                    <h4 className="input1">{Object.keys(input1)[0]}  </h4>
                    <h4 className="input2">{Object.keys(input2)[0]}  </h4>
                    <h4 className="operator">{operator}  </h4>
                </div>
            </section>
            
            <section className="row">
                <h4>Output = </h4>
                <h4>{LGOutput}</h4>
            </section>

        </div>
    )
}
