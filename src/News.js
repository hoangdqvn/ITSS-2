import React, { Component } from 'react'
import axios from 'axios'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
JavascriptTimeAgo.locale(en)
class News extends Component{
  constructor(){
    super()
    this.state = {
      news: []
    }
  }
  componentWillMount(){
    axios.get('https://newsapi.org/v2/top-headlines?country=jp&q=コロナ&apiKey=d4a25310fa454cfb8a845b6e9b9872da')
         .then(res => {
          this.setState({ news : res.data })
        })
  }
  render(){
    const { articles } = this.state.news
    return(
      <div id="news">
      { articles && articles.map((article, index) => {
        return(     
          <div className="card mb-3" key={ index }>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={`${article.urlToImage}`} className="card-img" alt=""></img>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <a href = {`${article.url}`}>
                    <h5 className="card-title">{article.title}</h5>
                  </a>
                  <p className="card-text">{article.description}</p>
                  <p className="card-text"><small className="text-muted">Last updated <ReactTimeAgo date={ article.publishedAt }/></small></p>
                </div>
              </div>
            </div>
          </div>
        )})
      }
      </div>
    )
  }
}
export default News;