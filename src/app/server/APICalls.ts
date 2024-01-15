export const postPayloadData = async (data: any) => {
    let res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let genRes = await res.json()
    return genRes
}