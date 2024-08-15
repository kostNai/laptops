import React from 'react'

export default function SingleUserPage({ params }: { params: { id: string } }) {
    return <div>{params.id}</div>
}
