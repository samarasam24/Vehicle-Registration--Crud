export const OwnerName = (e) => {
    
     return {
        type:"OWNERNAME",
        payload:e.target.value
     };
};

export const OwnerStreet = (e) => {

    return {
        type:"OWNERSTREET",
        payload:e.target.value
    };

};

export const OwnerState = (e) => {

    return {
        type:'OWNERSTATE',
        payload:e.target.value
    };
};

export const OwnerCity = (e) => {

    return {
        type:"OWNERCITY",
        payload:e.target.value
    };
};

export const OwnerCountry = (e) => {
    
    return {
        type:'OWNERCOUNTRY',
        payload:e.target.value
    };
};

export const PhoneNum = (e) => {
     
    return {
        type:'PHONENUM',
        payload:e.target.value
    };
};

export const MakeName = (e) => {

    return {
        type:'MAKENAME',
        payload:e.target.value
    };
};

export const MakeModel = (e) => {

    return {
        type:'MAKEMODEL',
        payload:e.target.value
    };
};

export const Color = (e) => {

    return {
        type:'COLOR',
        payload:e.target.value
    };
};

export const Year = (e) => {

    return {
        type:'YEAR',
        payload:e.target.value
    };
};

export const ChassisNumber = (e) => {

    return {
        type:'CHASSISNUMBER',
        payload:e.target.value
    };
};

export const HandleSubmit = (e) => {

    e.preventDefault();
    return {
        type:"SUBMIT"
    };
};

export const VehicleDelete = (id) => { 
    
    return {
        type:'DELETE',
        payload:id
    };
};