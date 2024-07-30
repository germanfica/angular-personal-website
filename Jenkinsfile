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
            steps {
                git branch: env.GIT_BRANCH, credentialsId: env.GITHUB_SSH_CREDENTIALS_ID, url: env.GIT_REPO_URL
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

        // stage('Build on Built-In Node') {
        //     agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
        //     steps {
        //         sh 'npm install'
        //         sh 'npm run build'
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
