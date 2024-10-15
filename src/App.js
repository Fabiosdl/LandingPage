import React, {useState} from 'react';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState({
    firstName: '', /**name of the inputs */
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });

    // Setting up the validation error in the InputChange, guarantees that the error message shows up in real time
    // when the user is "changing" the form (If typing it and then leaving it blank).
  
    // Validate the input value
    if(!value.trim()) {// if input is empty
      // Custom error messages based on the field name
      let formName1 = name.charAt(0).toUpperCase();
      let formName2 = '';

      for(let i = 1; i < name.length; i++){
        if(name.charAt(i) === name.charAt(i).toUpperCase()){
          formName1 += name.substring(1,i);        
          formName2 = ' ' + name.substring(i);
        }
      }
      if(!formName2) formName1 += name.substring(1);
      setErrors({ ...errors, [name]: `${formName1} ${formName2} cannot be empty.`});
    }      
    else {
      // If no error, clear the error for the field.
      setErrors({ ...errors, [name]: ''});
    }

    /*
    ...errors: This keeps all the existing error messages intact. To avoid interfere in the other errors messages
    [name]: This dynamically updates the error for the current field (either firstName, lastName, email, or password).
    */
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //to erase all data after submission.
    
    // putting the validation form in the Submit guarantees that the app won't submit the data if
    // all the required forms are not filled in.

    const errorAfterSubmission = {};

    if (!inputValue.firstName.trim()) errorAfterSubmission.firstName = 'First Name cannot be empty';
    if (!inputValue.lastName.trim()) errorAfterSubmission.lastName = 'Last Name cannot be empty';
    if (!inputValue.email.trim()) errorAfterSubmission.email = 'Email cannot be empty';
    if (!inputValue.password.trim()) errorAfterSubmission.password = 'Password cannot be empty';

    setErrors(errorAfterSubmission);
  };

  return (
    <div className='App-container'>

      <div className='left-container'>
        
        <text>Learn to code by watching others</text>    
        <h5>
          See how experienced developers solve problems in real-time.
          Watching scripted tutorials is great, but understanding 
          how developers think is invaluable.      
        </h5>

      </div>

      <div className='right-container'>
        <a href='https://www.frontendmentor.io' className='subscription-button'>
          <b>Try it free 7 days</b> &nbsp; then $20/mo. thereafter
        </a>

        <div className='form-container'>

          <form id='registration' onSubmit={handleSubmit}>

            <input 
              type="text" id="firstName" name="firstName" 
              value={inputValue.firstName} 
              onChange={handleInputChange} 
              placeholder={ errors.firstName ? '' : 'First Name'}
              className={`input-field ${ errors.firstName ? 'errors' : '' }`}/>
            {errors.firstName && <img className="error-icon" src={`${process.env.PUBLIC_URL}/images/icon-error.svg`} alt='Icon error'/>}
            <span className='error-message'>{errors.firstName}</span>

            <input type="text" id="lastName" name="lastName"
              value={inputValue.lastName} 
              onChange={handleInputChange}
              className={`input-field ${ errors.lastName ? 'errors' : '' }`}
              placeholder={errors.lastName ? '' : 'Last Name'}/>
            {errors.lastName && <img className="error-icon" src={`${process.env.PUBLIC_URL}/images/icon-error.svg`} alt='Icon error'/>}
            <span className='error-message'>{errors.lastName}</span>

            <input type="email" id="email" name="email"  
              value={inputValue.email} 
              onChange={handleInputChange}
              className={`input-field ${ errors.email ? 'errors' : '' }`}
              placeholder={ errors.email ? "email@example.com" : "Email Address" }/>
            {errors.email && <img className="error-icon" src={`${process.env.PUBLIC_URL}/images/icon-error.svg`} alt='Icon error'/>}
            <span className='error-message'>{errors.email}</span>  

            <input type="password" id="password" name="password" 
              value={inputValue.password} 
              onChange={handleInputChange}
              className={`input-field ${ errors.password ? 'errors' : '' }`}
              placeholder={ errors.password ? '' : 'Password'}/>
            {errors.password && <img className="error-icon" src={`${process.env.PUBLIC_URL}/images/icon-error.svg`} alt='Icon error'/>}
            <span className='error-message'>{errors.password}</span>

            <button type="submit">CLAIM YOUR FREE TRIAL</button>

            <p>By clicking the button, you are agreeing to our &nbsp;<a href='https://www.frontendmentor.io'>Terms and Services</a></p> 

          </form>

        </div>

      </div>

    </div>
 
  );
}

export default App;