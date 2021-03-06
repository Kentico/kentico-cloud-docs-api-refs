import {
    ContentItem,
    Elements,
} from 'kentico-cloud-delivery';
import {
    ICategory,
    IContact,
    ILicense,
    IParameter,
    IPathOperation,
    IPreprocessedData,
    IRequestBody,
    IResponse,
    ISecurityScheme,
    IServer,
    IZapiSpecification,
} from 'kontent-docs-shared-code/reference/preprocessedModels';
import { ZapiCategory } from '../models/zapi__category';
import { ZapiContact } from '../models/zapi_contact';
import { ZapiLicense } from '../models/zapi_license';
import { ZapiParameter } from '../models/zapi_parameter';
import { ZapiPathOperation } from '../models/zapi_path_operation';
import { ZapiRequestBody } from '../models/zapi_request_body';
import { ZapiResponse } from '../models/zapi_response';
import { ZapiSecurityScheme } from '../models/zapi_security_scheme';
import { ZapiServer } from '../models/zapi_server';
import { ZapiSpecification } from '../models/zapi_specification';
import {
    processLinkedItemsElement,
    processMultipleChoiceElement,
    processTaxonomyElement,
} from '../utils/processElements';
import {
    getItemsDataFromLinkedItems,
    getItemsDataFromRichText,
    getSystemProperties,
    processItems,
} from './common';
import {
    processCodeSamplesInLinkedItems,
    processDescriptionComponents,
    processDescriptionWithSchemasComponents
} from './descriptionComponents';
import {
    processSchemasFromLinkedItemsElement,
    processSchemasFromRichTextElement,
} from './schemas';
import RichTextField = Elements.RichTextElement;

export const processApiSpecification = (
    items: ZapiSpecification[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiSpecification, IZapiSpecification>(getApiSpecificationData),
)(items, dataBlob, linkedItems);

const getApiSpecificationData = (
    item: ZapiSpecification,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): IZapiSpecification => {
    processCategories(item.categories.value, dataBlob, linkedItems);
    processContacts(item.contact.value, dataBlob, linkedItems);
    processLicenses(item.license.value, dataBlob, linkedItems);
    processSecuritySchemes(item.security.value, dataBlob, linkedItems);
    processServers(item.servers, dataBlob, linkedItems);
    processDescriptionWithSchemasComponents(item.description, dataBlob, linkedItems);

    return {
        ...getSystemProperties(item),
        apiReference: processTaxonomyElement(item.apiReference),
        apiStatus: processMultipleChoiceElement(item.apiStatus),
        categories: processLinkedItemsElement(item.categories),
        contact: processLinkedItemsElement(item.contact),
        description: item.description.resolveHtml(),
        license: processLinkedItemsElement(item.license),
        security: processLinkedItemsElement(item.security),
        servers: item.servers.resolveHtml(),
        termsOfService: item.termsOfService.value,
        title: item.title.value,
        url: item.url.value,
        version: item.version.value,
    };
};

const processSecuritySchemes = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiSecurityScheme, ISecurityScheme>(getSecuritySchemeData),
)(items, dataBlob, linkedItems);

const getSecuritySchemeData = (securityScheme: ZapiSecurityScheme): ISecurityScheme => ({
    ...getSystemProperties(securityScheme),
    apiKeyLocation: processMultipleChoiceElement(securityScheme.apiKeyLocation),
    apiKeyName: securityScheme.apiKeyName.value,
    apiReference: processTaxonomyElement(securityScheme.apiReference),
    bearerFormat: securityScheme.bearerFormat.value,
    description: securityScheme.description.resolveHtml(),
    name: securityScheme.name.value,
    scheme: securityScheme.scheme.value,
    type: processMultipleChoiceElement(securityScheme.type),
});

const processLicenses = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiLicense, ILicense>(getLicenseData),
)(items, dataBlob, linkedItems);

const getLicenseData = (license: ZapiLicense): ILicense => ({
    ...getSystemProperties(license),
    apiReference: processTaxonomyElement(license.apiReference),
    name: license.name.value,
    url: license.url.value,
});

const processContacts = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiContact, IContact>(getContactData),
)(items, dataBlob, linkedItems);

const getContactData = (contact: ZapiContact): IContact => ({
    ...getSystemProperties(contact),
    apiReference: processTaxonomyElement(contact.apiReference),
    email: contact.email.value,
    name: contact.name.value,
    url: contact.url.value,
});

const processCategories = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiCategory, ICategory>(getCategoryData),
)(items, dataBlob, linkedItems);

const getCategoryData = (
    category: ZapiCategory,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): ICategory => {
    processDescriptionWithSchemasComponents(category.description, dataBlob, linkedItems);
    processPathOperations(category.pathOperations.value, dataBlob, linkedItems);

    return {
        ...getSystemProperties(category),
        apiReference: processTaxonomyElement(category.apiReference),
        description: category.description.resolveHtml(),
        name: category.name.value,
        pathOperations: processLinkedItemsElement(category.pathOperations),
        url: category.url.value,
    };
};

const processPathOperations = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiPathOperation, IPathOperation>(getPathOperationData),
)(items, dataBlob, linkedItems);

const getPathOperationData = (
    pathOperation: ZapiPathOperation,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): IPathOperation => {
    processParameters(pathOperation.parameters.value, dataBlob, linkedItems);
    processRequestBodies(pathOperation.requestBody, dataBlob, linkedItems);
    processResponses(pathOperation.responses, dataBlob, linkedItems);
    processDescriptionComponents(pathOperation.description, dataBlob, linkedItems);
    processCodeSamplesInLinkedItems(pathOperation.codeSamples.value, dataBlob, linkedItems);

    return {
        ...getSystemProperties(pathOperation),
        apiReference: processTaxonomyElement(pathOperation.apiReference),
        codeSamples: processLinkedItemsElement(pathOperation.codeSamples),
        deprecated: processMultipleChoiceElement(pathOperation.deprecated),
        description: pathOperation.description.resolveHtml(),
        name: pathOperation.name.value,
        parameters: processLinkedItemsElement(pathOperation.parameters),
        path: pathOperation.path.value,
        pathOperation: processTaxonomyElement(pathOperation.pathOperation),
        requestBody: pathOperation.requestBody.resolveHtml(),
        responses: pathOperation.responses.resolveHtml(),
        url: pathOperation.url.value,
    };
};

const processServers = (
    field: RichTextField,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromRichText<ZapiServer, IServer>(getServersData),
)(field, dataBlob, linkedItems);

const getServersData = (server: ZapiServer): IServer => ({
    ...getSystemProperties(server),
    description: server.description.value,
    url: server.url.value,
});

const processParameters = (
    items: ContentItem[],
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromLinkedItems<ZapiParameter, IParameter>(getParametersData),
)(items, dataBlob, linkedItems);

const getParametersData = (
    parameter: ZapiParameter,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): IParameter => {
    processSchemasFromLinkedItemsElement(parameter.schema.value, dataBlob, linkedItems);
    processDescriptionComponents(parameter.description, dataBlob, linkedItems);

    return {
        ...getSystemProperties(parameter),
        apiReference: processTaxonomyElement(parameter.apiReference),
        deprecated: processMultipleChoiceElement(parameter.deprecated),
        description: parameter.description.resolveHtml(),
        example: parameter.example.value,
        explode: processMultipleChoiceElement(parameter.explode),
        location: processMultipleChoiceElement(parameter.location),
        name: parameter.name.value,
        required: processMultipleChoiceElement(parameter.required),
        schema: processLinkedItemsElement(parameter.schema),
        style: processMultipleChoiceElement(parameter.style),
    };
};

const processRequestBodies = (
    field: RichTextField,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromRichText<ZapiRequestBody, IRequestBody>(getRequestBodiesData),
)(field, dataBlob, linkedItems);

const getRequestBodiesData = (
    requestBody: ZapiRequestBody,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): IRequestBody => {
    processSchemasFromRichTextElement(requestBody.schema, dataBlob, linkedItems);
    processDescriptionComponents(requestBody.description, dataBlob, linkedItems);

    return {
        ...getSystemProperties(requestBody),
        description: requestBody.description.resolveHtml(),
        example: requestBody.example.value,
        mediaType: processMultipleChoiceElement(requestBody.mediaType),
        required: processMultipleChoiceElement(requestBody.required),
        schema: requestBody.schema.resolveHtml(),
    };
};

const processResponses = (
    field: RichTextField,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): void => processItems(
    getItemsDataFromRichText<ZapiResponse, IResponse>(getResponseData),
)(field, dataBlob, linkedItems);

const getResponseData = (
    response: ZapiResponse,
    dataBlob: IPreprocessedData,
    linkedItems: ContentItem[],
): IResponse => {
    processParameters(response.headers.value, dataBlob, linkedItems);
    processSchemasFromRichTextElement(response.schema, dataBlob, linkedItems);
    processDescriptionComponents(response.description, dataBlob, linkedItems);

    return {
        ...getSystemProperties(response),
        apiReference: processTaxonomyElement(response.apiReference),
        description: response.description.resolveHtml(),
        example: response.example.value,
        headers: processLinkedItemsElement(response.headers),
        httpStatus: processMultipleChoiceElement(response.httpStatus),
        mediaType: processMultipleChoiceElement(response.mediaType),
        schema: response.schema.resolveHtml(),
    };
};
