// fetches the categories of news articles from News API
export const retrieve = () => {
    var categories = ["entertainment", "sports", "technology"] // categories
    var promises = []
    categories.forEach(item => {
        promises.push(
            fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${item}&pageSize=100&apiKey=e191d551ff8a44b09b5ddeb3afbf7bfa`)
                .then(data => data.json())
                .then(data => data["articles"])
                .then(articles => {
                    for (var article of articles)
                        article["label"] = item; // add category label for each news article
                    return { "status": 200, "data": articles }
                }).catch(err => {
                    return { "status": 500 }
                })
        );
    })

    // return Promise for the calling component to set its state
    return Promise.all(promises).then(articles => {
        var allArticles = []
        var errorOccurred = false
        // combine all three article groups
        for (var articleGroup of articles) {
            if (articleGroup["status"] !== 200)
                errorOccurred = true
            allArticles = allArticles.concat(articleGroup["data"]);
        }
        // return appropriate information depending on if there was an error
        if (!errorOccurred) {
            allArticles.sort(function (a, b) {
                return new Date(b.publishedAt) - new Date(a.publishedAt);
            });
            return { data: allArticles, loading: false }
        } else {
            return { loading: false, error: true }
        }
    })
}
