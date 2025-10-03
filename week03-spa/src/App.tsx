import "./App.css";
import Navbar from "./components/Navbar";
import Router from "./router/Router";

export const HomePage = () => <h1>🏡 페이지</h1>;
export const FirstPage = () => <h1>1️⃣ 페이지</h1>;
export const SecondPage = () => <h1>2️⃣ 페이지</h1>;
export const ThirdPage = () => <h1>3️⃣ 페이지</h1>;
export const FourthPage = () => <h1>4️⃣ 페이지</h1>;

function App() {
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
