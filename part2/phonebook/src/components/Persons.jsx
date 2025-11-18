const Persons = (props) => {
  return (
    <ul>
      {props.list.map(person => <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => props.handler(person.id)}>delete</button>
      </li>)}
    </ul>
  )
}

export default Persons