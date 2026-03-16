# Orchestrated Biosciences — Company Website

Marketing website for [Orchestrated Biosciences](https://orchestrated.bio), serving product pages, blog, team bios, and company information.

## Tech Stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| Framework   | [Jekyll](https://jekyllrb.com/) via the `github-pages` gem |
| Styling     | [Tailwind CSS](https://tailwindcss.com/) (CDN, no build)   |
| JavaScript  | Vanilla JS (no framework)                                  |
| Hosting     | GitHub Pages                                                |
| Domain      | `orchestrated.bio` (DNS via Porkbun)                        |
| Plugins     | jekyll-seo-tag, jekyll-sitemap, jekyll-feed, jekyll-paginate, jekyll-redirect-from |

There is **no Node.js, npm, or Webpack/Vite build step**. Tailwind is loaded from the CDN with a custom config defined in `_includes/tailwind-config.html`.

## File Structure

```
.
├── _config.yml              # Jekyll site configuration
├── _data/
│   ├── navigation.yml       # Navbar & footer links
│   ├── products.yml         # Product catalog (drives product cards)
│   └── team.yml             # Team member bios
├── _includes/
│   ├── head.html            # <head> tag (meta, Tailwind CDN, fonts)
│   ├── header.html          # Navbar
│   ├── footer.html          # Footer
│   ├── tailwind-config.html # Tailwind theme (brand colors, fonts)
│   ├── blog-card.html       # Blog post card partial
│   ├── product-card.html    # Product card partial
│   ├── team-card.html       # Team member card partial
│   ├── cta-section.html     # Call-to-action banner
│   ├── cookie-consent.html  # Cookie consent banner
│   └── seo-schema.html      # JSON-LD structured data
├── _layouts/
│   ├── default.html         # Base layout (head + header + footer)
│   ├── home.html            # Homepage
│   ├── product.html         # Individual product page
│   ├── post.html            # Blog post
│   ├── blog.html            # Blog index (paginated)
│   └── page.html            # Generic page (privacy, terms, etc.)
├── _posts/                  # Blog posts (Markdown, YYYY-MM-DD-title.md)
├── products/                # Product pages (HTML, one per product)
│   ├── ai-radar.html
│   ├── bioventure.html
│   ├── mouse-selector.html
│   └── spatial-advisor.html
├── assets/
│   ├── css/custom.css       # Custom styles beyond Tailwind
│   └── js/
│       ├── main.js          # Site-wide JS (nav toggle, animations)
│       └── cookie-consent.js
├── images/                  # All images (logos, demos, team photos, OG)
├── blog/                    # Blog index page
├── index.html               # Homepage
├── privacy-policy.md        # Privacy policy
├── terms.md                 # Terms of service
├── CNAME                    # Custom domain for GitHub Pages
├── robots.txt               # Search engine crawl rules
├── Gemfile                  # Ruby dependencies (just github-pages)
└── scripts/
    └── deploy.sh            # Deployment helper script
```

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/orchestrated-bio/orchestrated-bio.github.io.git
cd orchestrated-bio.github.io

# 2. Install Ruby (macOS system Ruby 2.6 is too old — you need 3.x)
brew install ruby

# 3. Add Homebrew Ruby to your PATH (add these to ~/.zshrc or ~/.bashrc, then restart your terminal)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"

# 4. Verify Ruby (should show 3.x, NOT 2.6)
ruby --version

# 5. Install Bundler and project dependencies
gem install bundler
bundle install

# 6. Start the dev server
bundle exec jekyll serve --livereload
```

Open **http://localhost:4000**. Changes auto-rebuild on save (except `_config.yml` — restart the server for that).

### Troubleshooting

| Problem | Fix |
| --- | --- |
| `ruby --version` still shows 2.6 | You're using macOS system Ruby. Make sure the `export PATH` lines are in your shell profile and you restarted your terminal. |
| `bundle install` permission errors | Don't use `sudo`. Ensure Homebrew Ruby is first in your PATH (see step 3). |
| `jekyll: command not found` | Run `bundle exec jekyll serve`, not just `jekyll serve`. |
| Port 4000 already in use | Use `bundle exec jekyll serve --port 4001` or kill the other process. |

### Common Tasks

| Task | How |
| --- | --- |
| Add a blog post | Create `_posts/YYYY-MM-DD-title.md` with front matter |
| Add a product | Add entry to `_data/products.yml`, create `products/slug.html` |
| Edit navigation | Edit `_data/navigation.yml` |
| Update team bios | Edit `_data/team.yml` |
| Change brand colors/fonts | Edit `_includes/tailwind-config.html` |
| Add custom CSS | Edit `assets/css/custom.css` |

## Deployment

Push to `main` and GitHub Pages builds and deploys automatically — no Actions workflow needed.

```bash
git add -A
git commit -m "Your commit message"
git push origin main
```

The site typically goes live within 1–2 minutes. You can check build status in the repo's **Actions** tab on GitHub.

> **Note:** The custom domain (`orchestrated.bio`) is configured via the `CNAME` file in the repo root and DNS A records at Porkbun. You should not need to touch either unless changing domains.

## Brand Reference

| Token | Value |
| --- | --- |
| Primary green | `#16b17e` (brand-500) |
| Dark navy | `#0d1020` (navy-950) |
| Domain | orchestrated.bio |
| Tagline | AI-Driven Precision Medicine & Agentic AI Solutions |

## License

Proprietary. All rights reserved by Orchestrated Biosciences.
