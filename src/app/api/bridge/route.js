import { NextResponse, NextRequest } from "next/server";
import PostExtractor from "../../../engine/PostExtractor";

export async function POST(request) {    
    // Parse the JSON body
    const { blogLink } = await request.json();
    console.log('blogLink:', blogLink);

    // Rest of your code...
    if (!blogLink) {
        return NextResponse.json({ error: 'A Hashnode blog link is required' }, { status: 400 });
    }

    try {
        const extractor = new PostExtractor();
        
        // Extract the host and slug from the blog link
        const url = new URL(blogLink);
        const host = url.hostname;
        const slug = url.pathname.split('/').pop();
        console.log('host:', host, 'slug:', slug);
        
        // Fetch the blog post
        const data = await extractor.getPostBySlug(host, slug);
        
        console.log('data:', data);
        
        if (!data.publication || !data.publication.post) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }
        
        const post = data.publication.post;
        
        // Prepare the content for AI processing
        const processedContent = {
            title: post.title,
            brief: post.brief,
            content: post.content.markdown,
            author: post.author.name,
            tags: post.tags.map(tag => tag.name),
            coverImage: post.coverImage
        };
        
        return NextResponse.json({
            message: 'Content extracted successfully',
            content: processedContent
        }, { status: 200 });
    } catch (error) {
        console.error('Error processing blog content:', error);
        return NextResponse.json({ error: 'Failed to process blog content' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Hello, Next.js!' });
}
