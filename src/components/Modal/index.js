import './modal.css'
import { FiX } from 'react-icons/fi';

const Modal = ({conteudo, close}) =>{
    return(
        <div className='modal' >
            <div className='container' >
                <button className='close' onClick={close} >
                    <FiX size={23} color='white' />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do chamado</h2>

                    <div className='row' >
                        <span>
                            Cliente: <a href="/" >{conteudo.cliente} </a> 
                        </span>
                    </div>

                    <div className='row' >
                        <span>
                            Assunto: <a href="/">{conteudo.assunto} </a> 
                        </span>
                        <span>
                            Cadastrado em: <a href="/">{conteudo.createdFormated} </a> 
                        </span>
                    </div>

                    <div className='row' >
                        <span>
                            Status: <a style={{color: '#FFF', backgroundColor: conteudo.status === 'Aberto' ? '#5cb95c' : '#999'  }} href="/" >{conteudo.status} </a> 
                        </span>
                    </div>

                        {conteudo.complemento !== '' && (
                            <>
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>
                            </>
                        )}


                </div>
            </div>
        </div>
    )
}
export default Modal;
