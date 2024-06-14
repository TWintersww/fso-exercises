import { useState } from 'react'

const Statistics = (props) => {

  if (props.all != 0) {
    return (
      <div>
      <h1>statistics</h1>
      <table>
      <tbody>
        <tr>
      <StatisticLine text='good' value={props.good}/>
        </tr>
        <tr>
      <StatisticLine text='neutral' value={props.neutral}/>
        </tr>
        <tr>
      <StatisticLine text='bad' value={props.bad}/>
        </tr>
        <tr>
      <StatisticLine text='all' value={props.all}/>
        </tr>
        <tr>
      <StatisticLine text='average' value={props.avg}/>
        </tr>
        <tr>
      <StatisticLine text='positive' value={props.pos} suffix='%'/>
        </tr>
      </tbody>
      </table>
      </div>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = (props) => {
  return (
    //<p>{props.text} {props.value}{props.suffix}</p>
    <>
      <td>{props.text}</td>
      <td>{props.value}{props.suffix}</td>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const incrementGood = () => {
    const newGood = good + 1
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    calculateAvg(1)
    calculatePos(1)
  }
  const incrementNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = all + 1
    setNeutral(newNeutral)
    setAll(newAll)
    calculateAvg(0)
    calculatePos(0)
  }
  const incrementBad = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    calculateAvg(-1)
    calculatePos(0)
  }
  const calculateAvg = (lastTally) => {
    const newAvg = (good - bad + lastTally) / (all+1)
    setAvg(newAvg)
  }
  const calculatePos = (lastTally) => {
    const newPos = (good + lastTally) / (all+1)
    setPos(newPos)
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button onClick={incrementGood} text='good' />
    <Button onClick={incrementNeutral} text='neutral' />
    <Button onClick={incrementBad} text='bad' />

    <Statistics good={good} neutral={neutral} bad={bad}
    all={all} avg={avg} pos={pos * 100} />
    </div>
  )
}

export default App
