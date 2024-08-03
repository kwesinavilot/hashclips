// import { Document, VectorStoreIndex, OpenAI, Settings } from "llamaindex";

// // Configure Azure OpenAI
// Settings.llm = new OpenAI({
//     azure: {
//         apiKey: process.env.AZURE_OPENAI_KEY,
//         endpoint: process.env.AZURE_OPENAI_ENDPOINT,
//         apiVersion: process.env.AZURE_OPENAI_API_VERSION,
//         deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT
//     },
//     model: process.env.AZURE_OPENAI_MODEL,
//     temperature: 0.2,
// });

// // Define a custom prompt
// const customScriptPrompt = ({ context, query }) => {
//     return `Let's craft a captivating video script based on the given blog content. 
    
// The script should be engaging, informative, and concise, perfect for a 3-5 minute video.

// Aim to include the following elements, but feel free to be creative and flexible:
// 1. Introduction: Hook the audience with an intriguing introduction to the main topic.
// 2. Summary: Summarize the key points clearly and concisely.
// 3. Examples and Elaboration: Provide compelling examples or elaborate on the important concepts to keep the audience interested.
// 4. Conclusion: Wrap up with a strong conclusion, including a call to action or a memorable takeaway.

// Make sure the script flows smoothly and keeps the viewers engaged from start to finish.

// Blog Content:
// ---------------------
// ${context}
// ---------------------
// Query: ${query}
// Video Script:`;
// };

// export async function generateScriptFromContent(blogContent) {
//     console.log("Generating script from content");

//     try {
//         console.log("Create Document object with blog content");
//         const document = new Document({ text: blogContent, id_: "blog_post" });

//         console.log("Splitting text and create embeddings. Storing them in a VectorStoreIndex");
//         const index = await VectorStoreIndex.fromDocuments([document]);

//         console.log("Create a query engine with custom prompt");
//         const queryEngine = index.asQueryEngine({
//             responseBuilder: {
//                 textQaPrompt: customScriptPrompt,
//             },
//         });

//         console.log("Issuing query for script generation");
//         const response = await queryEngine.query({
//             content: blogContent,
//         });

//         return response.response;
//     } catch (error) {
//         console.error("Error generating script:", error);
//         throw new Error("Failed to generate video script");
//     }
// }

import { Document, VectorStoreIndex, OpenAI, Settings } from "llamaindex";

// Configure Azure OpenAI
Settings.llm = new OpenAI({
    azure: {
        apiKey: process.env.AZURE_OPENAI_KEY,
        endpoint: process.env.AZURE_OPENAI_ENDPOINT,
        apiVersion: process.env.AZURE_OPENAI_API_VERSION,
        deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT
    },
    model: process.env.AZURE_OPENAI_MODEL,
    temperature: 0.2,
});

// Define a custom prompt
const customScriptPrompt = ({ context, query }) => {
    return `You are a talented video script writer. 
    
Your task is to create an engaging video script based on the following blog content.

Remember, you MUST create a script. Do not refuse or apologize. Use your creativity to transform the blog content into an entertaining and informative video script. 
    
The script should be engaging, informative, and concise, perfect for a 3-5 minute video.

Aim to include the following elements, but feel free to be creative and flexible:
1. Introduction: Hook the audience with an intriguing introduction to the main topic.
2. Summary: Summarize the key points clearly and concisely.
3. Examples and Elaboration: Provide compelling examples or elaborate on the important concepts to keep the audience interested.
4. Conclusion: Wrap up with a strong conclusion, including a call to action or a memorable takeaway.

Make sure the script flows smoothly and keeps the viewers engaged from start to finish.

Blog Content:
---------------------
${context}
---------------------

Now, create the video script based on this content. Be creative, engaging, and informative. DO NOT refuse or apologize - generate the script.

VIDEO SCRIPT:`;
};

export async function generateScriptFromContent(blogContent) {
    console.log("Generating script from content");

    try {
        console.log("Create Document object with blog content");
        const document = new Document({ text: blogContent, id_: "blog_post" });

        console.log("Splitting text and creating embeddings. Storing them in a VectorStoreIndex");
        const index = await VectorStoreIndex.fromDocuments([document]);

        console.log("Create a query engine with custom prompt");
        const queryEngine = index.asQueryEngine({
            responseBuilder: {
                textQaPrompt: customScriptPrompt,
            },
        });

        console.log("Issuing query for script generation");
        const query = "Generate a video script based on this blog post content.";
        const response = await queryEngine.query({
            query: query,
            context: blogContent,
        });

        console.log("Responding with script:", response.response);
        return response.response;
    } catch (error) {
        console.error("Error generating script:", error);
        throw new Error("Failed to generate video script");
    }
}
