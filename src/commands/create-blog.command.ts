import * as commander from "commander";
import * as cliProgress from 'cli-progress';
import { generateBlog } from "src/faker/blog.faker";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const totalSteps = 100;

const program = new commander.Command();
program
  .command("generate <quantity>")
  .alias("g")
  .description("Generate Blog")
  .action(async (quantity) => {
    const blogs = generateBlog(Number(quantity));
    const totalSteps = blogs.length;
    progressBar.start(totalSteps, 0);

    for (let i = 0; i < blogs.length; i++) {
      await prisma.blog.create({
        data: blogs[i],
      });

      progressBar.update(i + 1);
    }

    progressBar.stop();
    console.log(`${quantity} Blogs generated and saved to database successfully!`);
  });

program.parse(process.argv);
