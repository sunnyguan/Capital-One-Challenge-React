import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

class Article extends Component {

    timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);
    
        var interval = seconds / 31536000;
    
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    render() {
        const { article } = this.props
        var time = this.timeSince(new Date(article.publishedAt))
        return (
            <Card key={article.id}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {article.source.name.substring(0, 1)}
                            </Avatar>
                        }
                        title={article.source.name}
                        subheader={time}
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
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="secondary">Share</Button>
                    <Button size="small" color="secondary">Learn More</Button>
                </CardActions>
            </Card>
        )
    }
}

export default Article