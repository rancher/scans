// Draws the trend line of each `.trend` element, with ECharts, from its
// `data-trend` attribute: the comma separated amounts, oldest first.
(function () {
    if (typeof echarts === "undefined") {
        return
    }
    const charts = []
    const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

    function render() {
        charts.splice(0).forEach(c => c.dispose())
        document.querySelectorAll(".trend").forEach(el => {
            const values = el.dataset.trend.split(",").map(Number)
            if (values.some(Number.isNaN)) {
                return
            }
            // More CVEs is bad, fewer is good.
            const diff = values[values.length - 1] - values[0]
            const color = css(diff > 0 ? "--sev-high-bg" : diff < 0 ? "--status-clear-text" : "--muted")
            const chart = echarts.init(el)
            chart.setOption({
                animation: false,
                grid: { left: 2, right: 2, top: 2, bottom: 2 },
                xAxis: { type: "category", show: false, boundaryGap: false },
                yAxis: { type: "value", show: false, scale: true },
                series: [{ type: "line", data: values, showSymbol: false, silent: true, lineStyle: { width: 2, color: color } }]
            })
            charts.push(chart)
        })
    }

    render()
    // The theme toggle only sets an attribute, so the colors are applied again.
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
})()
