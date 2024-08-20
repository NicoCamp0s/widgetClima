
import React,{useState} from 'react'

const Form = ({newLocation}) => {
  const [city, setCity] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({city});
    if (city === '' || !city) return;

    newLocation(city);
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='input-group mb-3 mx-auto'>
          <input type="text" className="form-control" placeholder="ciudad" onChange={(e) => setCity(e.target.value)}/>
          <button type="submit" className="btn btn-primary input-group-text">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default Form