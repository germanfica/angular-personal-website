pipeline {
    //agent any
    agent { label 'my-pc' }

    environment {
        SSH_CREDENTIALS_ID = 'APP_SSH' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GITHUB_SSH_CREDENTIALS_ID = 'github-ssh-key' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GIT_REPO_URL = 'git@github.com:germanfica/angular-personal-website.git'
        GIT_BRANCH = 'main';
        REPO_DIR = 'angular-personal-website' // Directorio del repositorio clonado
        APP_IMAGE_NAME = 'personal-website-app'
        APP_IMAGE_TAG = 'latest'
        NGINX_IMAGE_NAME = 'personal-website-nginx'
        NGINX_IMAGE_TAG = 'latest'

        BUILD_TAG = "1.0.${BUILD_NUMBER}"

        // Add the full path to the Git executable to PATH of my-pc agent
        PATH = "C:\\Program Files\\Git\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            //agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            agent { label 'my-pc' }
            steps {
                git branch: env.GIT_BRANCH, credentialsId: env.GITHUB_SSH_CREDENTIALS_ID, url: env.GIT_REPO_URL
                echo 'Checkout completed. Proceeding to the next stage.'
            }
        }

        stage('Copy secret files in Windows') {
            agent { label 'my-pc' }
            steps {
                withCredentials([
                    file(credentialsId: 'app.germanfica.com.crt', variable: 'APP_GERMANFICA_COM_CRT'),
                    file(credentialsId: 'app.germanfica.csr', variable: 'APP_GERMANFICA_CSR'),
                    file(credentialsId: 'app.germanfica.key', variable: 'APP_GERMANFICA_KEY'),
                    file(credentialsId: 'localhost.crt', variable: 'LOCALHOST_CRT'),
                    file(credentialsId: 'localhost.key', variable: 'LOCALHOST_KEY'),
                    file(credentialsId: 'environment.api.prod.ts', variable: 'ENV_API_PROD'),
                    file(credentialsId: 'environment.api.ts', variable: 'ENV_API'),
                    file(credentialsId: 'projects.json', variable: 'PROJECTS')
                ]) {
                    bat '''
                    if not exist src\\assets\\json mkdir src\\assets\\json
                    copy /Y %ENV_API_PROD% src\\environments\\environment.api.prod.ts
                    copy /Y %ENV_API% src\\environments\\environment.api.ts
                    copy /Y %PROJECTS% src\\assets\\json\\projects.json
                    copy /Y %APP_GERMANFICA_COM_CRT% app.germanfica.com.crt
                    copy /Y %APP_GERMANFICA_CSR% app.germanfica.csr
                    copy /Y %APP_GERMANFICA_KEY% app.germanfica.key
                    copy /Y %LOCALHOST_CRT% localhost.crt
                    copy /Y %LOCALHOST_KEY% localhost.key
                    '''
                }
            }
        }

        // stage('Copy secret files') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     // agent { label 'my-pc' } // Especifica el agente 'Built-In Node' para este stage
        //     steps {
        //         withCredentials([
        //             file(credentialsId: 'app.germanfica.com.crt', variable: 'APP_GERMANFICA_COM_CRT'),
        //             file(credentialsId: 'app.germanfica.csr', variable: 'APP_GERMANFICA_CSR'),
        //             file(credentialsId: 'app.germanfica.key', variable: 'APP_GERMANFICA_KEY'),
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
        //             cp -f $APP_GERMANFICA_COM_CRT app.germanfica.com.crt
        //             cp -f $APP_GERMANFICA_CSR app.germanfica.csr
        //             cp -f $APP_GERMANFICA_KEY app.germanfica.key
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

        stage('List containers') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Construye la imagen Docker localmente
                    // def image = docker.build("mi-imagen:latest")
                    // echo "Docker image ${image.id} created successfully"
                    bat 'docker ps'
                }
            }
        }

        stage('Build Docker Image') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Construye la imagen Docker localmente con el número de build como etiqueta
                    //bat "docker-compose build --no-cache"
                    bat "docker-compose build"
                    echo "Docker image created successfully"
                }
            }
        }

        stage('List images') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Construye la imagen Docker localmente
                    // def image = docker.build("mi-imagen:latest")
                    // echo "Docker image ${image.id} created successfully"
                    bat 'docker images'
                }
            }
        }

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
                    bat "docker tag ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} ${env.APP_IMAGE_NAME}:${BUILD_TAG}"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} renamed as ${env.APP_IMAGE_NAME}:${BUILD_TAG}"

                    // Guardar la imagen Docker 'nginx'
                    bat "docker tag ${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG} ${env.NGINX_IMAGE_NAME}:${BUILD_TAG}"
                    echo "Docker image '${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG}' renamed as ${env.NGINX_IMAGE_NAME}:${BUILD_TAG}"
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
                    bat "docker save ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} -o ${env.APP_IMAGE_NAME}-v${BUILD_TAG}.tar"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} saved as ${env.APP_IMAGE_NAME}-v${BUILD_TAG}.tar"

                    // Guardar la imagen Docker 'nginx'
                    bat "docker save ${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG} -o ${env.NGINX_IMAGE_NAME}-v${BUILD_TAG}.tar"
                    echo "Docker image '${env.NGINX_IMAGE_NAME}:${NGINX_IMAGE_TAG}' saved as ${env.NGINX_IMAGE_NAME}-v${BUILD_TAG}.tar"
                }
            }
        }

        stage('List images 2') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    // Construye la imagen Docker localmente
                    // def image = docker.build("mi-imagen:latest")
                    // echo "Docker image ${image.id} created successfully"
                    bat 'docker images'
                }
            }
        }

        stage('Create Hello World File') {
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
                        ssh -o StrictHostKeyChecking=no -p %SSH_PORT% %SSH_USERNAME%@%SSH_HOST% "echo hola mundo > hola_mundo.txt"
                    """
                }
            }
        }

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
                        scp -P %SSH_PORT% ${env.APP_IMAGE_NAME}-v${BUILD_TAG}.tar %SSH_USERNAME%@%SSH_HOST%:~/${env.APP_IMAGE_NAME}-v${BUILD_TAG}.tar
                        scp -P %SSH_PORT% ${env.NGINX_IMAGE_NAME}-v${BUILD_TAG}.tar %SSH_USERNAME%@%SSH_HOST%:~/${env.NGINX_IMAGE_NAME}-v${BUILD_TAG}.tar
                    """
                }
            }
        }

        // stage('Clone or Pull Repository') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     steps {
        //         withCredentials([sshUserPrivateKey(credentialsId: 'github-ssh-key', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE')]) {
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
