import os
import re
import urllib.request

FONT_URL = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;600;700&family=Tajawal:wght@400;500;700&family=Almarai:wght@400;700;800&family=Changa:wght@400;600;700&display=swap"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

req = urllib.request.Request(FONT_URL, headers={'User-Agent': USER_AGENT})
with urllib.request.urlopen(req) as response:
    css_content = response.read().decode('utf-8')

urls = re.findall(r'url\((https://[^)]+\.woff2)\)', css_content)
os.makedirs('css/fonts', exist_ok=True)

for i, url in enumerate(urls):
    font_filename = f"font_{i}.woff2"
    font_path = os.path.join('css/fonts', font_filename)
    print(f"Downloading {url} to {font_path}...")
    urllib.request.urlretrieve(url, font_path)
    css_content = css_content.replace(url, f"fonts/{font_filename}")

with open('css/fonts.css', 'w') as f:
    f.write(css_content)

print("Fonts downloaded and css/fonts.css generated successfully.")
