# SUSE Rancher - CVE scans portal

Rancher's CVE scans repository contains data and reports related to CVE
(vulnerability) scanning in Rancher, RKE2, K3s, Harvester, Longhorn and other
container images and cloud native solutions from SUSE.

# Scope

The CVE reports contained here are **applicable only to Rancher and other SUSE's
container and cloud native products and should not be used outside of this
context**.

Only the latest patch version of each products' supported release line and the
respective `dev`/`head`/`main` development branches are scanned. Older patch
versions and no longer supported (EOL - end-of-life) versions are not scanned.
Verify the supported versions in SUSE's [product support lifecycle] page.

# Documentation

The following knowledge base (KB) articles provide complementary documentation
about how to use the data provided here.

- [KB 000021646] - How to use SUSE Rancher Prime's CVE portal
- [KB 000021647] - How to inquire about CVEs in SUSE Rancher Prime products
- [KB 000021574] - How SUSE Rancher triage CVEs in software dependencies

# Tooling

[Trivy] is used to scan the container images for CVEs. The scans and reports are
updated daily based on internal automation used by the Rancher Security team.

# Severities

Only critical and high severity CVEs are displayed (internally we track all
severities). CVEs that had their CVSS severity rating changed, either decreased
or increased, will have the distinctive tag `*` close to its severity.

The severity (CVSS rating) of some CVEs in the portal might differ from the
original severity reported by some vendors and security scanners. This happens,
because SUSE [recalculates] the CVSS rating of CVEs based on criteria, like:
applicability and difficulty of the issue being exploited in the wild; how it
can actually affect the confidentiality, integrity and availability of SUSE's
products etc.

# VEX and false-positives

Known false-positives CVEs are displayed in the portal with its severity as
`none` and the status as `not affected`.

The false-positives are tracked by using [Rancher's VEX Hub] reports. Please
consult the applicable documentation on how to use the VEX reports.

# License

The SUSE Rancher CVE reports and scans data are provided by SUSE under the
Creative Commons license with Attribution (CC-BY-4.0). See the [license] for
more information.

<!-- Links -->
[KB 000021646]: https://www.suse.com/support/kb/doc/?id=000021646
[KB 000021647]: https://www.suse.com/support/kb/doc/?id=000021647
[KB 000021574]: https://www.suse.com/support/kb/doc/?id=000021574
[product support lifecycle]: https://www.suse.com/lifecycle/
[Trivy]: https://github.com/aquasecurity/trivy
[recalculates]: https://www.suse.com/security/cve/
[Rancher's VEX Hub]: https://github.com/rancher/vexhub
[license]: LICENSE
