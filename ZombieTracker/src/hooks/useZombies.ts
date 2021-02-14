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

    useEffect(() => fetchZombies(), [])

    return { zombies, loading, fetchZombies }
}

export default useZombies