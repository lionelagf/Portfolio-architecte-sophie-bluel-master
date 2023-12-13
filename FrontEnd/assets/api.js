
async function fetchWorks() {
    const resworks = await fetch('http://localhost:5678/api/works')
    const works = await resworks.json()
    return works
}