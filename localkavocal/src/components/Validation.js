import React from "react";

function Validation(values){
const errors = {}
if(values.email == ""){
    errors.email ="email is required"
}
if(values.firstName == ""){
    errors.firstName ="first name is required"
}
if(values.lastName == ""){
    errors.lastName ="last name is required"
}
if(values.password == ""){
    errors.password ="password is required"
}

return errors
}

export default Validation