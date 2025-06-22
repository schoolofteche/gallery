pipeline {
    agent any

    environment {
        
        // MONGO_URL = 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@myip.0xndgzz.mongodb.net/?retryWrites=true&w=majority&appName=MyIP'
        MONGO_URL = 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@myip.0xndgzz.mongodb.net/?retryWrites=true&w=majority&appName=MyIP';
        SLACK_WEBHOOK_URL = credentials('SLACK_WEBHOOK_URL')
        RENDER_DEPLOY_SCRIPT = 'node server.js'
        RENDER_APP_URL = 'https://gallery-45jb.onrender.com/'
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
                sh 'npx mocha test/serverTest.js --exit'
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
            sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{
                    "text": "🚀 *Deployment Successful!*",
                    "attachments": [
                        {
                            "color": "#36a64f",
                            "fields": [
                                { "title": "Job", "value": "${env.JOB_NAME}", "short": true },
                                { "title": "Build ID", "value": "#${env.BUILD_NUMBER}", "short": true },
                                { "title": "Build URL", "value": "<${env.BUILD_URL}|View Jenkins Logs>", "short": false },
                                { "title": "Deployed App", "value": "<${env.RENDER_APP_URL}|Visit Live Site>", "short": false }
                            ]
                        }
                    ]
                }' \\
                $SLACK_WEBHOOK_URL
            """
        }

        failure {
            echo 'Build or tests failed. Sending email...'
            mail to: 'felixkegode@gmail.com',
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
