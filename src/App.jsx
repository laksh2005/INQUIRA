import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/subscribe")
    .then(res => res.json())
    .then(data => setData(data.message))
    .catch(err => console.log(err));
  });

  return (
    <Body />
  );
}

export default App;
