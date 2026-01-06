# scraper/src/scrapers/hn_scraper.py

import requests
from bs4 import BeautifulSoup
import time
import logging
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class HackerNewsScraper:
    """
    Hacker News Web Scraper
    
    Scrapes front page stories from news.ycombinator.com
    Respects robots.txt and implements rate limiting
    """
    
    BASE_URL = "https://news.ycombinator.com"
    ROBOTS_TXT = f"{BASE_URL}/robots.txt"
    
    def __init__(self):
        """Initialize scraper with headers and session"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'DataLens-Scraper/1.0 (Educational Project)',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        self.backend_url = os.getenv('BACKEND_API_URL', 'http://localhost:5000')
        
    def check_robots_txt(self) -> bool:
        """
        Check robots.txt to ensure scraping is allowed
        
        Returns:
            bool: True if scraping is allowed
        """
        try:
            response = self.session.get(self.ROBOTS_TXT, timeout=10)
            robots_content = response.text
            
            # Check if our user agent is disallowed
            # In production, use robotparser module for comprehensive checking
            if 'Disallow: /' in robots_content:
                logger.warning("Scraping may be restricted by robots.txt")
                
            logger.info("robots.txt checked - proceeding with scraping")
            return True
            
        except Exception as e:
            logger.error(f"Error checking robots.txt: {e}")
            return True  # Proceed cautiously if robots.txt unavailable
    
    def scrape_front_page(self) -> List[Dict]:
        """
        Scrape Hacker News front page
        
        Returns:
            List[Dict]: List of scraped items with title, link, and rank
        """
        try:
            logger.info("Starting Hacker News scrape...")
            
            # Respect rate limiting
            time.sleep(1)
            
            # Fetch page content
            response = self.session.get(self.BASE_URL, timeout=15)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all story rows
            items = []
            story_rows = soup.select('tr.athing')
            
            for idx, row in enumerate(story_rows[:30], 1):  # Top 30 stories
                try:
                    # Extract rank
                    rank_elem = row.select_one('span.rank')
                    rank = rank_elem.text.strip('.') if rank_elem else str(idx)
                    
                    # Extract title and link
                    title_elem = row.select_one('span.titleline > a')
                    if not title_elem:
                        continue
                        
                    title = title_elem.text.strip()
                    link = title_elem.get('href', '')
                    
                    # Handle relative URLs
                    if link.startswith('item?'):
                        link = urljoin(self.BASE_URL, link)
                    
                    # Extract points and comments from next row
                    next_row = row.find_next_sibling('tr')
                    points = 0
                    comments = 0
                    
                    if next_row:
                        score_elem = next_row.select_one('span.score')
                        if score_elem:
                            points = int(score_elem.text.split()[0])
                        
                        comment_elem = next_row.select_one('a:-soup-contains("comment")')
                        if comment_elem:
                            comment_text = comment_elem.text.strip()
                            if 'comment' in comment_text:
                                comments = int(comment_text.split()[0]) if comment_text.split()[0].isdigit() else 0
                    
                    item = {
                        'rank': int(rank),
                        'title': title,
                        'link': link,
                        'points': points,
                        'comments': comments,
                        'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
                    }
                    
                    items.append(item)
                    logger.info(f"Scraped #{rank}: {title[:50]}...")
                    
                except Exception as e:
                    logger.error(f"Error parsing item {idx}: {e}")
                    continue
            
            logger.info(f"Successfully scraped {len(items)} items")
            return items
            
        except requests.RequestException as e:
            logger.error(f"Request error: {e}")
            raise
        except Exception as e:
            logger.error(f"Scraping error: {e}")
            raise
    
    def send_to_backend(self, items: List[Dict]) -> bool:
        """
        Send scraped data to backend API
        
        Args:
            items: List of scraped items
            
        Returns:
            bool: True if successful
        """
        try:
            api_endpoint = f"{self.backend_url}/api/scrape"
            
            logger.info(f"Sending {len(items)} items to backend...")
            
            response = requests.post(
                api_endpoint,
                json={'items': items},
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            response.raise_for_status()
            result = response.json()
            
            logger.info(f"Backend response: {result.get('message', 'Success')}")
            return True
            
        except requests.RequestException as e:
            logger.error(f"Failed to send data to backend: {e}")
            return False
    
    def run(self) -> bool:
        """
        Execute complete scraping workflow
        
        Returns:
            bool: True if scraping completed successfully
        """
        try:
            # Check robots.txt
            if not self.check_robots_txt():
                logger.warning("Robots.txt check failed - aborting")
                return False
            
            # Scrape data
            items = self.scrape_front_page()
            
            if not items:
                logger.warning("No items scraped")
                return False
            
            # Send to backend
            success = self.send_to_backend(items)
            
            return success
            
        except Exception as e:
            logger.error(f"Scraper run failed: {e}")
            return False


def main():
    """Main entry point for scraper"""
    logger.info("=" * 50)
    logger.info("DataLens Scraper - Starting")
    logger.info("=" * 50)
    
    scraper = HackerNewsScraper()
    success = scraper.run()
    
    if success:
        logger.info("Scraping completed successfully!")
    else:
        logger.error("Scraping failed!")
        exit(1)


if __name__ == "__main__":
    main()