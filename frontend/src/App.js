import { BrowserRouter } from "react-router-dom";
import { 
  WebRouter, 
  // AdminRouter 
} from './router';
import { AuthProvider } from "./contexts";
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        {/* <AdminRouter /> */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
