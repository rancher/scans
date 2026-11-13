// Builds a compact "images in this report" index at the top of a per-release
// page. It is purely additive UI over the existing flat table -- it reads the
// rendered rows, assigns a jump anchor to the first row of each image, and
// renders a summary card with per-image counts and jump links so users can
// quickly find an individual image without scrolling the big table.
(function () {
  function slug(s) {
    return "img-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("cves_table");
    var mount = document.getElementById("image-index");
    if (!table || !mount) return;

    var rows = table.rows;
    // Column layout differs between Rancher (has "Mirrored") and K3s. Detect the
    // severity/status columns from the header instead of hard-coding indexes.
    var head = rows[0].cells;
    var sevCol = -1, imgCol = 0;
    for (var h = 0; h < head.length; h++) {
      var t = head[h].textContent.trim().toUpperCase();
      if (t.indexOf("SEVERITY") === 0) sevCol = h;
    }

    var order = [];
    var byImage = {};
    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].cells;
      if (!cells.length) continue;
      var image = cells[imgCol].textContent.trim();
      if (!byImage[image]) {
        byImage[image] = { image: image, critical: 0, high: 0, vexed: 0, anchor: slug(image) };
        order.push(image);
        rows[i].id = byImage[image].anchor; // anchor on first row of the image
      }
      var rec = byImage[image];
      if (rows[i].classList.contains("not_affected")) {
        rec.vexed++;
      } else if (sevCol >= 0) {
        var sev = cells[sevCol].textContent.trim().toUpperCase();
        if (sev.indexOf("CRITICAL") === 0) rec.critical++;
        else if (sev.indexOf("HIGH") === 0) rec.high++;
      }
    }

    if (!order.length) return;

    // Worst-first: critical, then high, then vexed count.
    order.sort(function (a, b) {
      var x = byImage[a], y = byImage[b];
      return (y.critical - x.critical) || (y.high - x.high) || (y.vexed - x.vexed) ||
        a.localeCompare(b);
    });

    var details = document.createElement("details");
    details.className = "image-index-card";
    details.open = true;

    var summary = document.createElement("summary");
    var toggleLabel = document.createElement("span");
    toggleLabel.className = "toggle-label";
    toggleLabel.textContent = "Images in this report";
    var countBadge = document.createElement("span");
    countBadge.className = "image-index-count";
    countBadge.textContent = order.length;
    summary.appendChild(toggleLabel);
    summary.appendChild(document.createTextNode(" "));
    summary.appendChild(countBadge);
    details.appendChild(summary);

    var listDiv = document.createElement("div");
    listDiv.className = "image-index-list";
    for (var k = 0; k < order.length; k++) {
      var r = byImage[order[k]];
      var item = document.createElement("a");
      item.className = "image-index-item";
      item.href = "#" + r.anchor; // anchor is already sanitized by slug()
      var badgesSpan = document.createElement("span");
      badgesSpan.className = "image-index-badges";
      if (r.critical) {
        var crit = document.createElement("span");
        crit.className = "sev sev-CRITICAL";
        crit.textContent = r.critical + " C";
        badgesSpan.appendChild(crit);
      }
      if (r.high) {
        var high = document.createElement("span");
        high.className = "sev sev-HIGH";
        high.textContent = r.high + " H";
        badgesSpan.appendChild(high);
      }
      if (r.vexed) {
        var vex = document.createElement("span");
        vex.className = "status status-clear";
        vex.textContent = r.vexed + " VEXed";
        badgesSpan.appendChild(vex);
      }
      item.appendChild(badgesSpan);
      var code = document.createElement("code");
      code.textContent = r.image;
      item.appendChild(code);
      listDiv.appendChild(item);
    }
    details.appendChild(listDiv);
    mount.appendChild(details);
  });
})();
