import {useState, useEffect} from 'react'
// import {OperatorButton} from './OperatorButton'

// interface Props {
//   args: {name:string, value:any}[];
//   setArgs: ([]) => void;
//   logicGateId: number;
//   handleSaveControlInput: (name:string, value:string) => void; //issue 1
// }
// interface Operation{
//     a:boolean;
//     b:boolean;
// }
// interface EvaluateOperationInterface{
//     logicFn:(in1:boolean,in2:boolean) => boolean;
//     args:(boolean|"x")[];
// }
// interface solveOperationInterface{
//     operation:string;
//     args:(boolean|"x")[];
// }
// interface inputTransfeInterface{
//     True:boolean, 
//     False:boolean, 
//     x:"x"
// }

// export const OperationBuilder = ({args, setArgs, logicGateId, handleSaveControlInput}:Props) => {

//     const [input1, setInput1] = useState<{name:string, value:"True"|"False"|"x"}|{}>({})
//     const [input2, setInput2] = useState<{name:string, value:"True"|"False"|"x"}|{}>({})
//     const [operator, setOperator] = useState<string>("and")
//     const [LGOutput, setLGOutput] = useState<string>("")
//     const inputTransfer:inputTransfeInterface = {"True":true, "False":false, "x":"x"}

//     useEffect(() => {

//         if(Object.keys(input1).length !== 0 && Object.keys(input2).length !== 0  && operator !==""){

//             let inputArray:boolean[] = [inputTransfer[Object.values(input1)[0]], inputTransfer[Object.values(input2)[0]]]

//             SaveOperation(solveOperation(operator, inputArray))

//             if (args.filter((arg:{}) => Object.keys(arg)[0] === "logicgate"+logicGateId+"output").length > 0){
//                 let newArgs = args.filter(arg => Object.keys(arg)[0] !== "logicgate"+logicGateId+"output")
//                 let tempObj:any = {}
//                 tempObj["logicgate"+logicGateId+"output"] = TransformOperation(solveOperation(operator, inputArray))
//                 newArgs.push(tempObj)
//                 setArgs(newArgs)
//             }
//             else {
//                 let objKey = "logicgate"+logicGateId.toString()+"output"
//                 handleSaveControlInput(objKey, TransformOperation(solveOperation(operator, inputArray)))
//             }
//         }

//     }, [input1, input2, operator])


//     function solveOperation({operation, args}:solveOperationInterface):any{
  
//         if (operation === 'and') return evaluateOperation(and, args);
//         if (operation === 'nand') return evaluateOperation(nand, args);
//         if (operation === 'or') return evaluateOperation(or, args);
//         if (operation === 'nor') return evaluateOperation(nor, args);
//         // if (operation === 'xor') return evaluateOperation(xor, args);
//         // if (operation === 'xnor') return evaluateOperation(xnor, args);
//         if (operation === 'not') {
//             let in1 = args[0]
//             return (in1 === 'x') ? 'x' : not(in1);
//         }
//     }

//     const evaluateOperation = ({logicFn, args}:EvaluateOperationInterface):(boolean|string) => {
//         const in1 = args[0];
//         const in2 = args[1];
//         let output = (in1 === 'x' || in2 === 'x') ? 'x' : logicFn(in1, in2);
//         return output;
//     }

//     function not(a:boolean):boolean{return !a};
//     function and({a, b}:Operation):boolean {return a && b};
//     function nand({a, b}:Operation):boolean {return not(a && b)};
//     function or({a, b}:Operation):boolean {return a || b};
//     function nor({a, b}:Operation):boolean {return not(a || b)};
//     // function xor({a, b}:Operation):boolean {return a ^ b};
//     // function xnor({a, b}:Operation):boolean {return not(a ^ b)};


//     function TransformOperation(logicGateOutput:boolean|"x"){
//         if (logicGateOutput === false) return "False"
//         if (logicGateOutput === true) return "True"
//         if (logicGateOutput === "x") return "x"
//     }
//     function SaveOperation(logicGateOutput:boolean|"x"){
//         if (logicGateOutput === false) setLGOutput("False")
//         if (logicGateOutput === true) setLGOutput("True")
//         if (logicGateOutput === "x") setLGOutput("x")
//     }

//     return (
//         <div className="logic-gate">
//             <h4>Logic Gate {logicGateId}</h4>

//             <section>
//                 <h5>Select Operation</h5>
                
//                 <OperatorButton title="and" setOperator={setOperator} setInput2={setInput2}/>
//                 <OperatorButton title="or" setOperator={setOperator} setInput2={setInput2}/>
//                 <OperatorButton title="nand" setOperator={setOperator} setInput2={setInput2}/>
//                 <OperatorButton title="nor" setOperator={setOperator} setInput2={setInput2}/>
//                 {/* <OperatorButton title="xor" setOperator={setOperator} setInput2={setInput2}/> */}
//                 {/* <OperatorButton title="xnor" setOperator={setOperator} setInput2={setInput2}/> */}
//                 <OperatorButton title="not" setOperator={setOperator} setInput2={setInput2}/>
//             </section>

//             <section>
//                 <h5>Select inputs</h5>
//                 <div>
//                     <label>Input 1</label>
//                     <select value={Object.values(input1)[0]} onChange={(e:any) => setInput1(args[e.target.value])} >
//                         <option value={""}></option>
//                         {args.map((arg:{}, key:number) => <option value={key}>{Object.keys(arg)}</option>)}
//                     </select >

//                     {(operator != "not") &&(
//                         <>
//                             <label>Input 2</label>
//                             <select value={Object.keys(input2)[0]} onChange={(e:any) => setInput2(args[e.target.value])} >
//                                 <option value={""}></option>
//                                 {args.map((arg:{}, key:number) => <option value={key}>{Object.keys(arg)}</option>)}
//                             </select >
//                         </>
//                     )}
//                 </div>
//             </section>
            
//             <section>
//                 <div className="row">
//                     <h4 className="input1">{Object.keys(input1)[0]}  </h4>
//                     <h4 className="input2">{Object.keys(input2)[0]}  </h4>
//                     <h4 className="operator">{operator}  </h4>
//                 </div>
//             </section>

//             <button onClick={()=>console.log(typeof {})}>Calculate</button>
            
//             <section className="row">
//                 <h4>Output = </h4>
//                 <h4>{LGOutput}</h4>
//             </section>

//         </div>
//     )
// }
