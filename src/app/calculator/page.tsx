"use client"
import React, { useState } from 'react'
import { evaluate } from 'mathjs';
const Calculator = () => {
    const buttons = [
        ['1', '2', '3', '*'],
        ['4', '5', '6', '/'],
        ['7', '8', '9', '+'],
        ['0', '=', '=', '-']
    ]


    const [val, setVal] = useState('');
    const[output ,setOutput]=useState("")
    function buttonHandler(btn:string){
if(btn=='='){
    const result=evaluate(val);
    setOutput(result);
    return   setVal(" ")
}

setVal((prev)=> prev + btn);
    }



    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <div className='flex flex-col justify-center items-center h-1/2 w-1/2 bg-slate-600'>
                <div className='h-1/3 w-full '>
                <div>
    {output}
</div>
<input type="text" className='bg-white w-full h-full text-black text-right ' value={val}/>


                </div>
                <div className='flex  justify justify-between items-center h-2/3 w-full m-1 p-2  '>
                    {
                        buttons.map((key, indx) => (
                            <div className='' key={indx}>
                                {
                                    key.map((btn, i) => (
                                        <div className='' key={i}>
                                            <button
onClick={()=>buttonHandler(btn)}
                                            className='bg-blue-700 p-1 m-1  w-20 hover:scale-110 transform transition duration-300 '>{btn}</button>
                                        </div>
                                    ))
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Calculator


// 'use client'

// import React, { useReducer } from 'react'

// // --- TYPES ---
// type State = {
//   currentOperand: string;
//   previousOperand: string | null;
//   operation: string | null;
//   overwrite: boolean; // Flag to check if we should clear screen on next typing
// }

// type Action =
//   | { type: 'ADD_DIGIT'; payload: string }
//   | { type: 'CHOOSE_OPERATION'; payload: string }
//   | { type: 'CLEAR' }
//   | { type: 'DELETE_DIGIT' }
//   | { type: 'EVALUATE' }

// // --- CALCULATION ENGINE ---
// const evaluate = (state: State): string => {
//   const prev = parseFloat(state.previousOperand || "")
//   const current = parseFloat(state.currentOperand)

//   if (isNaN(prev) || isNaN(current)) return ""

//   let computation = 0
//   switch (state.operation) {
//     case "+": computation = prev + current; break
//     case "-": computation = prev - current; break
//     case "*": computation = prev * current; break
//     case "÷":
//       if (current === 0) return "Error" // Prevent division by zero
//       computation = prev / current; break
//   }
//   return computation.toString()
// }

// // --- REDUCER (The Brain) ---
// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'ADD_DIGIT':
//       if (state.overwrite) {
//         return { ...state, currentOperand: action.payload, overwrite: false }
//       }
//       if (action.payload === "0" && state.currentOperand === "0") return state // Prevent "000"
//       if (action.payload === "." && state.currentOperand.includes(".")) return state // Prevent "1.2.3"
//       return { ...state, currentOperand: state.currentOperand + action.payload }

//     case 'CHOOSE_OPERATION':
//       // Agar kuch type hi nahi kiya hai, toh operation ignore karo
//       if (state.currentOperand === "" && state.previousOperand === null) return state

//       // Agar sirf previous operand hai aur naya operator dabaya hai (operator change karna)
//       if (state.currentOperand === "") {
//         return { ...state, operation: action.payload }
//       }

//       // Normal case: pehli baar operator daba rahe hain
//       if (state.previousOperand === null) {
//         return {
//           ...state,
//           operation: action.payload,
//           previousOperand: state.currentOperand,
//           currentOperand: ""
//         }
//       }

//       // Chaining operations (e.g. 5 + 5 + ... pehle evaluate karo)
//       return {
//         ...state,
//         previousOperand: evaluate(state),
//         operation: action.payload,
//         currentOperand: "",
//       }

//     case 'CLEAR':
//       return { currentOperand: "", previousOperand: null, operation: null, overwrite: false }

//     case 'DELETE_DIGIT':
//       if (state.overwrite) {
//         return { ...state, overwrite: false, currentOperand: "" }
//       }
//       if (state.currentOperand === "") return state
//       return { ...state, currentOperand: state.currentOperand.slice(0, -1) }

//     case 'EVALUATE':
//       if (state.operation == null || state.currentOperand === "" || state.previousOperand === null) {
//         return state
//       }
//       return {
//         ...state,
//         overwrite: true,
//         previousOperand: null,
//         operation: null,
//         currentOperand: evaluate(state),
//       }

//     default:
//       return state
//   }
// }

// // --- COMPONENT UI ---
// export default function Calculator() {
//   const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {
//     currentOperand: "",
//     previousOperand: null,
//     operation: null,
//     overwrite: false,
//   })

//   return (
//     <div className="max-w-xs mx-auto mt-10 p-5 bg-gray-900 rounded-2xl shadow-2xl">
//       {/* Output Screen */}
//       <div className="bg-gray-800 text-right p-4 rounded-xl mb-4 h-24 flex flex-col justify-end break-all shadow-inner">
//         <div className="text-gray-400 text-sm h-6">
//           {previousOperand} {operation}
//         </div>
//         <div className="text-white text-4xl font-semibold tracking-wider">
//           {currentOperand || "0"}
//         </div>
//       </div>

//       {/* Keypad Grid */}
//       <div className="grid grid-cols-4 gap-3">
//         <button onClick={() => dispatch({ type: 'CLEAR' })} className="col-span-2 bg-red-500 hover:bg-red-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">AC</button>
//         <button onClick={() => dispatch({ type: 'DELETE_DIGIT' })} className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 rounded-xl font-bold text-lg">DEL</button>
//         <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '÷' })} className="bg-amber-500 hover:bg-amber-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">÷</button>

//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '7' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">7</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '8' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">8</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '9' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">9</button>
//         <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '*' })} className="bg-amber-500 hover:bg-amber-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">×</button>

//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '4' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">4</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '5' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">5</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '6' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">6</button>
//         <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '-' })} className="bg-amber-500 hover:bg-amber-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">-</button>

//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '1' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">1</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '2' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">2</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '3' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">3</button>
//         <button onClick={() => dispatch({ type: 'CHOOSE_OPERATION', payload: '+' })} className="bg-amber-500 hover:bg-amber-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">+</button>

//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '.' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">.</button>
//         <button onClick={() => dispatch({ type: 'ADD_DIGIT', payload: '0' })} className="bg-gray-700 hover:bg-gray-600 transition-colors text-white p-4 rounded-xl font-bold text-lg">0</button>
//         <button onClick={() => dispatch({ type: 'EVALUATE' })} className="col-span-2 bg-blue-500 hover:bg-blue-400 transition-colors text-white p-4 rounded-xl font-bold text-lg">=</button>
//       </div>
//     </div>
//   )
// }