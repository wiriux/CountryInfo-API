import React, {useState} from 'react'

const Display = (props) =>{
  return (
    <div>
      <p>Good: {props.stats[0]} </p>
      <p>Neutral: {props.stats[1]}</p>
      <p>Bad: {props.stats[2]}</p>

    </div>
  )
}

const Average = (props) => {
  return(
    <div>
      <p>Average: {props.stats[0] / props.stats[1]}</p>
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
      <Display stats = {[good, neutral, bad]}/>
      <Average stats = {[(good - bad), (good + neutral + bad)]}/>
    </div>
  )
}

export default App