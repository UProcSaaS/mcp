# UProc MCP

Official [UProc](https://uproc.io) [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) server that enables referencing public web data. This server allows MCP clients like Claude Desktop, Cursor, Windsurf, OpenAI Agents and others make decisions based on the information available on the web.

## Account setup

1. Make sure you have an account on [uproc.io](https://uproc.io) (new users get free credit for testing, and pay as you go options are available)
2. Get your API key from the [user settings page](https://app.uproc.io/#/settings/integration)

## Quickstart with Claude Desktop

1. Install `nodejs` to get the `npx` command (node.js module runner). Installation instructions can be found on the [node.js website](https://nodejs.org/en/download)
2. Go to Claude > Settings > Developer > Edit Config > claude_desktop_config.json to include the following:

```
{
  "mcpServers": {
    "UProc": {
      "command": "npx",
      "args": ["-y @uproc-io/mcp"],
      "env": {
        "API_TOKEN": "<insert-your-api-token-here>",
      }
    }
  }
}
```

## Other MCP clients

To use this MCP server with other agent types, you should adapt the following to your specific software:
- the full command to run the MCP server is `npx @uprocsaas/mcp`
- the environment variable `API_TOKEN=<your-token>` must exist when running the server

## Usage

Some example queries that this MCP server will be able to help with:


## Troubleshooting

### Timeouts when using certain tools

Some tools can involve reading web data, and the amount of time needed to load the page can vary by quite a lot in extreme circumstances.
To ensure that your agent will be able to conume the data, set a high enough timeout in your agent settings.
A value of `180s` should be enough for 99% of requests, but some sites load slower than others, so tune this to your needs.

