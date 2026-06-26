import os
import re
import json

fonts_dir = "fonts"
css_file = "css/fonts.css"
js_file = "js/control-panel.js"

fonts = []
css_output = ""

# Weights mapping
weight_map = {
    "Thin": 100,
    "ExtraLight": 200,
    "Light": 300,
    "Regular": 400,
    "Medium": 500,
    "SemiBold": 600,
    "Bold": 700,
    "ExtraBold": 800,
    "Black": 900
}

# Scan fonts
for file in sorted(os.listdir(fonts_dir)):
    if not (file.endswith(".ttf") or file.endswith(".otf") or file.endswith(".woff2")): continue
    if file.startswith("."): continue
    
    path = f"../fonts/{file}"
    format_type = "woff2" if file.endswith(".woff2") else ("opentype" if file.endswith(".otf") else "truetype")
    
    # Parse name and weight
    base = os.path.splitext(file)[0]
    
    # Split by hyphen if exists
    if "-" in base:
        family_part, weight_part = base.rsplit("-", 1)
        # Clean family part
        family = family_part
        if family == "thmanyahsans": family = "Thmanyah Sans"
        elif family == "thmanyahserifdisplay": family = "Thmanyah Serif Display"
        elif family == "thmanyahseriftext": family = "Thmanyah Serif Text"
        elif family == "TheYearofTheCamel": family = "The Year of The Camel"
        elif family == "TheYearofHandicrafts": family = "The Year of Handicrafts"
        
        weight = weight_map.get(weight_part.split("_")[0], 400)
        font_name = f"{family} - {weight_part.split('_')[0]}"
        css_family = font_name
    else:
        # No hyphen
        family = base
        if family == "ArabicUITextSemiBold": family = "Arabic UI Text"; font_name = "Arabic UI Text - SemiBold"; weight = 600
        elif family == "AlSharkTitle": family = "AlShark Title"; font_name = "AlShark Title"; weight = 400
        else: font_name = family; weight = 400
        css_family = font_name

    css_output += f"""
@font-face {{
    font-family: "{font_name}";
    src: url("{path}") format("{format_type}");
    font-weight: {weight};
    font-style: normal;
    font-display: swap;
}}
"""
    fonts.append(font_name)

# Overwrite fonts.css
with open(css_file, "w", encoding="utf-8") as f:
    f.write(css_output)

# Update control-panel.js
with open(js_file, "r", encoding="utf-8") as f:
    js_content = f.read()

# Replace preferredFonts and fontList logic
font_list_json = json.dumps(fonts, ensure_ascii=False)
js_content = re.sub(
    r"const preferredFonts = \[.*?\];",
    f"const preferredFonts = [];",
    js_content,
    flags=re.DOTALL
)
js_content = re.sub(
    r"if \(fontList\.length === 0\) \{\s+fontList = \[\s*'.*?'\s*\];\s+\}",
    f"fontList = {font_list_json};",
    js_content,
    flags=re.DOTALL
)

with open(js_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated CSS for {len(fonts)} fonts.")
