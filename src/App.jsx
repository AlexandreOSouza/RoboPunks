import "./App.css";
import MainMint from './components/MainMint';
import NavBar from './components/NavBar';

function App() {

  return (
    <div className="overlay">
      <div className="App">
        <NavBar />
        <MainMint />
      </div>
      <div className="moving-background" />
    </div>
  );
}

export default App;
