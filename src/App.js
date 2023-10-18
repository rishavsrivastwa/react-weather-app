import './App.css';
import WeatherApp from './components/WeatherApp';
import Favourite from './components/Favourite';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<WeatherApp />}></Route>
        <Route path="/fav" element={<Favourite />}></Route>
      </>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}


export default App;
