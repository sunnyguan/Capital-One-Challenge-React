import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

// Article Component represents a single news card
class Article extends Component {

    paywalls = [
        "adweek.com",
        "ad.nl",
        "americanbanker.com",
        "baltimoresun.com",
        "barrons.com",
        "bloombergquint.com",
        "bloomberg.com",
        "brisbanetimes.com.au",
        "businessinsider.com",
        "caixinglobal.com",
        "centralwesterndaily.com.au",
        "cen.acs.org",
        "chicagotribune.com",
        "corriere.it",
        "chicagobusiness.com",
        "dailypress.com",
        "groene.nl",
        "tijd.be",
        "volkskrant.nl",
        "delfi.ee",
        "demorgen.be",
        "denverpost.com",
        "df.cl",
        "editorialedomani.it/",
        "dynamed.com",
        "ed.nl",
        "elmercurio.com",
        "elpais.com/",
        "elu24.ee",
        "britannica.com",
        "estadao.com.br",
        "examiner.com.au",
        "fnlondon.com",
        "financialpost.com",
        "ft.com",
        "firstthings.com",
        "foreignpolicy.com",
        "fortune.com",
        "genomeweb.com",
        "glassdoor.com",
        "globes.co.il",
        "grubstreet.com",
        "haaretz.co.il",
        "haaretz.com",
        "handelsblatt.com",
        "harpers.org",
        "courant.com",
        "hbr.org",
        "heraldsun.com.au",
        "fd.nl",
        "historyextra.com",
        "humo.be",
        "ilmanifesto.it",
        "inc.com",
        "interest.co.nz",
        "investorschronicle.co.uk)",
        "[L'Écho](lecho.be",
        "labusinessjournal.com",
        "lanacion.com.ar",
        "repubblica.it",
        "lastampa.it",
        "latercera.com",
        "ledevoir.com",
        "leparisien.fr",
        "lesechos.fr",
        "loebclassics.com",
        "lrb.co.uk",
        "latimes.com",
        "sloanreview.mit.edu",
        "technologyreview.com",
        "medium.com",
        "medscape.com",
        "mexiconewsdaily.com",
        "mv-voice.com",
        "nydailynews.com/",
        "nrc.nl",
        "ntnews.com.au",
        "nationalpost.com",
        "nzz.ch",
        "nymag.com",
        "nzherald.co.nz",
        "asia.nikkei.com",
        "ocregister.com",
        "orlandosentinel.com",
        "paloaltoonline.com",
        "parool.nl",
        "postimees.ee",
        "qz.com",
        "quora.com",
        "republic.ru",
        "sandiegouniontribune.com",
        "sfchronicle.com",
        "scientificamerican.com",
        "seekingalpha.com",
        "slate.com",
        "sofrep.com",
        "statista.com",
        "startribune.com",
        "stuff.co.nz",
        "sun-sentinel.com",
        "techinasia.com",
        "telegraaf.nl",
        "adelaidenow.com.au",
        "theadvocate.com.au",
        "theage.com.au",
        "the-american-interest.com",
        "theatlantic.com",
        "afr.com",
        "theaustralian.com.au",
        "bizjournals.com",
        "canberratimes.com.au",
        "thecourier.com.au",
        "couriermail.com.au",
        "thecut.com",
        "dailytelegraph.com.au",
        "thediplomat.com",
        "economist.com",
        "theglobeandmail.com",
        "theherald.com.au",
        "thehindu.com",
        "irishtimes.com",
        "japantimes.co.jp",
        "kansascity.com",
        "mercurynews.com",
        "themercury.com.au",
        "mcall.com",
        "thenation.com",
        "thenational.scot",
        "newstatesman.com",
        "nytimes.com",
        "newyorker.com",
        "news-gazette.com",
        "inquirer.com",
        "thesaturdaypaper.com.au",
        "seattletimes.com",
        "spectator.com.au",
        "spectator.co.uk",
        "smh.com.au",
        "telegraph.co.uk",
        "thetimes.co.uk",
        "thestar.com",
        "wsj.com",
        "washingtonpost.com",
        "thewrap.com",
        "themarker.com",
        "the-tls.co.uk",
        "towardsdatascience.com",
        "trouw.nl",
        "vanityfair.com",
        "vn.nl",
        "vulture.com/",
        "journalnow.com",
        "wired.com",
        "worldpoliticsreview.com"
    ]

    timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000)
        var interval = seconds / 31536000

        if (interval > 1)
            return Math.floor(interval) + " years"
        interval = seconds / 2592000
        if (interval > 1)
            return Math.floor(interval) + " months"
        interval = seconds / 86400
        if (interval > 1)
            return Math.floor(interval) + " days"
        interval = seconds / 3600
        if (interval > 1)
            return Math.floor(interval) + " hours"
        interval = seconds / 60
        if (interval > 1)
            return Math.floor(interval) + " minutes"
        return Math.floor(seconds) + " seconds"
    }

    iframeProcess = (event) => {
        var url = this.props.article.url
        this.props.showIframe("https://mewyolkthymes.herokuapp.com/" + url) // using proxy for iframe display
    }

    getColor = (label) => {
        var color = "grey"
        if (label === "entertainment")
            color = "lightskyblue"
        else if (label === "sports")
            color = "lightsalmon"
        else
            color = "lightcoral"
        return color;
    }

    render() {
        const { article } = this.props
        
        var time = this.timeSince(new Date(article.publishedAt))
        var paywalled = false
        if (article.url) {
            for (var site of this.paywalls) {
                if (article.url.includes(site)) {
                    paywalled = true;
                    break;
                }
            }
        }

        return (
            <Card key={article.id}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="initial">
                            {article.source.name.substring(0, 1)}
                        </Avatar>
                    }
                    title={article.source.name}
                    subheader={<>{time} ago - {article.label}</>}
                    style={{ background: this.getColor(article.label) }}
                />
                <CardMedia
                    component="img"
                    alt="associated picture"
                    height="450"
                    src={article.urlToImage === null ? "/icon.png" : article.urlToImage}
                    onError={e => {
                        e.target.src = "/icon.png";
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {article.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {article.description}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: "10px" }}>
                        {article.content}
                    </Typography>
                    { paywalled &&
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: "10px", color: "lightsalmon" }}>
                            Potential paywall detected!
                        </Typography> 
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary" target="_blank" onClick={this.iframeProcess}>Open Here</Button>
                    <Button size="small" color="secondary" target="_blank" href={article.url}>Read More</Button>
                </CardActions>
            </Card>
        )
    }
}

export default Article