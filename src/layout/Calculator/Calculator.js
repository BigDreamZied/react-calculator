
import '../../styles/styles.css'
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';
import {useState} from "react";

const Calculator = () => {
    const [state,setState]=useState({
        equation: '',
        result: 0
    })
    const clear =()=> {
        setState({equation: '', result: 0});
    }
    const onButtonPress = event => {
        let equation = state.equation;
        const pressedButton = event.target.innerHTML;
        if (pressedButton === 'C') return clear();
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') equation += pressedButton;
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) equation += ' ' + pressedButton + ' ';
        else if (pressedButton === '=') {
            try {
                // eslint-disable-next-line no-eval
                const evalResult = eval(equation);
                const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
                setState((prevState) => ({...prevState,result:result}));

            } catch (error) {
                alert('Invalid Mathematical Equation');
            }
        }
        else {
            equation = equation.trim();
            equation = equation.substr(0, equation.length - 1);
        }

        setState((prevState) => ({...prevState,equation: equation}));
    }

return(
    <div className="calculator">
        <Screen equation={state.equation} result={state.result}/>
        <Keypad onButtonPress={onButtonPress} />
    </div>
);}
export default Calculator;
