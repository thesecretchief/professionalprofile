const fs = require('fs');
const path = require('path');

// 1. Rename folder
const oldFolder = path.join(__dirname, 'widget');
const newFolder = path.join(__dirname, 'widgets');
if (fs.existsSync(oldFolder) && !fs.existsSync(newFolder)) {
    fs.renameSync(oldFolder, newFolder);
    console.log('Renamed folder: widget -> widgets');
}

// 2. Update all references in project files
function updateReferences(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateReferences(fullPath);
        } else if (/\.(js|html|css|json|md)$/i.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const updated = content.replace(/widget\/menu-widget\.js/g, 'widgets/menu-widget.js');
            if (updated !== content) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated references in: ${fullPath}`);
            }
        }
    });
}
updateReferences(__dirname);

// 3. Remove static menu markup and inject widget in HTML files
function processHtmlFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processHtmlFiles(fullPath);
        } else if (file.endsWith('.html')) {
            let html = fs.readFileSync(fullPath, 'utf8');

            // Remove menu and social icons sections (between <!-- Menu Section --> and </section> after <!-- Social Icons Section -->)
            html = html.replace(
                /<!-- Menu Section -->[\s\S]*?<\/section>\s*<!-- Social Icons Section -->[\s\S]*?<\/section>/,
                ''
            );

            // Remove any duplicate widget script
            html = html.replace(/<script type="module">[\s\S]*?injectMenuWidget\(\);[\s\S]*?<\/script>/g, '');

            // Inject widget script before </body>
            const widgetScript = `
<script type="module">
  import { injectMenuWidget } from './widgets/menu-widget.js';
  injectMenuWidget();
</script>
`;
            if (!html.includes('injectMenuWidget()')) {
                html = html.replace(/<\/body>/i, `${widgetScript}\n</body>`);
                fs.writeFileSync(fullPath, html, 'utf8');
                console.log(`Processed: ${fullPath}`);
            }
        }
    });
}
processHtmlFiles(__dirname);

console.log('Migration complete.');