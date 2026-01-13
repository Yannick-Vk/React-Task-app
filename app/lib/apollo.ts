import {ApolloClient, HttpLink, InMemoryCache, type Reference, type StoreObject} from "@apollo/client";

export const client = new ApolloClient({
    // Replace this with your GraphQL API endpoint
    link: new HttpLink({uri: "http://localhost:5095/graphql"}),
    cache: new InMemoryCache({
        typePolicies: {
            Task: {
                keyFields: ['id'], // Tell Apollo to use 'id' as the primary key for Task objects
            },
            Query: {
                fields: {
                    tasks: {
                        // This merge function will be called when the 'tasks' field is updated.
                        // It ensures that items are correctly added or removed without losing cache data.
                        merge(existing = [], incoming: any[], {readField}) {
                            const newTasks = [...existing];
                            incoming.forEach(task => {
                                const id = readField('id', task);
                                if (id) {
                                    // Check if the task already exists in the cache
                                    const existingTaskIndex = newTasks.findIndex(
                                        (t) => readField('id', t) === id
                                    );
                                    if (existingTaskIndex > -1) {
                                        // Update existing task
                                        newTasks[existingTaskIndex] = task;
                                    } else {
                                        // Add new task
                                        newTasks.push(task);
                                    }
                                }
                            });
                            // If a task was deleted, it won't be in the 'incoming' array.
                            // We need to filter out tasks from 'existing' that are no longer in 'incoming'.
                            // This scenario is handled by the network-only fetch in removeTask
                            // which replaces the whole list. However, if other queries
                            // merge with the existing cache, this merge function ensures consistency.
                            // For deletions, relying on network-only for the primary list fetch
                            // (as I did in the previous step) is often simpler.
                            // But for generic merges, we might want to ensure only present items remain.
                            // The warning implies that the entire array is being replaced, not merged.
                            // So, the most straightforward merge strategy for a full replacement is to return `incoming`.
                            // However, the warning indicates "cache data *may be lost*", which suggests
                            // Apollo is trying to be smart.
                            // The simplest fix for a complete replacement with a fresh list is often just to return incoming.
                            // But to fully utilize caching and merging, a more complex logic is needed.

                            // Given the "cache data may be lost when replacing the tasks field" warning,
                            // it strongly suggests that Apollo is *not* attempting to merge by default,
                            // but rather replacing the entire array if a merge strategy isn't provided or
                            // if it can't figure out how to merge.
                            // My `network-only` fetch policy for `removeTask` means the entire list is replaced.
                            // If I want to avoid the warning *and* leverage caching for other queries,
                            // I need a merge function.

                            // The warning implies the whole array is being replaced.
                            // So, this `merge` function should handle how `existing` and `incoming` arrays
                            // are reconciled. Since `removeTask` is now fetching `network-only`,
                            // the `incoming` array will always be the complete, fresh list.
                            // Therefore, returning `incoming` directly is often the simplest fix
                            // when the intent is to fully replace the list.
                            // However, if the warning is about *how* the replacement happens
                            // (i.e., it wants a structured merge even if it's effectively a replacement),
                            // then a basic `return incoming;` might still trigger it.

                            // The most robust merge for a list where items can be added/removed:
                            // 1. Create a map of incoming items by ID.
                            // 2. Iterate existing items, if they exist in incoming map, keep them (or merge if fields can change).
                            // 3. Add any items from incoming that weren't in existing.

                            // Let's implement a merge that preserves order if possible and handles deletions.
                            // This is a common pattern for "connection" or "list" fields.
                            const merged = existing ? existing.slice(0) : [];
                            for (const item of incoming) {
                                const id = readField('id', item);
                                if (id) {
                                    const existingIndex = merged.findIndex(
                                        (mergedItem: Reference | StoreObject | undefined) => readField('id', mergedItem) === id
                                    );
                                    if (existingIndex > -1) {
                                        // Replace the existing item with the incoming one to reflect updates
                                        merged[existingIndex] = item;
                                    } else {
                                        // Add new items
                                        merged.push(item);
                                    }
                                }
                            }
                            // To handle deletions, we need to filter `merged` to only include items
                            // that are also present in `incoming`.
                            const incomingIds = new Set(incoming.map(item => readField('id', item)));
                            return merged.filter((item: Reference | StoreObject | undefined) => incomingIds.has(readField('id', item)));
                        },
                    },
                },
            },
        },
    }),
});
