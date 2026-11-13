// The search query is untrusted, because it can come from the URL (`?q=`). It
// is only used as the value of the search bar, compared with the text of the
// cells and set in the URL with URLSearchParams, and never written as HTML.
const MAX_QUERY_LENGTH = 64;

// cleanQuery removes the control and bidirectional characters of a query and
// caps it at MAX_QUERY_LENGTH characters, without splitting a surrogate pair.
function cleanQuery(q) {
    return String(q ?? "")
        .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/g, "")
        .slice(0, MAX_QUERY_LENGTH)
        .replace(/[\ud800-\udbff]$/, "");
}

function search() {
    const bar = document.getElementById("searchBar");
    const rawQuery = cleanQuery(bar.value);
    if (bar.value !== rawQuery) {
        bar.value = rawQuery;
    }
    const query = rawQuery.toUpperCase();

    // Keep the query in the URL, so that the filtered page can be shared.
    const url = new URL(location.href);
    if (rawQuery) {
        url.searchParams.set("q", rawQuery);
    } else {
        url.searchParams.delete("q");
    }
    history.replaceState(null, "", url);
    const tr = document.getElementById("cves_table").rows;

    // The status column is found by its header. It is matched with startsWith()
    // in order for `affected` to not match `not affected` entries.
    const statusCol = Array.from(tr[0].cells).findIndex(c => c.textContent.trim().toUpperCase() === "STATUS");

    // The "hide VEXed" toggle only affects what is displayed; it never changes
    // the underlying rows/data. VEXed CVEs are the "not affected" rows.
    let hideVexedEl = document.getElementById("toggleVexed");
    let hideVexed = hideVexedEl ? hideVexedEl.checked : false;

    let found = 0;
    for (var i = 1; i < tr.length; i++) {
        let matches = Array.from(tr[i].cells).some((c, col) => {
            const text = c.textContent.toUpperCase();
            return col === statusCol ? text.startsWith(query) : text.includes(query);
        });

        if (hideVexed && tr[i].classList.contains("not_affected")) {
            matches = false;
        }

        if (matches) {
            tr[i].style.display = "";
            found++;
        } else {
            tr[i].style.display = "none";
        }
    }

    const searchCount = document.getElementById("search_count");
    searchCount.style.display = "";
    if (query == "") {
        searchCount.textContent = "Total results: " + found;
    } else {
        searchCount.textContent = "Found " + found + " results";
    }
}

// Bind the search bar and the VEX toggle, and restore the query kept in the URL.
(function () {
    const bar = document.getElementById("searchBar");
    if (!bar) {
        return;
    }
    bar.addEventListener("input", search);
    const toggle = document.getElementById("toggleVexed");
    if (toggle) {
        toggle.addEventListener("change", search);
    }
    const q = cleanQuery(new URLSearchParams(location.search).get("q"));
    if (q) {
        bar.value = q;
        search();
    }
})();
