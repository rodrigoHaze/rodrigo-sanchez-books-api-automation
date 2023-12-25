pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        SLACK_CREDENTIAL_ID = 'slack-token'
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
        stage('Cucumber Reports') {
            steps {
                script {
                    cucumber buildStatus: 'SUCCESS',
                            reportTitle: 'Booking API Automation Results',
                            fileIncludePattern: 'test-results/cucumber-report.json',
                            trendsLimit: 10

                
                }
            }
        }

    }
    post {
        success {
            echo 'Tests completed successfully. Sending report to Slack...'        
            
            script{
                
                def buildNumber = env.BUILD_NUMBER
                def jenkinsBaseUrl = 'http://localhost:8080/job/'
                def jobName = 'book-api-testing-pipeline/'
                def reportPath = ''
                def reportUrl = "${jenkinsBaseUrl}${jobName}${buildNumber}/${reportPath}"
                slackSend(tokenCredentialId: SLACK_CREDENTIAL_ID, color: 'good', message: "Carrier API Execution Completed \n ${reportUrl}", channel: SLACK_CHANNEL)
            }
            }
        failure {  
            slackSend(tokenCredentialId: SLACK_CREDENTIAL_ID, color: 'danger', message: "Tests Failed", channel: SLACK_CHANNEL)
           
            }
            
        }
        

    }