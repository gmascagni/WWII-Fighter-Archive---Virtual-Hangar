const https = require('https');

const candidates = [
  // P-51 Mustang
  { key: 'p51_cockpit', query: 'P-51 Mustang cockpit' },
  { key: 'p51_noseart', query: 'Tuskegee Airmen P-51' },
  { key: 'p51_poster', query: 'P-51 Mustang in flight' },

  // Spitfire Mk IX
  { key: 'spitfire_cockpit', query: 'Spitfire cockpit' },
  { key: 'spitfire_noseart', query: 'Spitfire nose art' },
  { key: 'spitfire_poster', query: 'Supermarine Spitfire Mk IX' },

  // P-38 Lightning
  { key: 'p38_cockpit', query: 'P-38 Lightning cockpit' },
  { key: 'p38_noseart', query: 'P-38 Marge' },
  { key: 'p38_poster', query: 'Lockheed P-38J Lightning in flight' },

  // F6F Hellcat
  { key: 'f6f_cockpit', query: 'F6F Hellcat cockpit' },
  { key: 'f6f_noseart', query: 'F6F Hellcat VF-27' },
  { key: 'f6f_poster', query: 'F6F-3 Hellcat in flight' },

  // P-47 Thunderbolt
  { key: 'p47_cockpit', query: 'Francis S. Gabreski P-47 cockpit' },
  { key: 'p47_noseart', query: 'P-47 Thunderbolt nose art' },
  { key: 'p47_poster', query: 'P47D 334th Fighter' },

  // P-40 Warhawk
  { key: 'p40_cockpit', query: 'Cockpit of Curtiss P-40' },
  { key: 'p40_noseart', query: 'P-40 Flying Tiger nose art' },
  { key: 'p40_poster', query: 'Curtiss P-40 in flight' },

  // F8F Bearcat
  { key: 'f8f_cockpit', query: 'F8F Bearcat cockpit' },
  { key: 'f8f_noseart', query: 'Grumman F8F Bearcat Blue Angels' },
  { key: 'f8f_poster', query: 'Grumman F8F Bearcat Chino' }
];

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

async function getImageUrl(title, width = 1024) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
  const result = await fetchJson(apiUrl);
  const pages = result.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId === '-1') return null;
  const imageinfo = pages[pageId].imageinfo;
  return imageinfo && imageinfo[0] ? (imageinfo[0].thumburl || imageinfo[0].url) : null;
}

async function run() {
  console.log('--- STARTING CANDIDATE LOOKUPS ---\n');
  for (const c of candidates) {
    console.log(`Searching for "${c.query}"...`);
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(c.query)}&srnamespace=6&srlimit=5&format=json`;
    try {
      const res = await fetchJson(searchUrl);
      if (res.query && res.query.search && res.query.search.length > 0) {
        console.log(`  Found ${res.query.search.length} files:`);
        for (const s of res.query.search) {
          const title = s.title;
          const url = await getImageUrl(title, 1024);
          console.log(`  - Title: "${title}"`);
          console.log(`    URL: ${url}`);
        }
      } else {
        console.log('  ❌ NO RESULTS FOUND');
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
    console.log('-------------------------------------------');
    await new Promise(r => setTimeout(r, 100));
  }
}

run();
