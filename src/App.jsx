import React, { useState, useEffect } from "react";
import './App.css';

//Importação dos componentes criados
import ChatListItem from './components/ChatList/ChatListItem';
import ChatIntro from './components/Intro/ChatIntro';
import ChatWindow from './components/Chat_window/ChatWindow';
import Kanban from './components/Kanban/KanbanBoard/KanbanBoard';

// Importação para adicionar dica de ferramenta aos botões 
import { Tooltip } from '@mui/material';

// Importação dos icones presentes na coluna esquerda (sidebar)
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';


export default () =>{

  const [chatlist, setChatList] = useState([
    {chatId: 1, title: 'Momoi', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 2, title: 'Galego', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 3, title: 'Ryan', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 4, title: 'Coraline', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 5, title: 'Soika', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 6, title: 'Maria', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 7, title: 'Tchuga', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 8, title: 'João', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 9, title: 'Lyara', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 10, title: 'Eurides', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
    {chatId: 11, title: 'Negão', image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
  ]);

  // State para selecionar o quadro Kanban 
  const [showKanban, setShowKanban] = useState(false);

  // State para abrir o chat selecionado
  const [activeChat, setActiveChat] = useState({});

  // Função de clique no botão do Kanban 
  const handleKanbanClick = () => {
    setShowKanban(!showKanban);
    setActiveChat({});
  };

  // Função de clique para voltar do kanban 
  const handleChatClick = (chatId) => {
    setActiveChat(chatlist.find((item) => item.chatId === chatId));
    setShowKanban(false);
  };
  
// Função para atualizar a pagina caso o o avatar principal seja clicado
  const reload = () => {window.location.reload();};

  // State para identificar as informações do usuario logado
  const [user, setUser] = useState({
    id: 123,
    avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    name: 'Usuario doidão'
  });

  return(
            
            <div className="app-window">
                <div className="sidebar">
          
                    {/*Cabeçalho coluna esquerda*/}
                    <header>
                        <img className="header--avatar" src={user.avatar} alt="avatar" onClick={reload}></img>

                        {/*Botões coluna esquerda*/}
                        <div className="header--buttons">

                            <Tooltip title="Orgazinar Kanbans">
                                <div className="header--btn--Kanban" onClick={handleKanbanClick}>
                                    <AutoAwesomeMotionIcon style={{color: '#114d8ebd'}}/>
                                </div>
                            </Tooltip>
                        
                            <Tooltip title="Mais opções">
                                <div className="header--btn--options">
                                    <MoreVertIcon style={{color: '#114d8ebd'}}/>
                                </div>
                            </Tooltip> 

                        </div>      
                    </header>

                        {/*Campo de busca coluna esquerda*/}
                        <div className="search">
                            <div className="search--input">
                                <SearchIcon fontsize="small" style={{color: '#919191'}}/>
                                <input type="search" placeholder="Procurar ou iniciar uma nova conversa"></input>
                            </div>
                        </div>

                    {/*Botões principais coluna esquerda*/}
                    <div className="btn-main">
                        <button className="btn-main-one"> Em atendimento</button>
                        <button className="btn-main-two"> Aguardando atendimento</button>
                    </div>

                    {/*Chat da coluna esquerda*/}
                    <div className="chatList">
                        {chatlist.map((item, key) => (
                            <ChatListItem
                                key={key}
                                data={item}
                                active={activeChat.chatId === item.chatId}
                                onClick={() => handleChatClick(item.chatId)}
                            />
                        ))}
                    </div>
                </div>
        
                {/* Condição para determinar qual das telas irá aparecer / Intro - Kanban - Chat */}
                <div className="contentarea">
                    {showKanban ? (
                        <Kanban 
                        chatlist={chatlist}
                        />
                        ) : (
    
                        <>

                    {activeChat.chatId !== undefined ? (
                        <ChatWindow activeChat={activeChat} user={user} />
                        ) : (
                        <ChatIntro />
                        )}

                        </>
                    )}
                </div>
            </div>
    )
}