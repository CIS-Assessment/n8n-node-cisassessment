import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CisAssessmentApi implements ICredentialType {
	name = 'cisAssessmentApi';
	displayName = 'CisAssessment API';

	documentationUrl = 'https://connect.cisassessment.app';
	properties: INodeProperties[] = [
		{
			displayName: 'Server Url',
			name: 'server-url',
			type: 'string',
			default: 'https://api.aws.cisassessment.app',
			placeholder: 'https://api.aws.cisassessment.app',
			description: 'Digite a URL completa (ex: https://api.aws.cisassessment.app)',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: { password: true },
			description: 'Digite a token da sua conta Company',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials["server-url"]}}',
			url: '={{$credentials["server-url"].endsWith("/") ? "/erro" : "/company/bearer"}}',
			method: 'GET',
			// headers: {
			// 	Authorization: '={{"Bearer " + $credentials.token}}',
			// },
		},
	};
}
