import { legacy_createStore as createStore } from "redux";
import axios from "axios";

const  initialValue = {
    vehicleDetails:[],
    ownerName:'',
    ownerAddress:{
        street:'',
        ownerState:'',
        city:'',
        country:''
    },
    phoneNumber:'',
    modelName:'',
    makerName:'',
    colour:'',
    year:'',
    chassisNumber:''
};

function Reducer( state = initialValue,action ){

    

    switch (action.type) {

        case 'OWNERNAME':  
            return {
                ...state,
                ownerName:action.payload
            };
        
        case 'OWNERSTREET':
            return {
                ...state,
                ownerAddress:{
                    ...state.ownerAddress,
                    street:action.payload
                }
            };

        case 'OWNERSTATE':
            return {
                ...state,
                ownerAddress:{
                    ...state.ownerAddress,
                    ownerState:action.payload
                }
            };

        case 'OWNERCITY':
            return {
                ...state,
                ownerAddress:{
                    ...state.ownerAddress,
                    city:action.payload
                }
            };
        
        case 'OWNERCOUNTRY':
            return {
                ...state,
                ownerAddress:{
                    ...state.ownerAddress,
                    country:action.payload
                }
            };

        case 'PHONENUM':
            return {
                ...state,
                phoneNumber:action.payload
            };
        
        case 'MAKENAME':
            return {
                ...state,
                makerName:action.payload
            };

        case 'MAKEMODEL':
            return {
                ...state,
                modelName:action.payload
            };

        case 'COLOR':
            return {
                ...state,
                colour:action.payload
            };

        case 'YEAR':
            return {
                ...state,
                year:action.payload
            };
        
        case 'CHASSISNUMBER':
            return {
                ...state,
                chassisNumber:action.payload
            };

        case 'SUBMIT':

        axios.post( 'https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration',{
            vehicleDetails:[
                {
                ownerName:state.ownerName,
                ownerAddress:state.ownerAddress,
                phoneNumber:state.phoneNumber,
                modelName:state.modelName,
                makerName:state.makerName,
                colour:state.colour,
                year:state.year,
                chassisNumber:state.chassisNumber
                }
            ]
        });


            return {
                ...state,
                vehicleDetails:[],
                ownerName:'',
                ownerAddress:{
                street:'',
                ownerState:'',
                city:'',
                country:''
                },
                phoneNumber:'',
                modelName:'',
                makerName:'',
                colour:'',
                year:'',
                chassisNumber:''
            };
        
        case 'DELETE':
            console.log({
                ...state,
                vehicleDetails:state.vehicleDetails.filter( index => index !== action.payload  )
            });
            return {
                ...state,
                vehicleDetails:state.vehicleDetails.filter( index => index !== action.payload  )
            }
    
        default:
            return state;
    };

};


export const store = createStore(Reducer);