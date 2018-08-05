import * as express from "express";
import axios from "axios";

const downloadRouter = express.Router();

downloadRouter.get("/", (req: express.Request, res: express.Response) => {
    axios.get(`https://api.github.com/repos/${process.env.OWNER}/${process.env.REPO}/releases/latest`)
        .then(value => {
            const assets = value.data["assets"];

            const fileUrl = assets.find(value => value["name"].toLowerCase().includes("exe"))["browser_download_url"];

            res.redirect(fileUrl);
        });
});

export {downloadRouter};