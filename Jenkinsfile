pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        //SLACK_CREDENTIAL_ID = 'slack-token'
        SLACK_CHANNEL = '#istqb'    
    }
    stages {
        stage('Installation') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm run all'
            }
        }
       

    }

    }