let lastColumn = -1
let ascending = true

function sort(col) {
    const table = document.getElementById("cves_table")
    let rows = Array.from(table.getElementsByClassName("issue"))
    if (col === lastColumn) {
        ascending = !ascending
        rows.reverse()
    } else {
        lastColumn = col
        ascending = true
        // Array.sort is stable, so the rows with equal keys keep their order.
        const keys = new Map(rows.map(tr => [tr, cellKey(tr, col)]))
        rows.sort((a, b) => compareKeys(keys.get(a), keys.get(b)))
    }
    rows.forEach(tr => table.appendChild(tr))

    // The arrow of the header shows the column and the direction of the sorting.
    Array.from(table.rows[0].cells).forEach((th, i) => {
        if (i === col) {
            th.setAttribute("aria-sort", ascending ? "ascending" : "descending")
        } else {
            th.removeAttribute("aria-sort")
        }
    })
}

// Numeric cells (like counts) are compared as numbers, the others as text. The
// text is used, instead of the HTML, so that links are sorted by their label.
function cellKey(tr, col) {
    const text = tr.getElementsByTagName("td")[col].textContent.trim().toLowerCase()
    return /^\d+$/.test(text) ? Number(text) : text
}

// The numbers go before the text, so that the order is always consistent.
function compareKeys(a, b) {
    if (typeof a !== typeof b) {
        return typeof a === "number" ? -1 : 1
    }
    return a < b ? -1 : a > b ? 1 : 0
}

// The headers sort the table by their column.
(function () {
    const table = document.getElementById("cves_table")
    if (table) {
        Array.from(table.rows[0].cells).forEach((th, i) => th.addEventListener("click", () => sort(i)))
    }
})()
