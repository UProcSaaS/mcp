#!/usr/bin/env node
'use strict';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {z} from 'zod';
import axios from 'axios';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const package_json = require('./package.json');
const api_token = process.env.API_TOKEN;

if (!api_token)
    throw new Error('Cannot run MCP server without API_TOKEN env');

const api_headers = ()=>({
    'user-agent': `${package_json.name}/${package_json.version}`,
    authorization: `Bearer ${api_token}`
});

let server = new McpServer({
    name: 'uProc',
    version: package_json.version,
});

// server.tool('search_engine',
//     'Scrape search results from Google, Bing or Yandex. Returns SERP results '
//     +'by default (URL, title, description) in HTML or JSON',
//     {
//         query: z.string(),
//         engine: z.enum([
//             'google',
//             'bing',
//             'yandex',
//         ]).optional().default('google'),
//     },
//     tool_fn('search_engine', async({query, engine})=>{
//         let response = await axios({
//             url: 'https://api.brightdata.com/request',
//             method: 'POST',
//             data: {
//                 url: search_url(engine, query),
//                 zone: unlocker_zone,
//                 format: 'raw',
//                 data_format: 'markdown',
//             },
//             headers: api_headers(),
//             responseType: 'text',
//         });
//         return {content: [{type: 'text', text: response.data}]};
//     }));

// server.tool('scrape_as_markdown',
//     'Scrape a single webpage URL with advanced options for content extraction '
//     +'and get back the results in MarkDown language. This tool can unlock any '
//     +'webpage even if it uses bot detection or CAPTCHA.',
//     {url: z.string().url()},
//     tool_fn('scrape_as_markdown', async({url})=>{
//         let response = await axios({
//             url: 'https://api.brightdata.com/request',
//             method: 'POST',
//             data: {
//                 url,
//                 zone: unlocker_zone,
//                 format: 'raw',
//                 data_format: 'markdown',
//             },
//             headers: api_headers(),
//             responseType: 'text',
//         });
//         return {content: [{type: 'text', text: response.data}]};
//     }));

// server.tool('scrape_as_html',
//     'Scrape a single webpage URL with advanced '
//     +'options for content extraction and get back the results in HTML. '
//     +'This tool can unlock any webpage even if it uses bot detection or '
//     +'CAPTCHA.',
//     {url: z.string().url()},
//     tool_fn('scrape_as_html', async({url})=>{
//         let response = await axios({
//             url: 'https://api.brightdata.com/request',
//             method: 'POST',
//             data: {
//                 url,
//                 zone: unlocker_zone,
//                 format: 'raw',
//             },
//             headers: api_headers(),
//             responseType: 'text',
//         });
//         return {content: [{type: 'text', text: response.data}]};
//     }));

// const datasets = [{
//     id: 'amazon_product',
//     dataset_id: 'gd_l7q7dkf244hwjntr0',
//     description: [
//         'Quickly read structured amazon product data.',
//         'Requires a valid product URL with /dp/ in it.',
//         'This can be a cache lookup, so it can be more reliable than scraping'
//     ].join('\n'),
//     inputs: ['url'],
// }, {
//     id: 'amazon_product_reviews',
//     dataset_id: 'gd_le8e811kzy4ggddlq',
//     description: [
//         'Quickly read structured amazon product review data.',
//         'Requires a valid product URL with /dp/ in it.',
//         'This can be a cache lookup, so it can be more reliable than scraping'
//     ].join('\n'),
//     inputs: ['url'],
// }, {
//     id: 'linkedin_person_profile',
//     dataset_id: 'gd_l1viktl72bvl7bjuj0',
//     description: [
//         'Quickly read structured linkedin people profile data.',
//         'This can be a cache lookup, so it can be more reliable than scraping'
//     ].join('\n'),
//     inputs: ['url'],
// }, {
//     id: 'linkedin_company_profile',
//     dataset_id: 'gd_l1vikfnt1wgvvqz95w',
//     description: [
//         'Quickly read structured linkedin company profile data',
//         'This can be a cache lookup, so it can be more reliable than scraping'
//     ].join('\n'),
//     inputs: ['url'],
// }];
// for (const {dataset_id, id, description, inputs} of datasets)
// {
//     let schema = {};
//     for (let input of inputs)
//         schema[input] = input=='url' ? z.string().url() : z.string();
//     const tool = `web_data_${id}`;
//     server.tool(tool, description, schema, tool_fn(tool, async data=>{
//         let response = await axios({
//             url: 'https://api.brightdata.com/datasets/v3/scrape',
//             params: {dataset_id},
//             method: 'POST',
//             data: [data],
//             headers: api_headers(),
//             responseType: 'text',
//         });
//         if (!response.data?.length)
//             throw new Error('No data found');
//         console.error('[%s] %s %s', tool, response.status,
//             response.statusText);
//         return {content: [{type: 'text', text: response.data}]};
//     }));
// }

// const transport = new StdioServerTransport();
// console.error('Starting server...');
// await server.connect(transport);

// function tool_fn(name, fn){
//     return async data=>{
//         const ts = Date.now();
//         console.error(`[%s] executing %s`, name, JSON.stringify(data));
//         try { return await fn(data); }
//         catch(e){
//             if (e.response)
//             {
//                 console.error(`[%s] error %s %s: %s`, name, e.response.status,
//                     e.response.statusText, e.response.data);
//                 let message = e.response.data;
//                 if (message?.length)
//                     throw new Error(`HTTP ${e.response.status}: ${message}`);
//             }
//             else
//                 console.error(`[%s] error %s`, name, e.stack);
//             throw e;
//         } finally {
//             const dur = Date.now()-ts;
//             console.error(`[%s] tool finished in %sms`, name, dur);
//         }
//     };
// }

// function search_url(engine, query){
//     let q = encodeURIComponent(query);
//     if (engine=='yandex')
//         return `https://yandex.com/search/?text=${q}`;
//     if (engine=='bing')
//         return `https://www.bing.com/search?q=${q}`;
//     return `https://www.google.com/search?q=${q}`;
// }

