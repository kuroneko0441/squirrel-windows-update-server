import * as express from "express";
import axios from "axios";

const updateRouter = express.Router();

updateRouter.get("/:fileName", (req: express.Request, res: express.Response) => {
    axios.get(`https://api.github.com/repos/${process.env.OWNER}/${process.env.REPO}/releases/latest`)
        .then(value => {
            const assets = value.data["assets"];

            const fileUrl = assets.find(value => value["name"] === req.params["fileName"])["browser_download_url"];

            res.redirect(fileUrl);
        });
});

export {updateRouter};