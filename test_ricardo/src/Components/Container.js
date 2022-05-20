import React,{useState} from 'react'
import List from './List'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Container({setUser}) {
    const [userID,setUserID] = useState("");
    const [data,setData] = useState({data: []});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async ()=>{
        setIsLoading(true);

        if(userID.length<4){
            setErr("USUARIO DEBE SER MINIMO DE 4 CARACTERES");
            setIsLoading(false);
            setData({data: []})}
        else if(userID==="iseijasunow"){
            setErr("USUARIO NO PUEDE SER “iseijasunow”");
            setIsLoading(false);
            setData({data: []})}
        else{
            setErr('');
            try {
                const response = await fetch('https://api.github.com/search/users?q='+userID, {
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }

                const result = await response.json();

                console.log('first result is: ', JSON.stringify(result, null, 4));

                setData({data:{...result}});

                console.log('result is: ', JSON.stringify(data, null, 4));
            } catch (err) {
                setErr(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    }
  return (
      <>
    <Form>
        <Form.Group className="mb-3" controlId="githubSearch">
            <Form.Label>Github Search</Form.Label>
            <Form.Control type="text" placeholder="Ingrese Usuario" onChange={(e)=>{
                setUserID(e.target.value);
            }}/>
        </Form.Group>
        <Button variant="primary" onClick={handleClick}>
            Buscar
        </Button>
    </Form>
    <br />
    {isLoading && <h2>Loading...</h2>}
    <br />
    {err && <h2>{err}</h2>}
    {data.data && <List setUser={setUser} data={data.data.items}/>}

    </>
  )
}

export default Container