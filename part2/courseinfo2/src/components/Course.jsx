const Course = ({course}) => {
    //console.log('course', course)
    const {id, name, parts} = course
  
    return (
      <div>
        <Header text={name} />
        <Content parts={parts} />
      </div>
    )
  }
  
  const Header = ({text}) => {
    return (
      <h1>{text}</h1>
    )
  }
  
  const Content = ({parts}) => {
    //console.log('parts', parts);
  
    const totalParts = 
      parts.reduce((accumulator, part) => 
      accumulator + part.exercises, 0)
    //console.log('total parts: ', totalParts)
  
    return (
      <div>
        {
          parts.map((part) => {
            return <Part key={part.id} part={part} />
          })
        }
        <p><strong>total of {totalParts} exercises</strong></p>
      </div>
    )
  }
  
  const Part = ({part}) => {
    //console.log('part', part);
  
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

export default Course
