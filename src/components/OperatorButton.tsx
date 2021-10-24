import React from 'react'

interface Props {
  title: string;
  setOperator: (title:string) => void;
  setInput2: ({}) => void;
}

export const OperatorButton = ({title, setOperator, setInput2}:Props) => {

    function HandleClick(title:string){
        if(title === "Not"){
            setInput2({})
        }
        setOperator(title)
    }

    return (
        <button onClick={()=>HandleClick(title)}>{title}</button>
    )
}
