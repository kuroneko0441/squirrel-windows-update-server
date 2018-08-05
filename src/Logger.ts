import * as express from "express";
import {TokenIndexer} from "morgan";
import * as colors from "colors";

export namespace Logger {
    export const getDate = (): string => {
        const date = new Date();
        return colors.magenta("[" +
            [
                date.getFullYear(),
                ("0" + (date.getMonth() + 1)).substr(-2),
                ("0" + date.getDate()).substr(-2)
            ].join("/") +
            " " +
            [
                ("0" + date.getHours()).substr(-2),
                ("0" + date.getMinutes()).substr(-2),
                ("0" + date.getSeconds()).substr(-2)
            ].join(":") +
            " " +
            date.toString().split(" ")[5]
            + "]");
    };

    export const morganLogger = (tokens: TokenIndexer, req: express.Request, res: express.Response): string => {
        const status = tokens["status"](req, res) || "undefined";
        let statusString = "";

        switch (status[0]) {
            case "1":
            case "2":
                statusString = colors.green(status);
                break;
            case "3":
                statusString = colors.cyan(status);
                break;
            case "4":
            case "5":
                statusString = colors.red(status);
                break;
            default:
                break;
        }

        return [
            Logger.getDate(),
            colors.white(`[from ${tokens["remote-addr"](req, res)}]`),
            tokens["method"](req, res),
            tokens["url"](req, res),
            statusString,
            `(${tokens["response-time"](req, res)}ms)`
        ].join(" ");
    };

    export const morganHeaderLogger = (tokens: TokenIndexer, req: express.Request, res: express.Response): string => {
        let bodyString = Object.keys(req.headers)
            .map(value => `${value}: ${typeof req.headers[value] === "string" ? "\"" : ""}${req.headers[value]}${typeof req.headers[value] === "string" ? "\"" : ""}`)
            .join(", ");
        return `Request Header: { ${bodyString} }`;
    };

    export const morganBodyLogger = (tokens: TokenIndexer, req: express.Request, res: express.Response): string => {
        let bodyString = "";

        if (req.body !== undefined && req.body !== null) {
            bodyString = Object.keys(req.body)
                .map(value => `${value}: ${typeof req.body[value] === "string" ? "\"" : ""}${req.body[value]}${typeof req.body[value] === "string" ? "\"" : ""}`)
                .join(", ");
        }

        return `Request Body: { ${bodyString} }`;
    };
}