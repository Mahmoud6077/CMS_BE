const PageDetail = require('../models/PageDetail')

exports.pageDetail_create_post = async (req, res) => {
    // console.log(req.body);
    let path = req.body.path
    try {
        let result = await PageDetail.findOneAndUpdate({ path }, req.body, { new: true })
        if (result)
            console.log('one', result._id)
        else {
            let pageDetail = new PageDetail(req.body)
            result = await pageDetail.save()
            console.log('two', result._id)
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            "status": "error", "message": "Bad Request, Please try again later", "data": null
        })
    }
}

exports.pageDetail_show_get = (req, res) => {
    // console.log(req);
    let path = req.query.path
    let website = req.query.website
    console.log(path, website);
    // console.log(path, website);
    PageDetail.findOne({ path, website })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Please try again later");
        });
}
exports.pageDetail_update_put = (req, res) => {
    PageDetail.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Please try again later");
        });
}
exports.pageDetail_delete = (req, res) => {
    let path = req.query.path
    let website = req.query.website
    PageDetail.findOneAndDelete({ website, path })
        .then(result => {
            console.log('Query result:', result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Please try again later");
        });
}

exports.pageDetail_index_get = (req, res) => {
    let website = req.query.website
    console.log(website);
    PageDetail.find({ website })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Please try again later");
        });
}