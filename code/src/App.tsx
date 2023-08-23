import React, {useState} from 'react';
import './App.css';

function App() {
    const [formula, setFormula] = useState("");
    const [result, setResult] = useState("0");
    const [dot, setDot] = useState(false);
    const [isOperator, setIsOperator] = useState(false);

    const clear = () => {
        setIsOperator(false);
        setFormula("");
        setResult("0");
        setDot(false);
    }

    const pressDigital = (digital: string) => {
        setIsOperator(false);
        setFormula(result !== "0" ? formula + digital : digital);
        setResult(result === "0" ? digital : result + digital);
    }

    const addDot = () => {
        if (!dot) {
            setIsOperator(false);
            setDot(true);
            setResult(result + ".");
            setFormula(formula === "" ? "0." : formula + ".");
        }
    }

    const operator = (sign: string) => {
        if (result && !formula) {
            setFormula(result + " " + sign)
            setResult(sign)
            setDot(false)
            return;
        }

        if (sign === "-") {
            setResult(sign);
            setFormula(formula + " " + sign);
            setDot(false);
            return
        }

        if (isOperator) {
            if (formula.slice(-1) === "-") {
                setResult(sign);
                setFormula(formula.slice(0, -3) + " " + sign);
                setDot(false);
                return
            }
        }

        if (isOperator) {
            if (formula.slice(-1) !== sign) {
                setResult(sign);
                setFormula(formula.slice(0, -1) + " " + sign);
            }
        } else {
            setDot(false);
            setResult(sign);
            setFormula(formula + " " + sign);
        }
        setIsOperator(true);
    }

    const getResult = () => {
        if (!formula) {
            setResult("0");
            setIsOperator(false);
            setDot(false);
            return;
        }

        // Define a safeEval function to evaluate the formula
        const safeEval = (expression:string) => {
            try {
                return String(eval(expression));
            } catch (error) {
                return "Error"; // Handle errors gracefully
            }
        };

        const lastCharacter = formula.slice(-1);
        const lastCharacterAsNumber = parseInt(lastCharacter);

        if (isNaN(lastCharacterAsNumber)) {
            setFormula("");
            setResult(safeEval(formula.slice(0, -1))); // Use safeEval instead of eval
            setIsOperator(false);
            setDot(false);
            return;
        }

        setIsOperator(false);
        setDot(false);
        const newResult = formula ? safeEval(formula) : "0"; // Use safeEval instead of eval
        setFormula("");
        setResult(newResult);
    };


    return (
        <div className="App">
            <div className="container">
                <div className="screen">
                    <div className="formula data">
                        {formula
                            .split("")
                            .filter(item => item !== " ")}
                    </div>
                    <div className="result data" id="display">{result}</div>
                </div>
                <div className="pads">
                    <div className="pad ac" id="clear" onClick={() => clear()}>AC</div>
                    <div className="pad operator" id="divide" onClick={() => operator("/")}>/</div>
                    <div className="pad operator" id="multiply" onClick={() => operator("*")}>X</div>
                    <div className="pad" id="seven" onClick={() => pressDigital("7")}>7</div>
                    <div className="pad" id="eight" onClick={() => pressDigital("8")}>8</div>
                    <div className="pad" id="nine" onClick={() => pressDigital("9")}>9</div>
                    <div className="pad operator" id="subtract" onClick={() => operator("-")}>-</div>
                    <div className="pad" id="four" onClick={() => pressDigital("4")}>4</div>
                    <div className="pad" id="five" onClick={() => pressDigital("5")}>5</div>
                    <div className="pad" id="six" onClick={() => pressDigital("6")}>6</div>
                    <div className="pad operator" id="add" onClick={() => operator("+")}>+</div>
                    <div className="pad" id="one" onClick={() => pressDigital("1")}>1</div>
                    <div className="pad" id="two" onClick={() => pressDigital("2")}>2</div>
                    <div className="pad" id="three" onClick={() => pressDigital("3")}>3</div>
                    <div className="pad equal" id="equals" onClick={() => getResult()}>=</div>
                    <div className="pad" id="decimal" onClick={() => addDot()}>.</div>
                    <div className="pad" id="zero" onClick={() => pressDigital("0")}>0</div>
                </div>
            </div>
        </div>
    );
}

export default App;
