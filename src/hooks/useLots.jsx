import { useCallback, useEffect, useState } from 'react'
import { lotService } from '../api/lotService'

const useLots = () => {
    const [lots, setLots] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchLots = useCallback(async () => {
        try {
            setLoading(true)
            setError('')

            const data = await lotService.getAll()
            setLots(data)

        } catch (err) {
            setError(err.message)
        } finally {
            loading(false)
        }
    })

    useEffect(() => { fetchLots() }, [fetchLots])

    return { lots, loading, error, refetch: fetchLots }
}

export default useLots