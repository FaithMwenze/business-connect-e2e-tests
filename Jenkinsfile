pipeline {
    agent {docker { image 'node:10.16.3-jessie-slim' }} 

    environment {
        CHROME_BIN = '/bin/google-chrome'
    }

    stages {
        stage("install dependencies") {
            steps {
                sh npm i
            }
        }
        stage("e2e tests"){
            steps{
              sh "npm test"
            }
        }
    }