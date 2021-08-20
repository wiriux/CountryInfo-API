// import { checkPropTypes } from 'prop-types'
import React from 'react'

  const Header = (props) =>{
    return (
      <div>
        <p>Title: {props.course.name}</p>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <p>Part: {props.parts[0].name}. Exercises: {props.parts[0].exercises}</p>
        <p>Part: {props.parts[1].name}. Exercises: {props.parts[1].exercises}</p>
        <p>Part: {props.parts[2].name}. Exercises: {props.parts[2].exercises}</p>

      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>Total: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
      </div>
    )
  }

  const App = () =>{
    const course = {
      name: 'Half Stack application development',
        parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total total = {course.parts} />

    </div>
  )
}

export default App
