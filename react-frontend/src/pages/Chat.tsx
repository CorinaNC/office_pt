// ...existing code...
import React, { useState, useEffect } from 'react'

const Chat = () => {

    const [data, setData] = useState<{ text?: string }>({})

    useEffect(() => {
        // call the Flask backend directly (or set up a Vite proxy instead)
        fetch("http://localhost:5000/chatter")
          .then(res => res.json())
          .then(data => {
                setData(data)
                console.log(data)
            })
          .catch(err => {
                console.error(err)
                setData({ text: "Error fetching chat" })
            })
    }, [])
  return (
    <div>
        {(typeof data.text === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            <p>{data.text}</p>
        )}
    </div>
  )
}

export default Chat