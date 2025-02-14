def buildTag = "1.0.${BUILD_NUMBER}"
def buildBranch = 'main'

pipeline {
    //agent any
    agent { label 'my-pc' }

    environment {
        SSH_CREDENTIALS_ID = 'APP_SSH' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GITHUB_SSH_CREDENTIALS_ID = 'github-ssh-key' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GIT_REPO_URL = 'git@github.com:germanfica/angular-personal-website.git'
        REPO_DIR = 'angular-personal-website' // Directorio del repositorio clonado
        PROJECT_NAME = 'personal-website'
        APP_IMAGE_NAME = 'personal-website-app'
        APP_IMAGE_TAG = 'latest'
        NGINX_IMAGE_NAME = 'personal-website-nginx'
        NGINX_IMAGE_TAG = 'latest'

        // Add the full path to the Git executable to PATH of my-pc agent
        PATH = "C:\\Program Files\\Git\\bin;${env.PATH}"
    }

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Setup parameters') {
            agent { label 'my-pc' }
            steps {
                script {
                    properties([
                        parameters([
                            // choice(
                            //     choices: [],
                            //     name: 'GIT_TAG'
                            // ),
                            choice(
                                choices: ['tag', 'main'],
                                name: 'GIT_BRANCH'
                            ),
                            gitParameter (
                                branch: buildBranch, branchFilter: '.*', defaultValue: '',
                                description: 'Select a git tag to use in this build. This parameter requires the git-parameter plugin.',
                                name: 'GIT_TAG', quickFilterEnabled: false, selectedValue: 'NONE', sortMode: 'NONE', tagFilter: '*', type: 'PT_TAG'
                            )
                        ])
                    ])
                }
            }
        }

        stage('Check parameters') {
            agent { label 'my-pc' }
            steps {
                script {
                    if(params.GIT_BRANCH.toString().equals('tag')){
                        if(params.GIT_TAG == null || params.GIT_TAG.toString().isEmpty()) {
                            currentBuild.result = 'ABORTED';
                            error("GIT_TAG is empty")
                        }else {
                            buildTag = params.GIT_TAG.toString()
                            buildBranch = params.GIT_TAG.toString()
                        }
                    }
                    if(params.GIT_BRANCH == null || params.GIT_BRANCH.toString().isEmpty()) {
                        currentBuild.result = 'ABORTED';
                        error("GIT_BRANCH is empty")
                    }
                    echo "Build tag: ${buildTag}"
                }
            }
        }

        stage('Checkout') {
            //agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            agent { label 'my-pc' }
            steps {
                checkout([$class: 'GitSCM', branches: [[name: buildBranch]],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          gitTool: 'Default',
                          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.GITHUB_SSH_CREDENTIALS_ID]]])
                // bat 'git status'
                // bat 'git branch --show-current'
                echo 'Checkout completed. Proceeding to the next stage.'
            }
        }

        stage('Copy secret files in Windows') {
            agent { label 'my-pc' }
            steps {
                withCredentials([
                    file(credentialsId: 'app_germanfica_com.crt', variable: 'APP_GERMANFICA_COM_CRT'),
                    file(credentialsId: 'app_germanfica_com.key', variable: 'APP_GERMANFICA_KEY'),
                    file(credentialsId: 'localhost.crt', variable: 'LOCALHOST_CRT'),
                    file(credentialsId: 'localhost.key', variable: 'LOCALHOST_KEY'),
                    file(credentialsId: 'environment.api.prod.ts', variable: 'ENV_API_PROD'),
                    file(credentialsId: 'environment.api.ts', variable: 'ENV_API'),
                    file(credentialsId: 'projects.json', variable: 'PROJECTS'),
                    file(credentialsId: 'app_german_fica_com.env', variable: 'ENV_FILE')
                ]) {
                    bat '''
                    if not exist src\\assets\\json mkdir src\\assets\\json
                    copy /Y %ENV_API_PROD% src\\environments\\environment.api.prod.ts
                    copy /Y %ENV_API% src\\environments\\environment.api.ts
                    copy /Y %PROJECTS% src\\assets\\json\\projects.json
                    copy /Y %APP_GERMANFICA_COM_CRT% app_germanfica_com.crt
                    copy /Y %APP_GERMANFICA_KEY% app_germanfica_com.key
                    copy /Y %LOCALHOST_CRT% localhost.crt
                    copy /Y %LOCALHOST_KEY% localhost.key
                    copy /Y %ENV_FILE% .env
                    '''
                }
            }
        }

        // stage('Copy secret files') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     // agent { label 'my-pc' } // Especifica el agente 'Built-In Node' para este stage
        //     steps {
        //         withCredentials([
        //             file(credentialsId: 'app_germanfica_com.crt', variable: 'APP_GERMANFICA_COM_CRT'),
        //             file(credentialsId: 'app_germanfica_com.key', variable: 'APP_GERMANFICA_KEY'),
        //             file(credentialsId: 'localhost.crt', variable: 'LOCALHOST_CRT'),
        //             file(credentialsId: 'localhost.key', variable: 'LOCALHOST_KEY'),
        //             file(credentialsId: 'environment.api.prod.ts', variable: 'ENV_API_PROD'),
        //             file(credentialsId: 'environment.api.ts', variable: 'ENV_API'),
        //             file(credentialsId: 'projects.json', variable: 'PROJECTS')
        //         ]) {
        //             sh '''
        //             mkdir -p src/assets/json
        //             cp -f $ENV_API_PROD src/environments/environment.api.prod.ts
        //             cp -f $ENV_API src/environments/environment.api.ts
        //             cp -f $PROJECTS src/assets/json/projects.json
        //             cp -f $APP_GERMANFICA_COM_CRT app_germanfica_com.crt
        //             cp -f $APP_GERMANFICA_KEY app_germanfica_com.key
        //             cp -f $LOCALHOST_CRT localhost.crt
        //             cp -f $LOCALHOST_KEY localhost.key
        //             '''
        //         }
        //     }
        // }

        // this stages are unnecesary because you are already building the project in the Dockerfile.

        // you only need to add the docker stage

        // stage('Install dependencies') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     tools {
        //         nodejs 'Nodejs 20.16.0'
        //     }
        //     steps {
        //         sh 'npm install'
        //     }
        // }

        // stage('Build') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     tools {
        //         nodejs 'Nodejs 20.16.0'
        //     }
        //     steps {
        //         sh 'npm run build'
        //     }
        // }

        // stage('Copy Build to my-pc') {
        //     agent {
        //         label 'my-pc'
        //     }
        //     steps {
        //         copyArtifacts projectName: env.JOB_NAME, selector: lastSuccessful()
        //     }
        // }

        // stage('List containers') {
        //     agent {
        //         label 'my-pc'
        //     }
        //     steps {
        //         script {
        //             // Construye la imagen Docker localmente
        //             // def image = docker.build("mi-imagen:latest")
        //             // echo "Docker image ${image.id} created successfully"
        //             bat 'docker ps'
        //         }
        //     }
        // }

        stage('Build Docker Image') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Construye la imagen Docker localmente con el número de build como etiqueta
                    //bat "docker-compose build --no-cache"
                    //bat "docker-compose build"
                    //bat "docker-compose -f docker-compose.prod.yml build"
                    bat "docker-compose -p ${env.PROJECT_NAME} -f docker-compose.prod.yml --env-file .env up -d"
                    echo "Docker image created successfully"
                }
            }
        }

        // stage('List images') {
        //     agent {
        //         label 'my-pc'
        //     }
        //     steps {
        //         script {
        //             // Construye la imagen Docker localmente
        //             // def image = docker.build("mi-imagen:latest")
        //             // echo "Docker image ${image.id} created successfully"
        //             bat 'docker images'
        //         }
        //     }
        // }

        stage('Save Docker Image with tag latest') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    bat "docker save ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} -o ${env.APP_IMAGE_NAME}-${APP_IMAGE_TAG}.tar"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} saved as ${env.APP_IMAGE_NAME}-${APP_IMAGE_TAG}.tar"

                    // Guardar la imagen Docker 'nginx'
                    bat "docker save ${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG} -o ${env.NGINX_IMAGE_NAME}-${NGINX_IMAGE_TAG}.tar"
                    echo "Docker image '${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG}' saved as ${env.NGINX_IMAGE_NAME}-${NGINX_IMAGE_TAG}.tar"
                }
            }
        }

        stage('Re-tag Docker Image') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    bat "docker tag ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} ${env.APP_IMAGE_NAME}:${buildTag}"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} renamed as ${env.APP_IMAGE_NAME}:${buildTag}"

                    // Guardar la imagen Docker 'nginx'
                    bat "docker tag ${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG} ${env.NGINX_IMAGE_NAME}:${buildTag}"
                    echo "Docker image '${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG}' renamed as ${env.NGINX_IMAGE_NAME}:${buildTag}"
                }
            }
        }

        stage('Save the renamed Docker Image with tag number') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    bat "docker save ${env.APP_IMAGE_NAME}:${buildTag} -o ${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${buildTag} saved as ${env.APP_IMAGE_NAME}-v${buildTag}.tar"

                    // Guardar la imagen Docker 'nginx'
                    bat "docker save ${env.NGINX_IMAGE_NAME}:${buildTag} -o ${env.NGINX_IMAGE_NAME}-v${buildTag}.tar"
                    echo "Docker image '${env.NGINX_IMAGE_NAME}:${buildTag}' saved as ${env.NGINX_IMAGE_NAME}-v${buildTag}.tar"
                }
            }
        }

        // stage('List images 2') {
        //     agent {
        //         label 'my-pc'
        //     }
        //     steps {
        //         script {
        //             // Construye la imagen Docker localmente
        //             // def image = docker.build("mi-imagen:latest")
        //             // echo "Docker image ${image.id} created successfully"
        //             bat 'docker images'
        //         }
        //     }
        // }

        // stage('Create Hello World File') {
        //     agent { label 'my-pc' }
        //     steps {

        //         withCredentials([
        //             // string(credentialsId: 'APP_SSH', variable: 'SSH_CREDENTIALS_ID'),
        //             // sshUserPrivateKey(credentialsId: 'APP_SSH', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE', usernameVariable: 'SSH_USERNAME'),
        //             // No te olvides de agregar estos IDs en tus credenciales de tipo Secret text
        //             string(credentialsId: 'SSH_PORT', variable: 'SSH_PORT'), // Secret text: puerto de tu servidor SSH
        //             string(credentialsId: 'SSH_USERNAME', variable: 'SSH_USERNAME'), // Secret text: usuario de tu servidor SSH
        //             string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST') // Secret text: IP de tu servidor SSH
        //         ]) {
        //             bat """
        //                 ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "echo hola mundo > hola_mundo.txt"
        //             """
        //         }
        //     }
        // }

        stage('Upload docker images to the server') {
            agent { label 'my-pc' }
            steps {

                withCredentials([
                    // string(credentialsId: 'APP_SSH', variable: 'SSH_CREDENTIALS_ID'),
                    // sshUserPrivateKey(credentialsId: 'APP_SSH', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE', usernameVariable: 'SSH_USERNAME'),
                    // No te olvides de agregar estos IDs en tus credenciales de tipo Secret text
                    string(credentialsId: 'SSH_PORT', variable: 'SSH_PORT'), // Secret text: puerto de tu servidor SSH
                    string(credentialsId: 'SSH_USERNAME', variable: 'SSH_USERNAME'), // Secret text: usuario de tu servidor SSH
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST') // Secret text: IP de tu servidor SSH
                ]) {
                    bat """
                        scp -P %SSH_PORT% ${env.APP_IMAGE_NAME}-v${buildTag}.tar %SSH_USERNAME%@%SSH_HOST%:~/${env.APP_IMAGE_NAME}-v${buildTag}.tar
                        scp -P %SSH_PORT% ${env.NGINX_IMAGE_NAME}-v${buildTag}.tar %SSH_USERNAME%@%SSH_HOST%:~/${env.NGINX_IMAGE_NAME}-v${buildTag}.tar
                    """
                }
            }
        }

        stage('Load docker images to the server') {
            agent { label 'my-pc' }
            steps {

                withCredentials([
                    // string(credentialsId: 'APP_SSH', variable: 'SSH_CREDENTIALS_ID'),
                    // sshUserPrivateKey(credentialsId: 'APP_SSH', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE', usernameVariable: 'SSH_USERNAME'),
                    // No te olvides de agregar estos IDs en tus credenciales de tipo Secret text
                    string(credentialsId: 'SSH_PORT', variable: 'SSH_PORT'), // Secret text: puerto de tu servidor SSH
                    string(credentialsId: 'SSH_USERNAME', variable: 'SSH_USERNAME'), // Secret text: usuario de tu servidor SSH
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST') // Secret text: IP de tu servidor SSH
                ]) {
                    bat """
                        ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "docker load -i ${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                        ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "docker load -i ${env.NGINX_IMAGE_NAME}-v${buildTag}.tar"
                        ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "docker images"
                        ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "rm -f ${env.APP_IMAGE_NAME}-v${buildTag}.tar ${env.NGINX_IMAGE_NAME}-v${buildTag}.tar"
                    """
                }
            }
        }

        stage('Modify docker-compose-image-template.yml') {
            agent { label 'my-pc' }
            steps {
                script {
                    // Lee el contenido del archivo docker-compose-image-template.yml
                    def dockerComposeTemplate = readFile 'docker-compose-image-template.yml'

                    // Reemplaza 'tu-imagen-hash' con '${env.APP_IMAGE_NAME}:${buildTag}'
                    def dockerComposeContent = dockerComposeTemplate.replaceAll('app-image-name', "${env.APP_IMAGE_NAME}:${buildTag}")

                    // Reemplaza 'nginx-image-name' con '${env.NGINX_IMAGE_NAME}:${buildTag}'
                    dockerComposeContent = dockerComposeContent.replaceAll('nginx-image-name', "${env.NGINX_IMAGE_NAME}:${buildTag}")

                    // Escribe el contenido modificado en un nuevo archivo
                    writeFile file: 'docker-compose-image-template.yml', text: dockerComposeContent

                    echo "Content successfully modified:\n${dockerComposeContent}"
                }
            }
        }

        stage('Upload docker-compose.yml to the server') {
            agent { label 'my-pc' }
            steps {

                withCredentials([
                    // string(credentialsId: 'APP_SSH', variable: 'SSH_CREDENTIALS_ID'),
                    // sshUserPrivateKey(credentialsId: 'APP_SSH', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE', usernameVariable: 'SSH_USERNAME'),
                    // No te olvides de agregar estos IDs en tus credenciales de tipo Secret text
                    string(credentialsId: 'SSH_PORT', variable: 'SSH_PORT'), // Secret text: puerto de tu servidor SSH
                    string(credentialsId: 'SSH_USERNAME', variable: 'SSH_USERNAME'), // Secret text: usuario de tu servidor SSH
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST') // Secret text: IP de tu servidor SSH
                ]) {
                    bat """
                        scp -P %SSH_PORT% docker-compose-image-template.yml %SSH_USERNAME%@%SSH_HOST%:~/docker-compose.yml
                    """
                }
            }
        }

        // stage('Clone or Pull Repository') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     steps {
        //         withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS_ID, keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE')]) {
        //             sh '''
        //             [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
        //             ssh-keyscan -t rsa,dsa github.com >> ~/.ssh/known_hosts
        //             if [ ! -d "$REPO_DIR" ]; then
        //                 ssh-agent bash -c "ssh-add $SSH_KEY <<< $SSH_PASSPHRASE; git clone $GIT_REPO_URL"
        //             else
        //                 cd $REPO_DIR
        //                 ssh-agent bash -c "ssh-add $SSH_KEY <<< $SSH_PASSPHRASE; git pull"
        //             fi
        //             '''
        //         }
        //     }
        // }

        // stage('Clone Repository on my-pc') {
        //     agent { label 'my-pc' } // Especifica el agente 'my-pc' de windows para este stage
        //     steps {
        //         sshagent (credentials: [env.GITHUB_SSH_CREDENTIALS_ID]) {
        //             bat 'git clone $GIT_REPO_URL'
        //         }
        //     }
        // }

        // stage('Build on my-pc') {
        //     agent { label 'my-pc' } // Especifica el agente 'my-pc' para este stage
        //     steps {
        //         bat 'npm install'
        //         bat 'npm run build'
        //     }
        // }
    }
}
