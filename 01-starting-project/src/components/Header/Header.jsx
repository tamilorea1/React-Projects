import reactImg from '../../assets/react-core-concepts.png'
import './Header.css'

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {

  //We store the description gained from our array into the variable "description"
  //Since reactDescriptions is an array and we're looking to print an element out of it,
  //We set it up initially like this reactDescriptions[]
  //In [] we want to get a random number between 0-2, since we only have 3 elements.
  const description = reactDescriptions[genRandomInt(2)]

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are going to build!
      </p>
    </header>
  );
}