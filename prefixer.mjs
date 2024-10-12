import fs from "fs";
import path from "path";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// Array of CSS files
const cssFiles = ["src/style1.css", "src/style2.css"];

cssFiles.forEach((file) => {
    // Read the CSS file content
    const readCssFile = fs.readFileSync(file, "utf-8");

    // Ensure the 'dist' directory exists
    const distDir = path.join("dist");
    // console.log(distDir);

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // Process the CSS with Autoprefixer
    postcss([autoprefixer])
        .process(readCssFile, {
            from: `src/${file}`,
        })
        .then((res) => {
            fs.writeFileSync(
                `dist/${file.split("/").pop().replace(".css", ".prefix.css")}`,
                res.css
            );
            console.log(`${file} prefixed successfully!`);
        })
        .catch((err) => console.error(err));
});