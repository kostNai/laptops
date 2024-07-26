'use client'

import React from 'react'
import { toast } from 'sonner'

export default function UsersPage() {
    return (
        <div>
            <button onClick={() => toast('test toast')}>Click</button>
        </div>
    )
}
