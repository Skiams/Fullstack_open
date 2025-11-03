import { useState } from 'react'

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const StatisticsLine = ({category, value}) => {
  if (category == "Positive") {
    return (
    <tr>
      <td>{category}</td><td>{value}%</td>
    </tr>
    )
  }

  return (
    <tr>
      <td>{category}</td><td>{value}%</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine category="Good" value={good} />
          <StatisticsLine category="Neutral" value={neutral} />
          <StatisticsLine category="Bad" value={bad} />
          <StatisticsLine category="All" value={total} />
          <StatisticsLine category="Average" value={(good - bad) / total} />
          <StatisticsLine category="Positive" value={(good / total) * 100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </p>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App