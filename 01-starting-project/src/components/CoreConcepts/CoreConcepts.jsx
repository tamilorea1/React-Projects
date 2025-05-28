
import './CoreConcepts.css'

export default function CoreConcepts(props) {
  const {title, image, description} = props
  return (
    <li>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  )
}
