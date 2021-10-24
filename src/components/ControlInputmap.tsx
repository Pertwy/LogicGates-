import React from 'react'

interface Props {
  args: {name:string, value:string}[];
  handleDeleteControlInput: (prop:{name:string,value:string}) => void;
}

export const ControlInputmap = ({args, handleDeleteControlInput}:Props) => {
    return (
        <div>
            {args.map((input:{name:string,value:string}) => {
              return(
                <div className="row">
                  <p>{Object.keys(input)}</p>
                  <p>{Object.values(input)}</p>
                  <button onClick={()=>handleDeleteControlInput(input)}>Del</button>
                </div>
              )
            })}
        </div>
    )
}
