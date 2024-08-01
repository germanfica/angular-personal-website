pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'APP_SSH' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GITHUB_SSH_CREDENTIALS_ID = 'github-ssh-key' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        GIT_REPO_URL = 'git@github.com:germanfica/angular-personal-website.git'
        GIT_BRANCH = 'main';
        REPO_DIR = 'angular-personal-website' // Directorio del repositorio clonado
    }

    stages {
        stage('Checkout') {
            agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            steps {
                git branch: env.GIT_BRANCH, credentialsId: env.GITHUB_SSH_CREDENTIALS_ID, url: env.GIT_REPO_URL
                echo 'Checkout completed. Proceeding to the next stage.'
            }
        }

        stage('Copy secret files') {
            agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
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
                    sh '''
                    mkdir -p src/assets/json
                    cp -f $ENV_API_PROD src/environments/environment.api.prod.ts
                    cp -f $ENV_API src/environments/environment.api.ts
                    cp -f $PROJECTS src/assets/json/projects.json
                    cp -f $APP_GERMANFICA_COM_CRT app.germanfica.com.crt
                    cp -f $APP_GERMANFICA_CSR app.germanfica.csr
                    cp -f $APP_GERMANFICA_KEY app.germanfica.key
                    cp -f $LOCALHOST_CRT localhost.crt
                    cp -f $LOCALHOST_KEY localhost.key
                    '''
                }
            }
        }

        stage('Install dependencies') {
            agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            tools {
                nodejs 'Nodejs 20.16.0'
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            tools {
                nodejs 'Nodejs 20.16.0'
            }
            steps {
                sh 'npm run build'
            }
        }

        // stage('Copy Build to my-pc') {
        //     agent {
        //         label 'my-pc'
        //     }
        //     steps {
        //         copyArtifacts projectName: env.JOB_NAME, selector: lastSuccessful()
        //     }
        // }

        stage('Build Docker Image') {
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
