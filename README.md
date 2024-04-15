#Cloudflare AI Bot with Streaming

**Technologies Used:**
This project uses the following technologies:

**Next.js**: A React framework for building user interfaces.
**Supabase**: An open source Firebase alternative that provides backend services.

##Installation
To set up the Supabase project with Next.js, run the following command:

```
npx create-next-app -e with-supabase
```

**Project Overview**:

This project integrates Cloudflare AI to handle dynamic content streaming. Here are the key functionalities:

**Streaming Responses**: Utilizes Cloudflare AI to stream responses directly to the client.
**Database Operations**: All streamed data is saved in Supabase for persistent storage and retrieval.
**Data Invalidation**: Implements TanStack Query on the client-side for efficient data invalidation and cache management.
