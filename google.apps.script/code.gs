/**
 * SISTEMIKA DIGITAL - Company Profile
 * Founder: Aming Hermanto
 * Tagline: Membangun Sistem, Menggerakkan Bisnis
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('SISTEMIKA DIGITAL - Membangun Sistem, Menggerakkan Bisnis')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}