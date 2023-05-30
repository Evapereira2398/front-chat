import React from "react";
import './KanbanHeader.css'; 

// Importação imagem
import logo from '../../../assets/logo-front.png'

const KanbanHeader = ( { onAddColumn } ) => {
    return (
        <div className="kanban-header">
        <img src={logo} alt="LogoEmpresa" ></img>
          <h1>Quadro Kanban</h1>
        
        <div className="kanban-header-btn">
          <button className="btn-1" onClick={onAddColumn}>Adicionar coluna</button>
        </div>
      </div>
    )
}

export default KanbanHeader; 