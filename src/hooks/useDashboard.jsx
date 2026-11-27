import { useCallback, useEffect, useState } from "react"
import { lotService } from "../api/lotService"
import { rainService } from "../api/rainService"

const useDashboard = (lotId) => {
    const [dashboard, setDashboard] = useState(null)
    const [rainSummary, setRainSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchAll = useCallback(async () => {
        if (!lotId) return

        try {
            setLoading(true)
            setError('')

            const [dashboardData, rainData] = await Promise.all([
                lotService.getDashboard(lotId),
                rainService.getSummary(lotId)
            ])

            setDashboard(dashboardData)
            setRainSummary(rainData)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [lotId])

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    return { dashboard, loading, rainSummary, error, refethc: fetchAll }
}

export default useDashboard