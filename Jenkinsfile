pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'APP_SSH' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
    }

    stages {
        stage('Create Hello World File') {
            agent { label 'built-in' } // Especifica el agente 'Built-In Node' para este stage
            steps {
                withCredentials([
                    // string(credentialsId: 'APP_SSH', variable: 'SSH_CREDENTIALS_ID'),
                    // sshUserPrivateKey(credentialsId: 'APP_SSH', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE', usernameVariable: 'SSH_USERNAME'),
                    // No te olvides de agregar estos IDs en tus credenciales de tipo Secret text
                    string(credentialsId: 'SSH_PORT', variable: 'SSH_PORT'), // Secret text: puerto de tu servidor SSH
                    string(credentialsId: 'SSH_USERNAME', variable: 'SSH_USERNAME'), // Secret text: usuario de tu servidor SSH
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST') // Secret text: IP de tu servidor SSH
                ]) {
                    // Tiene que ir si o si tu SSH Username with private key
                    sshagent (credentials: [env.SSH_CREDENTIALS_ID]) {


                        withEnv(["SSH_PORT=${SSH_PORT}", "SSH_USERNAME=${SSH_USERNAME}", "SSH_HOST=${SSH_HOST}"]) {
                            sh "ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${SSH_USERNAME}@${SSH_HOST} 'echo hola mundo > hola_mundo.txt'"
                        }

                        //sh "ssh -o StrictHostKeyChecking=no -p ${env.SSH_PORT} ${env.SSH_USERNAME}@${env.SSH_HOST} 'echo hola mundo > hola_mundo.txt'"
                    }
                }
            }
        }

        stage('Run Docker Command on my-pc') {
            agent {
                label 'my-pc'
            }
            steps {
                script {
                    echo 'Running docker ps on my-pc...'
                    bat 'docker ps'
                }
            }
        }
    }
}
