export function createSlug(title) {
    const timestamp = Date.now().toString(); // Get current timestamp as a string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Append the timestamp and random string to the slug to make it unique
    const uniqueSlug = `${slug}-${timestamp}-${randomString}`;

    return uniqueSlug;
}