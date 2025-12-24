pipeline {
    agent any

    environment {
        REPO_URL = "https://github.com/jasimn/jenkins-project.git"
        REPO_DIR = "${WORKSPACE}/node-github-app"
        BRANCH_NAME = "main"
        NODE_ENV = "production"
    }

    stages {

        stage('Fetch Code from GitHub') {
            steps {
                script {
                    echo "Fetching latest code from GitHub..."
                    sh """
                        if [ -d "${REPO_DIR}" ]; then
                            cd ${REPO_DIR}
                            git reset --hard
                            git checkout ${BRANCH_NAME}
                            git pull origin ${BRANCH_NAME}
                        else
                            git clone --branch ${BRANCH_NAME} ${REPO_URL} ${REPO_DIR}
                        fi
                    """
                }
            }
        }

        stage('Build Application') {
            steps {
                dir("${REPO_DIR}") {
                    sh """
                        set -e
                        npm install
                        npm run build
                    """
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                dir("${REPO_DIR}") {
                    sh """
                        set -e
                        pkill -f "node app.js" || true
                        nohup node app.js > app.log 2>&1 &
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🚀 Node.js application deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
