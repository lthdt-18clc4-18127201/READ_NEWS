class SiteController {
    login(req, res) {
        res.render('login')
    }
}

module.exports = new SiteController;