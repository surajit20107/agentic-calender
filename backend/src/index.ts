import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 5000;
const appOrigin = process.env.APP_URL || "http://localhost:3000";

app.use(cors({
    origin: appOrigin,
    credentials: true
}));

app.use(express.json());

app.get("/health", (_req, res) => {
    try {
        res.status(200).json({
            success: true,
            status: "OK",
            service: "agentic-calender"
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Agentic Calender listening on port: ${port}`);
});
