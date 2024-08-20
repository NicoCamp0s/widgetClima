import './assets/App.css';
import WeatherPanel from './components/WeatherPanel';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <WeatherPanel></WeatherPanel>
    </div>
  );
}

export default App;
