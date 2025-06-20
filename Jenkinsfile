pipeline {
    agent any

    environment {
        RENDER_DEPLOY_SCRIPT = 'node server.js'
    }

    
    triggers {
        githubPush()
    }

    tools {
        gradle "gradle"
    }

    stages {
        stage('Clone code') {
            steps {
                git branch: 'master', url: 'https://github.com/schoolofteche/gallery.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl -X POST https://api.render.com/deploy/srv-d1at5r8dl3ps73e2mcsg?key=7h0NW4Ddv6Q'
            }
        }
    }

    post {
        success {
            echo 'Deployment to Render was successful!'
        }
        failure {
            echo 'Build or deployment failed. Please check the logs.'
        }
    }
}
