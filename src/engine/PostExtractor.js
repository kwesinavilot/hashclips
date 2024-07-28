class PostExtractor {
  constructor() {
    this.apiUrl = 'https://api.hashnode.com/';
  }

  async sendQuery(query, variables = {}) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  }

  async getPostBySlug(host, slug) {
    const query = `
      query Publication($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            title
            brief
            content {
              markdown
            }
            coverImage
            author {
              name
              username
            }
            tags {
              name
            }
          }
        }
      }
    `;

    const variables = { host, slug };
    return this.sendQuery(query, variables);
  }
}

module.exports = PostExtractor;