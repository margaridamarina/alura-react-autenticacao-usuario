import { AbBotao } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { IPedido } from "../../interfaces/IPedido"
import http from "../../http"
import './Pedidos.css'

const Pedidos = () => {

    const formatador = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'})

    const [pedidos, setPedidos] = useState<IPedido[]>([])

    useEffect(() => {
        http.get<IPedido[]>('pedidos')
            .then(resposta => setPedidos(resposta.data))
            .catch(erro => console.log(erro))
    }, [])

    const excluir = (pedido: IPedido) => {
        const token = sessionStorage.getItem('token')
        http.delete('pedidos/' + pedido.id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            setPedidos(pedidos.filter(p => p.id !== pedido.id))
        })
        .catch(erro => console.log(erro))
    }

    return(
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            {pedidos.map(pedido => (<div className="pedido" key={pedido.id}>
                <ul>
                    <li>Pedido: <strong>{pedido.id}</strong></li>
                    <li>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
                    <li>Valor total: <strong>{formatador.format(pedido.total)}</strong></li>
                    <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></li>
                </ul>
                <AbBotao texto="Detalhes"></AbBotao>
                <AbBotao onClick={() => excluir(pedido)} texto="Excluir"></AbBotao>
            </div>))}
        </section>
    )
}

export default Pedidos