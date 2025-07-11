# n8n Node for MCP Menu API

This directory contains the source code for an n8n node that interacts with the Menu API of your Laravel application.

## Development

1.  **Navigate to this directory:**
    ```bash
    cd n8n_nodes
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the node:**
    This will compile the TypeScript code into JavaScript and copy the icon.
    ```bash
    npm run build
    ```

4.  **Run in development mode:**
    This will watch for changes in your `.ts` files and automatically rebuild the node.
    ```bash
    npm run dev
    ```

## Installing on a Local n8n Instance

If you are running n8n on your local machine for testing, you can link this package directly.

1.  **Link the package globally:**
    Navigate to this directory (`n8n_nodes`) and run:
    ```bash
    npm link
    ```

2.  **Link the package to n8n:**
    Navigate to your n8n installation directory and run:
    ```bash
    npm link n8n-nodes-mcp-menu
    ```

3.  **Restart your n8n instance.**

## Installing on a Remote/Live n8n Server

Since your n8n instance is on a remote server, you need to make the node package available there. Here are two common methods.

### Method 1: Install from a Git Repository (Recommended)

If this project is pushed to a Git repository (like GitHub), you can install the node directly from there.

1.  **SSH into your n8n server.**

2.  **Navigate to the directory where n8n looks for custom nodes.** This is typically `~/.n8n/custom/`. If the directory doesn't exist, you may need to create it.
    ```bash
    mkdir -p ~/.n8n/custom
    cd ~/.n8n/custom
    ```

3.  **Install the package from your Git repository.**
    ```bash
    # Example for a public GitHub repo
    npm install git+https://github.com/your-username/your-repo.git#main

    # Example for a private GitHub repo (requires SSH key setup)
    npm install git+ssh://git@github.com/your-username/your-repo.git#main
    ```
    **Important:** Replace the URL with the actual URL to your repository.

### Method 2: Manually Copy and Install

You can copy the node's source files to your server and install them from there.

1.  **Transfer the `n8n_nodes` directory to your server.** You can use tools like `scp` or `rsync`.
    ```bash
    # Example using scp from your local machine
    scp -r /path/to/your/n8n_nodes user@your-server-ip:~/n8n-nodes-mcp-menu
    ```

2.  **SSH into your n8n server.**

3.  **Navigate to the transferred directory and install its dependencies.**
    ```bash
    cd ~/n8n-nodes-mcp-menu
    npm install
    ```

4.  **Link the package to n8n's custom nodes directory.**
    ```bash
    # Create the custom nodes directory if it doesn't exist
    mkdir -p ~/.n8n/custom

    # Create a symbolic link
    ln -s ~/n8n-nodes-mcp-menu ~/.n8n/custom/n8n-nodes-mcp-menu
    ```

### Final Step

After using either method, you must **restart your n8n instance** for it to recognize the new node. Once restarted, the "MCP Menu" node will be available in your n8n editor.

## Icon

The node icon is located in the `icons` directory. You can replace `McpMenu.svg` with your own SVG icon.
