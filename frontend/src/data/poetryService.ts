export interface Poem {
    title: string;
    author: string;
    lines: string[];
    linecount?: string;
}

export interface Author {
    authors: string[];
}

const BASE_URL = 'https://poetrydb.org';

// Generic fetcher
async function fetchFromApi<T>(endpoint: string): Promise<T> {
    // Replace spaces with %20 for URL safety
    const url = `${BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const poetryService = {
    // Get Random Poems
    getRandomPoems: async (count: number = 5): Promise<Poem[]> => {
        // Standard endpoint: /random/N
        const data = await fetchFromApi<Poem[]>(`/random/${count}`);
        // Sometimes API returns array, sometimes single object if count=1? Usually array.
        // Ensure array.
        return Array.isArray(data) ? data : [data] as unknown as Poem[];
    },

    // Get All Authors
    getAuthors: async (): Promise<string[]> => {
        const data = await fetchFromApi<{ authors: string[] }>('/author');
        return data.authors || [];
    },

    // Get Poems by Author
    getAuthorPoems: async (authorName: string): Promise<Poem[]> => {
        // API might need URI encoding
        const safeAuthor = encodeURIComponent(authorName);
        // Endpoint: /author/NAME
        const data = await fetchFromApi<Poem[]>(`/author/${safeAuthor}`);
        return Array.isArray(data) ? data : [];
    },

    // Get Specific Poem (Search by Title)
    getPoemByTitle: async (title: string): Promise<Poem | null> => {
        const safeTitle = encodeURIComponent(title);
        const data = await fetchFromApi<Poem[]>(`/title/${safeTitle}`);
        if (Array.isArray(data) && data.length > 0) {
            return data[0];
        }
        return null;
    }
};
