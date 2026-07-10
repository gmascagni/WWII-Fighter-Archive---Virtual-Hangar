const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Ensure public/images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Map of local filenames to primary search queries and preferred filenames
const mappings = [
  // 1. P-51 Mustang
  { 
    local: 'p51_poster.jpg', 
    title: 'File:"Bottisham Four" - Four P-51 Mustangs fighters in flight.jpg', 
    search: 'Bottisham Four P-51 Mustangs in flight',
    width: 1024 
  },
  { 
    local: 'p51_noseart.jpg', 
    title: 'File:Tuskegee Airmen Rise Above Allegheny Co. Airport June 1, 2012 P-51 Mustang (7316545962).jpg', 
    search: 'Tuskegee Airmen P-51',
    width: 800 
  },
  { 
    local: 'p51_cockpit.jpg', 
    title: 'File:North American P-51D Mustang cockpit.jpg', 
    search: 'P-51 Mustang cockpit',
    width: 800 
  },

  // 2. Supermarine Spitfire
  { 
    local: 'spitfire_poster.jpg', 
    title: 'File:Supermarine Spitfire LF Mk IX C.jpg', 
    search: 'Supermarine Spitfire in flight',
    width: 1024 
  },
  { 
    local: 'spitfire_noseart.jpg', 
    title: 'File:Bobby Gibbes Spitfire on Morotai 1945 AWM OG2366.jpg', 
    search: 'Supermarine Spitfire nose art',
    width: 800 
  },
  { 
    local: 'spitfire_cockpit.jpg', 
    title: 'File:Spitfire cockpit.jpg', 
    search: 'Spitfire cockpit',
    width: 800 
  },

  // 3. P-38 Lightning
  { 
    local: 'p38_poster.jpg', 
    title: 'File:Lockheed P-38J Lightning in flight over California, circa in 1944.jpg', 
    search: 'P-38 Lightning in flight',
    width: 1024 
  },
  { 
    local: 'p38_noseart.jpg', 
    title: 'File:The P-38 Lightning... "Marge" (2826098695).jpg', 
    search: 'P-38 nose art',
    width: 800 
  },
  { 
    local: 'p38_cockpit.jpg', 
    title: 'File:Warbirds, Lightning P-38 cockpit and instrumentation.jpg', 
    search: 'P-38 Lightning cockpit',
    width: 800 
  },

  // 4. F6F Hellcat
  { 
    local: 'f6f_poster.jpg', 
    title: 'File:F6F-3 Hellcat in flight near NAS Patuxent River in February 1944.jpg', 
    search: 'F6F Hellcat in flight',
    width: 1024 
  },
  { 
    local: 'f6f_noseart.jpg', 
    title: 'File:Grumman F6F-5 Hellcats of VF-60 in flight, circa in 1944.jpg', 
    search: 'F6F Hellcat nose art snarling mouth',
    width: 800 
  },
  { 
    local: 'f6f_cockpit.jpg', 
    title: 'File:Grumman F6F-5K Hellcat (G-50) AN1185363.jpg', 
    search: 'F6F Hellcat cockpit',
    width: 800 
  },

  // 5. P-47 Thunderbolt
  { 
    local: 'p47_poster.jpg', 
    title: 'File:P47D 334th Fighter squadron 1944.jpg', 
    search: 'P47D 334th Fighter squadron 1944',
    width: 1024 
  },
  { 
    local: 'p47_noseart.jpg', 
    title: 'File:Republic P-47D Thunderbolt NoseArt Airpower NMUSAF 25Sep09 (14413184948).jpg', 
    search: 'P-47 Thunderbolt nose art',
    width: 800 
  },
  { 
    local: 'p47_cockpit.jpg', 
    title: 'File:Francis S. Gabreski in cockpit of his P-47 Thunderbolt, July 1944 (342-C-K2170).jpg', 
    search: 'Francis S. Gabreski in cockpit of his P-47 Thunderbolt',
    width: 1024 
  },

  // 6. P-40 Warhawk
  { 
    local: 'p40_poster.jpg', 
    title: 'File:Curtiss P-40, ¾-front view, in flight (00910460 023).jpg', 
    search: 'P-40 Warhawk in flight',
    width: 1024 
  },
  { 
    local: 'p40_noseart.jpg', 
    title: 'File:P-40 Flying Tiger.jpg', 
    search: 'P-40 shark mouth nose art',
    width: 800 
  },
  { 
    local: 'p40_cockpit.jpg', 
    title: 'File:Cockpit of Curtiss P-40 Warhawk 1941 (14569473480).jpg', 
    search: 'P-40 cockpit instrument panel',
    width: 800 
  },

  // 7. F8F Bearcat
  { 
    local: 'f8f_poster.jpg', 
    title: 'File:Grumman F8F Bearcat, Chino, California.jpg', 
    search: 'F8F Bearcat in flight',
    width: 1024 
  },
  { 
    local: 'f8f_noseart.jpg', 
    title: 'File:Grumman F8F Bearcat Blue Angels.jpg', 
    search: 'F8F Bearcat Blue Angels',
    width: 800 
  },
  { 
    local: 'f8f_cockpit.jpg', 
    title: 'File:F8F-1 in NACA wind tunnel 1946.jpeg', 
    search: 'F8F Bearcat cockpit',
    width: 800 
  },

  // Pilots
  { 
    local: 'pilot_benjamin_o_davis.jpg', 
    title: 'File:Benjamin O. Davis, Jr..jpg', 
    search: 'Benjamin O. Davis, Jr. portrait',
    width: 400 
  },
  { 
    local: 'pilot_lee_archer.jpg', 
    title: 'File:Lee Archer Tuskegee Airmen.jpg', 
    search: 'Lee Archer Tuskegee',
    width: 400 
  },
  { 
    local: 'pilot_charles_b_hall.jpg', 
    title: 'File:"Capts. Lemuel R. Custis (left) and Charles B. Hall, of the 99th Fighter Squadron of the U.S. Army Air Forces, chat whil - NARA - 535767.jpg', 
    search: 'Capts. Lemuel R. Custis (left) and Charles B. Hall, of the 99th Fighter Squadron of the U.S. Army Air Forces, chat whil',
    width: 400 
  },
  { 
    local: 'pilot_douglas_bader.jpg', 
    title: 'File:Douglas Bader.jpg', 
    search: 'Douglas Bader fighter pilot RAF',
    width: 400 
  },
  { 
    local: 'pilot_richard_bong.jpg', 
    title: 'File:Richard Bong photo portrait head and shoulders.jpg', 
    search: 'Richard Bong portrait',
    width: 400 
  },
  { 
    local: 'pilot_david_mccampbell.jpg', 
    title: 'File:David McCampbell.jpg', 
    search: 'David McCampbell pilot',
    width: 400 
  },
  { 
    local: 'pilot_francis_gabreski.jpg', 
    title: 'File:Francis Gabreski color photo in pilot suit.jpg', 
    search: 'Francis Gabreski pilot',
    width: 400 
  },
  { 
    local: 'pilot_tex_hill.jpg', 
    title: 'File:Colonel David "Tex" Hill (cropped).jpg', 
    search: 'Tex Hill AVG pilot',
    width: 400 
  },
  { 
    local: 'pilot_roy_voris.jpg', 
    title: 'File:Captain Roy M Voris 2nd Tour Blue Angels.jpg', 
    search: 'Roy M Voris Blue Angels',
    width: 400 
  },

  // 8. F4U Corsair (added)
  {
    local: 'f4u_poster.jpg',
    title: 'File:Vought F4U-4 Corsair in flight c1952.jpg',
    search: 'Vought F4U-4 Corsair in flight',
    width: 1024
  },
  {
    local: 'f4u_noseart.jpg',
    title: 'File:Vought F4U Corsair Nose Art Lulubelle.jpg',
    search: 'Vought F4U Corsair Nose Art',
    width: 800
  },
  {
    local: 'f4u_cockpit.jpg',
    title: 'File:Vought F4U-1 Corsair cockpit instrument panel.jpg',
    search: 'Vought F4U-1 Corsair cockpit',
    width: 800
  },
  {
    local: 'pilot_pappy_boyington.jpg',
    title: 'File:Pappy Boyington WWII.jpg',
    search: 'Pappy Boyington portrait',
    width: 400
  },

  // Registry-Only Warbirds (added)
  {
    local: 'hurricane_poster.jpg',
    title: 'File:Hawker Hurricane Mk I R4118 in flight.jpg',
    search: 'Hawker Hurricane Mk I in flight',
    width: 1024
  },
  {
    local: 'b25_poster.jpg',
    title: 'File:North American B-25J Mitchell in flight.jpg',
    search: 'B-25 Mitchell in flight',
    width: 1024
  },
  {
    local: 'mosquito_poster.jpg',
    title: 'File:De Havilland Mosquito in flight.jpg',
    search: 'De Havilland Mosquito in flight',
    width: 1024
  }
];

// Simple helper to wait / sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'WarbirdApp/1.0 (gmascagni@gmail.com; http://example.com)'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'WarbirdApp/1.0 (gmascagni@gmail.com; http://example.com)'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: status code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function getImageUrl(title, width) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
  const result = await fetchJson(apiUrl);
  const pages = result.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId === '-1') {
    return null; // Page not found
  }
  const imageinfo = pages[pageId].imageinfo;
  if (!imageinfo || imageinfo.length === 0) {
    return null;
  }
  return imageinfo[0].thumburl || imageinfo[0].url;
}

// Searches for a query and strictly filters out non-image extensions (.pdf, .svg, .djvu, etc)
async function searchFilename(query) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
  try {
    const result = await fetchJson(searchUrl);
    if (result.query && result.query.search && result.query.search.length > 0) {
      // Find the first search result that is actually an image (.jpg, .jpeg, .png, .webp)
      const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
      for (const res of result.query.search) {
        const title = res.title;
        const ext = path.extname(title).toLowerCase();
        if (allowedExts.includes(ext)) {
          return title;
        }
      }
    }
  } catch (err) {
    console.error(`  Search failed for query "${query}": ${err.message}`);
  }
  return null;
}

async function run() {
  console.log('Starting download of authentic WWII historical photos with rate limit padding (2000ms delay between requests)...\n');
  
  for (const item of mappings) {
    const destPath = path.join(IMAGES_DIR, item.local);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      console.log(`  File [${item.local}] already exists. Skipping.`);
      console.log('--------------------------------------------------');
      continue;
    }
    console.log(`Processing [${item.local}]...`);
    
    // Check if we already have a valid non-empty file. If it's a valid large download, we don't necessarily have to re-download if we already succeeded.
    // However, to make absolutely sure everything is correctly resolved, we'll download if missing, or if it failed before. Let's force download to be absolutely safe, but with a robust delay.
    let url = null;
    
    // 1. Try exact predefined title
    try {
      url = await getImageUrl(item.title, item.width);
      await sleep(2000); // Strict rate-limit padding after API check
    } catch (e) {
      console.log(`  Failed getting image url for direct title: ${e.message}`);
    }
    
    // 2. If direct title not found, try search fallback
    if (!url && item.search) {
      console.log(`  Title "${item.title}" not resolved. Querying search fallback for: "${item.search}"...`);
      const foundTitle = await searchFilename(item.search);
      await sleep(2000); // Rate-limit padding
      
      if (foundTitle) {
        console.log(`  Resolved alternative title: "${foundTitle}"`);
        try {
          url = await getImageUrl(foundTitle, item.width);
          await sleep(2000); // Rate-limit padding
        } catch (e) {
          console.log(`  Failed getting alternative image url: ${e.message}`);
        }
      }
    }
    
    // 3. Fallback search on title as last resort
    if (!url) {
      const titleQuery = item.title.replace('File:', '').replace(/\.(jpg|png|jpeg)$/i, '');
      console.log(`  Still no URL. Trying last-resort search on title terms: "${titleQuery}"...`);
      const foundTitle = await searchFilename(titleQuery);
      await sleep(2000); // Rate-limit padding
      if (foundTitle) {
        console.log(`  Resolved last-resort title: "${foundTitle}"`);
        try {
          url = await getImageUrl(foundTitle, item.width);
          await sleep(2000); // Rate-limit padding
        } catch (e) {
          console.log(`  Failed last-resort image url: ${e.message}`);
        }
      }
    }
    
    if (url) {
      try {
        console.log(`  Downloading from: ${url}`);
        await downloadFile(url, destPath);
        const stats = fs.statSync(destPath);
        console.log(`  ==> Successfully downloaded [${item.local}] (${(stats.size / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`  ==> Error downloading [${item.local}]: ${err.message}`);
      }
    } else {
      console.error(`  ==> Critical: Could not resolve any image URL for "${item.title}"`);
    }
    console.log('--------------------------------------------------');
    await sleep(2000); // Rate-limit padding between items
  }
  
  console.log('\nAll downloads complete!');
}

run().catch(console.error);
