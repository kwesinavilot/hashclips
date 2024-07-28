import { NextResponse } from "next/server";
import PostExtractor from "../../../engine/PostExtractor";

export async function POST(request) {
    try {        
        const { blogLink } = await request.json();

        if (!blogLink) {
            return NextResponse.json({ error: 'A Hashnode blog link is required' }, { status: 400 });
        }

        // Extract the host and slug from the blog link
        const url = new URL(blogLink);
        const host = url.hostname;
        const slug = url.pathname.split('/').pop();
        console.log('url:', url, 'host:', host, 'slug:', slug);
        
        const extractor = new PostExtractor();

        try {
            // Fetch the blog post
            const postData = await extractor.getPostBySlug(host, slug);
            console.log('Received post data: ', postData);
            
            // Fetch publication info
            const pubData = await extractor.getPublicationInfo(host);
            console.log('Received publication data: ', pubData);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return NextResponse.json({ error: 'Failed to fetch blog post: ' + error.message || 'Unknown error' }, { status: 500 });
        }
        
        // if (!postData.publication || !postData.publication.post) {
        //     return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        // }
        
        const post = postData.publication.post;
        const publication = pubData.publication;
        
        // Prepare the content for AI processing
        const processedContent = {
            title: post.title,
            brief: post.brief,
            content: post.content.markdown,
            author: post.author.name,
            tags: post.tags.map(tag => tag.name),
            coverImage: post.coverImage,
            publicationTitle: publication.title,
            publicationDescription: publication.descriptionSEO,
            publicationAbout: publication.about?.markdown,
            isTeamBlog: publication.isTeam,
            followersCount: publication.followersCount,
        };
        
        return NextResponse.json({
            message: 'Content extracted successfully',
            content: processedContent
        }, { status: 200 });
    } catch (error) {
        console.error('Error processing blog content:', error);
        return NextResponse.json({ error: 'Failed to process blog content', details: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Hello, Next.js!' });
}