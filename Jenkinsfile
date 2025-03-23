def buildTag = "1.0.${BUILD_NUMBER}"
def buildBranch = 'main'
// Jenkins aún no ha definido env.WORKSPACE, por lo que no se puede usar aquí
// def customWorkspace = "${env.WORKSPACE}/${env.JOB_NAME}"

pipeline {
    //agent any
    agent { label 'build server' }
    // agent {
    //     node {
    //         label 'build server'
    //         //customWorkspace "${customWorkspace}"
    //         customWorkspace "${env.WORKSPACE}/${env.JOB_NAME}"
    //     }
    // }
    tools { nodejs 'v22.14.0' }  // Nombre configurado en Jenkins // esto genera un worskpace extra

    environment {
        GITHUB_SSH_CREDENTIALS_ID = 'ssh-angular-personal-website' // Reemplaza con el ID de tus credenciales SSH de tipo Username with private key
        SSH_KEY=credentials('0f35a115-c0eb-428d-9a43-4222baa005a5') // Secret kind: SSH Username with private key
        REPO_URL = 'https://github.com/germanfica/angular-personal-website.git'
        REPO_DIR = 'angular-personal-website' // Directorio del repositorio clonado
        PROJECT_NAME = 'personal-website'
        APP_IMAGE_NAME = 'personal-website-app'
        APP_IMAGE_TAG = 'latest'
        INVENTORY_PATH = '/opt/ansible-infra/inventories/production/applications/personal-website/inventory.yml'
        PLAYBOOK_PATH = '/opt/ansible-infra/playbooks/deploy-docker-app.yml'
        // Nota: WORKSPACE es una variable de Jenkins, no una variable de Groovy. No usar comillas simples en NPM_TEMPLATE_SRC porque Groovy no hace interpolación en ellas.
        NPM_TEMPLATE_SRC = "${WORKSPACE}/templates/docker-compose.npm.yml.j2" // Usar ruta absoluta!! Para evitar que Ansible no encuentre el archivo
        TARGET_HOSTS = 'myserver'
        LIMIT_HOSTS = 'myserver'
        USE_BECOME = 'true'
    }

    options {
        disableConcurrentBuilds()
        //throttleJobProperty(maxConcurrentPerNode: 1, maxConcurrentTotal: 1) // DON'T USE
        rateLimitBuilds(throttle: [count: 1, durationName: 'minute'])
    }

    stages {
        stage('Setup parameters') {
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
            steps {
                checkout([$class: 'GitSCM', branches: [[name: buildBranch]],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          gitTool: 'Default',
                          userRemoteConfigs: [[url: env.REPO_URL, credentialsId: env.GITHUB_SSH_CREDENTIALS_ID]]])
                echo 'Checkout completed. Proceeding to the next stage.'
            }
        }

        stage('Copy secret files') {
            steps {
                withCredentials([
                    file(credentialsId: 'projects.json', variable: 'PROJECTS'),
                    file(credentialsId: 'app_german_fica_com.env', variable: 'ENV_FILE')
                ]) {
                    sh '''
                    [ -d "src/assets/json" ] || mkdir -p src/assets/json
                    cp -f "$PROJECTS" src/assets/json/projects.json
                    cp -f "$ENV_FILE" .env
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    string(credentialsId: 'af0ea8aa-56ab-4c5a-802b-0d2cf3370c2e', variable: 'API_DEV_BASE_URL'),
                    string(credentialsId: '24ba145b-8362-441d-a47c-fbe55cc98f1d', variable: 'API_PROD_BASE_URL'),
                    string(credentialsId: '892b8335-4628-4340-b151-0215892fee41', variable: 'API_CONTACT'),
                    string(credentialsId: '8cb6a022-1e31-4d62-9bd5-6364e50e43df', variable: 'API_RECAPTCHA_SITE_KEY')
                ]) {
                    script {
                        sh 'docker build -f app.Dockerfile \
                            --build-arg API_DEV_BASE_URL=$API_DEV_BASE_URL \
                            --build-arg API_PROD_BASE_URL=$API_PROD_BASE_URL \
                            --build-arg API_CONTACT=$API_CONTACT \
                            --build-arg API_RECAPTCHA_SITE_KEY=$API_RECAPTCHA_SITE_KEY \
                            -t $APP_IMAGE_NAME:$APP_IMAGE_TAG .'
                        echo "Docker image created successfully"
                    }
                }
            }
        }

        stage('Save Docker Image with tag latest') {
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    sh "docker save ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} -o ${env.APP_IMAGE_NAME}-${APP_IMAGE_TAG}.tar"
                    // Guarda el archivo en Jenkins para transferirlo al otro agente
                    // stash name: 'app-tag-latest', includes: "${env.APP_IMAGE_NAME}-${APP_IMAGE_TAG}.tar"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} saved as ${env.APP_IMAGE_NAME}-${APP_IMAGE_TAG}.tar"
                }
            }
        }

        stage('Re-tag Docker Image') {
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    sh "docker tag ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} ${env.APP_IMAGE_NAME}:${buildTag}"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${APP_IMAGE_TAG} renamed as ${env.APP_IMAGE_NAME}:${buildTag}"
                }
            }
        }

        stage('Save the renamed Docker Image with tag number') {
            steps {
                script {
                    // Guardar la imagen Docker 'app'
                    sh "docker save ${env.APP_IMAGE_NAME}:${buildTag} -o ${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                    // Guarda el archivo en Jenkins para transferirlo al otro agente
                    // stash name: 'app-tag-number', includes: "${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                    echo "Docker image ${env.APP_IMAGE_NAME}:${buildTag} saved as ${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                }
            }
        }

        stage('Deploy npm App') {
            steps {
                script {
                    sh 'ls -la'
                    sh 'ansible-playbook -i $INVENTORY_PATH --private-key=$SSH_KEY $PLAYBOOK_PATH --limit $LIMIT_HOSTS --extra-vars "APP_NAME=npm APP_VERSION=latest WORKSPACE=$WORKSPACE TEMPLATE_SRC=$NPM_TEMPLATE_SRC USE_TAR=false TARGET_HOSTS=$TARGET_HOSTS USE_BECOME=$USE_BECOME"'
                }
            }
        }

        stage('Deploy personal-website App') {
            steps {
                script {
                    sh 'ls -la'
                    withEnv(["BUILD_TAG=${buildTag}"]) {
                        sh 'ansible-playbook -i $INVENTORY_PATH --private-key=$SSH_KEY $PLAYBOOK_PATH --limit $LIMIT_HOSTS --extra-vars "APP_VERSION=$BUILD_TAG APP_IMAGE_NAME=$APP_IMAGE_NAME APP_NAME=$PROJECT_NAME WORKSPACE=$WORKSPACE TARGET_HOSTS=$TARGET_HOSTS USE_BECOME=$USE_BECOME"'
                    }
                }
            }
        }
    }
    // esto genera un worskpace extra
    post {
        success {
            sh "docker rmi -f ${env.APP_IMAGE_NAME}:${env.APP_IMAGE_TAG} || true"
            sh "docker rmi -f ${env.APP_IMAGE_NAME}:${buildTag} || true"
            echo "Current workspace: ${env.WORKSPACE}"
            echo '✅ Build completed successfully.'
        }
        failure {
            script {
                echo "Current workspace: ${env.WORKSPACE}"
                sh "ls -la"
                def file1 = "${env.APP_IMAGE_NAME}-${env.APP_IMAGE_TAG}.tar"
                def file2 = "${env.APP_IMAGE_NAME}-v${buildTag}.tar"
                //ws(env.WORKSPACE) { }
                sh "ls -la"

                sh "rm -f ${file1}"
                sh "rm -f ${file2}"
                sh "docker rmi -f ${env.APP_IMAGE_NAME}:${env.APP_IMAGE_TAG} || true"
                sh "docker rmi -f ${env.APP_IMAGE_NAME}:${buildTag} || true"

                sh "ls -la"

                error "❌ ERROR: Falló la compilación. Archivos eliminados: ${file1}, ${file2}"
            }
        }
    }
}
