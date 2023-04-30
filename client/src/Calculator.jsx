import React, { useState } from 'react'
import { create, all } from 'mathjs'
import axios from 'axios'

const Calculator = () => {
    
    // math.js modul inicializálása
    const math = create(all)
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    // azok az operátorok, amikkel a számításokat végezni tudjuk
    const ops = ['/', '*', '+', '-', '.'];

    // Számológép értékének frissítése
    const updateCalc = value => {
        // ha az utolsó karakter egy operátor és újabb operátort adunk hozzá, akkor ne frissítsük az értéket
        if (
            ops.includes(value) && calc === '' ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        ) {
            return;
        }

        // az érték hozzáadása
        setCalc(calc + value);

        // ha nem operátor karaktert adunk hozzá, akkor a kifejezés értéke legyen kiértékelve
        if (!ops.includes(value)) {
            try {
                setResult(math.evaluate(calc + value).toString());
            } catch (error) {
                setResult('Error');
            }
        }
    }

    // a kifejezés kiértékelése
    const calculate = () => {
        try {
            const result = math.evaluate(calc)
            setCalc(result.toString())
        } catch (error) {
            return "Error"
        }
    }

    // adat törlése
    const deletedata = () => {
        setCalc("");
    }

    // adat mentése
    const saveData = () => {
        axios.post('http://localhost:5000/save', {calc})
    }

    // adat betöltése
    const loadData = () => {
        axios.get('http://localhost:5000/load')
            .then(function(res) {setCalc(res.data)})
    }

  return (
    <div className='calculator'>
        <div className='display'>
            {result ? <span>({result})</span> : '' }
            &nbsp;
            {calc || "0" }
        </div>

        <div className="operators">
            <button onClick={() => updateCalc('/')}>/</button>
            <button onClick={() => updateCalc('*')}>*</button>
            <button onClick={() => updateCalc('+')}>+</button>
            <button onClick={() => updateCalc('-')}>-</button>

            <button onClick={deletedata}>DEL</button>
            <button onClick={saveData}>SAVE</button>
            <button onClick={loadData}>LOAD</button>
        </div>

        <div className="digits">
            <button onClick={() => updateCalc('7')}>7</button>
            <button onClick={() => updateCalc('8')}>8</button>
            <button onClick={() => updateCalc('9')}>9</button>
            <button onClick={() => updateCalc('4')}>4</button>
            <button onClick={() => updateCalc('5')}>5</button>
            <button onClick={() => updateCalc('6')}>6</button>
            <button onClick={() => updateCalc('1')}>1</button>
            <button onClick={() => updateCalc('3')}>3</button>
            <button onClick={() => updateCalc('2')}>2</button>
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('.')}>.</button>
            <button onClick={calculate}>=</button>
        </div>
    </div>
  )
}

export default Calculator