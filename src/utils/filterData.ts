export const filteredData = (data: any) => {
    const test = data?.map((display: any) => {
        const clone = Object.assign({}, { ...display })
        delete clone.id
        delete clone.created_at
        delete clone.updated_at
        delete clone.product_id

        return JSON.stringify(clone)
    })

    const fil = test?.filter((e: any, i: any) => {
        return test.indexOf(e) === i
    })

    const arr = fil?.map((e: any) => {
        return JSON.parse(e)
    })

    return arr
}
