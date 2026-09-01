import './index.css';
import DataList from './DataList';

function App() {
  function getClickedItem(item){
    console.log("Item clicado: ", item)
  }

  return(
    <div className="app-container">
      <h3 className="app-header">
        Aluno: Hiago Bernardo da Silva
      </h3>
      
      <DataList getClickedItem={getClickedItem}></DataList>
    </div>
  );
}

export default App;