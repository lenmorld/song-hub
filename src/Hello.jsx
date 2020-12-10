import React from 'react'

const todos = ['eat', 'sleep', 'code']

const Hello = ({ name }) => (
  <div>
    <h1>
      Hello
      {name}
    </h1>
    <h2>Todos for today</h2>
    <ul>
      {todos.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  </div>
)

export default Hello
