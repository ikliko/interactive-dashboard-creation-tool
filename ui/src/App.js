import {useEffect, useState} from 'react'
import io from 'socket.io-client'

import './App.css'
import logo from './logo.svg'
import PriceUpdatesChart from './components/PriceUpdatesChart'

function App() {
    const [candlestickData, setCandlestickData] = useState([
        {
            'x': '16:28:23',
            'y': [
                1.43
            ]
        }
    ])

    useEffect(() => {
        const socket = io('http://localhost:3031', {
            transports: ['websocket'],
            extraHeaders: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })

        socket.on('priceHistory', ({pairs}) => {
            setCandlestickData(setCandlestickData => pairs.EURUSD.map(price => ({
                x: price.time,
                y: [price.highest, price.lowest, price.open, price.close]
            })))
        })

        socket.on('priceUpdate', (data) => {
            const {EURUSD} = data.pairs

            setCandlestickData(prevState => {
                prevState.push({x: EURUSD.time, y: [EURUSD.highest, EURUSD.lowest, EURUSD.open, EURUSD.close]})

                prevState = prevState.slice(-20)

                return prevState
            })
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Current EURUSD price (The data is completely random)
                </p>
                <PriceUpdatesChart candlestickData={candlestickData}
                                   latestPrice={candlestickData[candlestickData.length - 1]}/>
            </header>
        </div>
    )
}

export default App
