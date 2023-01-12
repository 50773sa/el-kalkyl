export default function getDate(timestamp) {

    if (!timestamp) {
        return null
    }

    const date = new Date(timestamp.toMillis())
    return date?.toLocaleDateString()
}

