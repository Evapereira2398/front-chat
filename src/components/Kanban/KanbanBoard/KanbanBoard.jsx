import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";
import { v4 as uuidv4 } from "uuid";

import KanbanHeader from "../KanbanHeader/KanbanHeader";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";

const KanbanBoard = ( { chatlist } ) => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, content: "Task 1" },
        { id: 2, content: "Task 2" },
      ],
    },

    {
      id: 2,
      title: "In Progress",
      cards: [
        { id: 3, content: "Task 3" },
        { id: 14, content: "Task 14" },
      ],
    },

    {
      id: 3,
      title: "Done",
      cards: [
        { id: 4, content: "Task 4" },
        { id: 5, content: "Task 5" },
        { id: 6, content: "Task 6" },
      ],
    },

  ]);

const [editingColumnId, setEditingColumnId] = useState(null);
const [newColumnTitle, setNewColumnTitle] = useState("");
const [showConfirmationBox, setShowConfirmationBox] = useState(false);
const [columnToDeleteId, setColumnToDeleteId] = useState(null);
const [showAddCardDialog, setShowAddCardDialog] = useState(false);
const [selectedChatId, setSelectedChatId] = useState(null);

// Função para adicionar novos cards nas colunas
const handleAddCard = (columnId) => {
  setSelectedChatId(columnId);
  setShowAddCardDialog(true);
};

// Função para selecionar o chat que se tornrá um card
const handleSelectChat = (chatId) => {
  setSelectedChatId(chatId);
};

// Função para confirmar a adição de um novo card 
const handleConfirmAddCard = () => {
  if (selectedChatId !== null) {
    const newCard = {
      id: uuidv4(),
      content: "",
    };

    const updatedColumns = columns.map((column) => {
      if (column.id === selectedChatId) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
    setShowAddCardDialog(false);
    setSelectedChatId(null);
  }
};

// Função para cancelar a adição de um novo card
const handleCancelAddCard = () => {
  setShowAddCardDialog(false);
};

// Função para adicionar uma nova coluna
const handleAddColumn = () => {
  const newColumnId = Math.max(...columns.map((column) => column.id)) + 1;
  const newColumn = {
    id: newColumnId,
    title: `Coluna ${newColumnId}`,
    cards: [],
  };

  const updatedColumns = [...columns];
  const totalColumns = updatedColumns.length;
  const columnsPerRow = 3; // Número fixo de colunas por linha
  const lastRowIndex = Math.floor((totalColumns - 1) / columnsPerRow);
  const insertIndex = lastRowIndex * columnsPerRow;

  updatedColumns.splice(insertIndex, 0, newColumn);
  setColumns(updatedColumns);
};

// Função para editar o nome de uma coluna
const handleEditColumnTitle = (columnId, currentTitle) => {
    setEditingColumnId(columnId);
    setNewColumnTitle(currentTitle);
};

// Função para salvar o novo nome da coluna
const handleSaveColumnTitle = (columnId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return { ...column, title: newColumnTitle };
      }
      return column;
    });

    setColumns(updatedColumns);
    setEditingColumnId(null);
    setNewColumnTitle("");
  };

// Função de clique na tecla enter para salvar o novo nome da coluna
const handleKeyDown = (e, columnId) => {
  if (e.key === "Enter") {
    handleSaveColumnTitle(columnId);
  }
};

// Função de Drag and drop (Arrastar e soltar) 
const handleDragStart = (e, columnId, cardId) => {
  e.dataTransfer.setData("columnId", columnId);
  e.dataTransfer.setData("cardId", cardId);
};

// Função de Drag and drop (Arrastar e soltar) 
const handleDragOver = (e) => {
  e.preventDefault();
};

// Função de Drag and drop (Arrastar e soltar)
const handleDrop = (e, targetColumnId) => {
  e.preventDefault();

  const sourceColumnId = Number(e.dataTransfer.getData("columnId"));
  const cardId = Number(e.dataTransfer.getData("cardId"));

  const updatedColumns = [...columns];

  const sourceColumnIndex = updatedColumns.findIndex(
    (column) => column.id === sourceColumnId
  );

  const cardIndex = updatedColumns[sourceColumnIndex].cards.findIndex(
    (card) => card.id === cardId
  );

  const [draggedCard] = updatedColumns[sourceColumnIndex].cards.splice(
    cardIndex,
    1
  );

  const targetColumnIndex = updatedColumns.findIndex(
    (column) => column.id === targetColumnId
  );

  updatedColumns[targetColumnIndex].cards.push(draggedCard);

  setColumns(updatedColumns);
};

// Função para deletar coluna
const handleDeleteColumn = (columnId) => {
  setColumnToDeleteId(columnId);
  setShowConfirmationBox(true);
};

// Função para confirmar a exclusão da coluna
const confirmDeleteColumn = (columnId) => {
  const updatedColumns = columns.filter((column) => column.id !== columnId);
    setColumns(updatedColumns);
    setColumnToDeleteId(null);
    setShowConfirmationBox(false);
  };

// Função para cancelar a exclusão das colunas
const cancelDeleteColumn = () => {
    setColumnToDeleteId(null);
    setShowConfirmationBox(false);
  };


// Função para selecionar a coluna via ID
const handleSelectColumn = (columnId) => {
  setSelectedChatId(columnId);
};
  

return (
  <div>
    <KanbanHeader onAddColumn={handleAddColumn}/>

      <div className="kanban-board">
        {columns.map((column) => (

          <div className="column" key={column.id}>
            <div className="column-header"> 
              <h3 className="column-title">
                {editingColumnId === column.id ? (
                  <div className="column-title-input">
                    <input
                      type="text"
                      value={newColumnTitle}
                      onChange={(e) => setNewColumnTitle(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, column.id)}
                    />
                    <label> Nome Coluna </label>
                    <span className="input-highlight"></span>
                  </div>
                  ) : (
                  <div className="column-title-name"> {column.title} </div>
                )}
              </h3>

              <div className="column-edit">
                {editingColumnId === column.id ? (
                  <button className="save-button" onClick={() => handleSaveColumnTitle(column.id)}>
                    Salvar
                  </button>
                  ) : (

                  // Icones das colunas 
                  <div className="icons-container">
                    <Tooltip title="Editar nome">
                      <CreateIcon
                        className="edit-icon"
                        onClick={() =>
                        handleEditColumnTitle(column.id, column.title)
                        }
                      />
                    </Tooltip>

                    <Tooltip title="Excluir coluna">
                      <DeleteIcon
                        className="delete-icon"
                        onClick={() => handleDeleteColumn(column.id)}
                      />
                    </Tooltip>

                    <Tooltip title="Adicionar card">
                      <AddIcon 
                      className="add-icon"
                      onClick={() => handleAddCard(column.id)}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>

            <div
              className="card-list"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="card"
                  draggable
                  onDragStart={(e) =>
                  handleDragStart(e, column.id, card.id)
                  }
                >
                  {card.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

        {showConfirmationBox && (
          <div className="confirmation-box-container">
            <div className="confirmation-box">
              <div className="confirmation-box-content">
                <p>Tem certeza que deseja excluir a coluna?</p>
                <div className="confirmation-box-buttons">
                  <button className="confirmation-box-button" onClick={() => confirmDeleteColumn(columnToDeleteId)}>
                    Sim
                  </button>
                  <button className="confirmation-box-button" onClick={cancelDeleteColumn}>
                    Não
                  </button>
                </div>
              </div>
            </div>
          </div>
        )};

        {showAddCardDialog && (
          <div className="dialog-overlay">
            <div className="dialog-container">
              <div className="add-card-dialog">
                <h3>Selecione uma conversa: </h3>
                  
                  <div className="chat-list">
                    {chatlist.map((chat) => (
                      <div 
                        key={chat.chatId} 
                        className={`chatListItem ${selectedChatId === chat.chatId ? 'selected' : ''}`}
                        onClick={() => handleSelectChat(chat.chatId)}   
                      >
                        <img src={chat.image} alt="Avatar" className="chatListItem--avatar"/>
                          <div className="chatListItem--lines">
                            <div className="chatListItem--line">
                              <div className="chatListItem--name">{chat.title}</div>
                              <div className="chatListItem--date">19:00</div>
                            </div>
                            
                            <div className="chatListItem--lastMsg">
                              <p>Ultima mensagem</p>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>

                  <div className="dialog-buttons">
                    <button onClick={handleConfirmAddCard}>Adicionar Card</button>
                    <button onClick={handleCancelAddCard}>Cancelar</button>
                  </div>
              </div>
            </div>
          </div>
        )}
  </div>
  );
};

export default KanbanBoard;
