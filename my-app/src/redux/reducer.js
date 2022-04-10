const initialState = {
    todoList : []
}


export const todoReducer = (state = initialState, {type,payload}) => {
    switch(type)
    {
        case "STORE_DATA" : 
                           return {
                               ...state,
                               todoList : [...payload]
                           }


        default : return state;
    }
}