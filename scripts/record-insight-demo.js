/**
 * Record Insight demo as screenshot sequence for GIF conversion.
 * Captures: landing → type query → results streaming in
 *
 * Prerequisites:
 *   - Insight backend running on localhost:3000 (cd MVP_Insight && npm start)
 *   - puppeteer installed (npm install puppeteer)
 *
 * Usage:
 *   node record-insight-demo.js
 *
 * Then convert frames to GIF:
 *   ffmpeg -framerate 10 -i /tmp/insight-gif-frames/frame-%04d.png -vf "fps=10,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" /tmp/insight-demo.gif
 *   gifsicle --lossy=80 -O3 /tmp/insight-demo.gif -o images/insight-demo.gif
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import path from 'path';

const FRAMES_DIR = '/tmp/insight-gif-frames';
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

    // Navigate to Insight
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);

    // Capture the landing page (hold for ~1 second = 10 frames at 10fps)
    for (let i = 0; i < 10; i++) {
        await screenshot(page, 'landing');
        await sleep(100);
    }

    // Find the chat input and type a query
    // Look for the textarea or input
    const inputSelector = 'textarea, input[type="text"], [contenteditable="true"]';
    await page.waitForSelector(inputSelector, { timeout: 10000 });

    const query = "Compare BRAF mutation frequency in melanoma vs colorectal cancer";

    // Type the query character by character with realistic delay
    await page.click(inputSelector);
    await sleep(300);
    await screenshot(page, 'input focused');

    // Type with screenshots every few characters
    for (let i = 0; i < query.length; i++) {
        await page.keyboard.type(query[i], { delay: 0 });
        if (i % 4 === 0 || i === query.length - 1) {
            await screenshot(page, `typing: ${query.substring(0, i + 1).slice(-30)}`);
        }
    }

    // Hold on the typed query for a moment
    for (let i = 0; i < 5; i++) {
        await screenshot(page, 'query ready');
        await sleep(100);
    }

    // Submit the query (press Enter)
    await page.keyboard.press('Enter');
    console.log('Query submitted, waiting for results...');

    // Capture the streaming response
    // Take screenshots every 500ms for ~30 seconds to capture the streaming
    for (let i = 0; i < 60; i++) {
        await sleep(500);
        await screenshot(page, `streaming ${i}`);
    }

    // Final hold on completed results
    for (let i = 0; i < 15; i++) {
        await screenshot(page, 'final result');
        await sleep(100);
    }

    await browser.close();
    console.log(`\nDone! ${frameNum} frames captured in ${FRAMES_DIR}`);
}

run().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
