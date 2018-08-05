import * as express from "express";
import {join} from "path";
import {downloadRouter} from "./routes/download";
import {updateRouter} from "./routes/update";
import {Logger} from "./Logger";
import morgan = require("morgan");

const port = parseInt(process.env.PORT);

const app = express();

app.use(morgan((tokens, req, res) => {
    return [
        Logger.morganLogger(tokens, req, res),
        Logger.morganHeaderLogger(tokens, req, res),
        Logger.morganBodyLogger(tokens, req, res)
    ].join("\n");
}));

app.use("/static", express.static(join(__dirname, "../app/static")));
app.use("/update", updateRouter);
app.use("/download", downloadRouter);

app.listen(port, () => {
    console.log("server is listening on port " + port);
});