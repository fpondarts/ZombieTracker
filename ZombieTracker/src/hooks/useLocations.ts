import { useEffect, useState } from "react"
import axios from 'axios'
import { LOCATIONS_ENDPOINT } from "../endpoints"

const useLocations = () => {
    const [locations, setLocations] = useState<string[]>([])

    const fetchLocations = () => {
        axios.get(LOCATIONS_ENDPOINT)
            .then(res => setLocations(res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => fetchLocations(), [])

    return { locations }
}

export default useLocations
