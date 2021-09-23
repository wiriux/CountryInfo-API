import React, {useState} from 'react'
import './index.css'

const StatisticLine = ({text, value, symbol}) => {
  return(
      <table>
        <tbody>
        <tr>
          <td className = "td1">{text}:</td>
          <td>{value} {symbol}</td>
        </tr>
        </tbody>
    </table>
  )
}

const Statistics = (props) =>{
  const totalFeedback = props.stats[0] + props.stats[1] + props.stats[2]
  if((props.stats[0] + props.stats[1] + props.stats[2]) === 0){
    return <p>No feedback given</p>
  }
  return (
    <div>
      <StatisticLine text = "good" value = {props.stats[0]}/>
      <StatisticLine text = "neutral" value = {props.stats[1]}/>
      <StatisticLine text = "bad" value = {props.stats[2]}/>
      <StatisticLine text = "all" value = {props.stats[0] + props.stats[1] + props.stats[2]}/>
      <StatisticLine text = "average" value = {(props.stats[0] - props.stats[2]) / (totalFeedback)}/>
      <StatisticLine text = "positive" value = {(props.stats[0] / totalFeedback) * 100} symbol = "%"/>


    </div>
  )
}

const Button = (props) =>{
  return(
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood( good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const negativeFeedback = () => setBad(bad + 1)


  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick = {goodFeedback}
        text = "good"
      />
      <Button onClick = {neutralFeedback}
        text = "neutral"
      />
      <Button onClick = {negativeFeedback}
        text = "bad"
      />
      <h2>Statistics</h2>
      <Statistics stats = {[good, neutral, bad]}/>
    </div>
  )
}

export default App
