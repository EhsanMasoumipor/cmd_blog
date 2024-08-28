import { faker } from '@faker-js/faker';


export function generateBlog(quantity: number) {
    const blog = [];
    for (var i = 0; i < quantity; i++) {
        const blogData = {
            title: faker.lorem.sentence(),
            writer: faker.internet.userName(),
            body: faker.lorem.paragraphs(3) 
        };
        blog.push(blogData);
    }
    return blog;
}
