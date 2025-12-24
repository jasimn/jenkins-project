pipeline {
    agent any

    environment {
        NODE_ENV = "production"
        APP_NAME = "node-github-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Checking out code from GitHub"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies"
                sh '''
                    node -v
                    npm -v
                    npm install
                '''
            }
        }

        stage('Build Application') {
            steps {
                echo "Building application"
                sh '''
                    npm run build
                '''
            }
        }

        stage('Deploy to Production (PM2)') {
            steps {
                echo "Deploying application using PM2"
                sh '''
                    # Install PM2 if not present
                    if ! command -v pm2 >/dev/null 2>&1; then
                        sudo npm install -g pm2
                    fi

                    # Stop old app if exists
                    pm2 delete ${APP_NAME} || true

                    # Start app with PM2
                    pm2 start app.js --name ${APP_NAME} --env production

                    # Save PM2 process list
                    pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 Node.js application deployed successfully and running on port 3000"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
