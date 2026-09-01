import { db } from "../db.js";

// CREATE - adiciona um novo servico
export const addServico = (req, res) => {
  if (!req.body.titulo || !req.body.descricao || !req.body.categoria) {
    return res.status(400).json({ message: "Título, descrição e categoria são obrigatórios." });
  }

  const q = "INSERT INTO servicos (`titulo`, `descricao`, `categoria`, `preco`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.titulo,
    req.body.descricao,
    req.body.categoria,
    req.body.preco || null 
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json("Serviço criado com sucesso.");
  });
};

// READ - lista os servicos, ordenando por data de criacao (mais recentes primeiro)
export const getServicos = (_, res) => {
  const q = "SELECT * FROM servicos ORDER BY dataCriacao DESC";
  
  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao buscar no banco:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};


// UPDATE - logica para a atualizacao de um servico
export const updateServico = (req, res) => {
  if (!req.body.titulo || !req.body.descricao || !req.body.categoria) {
    return res.status(400).json({ message: "Título, descrição e categoria são obrigatórios." });
  }

  const q = "UPDATE servicos SET `titulo` = ?, `descricao` = ?, `categoria` = ?, `preco` = ? WHERE `id` = ?";
  const values = [
    req.body.titulo,
    req.body.descricao,
    req.body.categoria,
    req.body.preco || null,
    req.params.id 
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao atualizar no banco:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json("Serviço atualizado com sucesso.");
  });
};

// DELETE - logica para a exclusao do servico
export const deleteServico = (req, res) => {
  const q = "DELETE FROM servicos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) {
      console.error("Erro ao excluir no banco:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json("Serviço excluído com sucesso.");
  });
};