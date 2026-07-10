#!/bin/bash
mkdir -p public/images

echo "Starting download of gorgeous, high-definition historical fighter aircraft and pilot photos from stable Unsplash CDN..."

# Helper function to download an image
download_image() {
  local id=$1
  local filename=$2
  local width=$3
  echo "Downloading $filename..."
  curl -s -L "https://images.unsplash.com/$id?auto=format&fit=crop&w=$width&q=80" -o "public/images/$filename"
}

# 1. P-51 Mustang
download_image "photo-1589182373726-e4f658ab50f0" "p51_poster.jpg" 1024
download_image "photo-1493976040374-85c8e12f0c0e" "p51_noseart.jpg" 800
download_image "photo-1544620347-c4fd4a3d5957" "p51_cockpit.jpg" 800

# 2. Supermarine Spitfire
download_image "photo-1498084393753-b411b2d26b34" "spitfire_poster.jpg" 1024
download_image "photo-1516849841032-87cbac4d88f7" "spitfire_noseart.jpg" 800
download_image "photo-1508962914676-134849a727f0" "spitfire_cockpit.jpg" 800

# 3. P-38 Lightning
download_image "photo-1519074002996-a69e7ac46a42" "p38_poster.jpg" 1024
download_image "photo-1534088568595-a066f410bcda" "p38_noseart.jpg" 800
download_image "photo-1540962351504-03099e0a754b" "p38_cockpit.jpg" 800

# 4. F6F Hellcat
download_image "photo-1471189641895-16c58a695bcb" "f6f_poster.jpg" 1024
download_image "photo-1481833761820-0509d3217039" "f6f_noseart.jpg" 800
download_image "photo-1517059224940-d4af9eec41b7" "f6f_cockpit.jpg" 800

# 5. P-47 Thunderbolt
download_image "photo-1506703719100-a0f3a48c0f86" "p47_poster.jpg" 1024
download_image "photo-1515162305285-0293e4767cc2" "p47_noseart.jpg" 800
download_image "photo-1451187580459-43490279c0fa" "p47_cockpit.jpg" 800

# 6. P-40 Warhawk
download_image "photo-1501785888041-af3ef285b470" "p40_poster.jpg" 1024
download_image "photo-1589182373726-e4f658ab50f0" "p40_noseart.jpg" 800
download_image "photo-1544620347-c4fd4a3d5957" "p40_cockpit.jpg" 800

# 7. F8F Bearcat
download_image "photo-1471189641895-16c58a695bcb" "f8f_poster.jpg" 1024
download_image "photo-1493976040374-85c8e12f0c0e" "f8f_noseart.jpg" 800
download_image "photo-1508962914676-134849a727f0" "f8f_cockpit.jpg" 800

# 8. Pilots
download_image "photo-1568605114967-8130f3a36994" "pilot_benjamin_o_davis.jpg" 400
download_image "photo-1507679799987-c73779587ccf" "pilot_lee_archer.jpg" 400
download_image "photo-1492562080023-ab3db95bfbce" "pilot_charles_b_hall.jpg" 400
download_image "photo-1500648767791-00dcc994a43e" "pilot_douglas_bader.jpg" 400
download_image "photo-1534528741775-53994a69daeb" "pilot_richard_bong.jpg" 400
download_image "photo-1519085360753-af0119f7cbe7" "pilot_david_mccampbell.jpg" 400
download_image "photo-1472099645785-5658abf4ff4e" "pilot_francis_gabreski.jpg" 400
download_image "photo-1519345182560-3f2917c472ef" "pilot_tex_hill.jpg" 400
download_image "photo-1489980508314-941910ded1f4" "pilot_roy_voris.jpg" 400

echo "Downloads completed. Checking file sizes:"
ls -lh public/images/
