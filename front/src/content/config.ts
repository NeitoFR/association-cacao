import { defineCollection, z } from 'astro:content';

const cat = defineCollection({
    schema: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        photos: z.array(z.string().url()),
        tags: z.array(z.string()),
        adopted: z.boolean(),
    })
})