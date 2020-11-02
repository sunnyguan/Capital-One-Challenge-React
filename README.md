# Mew Yolk Thymes

Link: [https://mewyolkthymes.netlify.app/](https://mewyolkthymes.netlify.app/)

Mew Yolk Thymes (New York Times) is a React application built around [News API](https://newsapi.org/). It provides a Material UI interface for users to quickly browse through global news, filter categories through searching or toggles, as well as viewing the news stories as if it was printed in a vintage newspaper in the 1980s. 

![demo gif](public/c1demo.gif)

## Table of Contents

1. [General Overview and Screenshots](#overview)
2. [Technical Details](#technical-details)
    1. [Modern View](#modern-view)
        1. [ModerNews.js](#modern-news)
        2. [ArticlesGrid.js](#articles-grid)
        3. [Articles.js](#articles)
        4. [ToggleCategory.js](#toggle-category)
        5. [Tools.js](#tools)
    2. [Vintage View](#vintage-view)
        1. [VintageNews.js](#vintage-news)
        2. [VintageArticle.js](#vintage-article)
    3. [API Service](#api-service)
3. [Roadblocks](#roadblocks)
4. [Final Thoughts](#final-thoughts)

## Overview

## Technical Details

This application uses React and React Material UI for front-end and Netlify for deployment. There was originally [another version](https://mewyolkthymes.herokuapp.com) that I built using pure Material Design Lite, but I opted to submit this version as I wanted to delve deeper into React and showcase how useful components can be. The React router at `index.js` handles the two simple routes, with the one at `/` going to Modern View and the one at `/vintage` going to Vintage View.

### Modern View

The Modern View is the main view hosted on root directory. It meets all of the deliverables of this challenge through providing a UI for users to view news stories from all around the world, filter news headlines with toggles, search/filter headlines with a search box, and also offers basic paywall checking (see [Articles Grid](#articles-grid) for more details).

#### Modern News

Filename: `ModernNews.js`

This file contains everything that the user sees when they first land on the website. It uses the [Search Box](#tools) component, the [Vintage Expand](#tools) component, the [Toggle Style](#tools) component, as well as the main [Articles Grid](#articles-grid) component. In addition to combining all of these components, it also handles the transition between light theme and dark theme for the Modern View. This is done with React Theme Provider, which offers a simple solution to toggling between light and dark mode. Since [Toggle Style](#tools) handles the actual toggle for light/dark theme, Modern News passes a function to [Toggle Style](#tools) which handles the state changes. In addition, since [Search Box](#tools) and [Articles Grid](#articles-grid) need to communicate with each other when the user hits enter after entering a search term, Modern News also acts as the medium by providing [Articles Grid](#articles-grid) with a search term state, and providing [Search Box](#tools) with a function to update the search term.

#### Articles Grid

Filename: `ArticlesGrid.js`

Articles Grid handles all of the fetch requests to News API. When the component first mounts, it fetches the three types of categories from the API and combine them together with labels added to each news article. Then, news articles are sorted by date (newest first) and the state is updated with the new news articles data. The render function is called for every state change, which is why it contains the logic for filters. The filtering part filters by both the enabled categories as well as by the search term. Finally, items are selected to be displayed depending on the current page number through the pagination component. Those elements are then mapped to grid cells, which each contain an Article component which handles the actual rendering of article content. Additional error-catching are used as well to show helpful messages to the user in case News API does not return a good response. To account for different screen sizes, withWidth is used to dynamically determine the optimal number of columns. Lastly, there is a basic iframe segment for opening news articles directly as a pop-up. To circumvent articles that might prevent this technique through their `x-iframe-options` header (sorry), I am using my Heroku platform (for the first iteration of this project) to act as a proxy.

#### Articles

Filename: `Article.js`

Article handles the rendering (and paywall checking) of one single news article. Paywall information is scraped from the list provided by a Chrome Extension on [GitHub](https://github.com/iamadamdev/bypass-paywalls-chrome) and slightly processed through some regular expression. Although this is not a comprehensive list, it does a good job at locating sites that are known to show paywalls. To show a popup in an iframe, ArticlesGrid passes down `showIframe()`, which enables all articles to show iframe url in a centralized iframe in ArticlesGrid, rather than having an iframe block in every Article component. Information such as article title, content, image, link, and publishing site are all displayed using Material UI's card design.

#### Toggle Category

Filename: `ToggleCategory.js`

ToggleCategory wraps the three toggles for article category into one component. It communicates with its parent component (ArticlesGrid) through the `updateFilters()` function passed as a prop.

#### Tools

Filename: `Tools.js`

Tools contains several smaller functional components. VintageExpand is the small hover link that takes the user to the vintage view of this website; SearchBox provides search functionality for filtering articles; ToggleStyle enables the user to toggle between light mode and dark mode seamlessly. 

### Vintage View

Vintage View is the second view of this application. Since it does not provide all of the deliverables (namely the filters), it acts as an additional feature that appeals to users who idealizes the vintage aesthetic. The background is slightly yellow from time's leisurely brush, the images washed out from the unwavering wind, yet the perfect font and modern amusements betray a hint of contemporary influence. What it lacks in features, the vintage view makes up for with its timeless appearance. With the vintage view's endless flow of recent gossip, it is sure to draw viewers (from all four corners of the Earth) to relax with a cup of pumpkin spice latte, and deliberate the latest rumors from the backyard of their idyllic countryside.

#### Vintage News

Filename: `VintageNews.js`

Vintage News is similar to ArticlesGrid as it contains all of the news articles. It organizes the articles into four groups: the first is the main image, the second is the news articles on the left sidebar, and the third and the fourth are two columns below the main image. To render a "new" look every time, the news articles are shuffled with each re-render.

#### Vintage Article

Filename: `VintageArticle.js`

Vintage Article displays one news article in vintage format. It shows the category, title, source, content, and description in a simple text format. The url (in the two horizontal lines) can be clicked to lead to the external article site.

### API Service

Filename: `FetchArticles.js`

This helps both the Modern and Vintage views by fetching the three categories of news articles and returning them sorted by time (most recent first).

## Roadblocks

1. Choosing between React and basic HTML/CSS with Material Design Lite
    1. I decided to learn React in more depth for this project because I figured it would be helpful for many of my personal projects as well. Even though I did implement this project with MDL at first, redoing it in React has been a great way of learning how to reuse components and separate different parts of the website into different reusable pieces.
2. Communicating between components
    1. I had some difficulties figuring out how to communicate between components (such as filtering articles from the search bar component). After doing some research, I was able to figure out a way using a common parent element to communicate with state changes and prop functions. In addition, I also learned about how to communicate between parent and child elements for components like Pagination and ArticlesGrid.
3. Routing
    1. I faced some issues with React Router as I haven't had experience setting it up before. After resolving that issue through some online research, I had some additional issues with routing with Netlify. That was resolved with the `_redirects` file, which took a while to discover but was ultimately successful.
4. Catching errors
    1. There were a few places that could have null errors or no articles found errors. I did try to add in a useful message for all of them to make sure that the application provides necessary information for a good user experience.

## Final Thoughts

This was a really fun project to work on! I learned more about React, JavaScript, Material UI, and many other concepts as well. The finished product looks and works great in providing a clean user interface and helpful features. The Vintage View was a really cool feature to work, and I think it does a great job at showcasing my skills and my creativity. I hope you agree as well, and thank you for reading through my submission!
