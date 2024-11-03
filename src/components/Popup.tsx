import { useState } from "react";

const Popup = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scrapedData, setScrapedData] = useState<any>(null);

  const handleScrape = async () => {
    // Send a message to the content script to scrape data
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id as number },
          func: scrapeMainTitle,
        },
        (results) => {
          if (results && results[0]) {
            setScrapedData(results[0].result);
          }
        }
      );
    });
  };

  return (
    <div>
      <h2>Jira Data Scraper</h2>
      <button onClick={handleScrape}>Scrape Jira Data</button>
      {scrapedData && <pre>{JSON.stringify(scrapedData, null, 2)}</pre>}
    </div>
  );
};

// Function to run in content script to scrape Jira data
const scrapeMainTitle = () => {
  // scrape h1
  return document.querySelector("h1")?.textContent;
};

export default Popup;
