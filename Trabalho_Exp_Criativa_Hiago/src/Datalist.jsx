import { useEffect, useState } from 'react';
import './index.css';

function DataList(props) {
  const [data, setdata] = useState([]);
  const [itemClicked, setitemClicked] = useState({});
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [formData, setFormData] = useState({ titulo: '', descricao: '', categoria: '', preco: '' });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalIsOpen]);

  function getData() {
    fetch("http://localhost:8800/servicos")
      .then(response => response.json())
      .then(dados => {
        if (Array.isArray(dados)) {
          setdata(dados);
        } else {
          setdata([]);
        }
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }

  function clicou(item){
    setitemClicked(item);
    setModalType('view');
    setmodalIsOpen(true);
    if(props.getClickedItem) props.getClickedItem(item);
  }

  function novoServico() {
    setitemClicked({});
    setFormData({ titulo: '', descricao: '', categoria: '', preco: '' });
    setModalType('new');
    setmodalIsOpen(true);
  }

  function editar(item, e) {
    e.stopPropagation(); 
    setitemClicked(item);
    setFormData({ 
      titulo: item.titulo, 
      descricao: item.descricao, 
      categoria: item.categoria, 
      preco: item.preco || '' 
    });
    setModalType('edit');
    setmodalIsOpen(true);
  }

  function excluir(id, e) {
    e.stopPropagation();
    if(window.confirm("Deseja realmente excluir este serviço?")) {
      fetch(`http://localhost:8800/servicos/${id}`, { method: "DELETE" })
      .then(() => getData())
      .catch(err => console.error("Erro ao excluir:", err));
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function salvar(e) {
    e.preventDefault();
    const url = modalType === 'new' ? "http://localhost:8800/servicos" : `http://localhost:8800/servicos/${itemClicked.id}`;
    const method = modalType === 'new' ? "POST" : "PUT";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(async (response) => {
      if (!response.ok) throw new Error("Erro no banco de dados.");
      return response.json();
    })
    .then(() => {
      getData(); 
      setmodalIsOpen(false);
    })
    .catch(err => {
      console.error("Erro na requisição:", err);
      alert("Falha ao salvar: " + err.message);
    });
  }

  return(
    <div className="main-wrapper">
      <div className="list-header">
        <h2 className="title">Serviços Disponíveis</h2>
        <button className="btn-header-novo" onClick={novoServico}>+ Anunciar Serviço</button>
      </div>
      
      {/* grid de cards*/}
      <div className="grid-cards">
        {Array.isArray(data) && data.map((item) => (
          <div key={item.id} className="servico-card" onClick={() => clicou(item)}>
            
            <div className="card-image-placeholder">
              <span className="categoria-badge">{item.categoria}</span>
            </div>
            
            <div className="card-content">
              <h3 className="card-title">{item.titulo}</h3>
              <p className="card-price">{item.preco ? `R$ ${item.preco}` : 'A combinar'}</p>
              
              <button className="btn-primary-card" onClick={(e) => { e.stopPropagation(); clicou(item); }}>
                Ver Detalhes
              </button>

              <div className="card-admin-actions">
                <span className="link-edit" onClick={(e) => editar(item, e)}>Editar</span>
                <span className="link-delete" onClick={(e) => excluir(item.id, e)}>Excluir</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {!Array.isArray(data) || data.length === 0 && (
        <div className="empty-message">Nenhum serviço anunciado ainda.</div>
      )}

      {/* modal */}
      {modalIsOpen && 
        <>
          <div className="modal-backdrop" onClick={() => setmodalIsOpen(false)}></div>
          
          <div className="container-modal">
            {modalType === 'view' && (
              <div className="modal-content">
                <h2 className="modal-title">Detalhes do Serviço</h2>
                <div className="detail-item"><strong>Serviço:</strong> {itemClicked.titulo}</div>
                <div className="detail-item"><strong>Categoria:</strong> <span className="tag-categoria">{itemClicked.categoria}</span></div>
                <div className="detail-item"><strong>Valor:</strong> <span className="preco-destaque">{itemClicked.preco ? `R$ ${itemClicked.preco}` : 'A combinar'}</span></div>
                <hr className="divider" />
                <div className="detail-desc"><strong>Descrição:</strong><br/>{itemClicked.descricao}</div>
                {itemClicked.dataCriacao && <div className="detail-date"><small>Postado em: {itemClicked.dataCriacao}</small></div>}
                
                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setmodalIsOpen(false)}>Fechar</button>
                </div>
              </div>
            )}

            {(modalType === 'new' || modalType === 'edit') && (
              <form onSubmit={salvar} className="modal-form">
                <h2 className="modal-title">{modalType === 'new' ? 'Novo Serviço' : 'Editar Serviço'}</h2>
                
                <div className="form-group">
                  <label>Título:</label>
                  <input className="form-input" type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Categoria:</label>
                  <input className="form-input" type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Descrição:</label>
                  <textarea className="form-input" name="descricao" rows="4" value={formData.descricao} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Valor (Deixe vazio para "A combinar"):</label>
                  <input className="form-input" type="number" step="0.01" name="preco" value={formData.preco} onChange={handleChange} />
                </div>
                
                <div className="form-actions">
                  <button className="btn-save" type="submit">Salvar</button>
                  <button className="btn-cancel" type="button" onClick={() => setmodalIsOpen(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </>
      }
    </div>
  );
}

export default DataList;