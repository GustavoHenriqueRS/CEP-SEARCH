import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import styles from "./components/Styles.module.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    //01310930/json/
    if (input === "") {
      alert("PREENCHA ALGUM CEP!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops erro ao buscar");
      setInput("");
    }
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GUSTAVO HENRIQUE</h1>
      <div className={styles.containerInput}>
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className={styles.buttonSearch} onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 1 && (
        <main className={styles.main}>
          <h2>CEP: {cep.cep}</h2>
          <span> {cep.logradouro}</span>
          <span> Complemento:{cep.complemento}</span>
          <span> {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
