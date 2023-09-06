import { promises as fs } from "fs";

const PAGE_LIMIT = 4;

export default async function handler(req, res) {
  // Only accepts GET requests
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests are allowed!" });
  } else {
    const query = req.query;
    const { page, name, tag } = query;

    let campaigns = JSON.parse(await fs.readFile(process.cwd() + "/data.json", "utf8"));

    // Sends data after 1000ms
    await new Promise(r => setTimeout(r, Math.random() * 1500 + 500));
    // await new Promise(r => setTimeout(r, 100000));

    const start = (page - 1) * PAGE_LIMIT;
    const end = page * PAGE_LIMIT;

    const filterByName = (el) => el.name.toLowerCase() === name.toLowerCase();

    if (name !== undefined) {
      campaigns = campaigns.filter(filterByName);
    }

    const filterByTag = (el) => el.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase());

    if (tag !== undefined) {
      campaigns = campaigns.filter(filterByTag);
    }

    res.status(200).send({ total: campaigns.length, campaigns: campaigns.slice(start, end) });
  }
}