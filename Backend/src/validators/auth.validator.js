const  loginUserValidator=(params)=> {
    const requiredFields = ["email", "password"];
    let isValid = true;
    let errorMessage = "";
    if (!requiredFields.every((field) => (Object.keys(params).includes(field)))) {
      isValid = false;
      errorMessage += "Mandatory fields are missing.";
    }
    return { isValid, errorMessage, params };
  }
  
  const registerUserValidator=(params)=> {
    const requiredFields = ["email", "password", "name"];
    let isValid = true;
    let errorMessage = "";
    if (!requiredFields.every((field) => (Object.keys(params).includes(field)))) {
      isValid = false;
      errorMessage += "Mandatory fields are missing.";
    }
      if (params.email&&!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(params.email)) {
        isValid = false;
        errorMessage += "Given email is not valid";
      }
    return { isValid, errorMessage, params };
  }
  
  module.exports = {
    loginUserValidator,
    registerUserValidator,
  };