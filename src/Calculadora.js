import React, { useState, useReducer, useEffect, useRef} from "react";
import { reducer } from "./reducer";

export const Calculadora = () => {
    
    const initialState = {
        number1: "",
        number2: "",
        changeNumber: false,
        operacion: "",
    }
    
    const [number, setNumber] = useState(initialState);

    const inputRef = useRef(0)

    const { number1, number2, changeNumber, operacion } = number;

    const [result, dispatch] = useReducer(reducer, null);


    useEffect(() => {
        if (!changeNumber){
            inputRef.current.value = number1;
        } else{
            inputRef.current.value = number2;
        }
    }, [number1, number2, changeNumber])

    useEffect(() => {
        if(result){
            //en este SetNumber saco la propiedad "changeNumber" para que me pueda mostrar el resultado, porque sino se triggea el useEffect de arriba y me muestra el number2 en el input.
            setNumber({ number1 : result, number2 : "", operacion: "" });
        }

        inputRef.current.value = result;
    }, [result])

    
    const handleClick = ({ target }) => {
        if (!changeNumber) {
            setNumber({
                ...number,
                number1: number1.concat(target.value),
            });
        } else {
            setNumber({
                ...number,
                number2: number2.concat(target.value),
            });
        }
    };

    const handleOperacion = ({ target }) => {
        setNumber({ ...number, changeNumber: true, operacion: target.name });
    };

    const handleResultado = () => {
        dispatch({
            type: operacion,
            payload: { number1, number2 },
        });

        // setNumber({ ...number, changeNumber: false, operacion: "" });
        // setNumber({ ...number, number1 : result});
    };

    const handleClear = () => {
        setNumber(initialState);
        dispatch({type : "reset", payload : result})
    }

    return (
        <>
            <div className="calculadora">
                <input
                    className="input"
                    placeholder="0"
                    ref = {inputRef}
                                   
                    // value={changeNumber ? number2 : number1}
                />

                <button onClick={handleClear} className="clear">
                    Clear
                </button>
                <button onClick={handleResultado} className="equal">
                    =
                </button>
                <button onClick={handleClick} value={7} className="siete numero">
                    7
                </button>
                <button onClick={handleClick} value={8} className="ocho numero">
                    8
                </button>
                <button onClick={handleClick} value={9} className="nueve numero">
                    9
                </button>
                <button
                    onClick = {handleOperacion}
                    className="plus"
                    name="sumar"
                >
                    +
                </button>
                <button onClick={handleClick} value={4} className="cuatro numero">
                    4
                </button>
                <button onClick={handleClick} value={5} className="cinco numero">
                    5
                </button>
                <button onClick={handleClick} value={6} className="seis numero">
                    6
                </button>
                <button
                    onClick = {handleOperacion}
                    className="minus"
                    name="restar"
                >
                    -
                </button>
                <button onClick={handleClick} value={1} className="uno numero">
                    1
                </button>
                <button onClick={handleClick} value={2} className="dos numero">
                    2
                </button>
                <button onClick={handleClick} value={3} className="tres numero">
                    3
                </button>
                <button
                    onClick = {handleOperacion}
                    className="multiply"
                    name="multiplicar"
                >
                    x
                </button>
                <button onClick={handleClick} value={0} className="cero numero">
                    0
                </button>
                <button
                    onClick = {handleOperacion}
                    className="divide"
                    name="dividir"
                >
                    /
                </button>
            </div>
        </>
    );
};
