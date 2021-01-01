class NewsController{
    index(req, res) {
        res.renser('news');
    }
}

module.exports = new NewsController;