pipeline {
    agent any // This tells Jenkins to run the pipeline on any available agent

    stages {
        stage('Build') { // The first stage is called "Build"
            steps {
                // Put commands here to build your project, for example:
                echo 'Building..'
                // sh 'mvn clean package' // Uncomment and modify if you're using Maven, for example
            }
        }

        stage('Test') { // The second stage is called "Test"
            steps {
                // Put commands here to test your project, for example:
                echo 'Testing..'
                // sh './run-tests.sh' // Uncomment and modify to run your test script
            }
        }
    }

    post {
        always {
            // This block always executes, regardless of the build status
            echo 'This will always run'
        }
        success {
            // This block only executes if the build is successful
            echo 'The build was successful!'
        }
        failure {
            // This block only executes if the build fails
            echo 'The build failed.'
        }
    }
}
