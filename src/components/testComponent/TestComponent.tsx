'use client'

import { useSession } from 'next-auth/react'

export default function TestComponent() {
    const { data: session, status, update } = useSession()
    const updateSessionData = async () => {
        update({ access_token: '111' })
    }
    return (
        <div>
            <button onClick={updateSessionData}>Click</button>
            <button onClick={() => console.log(session)}>Log session</button>
        </div>
    )
}
