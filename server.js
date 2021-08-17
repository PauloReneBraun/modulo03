const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true 
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "blob:https://web.whatsapp.com/bd65c77f-9cfc-49c8-86dc-2b9250ab15db",
        name: "Paulo Rene",
        role: "Aluno - Rocketseat",
        description: 'Programador , focado em trazer o melhor ensino em programação. <a href="https://youtube.com" target="_blank">Ajuda</a>',
        links: [
            {name: "Github", url:"https://github.com"},
            {name: "Twitter", url:"https://twitter.com"},
            {name: "Linkedin", url:"https://www.linkedin.com"}
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {

    return res.render("portfolio", {items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not Found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("sever is running")
})