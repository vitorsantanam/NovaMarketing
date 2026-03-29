<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>Sitemap XML - Nova Marketing</title>
				<style type="text/css">
					body { font-family: sans-serif; padding: 40px; background: #f8fafc; }
					.container { max-width: 1000px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 20px; box-shadow: 0 10px 15px rgba(0,0,0,0.05); }
					h1 { margin-top: 0; color: #1e293b; }
					table { width: 100%; border-collapse: collapse; margin-top: 30px; }
					th { text-align: left; padding: 15px; background: #f1f5f9; color: #475569; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
					td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 13px; vertical-align: top; }
					.lang-link { display: block; margin-bottom: 2px; font-size: 11px; }
					.lang-code { font-weight: bold; color: #64748b; margin-right: 5px; }
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Sitemap XML</h1>
					<p>Nova Marketing - Mapa del sitio web.</p>
					<table>
						<thead>
							<tr>
								<th width="50%">URL</th>
								<th width="30%">TRADUCCIONES (HREFLANG)</th>
								<th width="20%">ÚLTIMA MODIFICACIÓN</th>
							</tr>
						</thead>
						<tbody>
							<!-- ÍNDICE -->
							<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
								<tr>
									<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
									<td>-</td>
									<td><xsl:value-of select="sitemap:lastmod"/></td>
								</tr>
							</xsl:for-each>
							<!-- URLS -->
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
									<td>
										<xsl:for-each select="xhtml:link">
											<div class="lang-link">
												<span class="lang-code"><xsl:value-of select="@hreflang"/>:</span>
												<xsl:value-of select="@href"/>
											</div>
										</xsl:for-each>
										<xsl:if test="not(xhtml:link)">-</xsl:if>
									</td>
									<td><xsl:value-of select="sitemap:lastmod"/></td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
