import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "wllinfoz",
  dataset,
  apiVersion,
  useCdn: true,
});
