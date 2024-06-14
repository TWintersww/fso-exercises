const Header = (props) => {
  //console.log("header props: " + props.course)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  
  return (
    <div>
      {props.course.parts.map((part) => {
        return <Part part={part} />
      })}
    </div>
  )
}

const Total = (props) => {
  const totalExercises = 
  props.course.parts.reduce((total, curr) => {
    return total + curr.exercises
  }, 0)

  return (
    <div>
      <p>
      Number of exercises {totalExercises}
      </p>
    </div>
  )
}


const App = () => {
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
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
