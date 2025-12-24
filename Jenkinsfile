pipeline {
    agent any

    environment {
        NODE_ENV = "production"
        APP_NAME = "node-github-app"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace"
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo "Checking out code from GitHub"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies"
                dir('node-github-app') {
                    sh '''
                        node -v
                        npm -v
                        npm install
                    '''
                }
            }
        }

        stage('Build Application') {
            steps {
                echo "Building application"
                dir('node-github-app') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy to Production (PM2)') {
            steps {
                echo "Deploying application using PM2"
                dir('node-github-app') {
                    sh '''
                        # Install PM2 if not present
                        if ! command -v pm2 >/dev/null 2>&1; then
                            sudo npm install -g pm2
                        fi

                        # Restart or start the app
                        pm2 restart ${APP_NAME} || pm2 start app.js --name ${APP_NAME}

                        pm2 save
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "🚀 Node.js application deployed successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
