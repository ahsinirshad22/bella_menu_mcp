import { IExecuteFunctions, IHttpRequestMethods, INodeInputConfiguration, INodeOutputConfiguration, NodeConnectionType } from 'n8n-workflow';
import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class McpMenu implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'MCP Menu',
        name: 'mcpMenu',
        group: ['transform'],
        version: 1,
        description: 'Get or Update a Menu Item from MCP',
        defaults: {
            name: 'MCP Menu',
        },
        inputs: ['main'] as NodeConnectionType[],
        outputs: ['main'] as NodeConnectionType[],
        credentials: [],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a menu item',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        description: 'Update a menu item',
                    },
                ],
                default: 'get',
                description: 'The operation to perform.',
            },
            {
                displayName: 'Menu ID',
                name: 'menuId',
                type: 'string',
                default: '',
                required: true,
                description: 'ID of the menu item to operate on',
            },
            {
                displayName: 'Title (en)',
                name: 'titleEn',
                type: 'string',
                default: '',
                description: 'English title of the menu item',
                displayOptions: {
                    show: {
                        operation: [
                            'update',
                        ],
                    },
                },
            },
            {
                displayName: 'Title (it)',
                name: 'titleIt',
                type: 'string',
                default: '',
                description: 'Italian title of the menu item',
                displayOptions: {
                    show: {
                        operation: [
                            'update',
                        ],
                    },
                },
            },
            {
                displayName: 'Description (en)',
                name: 'descriptionEn',
                type: 'string',
                default: '',
                description: 'English description of the menu item',
                displayOptions: {
                    show: {
                        operation: [
                            'update',
                        ],
                    },
                },
            },
            {
                displayName: 'Description (it)',
                name: 'descriptionIt',
                type: 'string',
                default: '',
                description: 'Italian description of the menu item',
                displayOptions: {
                    show: {
                        operation: [
                            'update',
                        ],
                    },
                },
            },
            {
                displayName: 'Price',
                name: 'price',
                type: 'number',
                default: 0,
                description: 'Price of the menu item',
                displayOptions: {
                    show: {
                        operation: [
                            'update',
                        ],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i, '') as string;
            const menuId = this.getNodeParameter('menuId', i, '') as string;

            if (operation === 'get') {
                const options = {
                    method: 'GET' as IHttpRequestMethods,
                    url: `${process.env.MCP_MENU_API_URL || 'http://localhost:8000'}/api/menusMcp/${menuId}`,
                    headers: {
                        'secret_key': process.env.MCP_MENU_API_SECRET_KEY,
                    },
                    json: true,
                };
                const responseData = await this.helpers.request(options);
                returnData.push({ json: responseData });
            } else if (operation === 'update') {
                const titleEn = this.getNodeParameter('titleEn', i, '') as string;
                const titleIt = this.getNodeParameter('titleIt', i, '') as string;
                const descriptionEn = this.getNodeParameter('descriptionEn', i, '') as string;
                const descriptionIt = this.getNodeParameter('descriptionIt', i, '') as string;
                const price = this.getNodeParameter('price', i, 0) as number;

                const body: IDataObject = {
                    title: {
                        en: titleEn,
                        it: titleIt,
                    },
                    description: {
                        en: descriptionEn,
                        it: descriptionIt,
                    },
                    price: price,
                };

                const options = {
                    method: 'POST' as IHttpRequestMethods,
                    url: `${process.env.MCP_MENU_API_URL || 'http://localhost:8000'}/api/menusMcp/${menuId}`,
                    headers: {
                        'secret_key': process.env.MCP_MENU_API_SECRET_KEY,
                    },
                    body,
                    json: true,
                };
                const responseData = await this.helpers.request(options);
                returnData.push({ json: responseData });
            }
        }

        return [returnData];
    }
}
