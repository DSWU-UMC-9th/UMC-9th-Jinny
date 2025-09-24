import "./App.css";

function App() {
  const nickname = "지니";
  const tomato = "토마토";
  const techStacks = ["REACT", "NEXT", "VUE", "SVELTE", "ANGULAR", "REACT-NATIVE"];

  return (
    <>
      <strong className="school">덕성여자대학교</strong>
      <p style={{ color: "gray", fontWeight: "bold", fontSize: "30px" }}>
        {nickname}/김진효
      </p>
      <h1>{`${nickname}는 🍅${tomato}🍅를 좋아합니다.`}</h1>

      <ul>
        {techStacks.map((tech, idx) => (
          <li key={idx}>{tech}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
