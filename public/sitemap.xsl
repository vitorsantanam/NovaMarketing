<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>Sitemap XML - Nova Marketing</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						margin: 0;
						padding: 40px;
						background-color: #f8fafc;
					}
					.container {
						max-width: 1000px;
						margin: 0 auto;
						background: #fff;
						padding: 40px;
						border-radius: 24px;
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
					}
					h1 {
						color: #1a202c;
						font-size: 28px;
						font-weight: 800;
						margin-bottom: 24px;
						letter-spacing: -0.025em;
					}
					p {
						font-size: 14px;
						color: #64748b;
						margin-bottom: 32px;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 20px;
					}
					th {
						text-align: left;
						padding: 12px 16px;
						background: #f1f5f9;
						color: #475569;
						font-size: 12px;
						font-weight: 700;
						text-transform: uppercase;
						letter-spacing: 0.05em;
						border-bottom: 2px solid #e2e8f0;
					}
					td {
						padding: 16px;
						border-bottom: 1px solid #f1f5f9;
						font-size: 14px;
					}
					tr:hover td {
						background: #f8fafc;
					}
					a {
						color: #3b82f6;
						text-decoration: none;
						font-weight: 500;
					}
					a:hover {
						text-decoration: underline;
					}
					.priority-high { color: #059669; font-weight: 700; }
					.priority-mid { color: #d97706; }
					.priority-low { color: #64748b; }
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Sitemap XML</h1>
					<p>Este es el sitemap XML de <strong>Nova Marketing</strong>, generado automáticamente para motores de búsqueda como Google o Bing. Contiene todas las páginas públicas del sitio para asegurar una indexación óptima.</p>
					
					<table>
						<thead>
							<tr>
								<th>URL</th>
								<th>Prioridad</th>
								<th>Frecuencia</th>
								<th>Última Modificación</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td>
										<xsl:variable name="itemURL">
											<xsl:value-of select="sitemap:loc"/>
										</xsl:variable>
										<a href="{$itemURL}">
											<xsl:value-of select="sitemap:loc"/>
										</a>
									</td>
									<td>
										<xsl:variable name="priority" select="sitemap:priority"/>
										<span class="priority-mid">
											<xsl:if test="$priority &gt; 0.7"><xsl:attribute name="class">priority-high</xsl:attribute></xsl:if>
											<xsl:if test="$priority &lt; 0.5"><xsl:attribute name="class">priority-low</xsl:attribute></xsl:if>
											<xsl:value-of select="sitemap:priority"/>
										</span>
									</td>
									<td>
										<xsl:value-of select="sitemap:changefreq"/>
									</td>
									<td>
										<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
