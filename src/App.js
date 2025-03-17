import React, {useState, useSyncExternalStore} from 'react';
import './App.css';

function App() {

  const requiredFieldValidator = (fieldName, value) => {
    if (value.length > 0) {
      return {
        hasError: false,
        message: '',
      }
    }
    return {
      hasError: true,
      message: `${fieldName} is required.`
    }
  }

  const minLengthValidator = (minLength) => (fieldName, value) => {
    if (value.length > minLength) {
      return {
        hasError: false,
        message: '',
      }
    }
    return {
      hasError: true,
      message: `${fieldName} must be at least ${minLength} characters in length.`
    }
  }

  const emailValidator = (fieldName, value) => {
    if (value.match("^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")) {
      return {
        hasError: false,
        message: '',
      }
    }

    return {
      hasError: true,
      message: `${fieldName} does not look like an email.`
    };
  }

  const [formState, setFormState] = useState({
    firstName: {
      id: 'firstName',
      label: 'First Name',
      value: '',
      validators: [
        requiredFieldValidator,
        minLengthValidator(3),
      ],
      error: {
        hasError: false,
        message: '',
      }
    },
    lastName: {
      id: 'lastName',
      label: 'Last Name',
      value: '',
      validators: [
        requiredFieldValidator
      ],
      error: {
        hasError: false,
        message: '',
      }
    },
    email: {
      id: 'email',
      label: 'Email Address',
      value: '',
      validators: [
        requiredFieldValidator,
        emailValidator,
      ],
      error: {
        hasError: false,
        message: '',
      }
    },
    password: {
      id: 'password',
      label: 'Password',
      value: '',
      validators: [
        requiredFieldValidator
      ],
      error: {
        hasError: false,
        message: '',
      }
    },
  })
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const fieldState = formState[name];
    const validators = fieldState.validators
    let validationResult = {
      hasError: false,
      message: ''
    };

    for (const validator of validators) {
      validationResult = validator(fieldState.label, value);
      if (validationResult.hasError) {
        break;
      }
    }

    // to be able to input value in the form (JavaScript construct called the construction)
    // breaking down an object, assigning to another object
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: {
        ...prevFormState[name],
        value,
        error: validationResult,
      }
    }));
    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    
    const errorAfterSubmission = {};
  
    // Iterate through formState to check each field's value
    Object.keys(formState).forEach((fieldKey) => {
      const field = formState[fieldKey];
      const value = field.value.trim();
      
      if (!value) {
        errorAfterSubmission[fieldKey] = `${field.label} cannot be empty`;
      }
    });
  
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
            
            {Object.values(formState).map(fieldState => (
                <>
                <input 
                  type="text" id={fieldState.id} name={fieldState.id} 
                  value={fieldState.value} 
                  onChange={handleInputChange} 
                  placeholder={fieldState.error.hasError ? '' : fieldState.label}
                  className={`input-field ${ fieldState.error.hasError ? 'errors' : '' }`}/>
                  {fieldState.error.hasError && <img className="error-icon" src={`${process.env.PUBLIC_URL}/images/icon-error.svg`} alt='Icon error'/>}
                  <span className='error-message'>{fieldState.error.message}</span>s
                </>
            ))}


            <button type="submit">CLAIM YOUR FREE TRIAL</button>

            <p>By clicking the button, you are agreeing to our &nbsp;<a href='https://www.frontendmentor.io'>Terms and Services</a></p> 

          </form>

        </div>

      </div>

    </div>
 
  );
}

export default App;