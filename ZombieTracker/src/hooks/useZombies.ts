import { useEffect, useState } from "react"
import { Zombie } from "../types"

import axios from 'axios'

const useZombies = () => {
    const [zombies, setZombies] = useState<Zombie[]>([])
    const [loading, setLoading] = useState(false)

    const fetchZombies = () => {
        setLoading(true)
        axios.get('http://localhost:3000/zombies/')
            .then(res => setZombies(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const transferZombies = (ids: string[], destination: string) => {
        setLoading(true)
        axios.patch('http://localhost:3000/zombies/', {
            zombies: ids.map(id => ({ id, location: destination }))
        })
        .then(res => setZombies(res.data.data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }

    useEffect(() => fetchZombies(), [])

    return { zombies, loading, fetchZombies, transferZombies }
}

export default useZombies