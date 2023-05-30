import React, { useState, useEffect } from "react";
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

// Importação do componente MessageItem
import MessageItem from '../Message_Item/MessageItem';

// Importação para adicionar dica de ferramenta aos boões 
import { Tooltip } from '@mui/material';

// Importação dos icones presentes na coluna esquerda (Header - Conversa)
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';


export default ({ activeChat, user }) => {

    
    // Função para microfone escutar e reescrever em formato de mensagem
    let recognition = null; 
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    // State para vereficação da função de escutar e reescrever 
    const [listening, setListening] = useState(false); 

    // State para mostrar a area dos emojis 
    const [emojiOpen, setEmojiOpen] = useState(false);

    // State para armazenar o texto digitado no input do envio das mensagens
    const [text, setText] = useState('');

    // State para as mensagens 
    const [list, setList] = useState(
        [
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'},
            {author: 123, body: 'Testando aplicação'}, 
            {author: 123, body: 'Vamos ver se vai dar certo'}, 
            {author: 123, body: 'Mensagem aleatória'}, 
            {author: 1234, body: 'To mec mec life'}
        ]
    );


    // Efeito colateral para manter o scroll da conversa sempre pra baixo 
    useEffect( () => {

    }, []);
    
    // Função de clique, para abrir aba emoji
    const handleOpenEmoji = () => {
        setEmojiOpen(true); 
    }

    // Função de clique, para fechar aba emoji 
    const handleCloseEmoji = () => {
        setEmojiOpen(false); 
    }

    // Função de clique para icone de envio de mensagem
    const handleSendClick = () => {
        
    }

    // Função de clique icone do microfone 
    const handleMicClick = () => {
        if(recognition !== null) {

            recognition.onstart = () => {
                setListening(true); 
            }

            recognition.onend = () => {
                setListening(false); 
            }

            recognition.onresult = (e) => {
                setText( e.results [0][0].transcript );
            }
            
            recognition.start(); 
        }
    }

    // Efeito colateral para fechar aba de emojis ao trocar de conversa
    useEffect(() => {
        if (emojiOpen) {
            setEmojiOpen(false);
        }
    }, [activeChat]); 

    // Função para adicionar os emojis ao input
    const handleEmojiClick = (emojiObject) => {
        const emoji = String.fromCodePoint(parseInt(emojiObject.unified, 16));
        setText((prevText) => prevText + emoji);
      };
      
    return (
        
         <div className="chatWindow">

                {/* Cabeçalho chat */}
                <div className="chatWindow--header">
                    <div className="chatWindow--headerinfo">
                        <img className="chatWindow--avatar" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="avatar"></img>
                        <div className="chatWindow--name">Evanderson Pereira</div>
                    </div>
                    
                    {/* Botões do chat */}
                    <div className="chatWindow--headerbuttons">

                        <Tooltip title="Pesquisar na conversa"> 
                            <div className="chatWindow--btn">
                                <SearchIcon style={{color: '#919191'}}/>
                            </div>
                        </Tooltip>

                        <Tooltip title = "Anexar arquivo">
                            <div className="chatWindow--btn">
                                <AttachFileIcon style={{color: '#919191'}}/>
                            </div>
                        </Tooltip>
                    </div>
                </div>

                {/* Corpo do chat */}
                <div className="chatWindow--body">
                    {list.map( (item, key) => {
                        return(
                            <MessageItem 
                            key={key}
                            data={item}
                            user={user}
                        />
                        )    
                    })}
                </div>

                {/* Adicionadno o campo dos Emojis */}
                <div className="chatWindow--emojiarea" style={{height: emojiOpen ? '350px' : '0px'}}>
                    <EmojiPicker 
                        onEmojiClick={handleEmojiClick}
                        height='500px'
                        width='auto'
                        skinTonesDisabled  // Desabilitando a opção de tonalidade dos emojis
                        searchDisabled // Desabilitando a caixa de busca dos emojis   
                    />
                </div>

                {/* Rodapé do chat */}
                <div className="chatWindow--footer">
                   
                    <div className="chatWindow--pre">

                        <div className="chatWindow--btn" onClick={handleCloseEmoji} style={{width: emojiOpen ? 40 : 0}}>
                            <CloseIcon style={{color: '#919191'}}/>
                        </div>

                        <div className="chatWindow--btn" onClick={handleOpenEmoji}>
                            <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}}/>
                        </div>
                    </div>

                    {/* Input para responder as mensagens*/}
                    <div className="chatWindow--inputarea">
                        <input 
                            className="chatWindow--input" 
                            type="text" 
                            placeholder="Digite uma mensagem" 
                            value={text} 
                            onChange={e => setText(e.target.value)}
                        />
                    </div>

                    <div className="chatWindow--pos">

                        {/* Condição para aparecer o icone de microfone caso não tenha texto no input*/}
                        {text === '' && 
                            <div onClick={handleMicClick} className="chatWindow--btn">
                                <MicIcon style={{color: listening ? '#126ECF' : '#919191' }}/>
                            </div>
                        }

                        {/* Condição para apecer o botão de enviar caso contenha algum texto no input*/}
                        {text !== '' &&  
                            <div onClick={handleSendClick} className="chatWindow--btn">
                                <SendIcon style={{color: '#919191'}}/>
                            </div>
                        } 

                    </div>
                </div>
        </div>
    )
}