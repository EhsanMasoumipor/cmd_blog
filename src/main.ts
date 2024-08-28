import { PrismaClient } from "@prisma/client";
import express, { Express } from "express"
import cors from "cors"
import path from "path";

const app: Express = express();


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});


app.get('/blogs', async (req, res) => {
    const prisma: PrismaClient = new PrismaClient();

    try {
        const blogs = await prisma.blog.findMany();

        return res.status(200).json({
            data: blogs
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

app.listen(5000, () => {
    console.log('CMD Blog is ready');
})