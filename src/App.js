import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      Heart Attack Predictor
      </header>
      <h4>This is a AI-powered applicatioon to predict heart attacks
        please do not take any clinical procedure or medication base on 
        this platform you should always consult with your doctor, 
        this application is made for experimental purposes only
      </h4>
      <Formulario></Formulario>
    </div>
  );
}


const Formulario = () => {
  var [message, setMessage] =  useState('');
  var [Age, setAge] = useState('');
  var [Sex, setSex] = useState('');
  var [ChestPainType, setChestPT] = useState('');
  var [RestingBP, setRestingBP ] = useState('');
  var [Cholesterol, setCholesterol] = useState('');
  var [FastingBS, setFastingBS] = useState('')
  const handleSubmit = (e)=>{
    e.preventDefault();
  }

  async function Submit(){
    let response = await fetch('https://heart-api.herokuapp.com/predict',
    {method: 'POST',
    headers: {"Content-Type": "application/json"}, 
    body:JSON.stringify({"Age":parseInt(Age), "Sex": Sex, "ChestPainType":ChestPainType, "Cholesterol": parseInt(Cholesterol), "FastingBS":parseInt(FastingBS), "RestingBP":parseInt(RestingBP)}),});
    let data = await response.json();
    if (data.prediction[1] == '1'){
      setMessage("You are maybe suffering a heart attack, please go to the closest hospital as soon as possible.");
    }
    else{
      setMessage('You look healthy, anyway checkout with your head doctor please.')
    }
  }
  return(
    <>
    
    <secction>
      
      <form  onSubmit={handleSubmit}>
           
              <div className='item'>
                <label htmlFor = 'age'> Age</label>
                <input type='text' id= 'age' name= 'age'  value = {Age} onChange={(e)=>setAge(e.target.value)}></input>
              </div>
              <div className='item'>
                <label htmlFor = 'resting blood pressure'> resting blood pressure</label>
                <input type='text' id= 'resting blood pressure' name= 'resting blood pressure'  value = {RestingBP} onChange={(e)=>setRestingBP(e.target.value)}></input>
              </div>
              <div className='item'>
                <label htmlFor = 'Cholesterol'>Cholesterol</label>
                <input type='text' id= 'Cholesterol' name= 'Cholesterol'  value = {Cholesterol} onChange={(e)=>setCholesterol(e.target.value)}></input>
              </div>
            
      </form>
    <div className='item'>
              <label for="Sex">Sex</label>
                <select name="Sex" id="Sex"  value={Sex} onChange ={(e)=>setSex(e.target.value)}>
                  <option>select option</option>
                  <option >M</option>
                  <option >F</option>
                </select>
      </div>
      <div className='item'>
          <label for="Chest pain type">Chest pain type</label>
            <select name="Chest pain type" id="Chest pain type" value = {ChestPainType} onChange={(e)=>setChestPT(e.target.value)}>
              <option>select option</option>
              <option value =  'TA' >Pain by emotial stress, being in rest</option>
              <option value = 'ATA'>squeezing, pressure, heaviness, tightness </option>
              <option value = 'ASY'>Don't feel pain in the chest </option>
            </select>
      </div>
      <div className='item'>
          <label for="Fasting BS">Blood sugar</label>
            <select name="Chest pain type" id="Chest pain type" value={FastingBS} onChange={(e)=>setFastingBS(e.target.value)}>
              <option>select option</option>
              <option value = '1'>FastingBS greater than 120 mg/dl</option>
              <option value = '0' >FastingBS less than 120 mg/dl</option>
            </select>
      </div>
      <div className = 'item'>
        <h3>
              {message}
        </h3>
      </div>
      <button className = 'btn' onClick={() => Submit()}>Submit</button>
      
    </secction>
    </>
  )
}

export default App;
