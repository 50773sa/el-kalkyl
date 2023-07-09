{/**
 * Call with onWheel={(e) => preventScrollingNumberInput(e)}
 */}

export default function preventScrollingNumberInput(e) {
    // Prevent that the input value changes when type="number"
    if (e) {
        e.target.blur()

        // Prevent the page/container scrolling
        e.stopPropagation()
    
        // Refocus immediately
        setTimeout(() => {
            e.target.focus()
        }, 0)
    }
    return
}