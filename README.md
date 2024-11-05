# SUSE Rancher - Scans portal

### Disclaimer: This code and the reports are still in beta, are subject to change at any time and should not be used in production environments.

Rancher's scans repository contains data and reports related to CVE
(vulnerability) scanning in Rancher, RKE2, K3s, Harvester, Longhorn and other
container images and cloud native solutions from SUSE.

**More information will be added soon.**

# Scope

The CVE reports contained here are **applicable only to Rancher and other SUSE's
container and cloud native products and should not be used outside of this
context**.

# Tooling

[Trivy] is used to scan the container images for CVEs. The scans and reports are
updated daily based on internal automation used by the Rancher Security team.

# VEX and false-positives

Known false-positives are removed by using [Rancher's VEX Hub reports]. Please
consult the applicable documentation on how to use the VEX reports.

# License

The SUSE Rancher CVE reports and scans data are provided by SUSE under the
Creative Commons license with Attribution (CC-BY-4.0). See the [license] for
more information.


[Trivy]: https://github.com/aquasecurity/trivy
[Rancher's VEX Hub reports]: https://github.com/rancher/vexhub
[license]: LICENSE
