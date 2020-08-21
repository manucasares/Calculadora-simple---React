
export const reducer = (state, action) => {

    //resuelve el bug de que crashea cuando apretas el "Clear" 2 o + veces y el action.payload es null
    if(!action.payload){
        return state;
    }

    let { number1, number2 } = action.payload;

    number1 = Number(number1);
    number2 = Number(number2);


    switch (action.type) {

        case "sumar":
            return number1 + number2;
        case "restar":
            return number1 - number2;
        case "multiplicar":
            return number1 * number2;
        case "dividir":
            return number1 / number2;
        case "reset":
            return null;    

        default:
            return state;
    }
};
