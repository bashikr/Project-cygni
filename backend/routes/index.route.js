var express = require("express");
var router = express.Router();
var Flickr = require("flickr-sdk");
var flickr = new Flickr(process.env.FLICKR_API_KEY);

const duration = require("../middleware/routeCache.handler");

router.get("/:text/:page", duration(300), async (request, response) => {
    await flickr.photos
        .search({
            text: request.params.text,
            page: request.params.page,
        })
        .then((res) => {
            response.status(200).send({ data: res.body.photos });
        })
        .catch(() => {
            response.status(400).send({ data: "Sorry try again later!" });
        });
});

module.exports = router;
