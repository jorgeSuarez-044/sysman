Configurar Amplify CLI:

bash

npx amplify configure
Inicializar un nuevo proyecto de Amplify:

bash

npx amplify init
Agregar una API RESTful:

bash

npx amplify add api
Agregar una función Lambda:

bash
Copiar código
npx amplify add function
Desplegar el proyecto:

bash
Copiar código
npx amplify push

Estos comandos configuran Amplify CLI, inicializan el proyecto, agregan la API y la función Lambda, y despliegan los cambios.

tienes que generar tu acceskeyid 
Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  jlsc4443

Successfully set up the new user.
mbp-de-jorge:lambda jorgeleonardosuarezcortes$ npx amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project apirestlocation
The following configuration will be applied:

Project information
| Name: apirestlocation
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: none
| Source Directory Path: src
| Distribution Directory Path: dist
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Please choose the profile you want to use jlsc4443
Adding backend environment dev to AWS Amplify app: d20638w8pfpb9c

Deployment completed.
Deploying root stack apirestlocation [ ==========-------------------------
        amplify-apirestlocation-dev-4… AWS::CloudFormation::Stack     CREATE_IN_P
        DeploymentBucket               AWS::S3::Bucket                CREATE_COMP
        AuthRole                       AWS::IAM::Role                 CREATE_IN_P
        UnauthRole                     AWS::IAM::Role                 CREATE_IN_P

✔ Help improve Amplify CLI by sharing non-sensitive project configurations on failures (y/N) · yes


    Thank you for helping us improve Amplify CLI!
Deployment state saved successfully.
✔ Initialized provider successfully.
✅ Initialized your environment successfully.
✅ Your project has been successfully initialized and connected to the cloud!
Some next steps:

"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

esta es mi prueba para la lambda 