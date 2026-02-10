/**
 * Record Mouse Selector demo as screenshot sequence for GIF conversion.
 * Captures: landing → type query → search results appear
 *
 * Prerequisites:
 *   - Mouse Selector backend running on localhost:8001 (cd MVP_MouseSelector && python app.py)
 *   - Mouse Selector frontend running on localhost:3002 (cd MVP_MouseSelector/mouse-selector-ui && npm start)
 *   - puppeteer installed (npm install puppeteer)
 *
 * Usage:
 *   node record-mouse-demo.js
 *
 * Then convert frames to GIF:
 *   ffmpeg -framerate 10 -i /tmp/mouse-gif-frames/frame-%04d.png -vf "fps=10,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" /tmp/mouse-demo.gif
 *   gifsicle --lossy=80 -O3 /tmp/mouse-demo.gif -o images/mouse-selector-demo.gif
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import path from 'path';

const FRAMES_DIR = '/tmp/mouse-gif-frames';
const WIDTH = 1280;
const HEIGHT = 800;
let frameNum = 0;

async function screenshot(page, label) {
    const filename = path.join(FRAMES_DIR, `frame-${String(frameNum).padStart(4, '0')}.png`);
    await page.screenshot({ path: filename, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    console.log(`Frame ${frameNum}: ${label}`);
    frameNum++;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    await mkdir(FRAMES_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT });

    await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);

    // Landing page hold
    for (let i = 0; i < 10; i++) {
        await screenshot(page, 'landing');
        await sleep(100);
    }

    // Find the search input
    const inputSelector = 'input[type="text"], input[type="search"], textarea';
    await page.waitForSelector(inputSelector, { timeout: 10000 });
    await page.click(inputSelector);
    await sleep(300);

    const query = "tau pathology Alzheimer's model";

    // Type with screenshots every few characters
    for (let i = 0; i < query.length; i++) {
        await page.keyboard.type(query[i], { delay: 0 });
        if (i % 3 === 0 || i === query.length - 1) {
            await screenshot(page, `typing: ${query.substring(0, i + 1).slice(-25)}`);
        }
    }

    // Hold on typed query
    for (let i = 0; i < 5; i++) {
        await screenshot(page, 'query ready');
        await sleep(100);
    }

    // Click the Search button
    const searchBtn = await page.$('button');
    if (searchBtn) {
        await searchBtn.click();
    } else {
        await page.keyboard.press('Enter');
    }
    console.log('Search submitted...');

    // Capture results streaming in
    for (let i = 0; i < 40; i++) {
        await sleep(500);
        await screenshot(page, `results ${i}`);
    }

    // Final hold
    for (let i = 0; i < 15; i++) {
        await screenshot(page, 'final');
        await sleep(100);
    }

    await browser.close();
    console.log(`\nDone! ${frameNum} frames in ${FRAMES_DIR}`);
}

run().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
