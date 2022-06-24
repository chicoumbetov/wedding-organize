import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Accueil from './pages/Accueil';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
