 export const OwnerName = (e) => (
    {
        type:"OWNERNAME",
        payload:e.target.value
    }
);

export const OwnerStreet = (e) => (
    {
        type:"OWNERSTREET",
        payload:e.target.value
    }
);

export const OwnerState = (e) => (
    {
        type:'OWNERSTATE',
        payload:e.target.value
    }
);

export const OwnerCity = (e) => (
    {
        type:"OWNERCITY",
        payload:e.target.value
    }
);

export const OwnerCountry = (e) => (
    {
        type:'OWNERCOUNTRY',
        payload:e.target.value
    }
);

export const PhoneNum = (e) => (
    {
        type:'PHONENUM',
        payload:e.target.value
    }
);

export const MakeName = (e) => (
    {
        type:'MAKENAME',
        payload:e.target.value
    }
);

export const MakeModel = (e) => (
    {
        type:'MAKEMODEL',
        payload:e.target.value
    }
);

export const Color = (e) => (
    {
        type:'COLOR',
        payload:e.target.value
    }
);

export const Year = (e) => (
    {
        type:'YEAR',
        payload:e.target.value
    }
);

export const ChassisNumber = (e) => (
    {
        type:'CHASSISNUMBER',
        payload:e.target.value
    }
);

export const HandleSubmit = (e) => {
 
    e.preventDefault();
    return {
        type:"SUBMIT"
    };       
         
};


export const ResetForm = (e) => {

    e.preventDefault();
    return {
        type:'RESET'
    };

};

export const VehicleDelete = (id) => (
    {
        type:'DELETE',
        payload:id
    }
);

export const setInitialData = (data) => (
    {
        type: 'SET_INITIAL_DATA',
        payload: data
    }
);

export const updateVehicle = (vehicle) => (
    {
        type: 'UPDATE_VEHICLE',
        payload: vehicle
    }
); 