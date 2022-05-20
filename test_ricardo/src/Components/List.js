import React, { useState,useEffect } from 'react'

function List({data,setUser}) {
    const [list,setList] = useState(null); 
    const [select,setSelect] = useState(null);
    
    useEffect(() => {
        const redux = data && data.slice(0, 10);
        const aux = redux && redux.map(person => 
            <div key={person.id} className="App-link" onClick={()=>{
                setSelect(person.id);
            }}>
                <p>User:{person.login} ID:{person.id}</p>
                <br />
            </div>
        );

        setList(aux);
    
    }, [data])

    useEffect(() => {
        if(select){
            const aux =  data && data.filter((person)=>person.id===select);


            const auxDiv = aux && aux.map(person => 
                <div key={person.id}>
                    <h4>User:{person.login} ID:{person.id}</h4>
                    <br />
                </div>
            );
            
            setList(auxDiv);
            setUser(aux[0]);
        }
    
    }, [select])
    
  return (
    <>{list}</>
  )
}

export default List