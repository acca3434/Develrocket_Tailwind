'use client'

import { useEffect } from 'react'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}

export default Error
