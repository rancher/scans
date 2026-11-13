// Applies the persisted (or system preferred) theme. It's loaded in the <head>,
// before the page is painted, to avoid a flash of the wrong color scheme. It
// also binds the theme toggle and the collapsible callouts.
(function () {
    const root = document.documentElement
    try {
        const stored = localStorage.getItem("theme")
        if (stored === "dark" || (!stored && matchMedia("(prefers-color-scheme: dark)").matches)) {
            root.setAttribute("data-theme", "dark")
        }
    } catch (e) {}

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".theme-toggle").forEach(button => button.addEventListener("click", function () {
            const dark = root.getAttribute("data-theme") === "dark"
            if (dark) {
                root.removeAttribute("data-theme")
            } else {
                root.setAttribute("data-theme", "dark")
            }
            try {
                localStorage.setItem("theme", dark ? "light" : "dark")
            } catch (e) {}
        }))
        document.querySelectorAll(".callout-collapsible h3").forEach(h => h.addEventListener("click", function () {
            h.parentElement.classList.toggle("collapsed")
        }))
    })
})()
