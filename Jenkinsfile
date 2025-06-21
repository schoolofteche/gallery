pipeline {
    agent any

    environment {
        RENDER_DEPLOY_SCRIPT = 'node server.js'
    }

    triggers {
        githubPush()
    }

    tools {
        nodejs "nodejs"
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

        stage('Run Tests') {
            steps {
                sh 'npm test'
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
            echo 'Build or tests failed. Sending email...'
            mail to: 'schooloftecheinfo@gmail.com',
                 subject: "BUILD FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """\
Hello,

The Jenkins build for job '${env.JOB_NAME}' (build #${env.BUILD_NUMBER}) has failed.

Please check the Jenkins console output for more details:
${env.BUILD_URL}

Regards,
Jenkins
"""
        }
    }
}
