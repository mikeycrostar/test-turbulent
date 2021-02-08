export const postData = async (data: any) => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    try {
        return await result.json()
    } catch (e) {
        throw (e)
    }
}
