pipeline {
    agent any
    environment {
        
        RENDER_DEPLOY_SCRIPT = 'node server.js'
    }

    // triggers {
    //     githubPush()
    // }
    tools{
        gradle "gradle"
    }
    stages {
        stage('Clone code') {
            steps {
                git branch: 'kegode', url: 'https://github.com/schoolofteche/gallery.git'
            }
        }

    stages {
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
}
}