import { createClient } from "@sanity/client"
export const client = createClient({
  projectId: "oso3x67d",
  dataset: "production",
  apiVersion: "2025-05-16",
  useCdn: false,
})