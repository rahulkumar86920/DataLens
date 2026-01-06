#!/usr/bin/env python3
# scraper/src/main.py

from scrapers.hn_scraper import HackerNewsScraper

if __name__ == "__main__":
    scraper = HackerNewsScraper()
    scraper.run()